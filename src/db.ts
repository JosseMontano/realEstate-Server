import { Pool } from "pg";
const {db} = require('./config')

/* local
const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
});*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

module.exports = pool;
