import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const { jwtEnv } = require("../config");
var CryptoJS = require("crypto-js");

function verifyToken(req: any, res: Response, next: NextFunction) {
  const token = req.headers['authorization']

 /*  const token = req.cookies.token;
  var bytes = CryptoJS.AES.decrypt(token, "8021947cbba");
  var decryptedtoken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); */
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "no token provided",
    });
  }
  const decoded = jwt.verify(token, jwtEnv.secret);
  req.userId = decoded.id;
  next();
}

module.exports = verifyToken;
