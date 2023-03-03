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
const pool = require("../db");
const bcrypt = require("bcryptjs");
const validatePassword = (pass, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query("select id, username, email, password from users where email = $1", [email]);
    return bcrypt.compare(pass, result.rows[0].password);
});
module.exports = {
    validatePassword
};
