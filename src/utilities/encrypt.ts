import { isModuleNamespaceObject } from "util/types";

const bcrypt = require("bcryptjs");

const passwordEncrypt = async (pass: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt);
  };

module.exports = {
    passwordEncrypt
}