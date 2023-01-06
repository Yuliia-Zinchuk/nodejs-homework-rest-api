const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: "yuliia_zinchuk@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "yuliia_zinchuk@meta.ua",
  };

  await transport
    .sendMail(email)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;

//---------sendGRID----------
// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "cafis69792@prolug.com",
//   // to: "yulochka16@gmai.com",
//   from: "yuliya_zinchuk@icloud.com",
//   subject: "Verify your mail",
//   html: `<p><strong>Please</strong> verify your email</p>`,
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
