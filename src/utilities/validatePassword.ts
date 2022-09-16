const pool = require("../db");
const bcrypt = require("bcryptjs");

const validatePassword = async (pass: string, email: string) => {
    const result = await pool.query(
      "select id, username, email, password from users where email = $1",
      [email]
    );
    return bcrypt.compare(pass, result.rows[0].password);
  };

module.exports = {
    validatePassword
}