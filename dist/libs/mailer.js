"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
const { emailer } = require("../config");
// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: emailer.user,
        pass: emailer.pass, // generated ethereal password
    },
});
exports.transporter.verify().then(() => {
    console.log("ready to send emails");
});
