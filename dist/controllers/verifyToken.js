"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { jwtEnv } = require("../config");
var CryptoJS = require("crypto-js");
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
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
