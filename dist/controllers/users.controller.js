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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.sendEmailCode = exports.getUserById = exports.updatePhotoUser = void 0;
const cloudinary_1 = require("../libs/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
const mailer_1 = require("../libs/mailer");
const { passwordEncrypt } = require("../utilities/encrypt");
const { emailer } = require("../config");
const pool = require("../db");
const updatePhotoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email } = req.params;
        let f1 = (_a = req.files) === null || _a === void 0 ? void 0 : _a.url;
        if (!f1) {
            return res.status(400).json({
                message: "photo no send",
            });
        }
        //get the row of user
        const rowUser = yield pool.query("select * from users where email = $1", [
            email,
        ]);
        const idPhoto = rowUser.rows[0].id_photo;
        const idUser = rowUser.rows[0].id;
        if (idPhoto != null) {
            //delete img from cloudinary
            const getId = yield pool.query("select * from photos where id = $1", [
                idPhoto,
            ]);
            yield (0, cloudinary_1.deleteImage)(getId.rows[0].public_id);
            // save the new photo
            if (f1) {
                const resUpload = yield (0, cloudinary_1.uploadImage)(f1.tempFilePath);
                const resPhoto = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [resUpload.secure_url, resUpload.public_id]);
                yield fs_extra_1.default.remove(f1.tempFilePath);
                const idPhoto = resPhoto.rows[0].id;
                //save in table user the id photo
                const resTableRelational = yield pool.query("update users set id_photo = $1 where id=$2 returning *", [idPhoto, idUser]);
                if (resTableRelational.rows.length === 0) {
                    return res.status(400).json({
                        message: "Not found",
                    });
                }
            }
            //delete data photos old
            const deletePhotoOfTable = yield pool.query("delete from photos where id = $1", [idPhoto]);
            if (deletePhotoOfTable.rowCount === 0)
                return res.status(400).json({
                    message: "Data Not found",
                });
            return res.status(200).json({
                operation: true,
            });
        }
        //the user haven't photo so... save the photo
        let f = (_b = req.files) === null || _b === void 0 ? void 0 : _b.url;
        if (f) {
            const resUpload = yield (0, cloudinary_1.uploadImage)(f.tempFilePath);
            const resPhoto = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [resUpload.secure_url, resUpload.public_id]);
            yield fs_extra_1.default.remove(f.tempFilePath);
            const idPhoto = resPhoto.rows[0].id;
            //save in table user the id photo
            const resTableRelational = yield pool.query("update users set id_photo = $1 where id=$2 returning *", [idPhoto, idUser]);
            if (resTableRelational.rows.length === 0) {
                return res.status(400).json({
                    message: "Not found",
                });
            }
            return res.status(200).json(resTableRelational.rows[0]);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updatePhotoUser = updatePhotoUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pool.query(`
      select u.email, u.id as id_usuario, u.url_photo as url from users u 
      where u.id = $1
        `, [id]);
        if (result.rows.length === 0)
            return res.status(400).json({
                message: "Data not found",
            });
        res.status(200).json(result.rows);
        //res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const sendEmailCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        //search user in database
        const resultUser = yield pool.query("select id from users where email = $1", [email]);
        if (resultUser.rows.length === 0) {
            return res.status(401).json({
                message: "the email doesnt exists",
            });
        }
        //save code in database
        const idUser = resultUser.rows[0].id;
        const resulAccountCode = yield pool.query("select id from accounts where user_id = $1", [idUser]);
        const secrect_password = Math.floor(Math.random() * 90000) + 10000;
        if (resultUser.rows.length === 0) {
            yield pool.query("insert into accounts (secret_password, id_user) values ($1, $2) returning *", [secrect_password, idUser]);
        }
        else {
            yield pool.query("update accounts set secret_password = $1 where id_user=$2 returning *", [secrect_password, idUser]);
        }
        // send mail with defined transport object
        let info = yield mailer_1.transporter.sendMail({
            from: `"Forgot password 👻" ${emailer.user}`,
            to: email,
            subject: "Fogot Password",
            html: `
      <p>Utiliza el siguiente codigo para cambiar la contraseña, la proxima trata de no olvidarla</p>
      <center><h2>${secrect_password}</h2></center>
      `, // html body
        });
        if (info.messageId) {
            return res.status(200).json({
                operation: true,
            });
        }
        return res.status(500);
    }
    catch (error) {
        next(error);
    }
});
exports.sendEmailCode = sendEmailCode;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, codeEmail } = req.body;
        const userQuery = yield pool.query("select id from users where email = $1", [email]);
        if (userQuery.rows.length === 0) {
            return res.status(404).json({
                message: "the email doesnt exists",
            });
        }
        const idUser = userQuery.rows[0].id;
        const searchCodeEmail = yield pool.query("select id from accounts where id_user = $1 and secret_password = $2", [idUser, codeEmail]);
        if (searchCodeEmail.rows.length === 0) {
            return res.status(404).json({
                message: "the code it's incorrect",
            });
        }
        const pass = yield passwordEncrypt(password);
        yield pool.query("update users set password = $1 where id=$2 returning *", [
            pass,
            idUser,
        ]);
        return res.status(200).json({
            operation: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
