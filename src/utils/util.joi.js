const Joi = require("joi");

const UserSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),

  address: Joi.string().required(),

  age: Joi.number().integer().min(18).max(100).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string()
    .min(5)
    .max(10)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

let userData = {
  fullName: "John Doe",
  address: "123 Main Street",
  age: 20,
  email: "john_doe@gmail.com",
  password: "123456789",
};

const UserSchemaValidation = UserSchema.validate(userData);

if (UserSchemaValidation.error) {
  let errorMessage = UserSchemaValidation.error["details"][0]["message"];

  console.log(errorMessage);
} else {
  console.log("user schema is valid.");
}
