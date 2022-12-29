const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const getAll = async (req, res) => {
  // res.json({ message: "template message" });
  //res.send(contactsData);
  //  try {
  const result = await contacts.listContacts();
  res.json(result);
  // } catch (error) {
  //  next(error);
  // res.status(500).json({ message: error.message });
  // }
};

const getById = async (req, res) => {
  // try {
  const { id } = req.params;
  // console.log(req.params);
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
    // const error = new Error("Not found");
    // error.status = 404;
    // throw error;

    // return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
  // } catch (error) {
  // next(error);
  // const { status = 500, message = "Server error" } = error;
  // res.status(status).json({ message });
  // }
};

const add = async (req, res) => {
  // try {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message);
  //   }
  //console.log(error);
  const { name, email, phone } = req.body;
  const result = await contacts.addContact(name, email, phone);
  res.status(201).json(result);
  // console.log(req.body);
  // } catch (error) {
  // next(error);
  // }
};

const updateById = async (req, res) => {
  // try {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message);
  //   }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
  // } catch (error) {
  // next(error);
  // }
};

const deleteById = async (req, res) => {
  //  try {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
  // } catch (error) {
  // next(error);
  // }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
