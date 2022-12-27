const nodemailer = require("nodemailer");
const { emailer } = require("../config");
// create reusable transporter object using the default SMTP transport
export let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: emailer.user, // generated ethereal user
    pass: emailer.pass, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("ready to send emails");
});
