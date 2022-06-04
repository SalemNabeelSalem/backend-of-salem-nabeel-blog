const Joi = require("joi");

const UserSchemaValidationWhenRegister = Joi.object({
  full_name: Joi.string().trim().min(5).max(25).required(),

  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string()
    .trim()
    .min(5)
    .max(15)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const UserSchemaValidationWhenLogin = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string()
    .trim()
    .min(5)
    .max(15)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

module.exports = {
  UserSchemaValidationWhenRegister,
  UserSchemaValidationWhenLogin,
};
