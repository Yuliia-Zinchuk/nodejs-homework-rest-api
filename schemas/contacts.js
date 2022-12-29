const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(3).email().required(),
  phone: Joi.number().required(),
});

module.exports = {
  addSchema,
};
