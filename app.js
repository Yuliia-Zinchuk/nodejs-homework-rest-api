const express = require("express");
const logger = require("morgan");
const cors = require("cors");

//const sgMail = require("@sendgrid/mail");
//const nodemailer = require("nodemailer");
//require("dotenv").config();

//const { SENDGRID_API_KEY } = process.env;
// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 25, 465, 2525
//   secure: true,
//   auth: {
//     user: "yuliia_zinchuk@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const email = {
//   // to: "cafis69792@prolug.com",
//   to: "yulochka16@gmai.com",
//   from: "yuliia_zinchuk@meta.ua",
//   subject: "Verify your mail",
//   html: `<p><strong>Please</strong> verify your email</p>`,
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

//---------sendGRID----------
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

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

//  hmsPY1D1WxmdpYJA  - password for user in project mongoDB
