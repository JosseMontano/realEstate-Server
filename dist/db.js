"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { methodDb1, methodDbTwo } = require("./config");
//method 1 to connect to postgres (dev)
const pool = new pg_1.Pool({
    user: methodDb1.user,
    password: methodDb1.password,
    host: methodDb1.host,
    port: methodDb1.port,
    database: methodDb1.database,
});
//method 2 to connect to postgres (production)
/* const pool = new Pool({
  connectionString: methodDbTwo.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
}); */
module.exports = pool;
