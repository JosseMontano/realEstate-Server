"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
module.exports = {
    methodDb1: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    },
    methodDbTwo: {
        databaseUrl: process.env.DATABASE_URL,
    },
    jwtEnv: {
        secret: process.env.JWT_SECRET
    },
    urlCors: {
        secret: process.env.CORS
    },
    server: {
        port: process.env.PORT
    }
};
