const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

//-----------------TOKEN------------

const { SECRET_KEY } = process.env;

// const payload = {
//   id: "63b5447e568b20b9fefcd87a",
// };

//console.log(token);

//const decodeToken = jwt.decode(token);
//console.log(decodeToken);

try {
  const invalidToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU0NDdlNTY4YjIwYjlmZWZjZDg3YSIsImlhdCI6MTY3MjgyODU2MSwiZXhwIjoxNjcyOTExMzYxfQ.5GR7vN2v6qrB8CiPbuvxeG1Tl4dscfO6eJK2hkU-t97";
  const result = jwt.verify(token, SECRET_KEY);
  //console.log(result);

  jwt.verify(invalidToken, SECRET_KEY);
} catch (error) {
  console.log(error.message);
}

//hashPassword("123456");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // const token = "12ths.dvdfdb.fbffbff";
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
};
