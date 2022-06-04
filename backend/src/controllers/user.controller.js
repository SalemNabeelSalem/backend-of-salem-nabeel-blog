const UserSchemaValidationWhenCreate = require("../middleware/user.validation");
const UserModel = require("../models/user.model");

exports.registre = (req, res) => {
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

  let userValidated = UserSchemaValidationWhenCreate.validate(userRequest);

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

  /** save user in the database */
  user
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
