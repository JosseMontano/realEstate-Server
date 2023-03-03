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
const cloudinary_1 = require("../libs/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
const pool = require("../db");
const getPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pool.query(`
    select * from photos where id = ${id}
      `);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Imagen not found",
            });
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
const createPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let f = (_a = req.files) === null || _a === void 0 ? void 0 : _a.url;
        if (f) {
            const resu = yield (0, cloudinary_1.uploadImage)(f.tempFilePath);
            const result = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [resu.secure_url, resu.public_id]);
            yield fs_extra_1.default.remove(f.tempFilePath);
            res.json(result.rows[0]);
        }
    }
    catch (error) {
        next(error);
    }
});
const deletePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getId = yield pool.query("select * from photos where id = $1", [id]);
        const result = yield pool.query("delete from photos where id = $1", [id]);
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Not found",
            });
        //fs.remove(result.public_id)
        yield (0, cloudinary_1.deleteImage)(getId.rows[0].public_id);
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
module.exports = {
    getPhoto,
    createPhoto,
    deletePhoto,
};
