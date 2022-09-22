import { NextFunction, Request, Response } from "express";
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { jwtEnv } = require("../config");
const pool = require("../db");
const { passwordEncrypt } = require("../utilities/encrypt");
const { validatePassword } = require("../utilities/validatePassword");

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, secrect_password } = req.body;
    const pass = await passwordEncrypt(password);

    const result = await pool.query(
      "insert into users (username, email, password) values ($1, $2, $3) returning *",
      [username, email, pass]
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
const recuperateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get email
    const { email, secret_password, password } = req.body;
    const getUser = await pool.query(
      "select id, email from users where email = $1",
      [email]
    );
    if (getUser.rows.length === 0)
      return res.status(400).json({
        message: "the email no exits",
      });
    const idUser = getUser.rows[0].id;
    //validate if keySecret is correct
    const validateKeySecret = await pool.query(
      `
      select a.id, a.secret_password, a.id_user 
      from accounts a, users u where u.email = $1
      and a.id_user=u.id and a.secret_password = $2`,
      [email, secret_password]
    );
    if (validateKeySecret.rows.length === 0)
      return res.status(400).json({
        message: "the secret key is incorrect",
      });

    //update table users
    const pass = await passwordEncrypt(password);
    const result = await pool.query(
      "update users set password=$1 where id=$2 returning *",
      [pass, idUser]
    );
    if (result.rows.length === 0)
      return res.status(400).json({
        message: "Not found",
      });
    /*  console.log(result) */
    return res.status(200).json({operation:true});
  } catch (error) {
    next(error);
  }
};
const verifyValidateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
   const token = req.headers["authorization"];
  const tkn = jwt.verify(token, jwtEnv.secret);
  if (tkn !=null)
    return res.status(200).json({
      message: true,
      user:tkn.id
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
  recuperateAccount
};
