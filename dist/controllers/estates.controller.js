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
const pool = require("../db");
const getAllEstates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query("select * from estate");
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
const getEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //validar que el id sea entero
    try {
        const { id } = req.params;
        const result = yield pool.query("select * from estate where id = $1", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        res.json(result.rows[0]);
        //res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
const createEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const result = yield pool.query("insert into estate (title, description) values ($1, $2) returning *", [title, description]);
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
        //es better send a 500
    }
});
const deleteEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pool.query("delete from estate where id = $1", [id]);
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Not found",
            });
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
const updateEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = yield pool.query("update estate set title=$1, description=$2 where id=$3 returning *", [title, description, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        /*  console.log(result) */
        return res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
});
module.exports = {
    getAllEstates,
    getEstate,
    createEstate,
    deleteEstate,
    updateEstate,
};
