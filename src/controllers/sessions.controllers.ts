import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const { jwtEnv } = require("../config");
const pool = require("../db");
const { passwordEncrypt } = require("../utilities/encrypt");
const { validatePassword } = require("../utilities/validatePassword");

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, cellphone_number, password, secrect_password } =
      req.body;

    //save Img
    const secureUrl =
      "https://res.cloudinary.com/dny08tnju/image/upload/v1672280689/real_estates/desconocido_hgz7m2.jpg";
    const publicId = "real_estates/desconocido_jt88ba";
    const resPhoto = await pool.query(
      "insert into photos (url, public_id) values ($1, $2) returning *",
      [secureUrl, publicId]
    );

    const idPhoto = resPhoto.rows[0].id;

    //save data

    const pass = await passwordEncrypt(password);

    const result = await pool.query(
      "insert into users (username, email,cellphonenumber,password, id_photo, qualification) values ($1, $2, $3,$4,$5, $6) returning *",
      [username, email, cellphone_number, pass, idPhoto, 0]
    );
    const saveTableAccounts = await pool.query(
      "insert into accounts (secret_password, id_user) values ($1, $2) returning *",
      [secrect_password, result.rows[0].id]
    );

    const token = jwt.sign({ id: result.rows[0].id }, jwtEnv.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token });
  } catch (error) {
    return res.status(401).json({
      auth: false,
      msg: error,
    });
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const result = await pool.query(
    "select id, username, email from users where email = $1",
    [email]
  );
  if (result.rows.length === 0) {
    return res.status(401).json({
      message: "the email doesnt exists",
    });
  }
  const passValid = await validatePassword(password, email);
  if (!passValid) {
    return res.status(401).json({
      auth: false,
      token: null,
    });
  }
  const token = jwt.sign({ id: result.rows[0].id }, jwtEnv.secret, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token });
};

export const me = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      "select id, username, email from users where id = $1",
      [req.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Not found",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.json({ auth: false });
};

export const verifyValidateToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  const tkn = jwt.verify(token, jwtEnv.secret);
  if (tkn != null)
    return res.status(200).json({
      message: true,
      user: tkn.id,
    });
  return res.status(500).json({
    message: false,
  });
};
