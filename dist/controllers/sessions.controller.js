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
exports.verifyValidateToken = exports.logOut = exports.me = exports.signIn = exports.signUp = void 0;
const jwt = require("jsonwebtoken");
const { jwtEnv } = require("../config");
const pool = require("../db");
const { passwordEncrypt } = require("../utilities/encrypt");
const { validatePassword } = require("../utilities/validatePassword");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, cellphone_number, password } = req.body;
        //save Img
        const secureUrl = "https://res.cloudinary.com/dny08tnju/image/upload/v1672280689/real_estates/desconocido_hgz7m2.jpg";
        const publicId = "real_estates/desconocido_jt88ba";
        const resPhoto = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [secureUrl, publicId]);
        const idPhoto = resPhoto.rows[0].id;
        //save data
        const pass = yield passwordEncrypt(password);
        const result = yield pool.query("insert into users (username, email,cellphonenumber,password, id_photo, qualification) values ($1, $2, $3,$4,$5, $6) returning *", [username, email, cellphone_number, pass, idPhoto, 0]);
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
exports.signUp = signUp;
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
exports.signIn = signIn;
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
exports.me = me;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.json({ auth: false });
});
exports.logOut = logOut;
const verifyValidateToken = (req, res, next) => {
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
exports.verifyValidateToken = verifyValidateToken;
