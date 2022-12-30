const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.get("/test", (request, response) => {
//   response.send("<h2>Home page</h2>");
// });

module.exports = app;

// //для чего нужны мидлвары

// const moment = require("moment");
// const fs = require("fs/promises");
// const contacts = require("./models/contacts.json");
//const contacts = require("./routes/api/contacts");

// // 1. этот мидл вар подходит всем. здесь выполняется условие, и из-за некст идем далее
// app.use((req, res, next) => {
//   console.log("1 middle ware");
//   next();
// });

// //2. здесь выводим в лог имя метода, адрес и время запроса
// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("YYYY-MM-DD_hh:mm:ss");
//   await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
//   next();
// });

// app.get("/contacts", (req, res) => {
//   console.log(req.method);
//   console.log(req.url);
//   // res.send(contacts);
//   // res.send(contacts);
//   //const data = null;
//   //res.send(data);
//   // res.json(data);
//   res.json(contacts);
// });

// app.get("/products", (req, res) => {
//   res.json([]);
// });

// // 3. Здесь выводится ошибка - сообщение, если адрес не был найден.
// //сперва он проверяет все роуты и если ни один не подошел, тогда выполняется этот мидлвар

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// // 4. на этапе разработки позволяет выполнять кросс-доменные запросы
// //app.use(cors());
