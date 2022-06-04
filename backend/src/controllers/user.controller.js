const UserModel = require("../models/user.model");

const {
  UserSchemaValidationWhenRegister,
  UserSchemaValidationWhenLogin,
} = require("../middleware/user.validation");

const bycript = require("bcryptjs");

exports.registre = async (req, res) => {
  if (!req.body.full_name) {
    // http status code 400: bad request
    res.status(400).send({ message: "full_name can not be empty." });
    return;
  }

  if (!req.body.email) {
    // http status code 400: bad request
    res.status(400).send({ message: "email can not be empty." });
    return;
  }

  if (!req.body.password) {
    // http status code 400: bad request
    res.status(400).send({ message: "password can not be empty." });
    return;
  }

  let userRequest = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
  };

  let userValidated = UserSchemaValidationWhenRegister.validate(userRequest);

  if (userValidated.error) {
    // http status code 400: bad request
    res.status(400).send({ message: userValidated.error.details[0].message });
    return;
  }

  /** blueprint for a new user */
  const user = new UserModel({
    full_name: userValidated.value.full_name,
    email: userValidated.value.email,
    password: userValidated.value.password,
  });

  const userExist = await UserModel.findOne({
    email: userValidated.value.email,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message ||
          "some error occurred while finding the user by email address.",
      });
    });

  if (userExist) {
    // http status code 400: bad request
    res.status(400).send({ message: "user already exist." });
    return;
  }

  // hash the password
  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(user.password, salt);

  user.password = hashedPassword;

  // const decryptedPassword = await bycript.compare("12345", hashedPassword);

  /** save user in the database */
  await user
    .save()
    .then((data) => {
      // exclude password from the response
      data.password = undefined;

      // http status code 200: ok
      res.send(data);
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message || "some error occurred while creating the user.",
      });
    });
};
