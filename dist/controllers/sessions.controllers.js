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
const jwt = require("jsonwebtoken");
const { jwtEnv } = require("../config");
const pool = require("../db");
const { passwordEncrypt } = require("../utilities/encrypt");
const { validatePassword } = require("../utilities/validatePassword");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, cellphone_number, password, secrect_password } = req.body;
        //save Img
        const secureUrl = "https://res.cloudinary.com/dny08tnju/image/upload/v1664378004/real_estates/desconocido_jt88ba.jpg";
        const publicId = "real_estates/desconocido_jt88ba";
        const resPhoto = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [secureUrl, publicId]);
        const idPhoto = resPhoto.rows[0].id;
        //save data
        const pass = yield passwordEncrypt(password);
        const result = yield pool.query("insert into users (username, email,cellphonenumber,password, id_photo, qualification) values ($1, $2, $3,$4,$5, $6) returning *", [username, email, cellphone_number, pass, idPhoto, 0]);
        const saveTableAccounts = yield pool.query("insert into accounts (secret_password, id_user) values ($1, $2) returning *", [secrect_password, result.rows[0].id]);
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
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.json({ auth: false });
});
const recuperateAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get email
        const { email, secret_password, password } = req.body;
        const getUser = yield pool.query("select id, email from users where email = $1", [email]);
        if (getUser.rows.length === 0)
            return res.status(400).json({
                message: "the email no exits",
            });
        const idUser = getUser.rows[0].id;
        //validate if keySecret is correct
        const validateKeySecret = yield pool.query(`
      select a.id, a.secret_password, a.id_user 
      from accounts a, users u where u.email = $1
      and a.id_user=u.id and a.secret_password = $2`, [email, secret_password]);
        if (validateKeySecret.rows.length === 0)
            return res.status(400).json({
                message: "the secret key is incorrect",
            });
        //update table users
        const pass = yield passwordEncrypt(password);
        const result = yield pool.query("update users set password=$1 where id=$2 returning *", [pass, idUser]);
        if (result.rows.length === 0)
            return res.status(400).json({
                message: "Not found",
            });
        /*  console.log(result) */
        return res.status(200).json({ operation: true });
    }
    catch (error) {
        next(error);
    }
});
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
module.exports = {
    signUp,
    me,
    signIn,
    verifyValidateToken,
    logOut,
    recuperateAccount,
};
