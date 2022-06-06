const UserModel = require("../models/user.model");

const {
  UserSchemaValidationWhenRegister,
  UserSchemaValidationWhenLogin,
} = require("../validations/user.validation");

const { generateJsonWebToken } = require("../utils/jwt.util");

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

  let userRegisterRequest = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
  };

  let userRegisterValidated =
    UserSchemaValidationWhenRegister.validate(userRegisterRequest);

  if (userRegisterValidated.error) {
    // http status code 400: bad request
    res
      .status(400)
      .send({ message: userRegisterValidated.error.details[0].message });
    return;
  }

  /** blueprint for a new user */
  const user = new UserModel({
    full_name: userRegisterValidated.value.full_name,
    email: userRegisterValidated.value.email,
    password: userRegisterValidated.value.password,
  });

  const userExist = await UserModel.findOne({
    email: userRegisterValidated.value.email,
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

  // 10 is the number of rounds to use for the hashing algorithm
  const salt = await bycript.genSalt(10);

  // hashedPassword is the password after hashing
  const hashedPassword = await bycript.hash(user.password, salt);

  user.password = hashedPassword;

  // const decryptedPassword = await bycript.compare("12345", hashedPassword);

  /** save user in the database */
  await user
    .save()
    .then((data) => {
      // exclude password from the response
      data.password = undefined;

      // generate jwt token
      const token = generateJsonWebToken(data);

      // http status code 201: created
      res.status(201).header("x-authorization", token).send({
        message: "user created successfully.",
        data: data,
      });
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message || "some error occurred while creating the user.",
      });
    });
};

exports.login = async (req, res) => {
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

  let userLoginRequest = {
    email: req.body.email,
    password: req.body.password,
  };

  let userLoginValidated =
    UserSchemaValidationWhenLogin.validate(userLoginRequest);

  if (userLoginValidated.error) {
    // http status code 400: bad request
    res
      .status(400)
      .send({ message: userLoginValidated.error.details[0].message });
    return;
  }

  const user = await UserModel.findOne({
    email: userLoginValidated.value.email,
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

  if (!user) {
    // http status code 400: bad request
    res
      .status(400)
      .send({ message: "the user does not exist, please register." });
    return;
  }

  // compare the password
  const isPasswordMatched = await bycript.compare(
    userLoginValidated.value.password,
    user.password
  );

  if (!isPasswordMatched) {
    // http status code 400: bad request
    res.status(400).send({ message: "password is incorrect." });
    return;
  }

  // generate jwt token
  const token = generateJsonWebToken(user);

  res.header("x-authorization", token).send({
    message: "user logged in successfully.",
    token: token,
  });
};
