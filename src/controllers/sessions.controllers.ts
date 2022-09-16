import { NextFunction, Request, Response } from "express";
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { jwtEnv } = require("../config");
const pool = require("../db");
const { passwordEncrypt } = require("../utilities/encrypt");
const { validatePassword } = require("../utilities/validatePassword");

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const pass = await passwordEncrypt(password);
    const result = await pool.query(
      "insert into users (username, email, password) values ($1, $2, $3) returning *",
      [username, email, pass]
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

const signIn = async (req: Request, res: Response, next: NextFunction) => {
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

  /*COOKIES */
  const tokenEncrypt = CryptoJS.AES.encrypt(
    JSON.stringify(token),
    "8021947cbba"
  ).toString();
  res.cookie("token", tokenEncrypt);
  res.json({ auth: true, token });
};

const me = async (req: any, res: Response, next: NextFunction) => {
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

const logOut = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.json({ auth: false });
};

const verifyValidateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get token
  const token = req.cookies.token;
  var bytes = CryptoJS.AES.decrypt(token, jwtEnv.secret);
  var decryptedtoken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const tkn = jwt.verify(decryptedtoken, jwtEnv.secret);
  if (tkn.id > 0)
    return res.status(200).json({
      message: true,
    });
  return res.status(500).json({
    message: false,
  });
};
module.exports = {
  signUp,
  me,
  signIn,
  verifyValidateToken,
  logOut,
};
