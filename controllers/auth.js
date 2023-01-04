const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);
  //console.log(req.body);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
  // if (user)
};

module.exports = {
  signup: ctrlWrapper(signup),
};
