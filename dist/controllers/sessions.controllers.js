"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { jwtEnv } = require("../config");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const passwordEncrypt = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt);
});
const validatePassword = (pass, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query("select id, username, email, password from users where email = $1", [email]);
    return bcrypt.compare(pass, result.rows[0].password);
});
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const pass = yield passwordEncrypt(password);
        const result = yield pool.query("insert into users (username, email, password) values ($1, $2, $3) returning *", [username, email, pass]);
        const token = jwt.sign({ id: result.rows[0].id }, jwtEnv.secret, {
            expiresIn: 60 * 60 * 24,
        });
        res.json({ auth: true, token });
    }
    catch (error) {
        return res.status(401).json({
            auth: false,
            msg: error,
        });
    }
});
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("select id, username, email from users where id = $1", [req.userId]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
});
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield pool.query("select id, username, email from users where email = $1", [email]);
    if (result.rows.length === 0) {
        return res.status(401).json({
            message: "the email doesnt exists",
        });
    }
    const passValid = yield validatePassword(password, email);
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
});
const verifyValidateToken = (req, res, next) => {
    const token = req.headers["token"];
    const tkn = jwt.verify(token, jwtEnv.secret);
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
};
