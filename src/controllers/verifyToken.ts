import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const { jwtEnv } = require("../config");


function verifyToken(req: any, res: Response, next: NextFunction) {
  const token = req.headers['authorization']
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
