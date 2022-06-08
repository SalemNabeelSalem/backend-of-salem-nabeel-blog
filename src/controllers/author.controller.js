const AuthorModel = require("../models/author.model");

exports.create = (req, res) => {
  if (!req.body.name) {
    // http status code 400: bad request
    res.status(400).send({ message: "name can not be empty." });
    return;
  }

  if (!req.body.email) {
    // http status code 400: bad request
    res.status(400).send({ message: "email can not be empty." });
    return;
  }

  /** blueprint for a new author */
  const author = new AuthorModel({
    name: req.body.name,
    email: req.body.email,
  });

  /** save author in the database */
  author
    .save()
    .then((data) => {
      // http status code 201: created
      res.status(201).send({
        message: "author created successfully.",
        data: data,
      });
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message || "some error occurred while creating the author.",
      });
    });
};

exports.findAll = (req, res) => {
  // TODO: try to use pagination when fetching all authors

  /** retrieve all authors from the database */
  AuthorModel.find()
    .sort({ created_at: -1 }) // -1 for descending order
    .then((authors) => {
      // http status code 200: ok
      res.send({
        count: authors.length,
        authors: authors,
      });
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message || "some error occurred while retrieving authors.",
      });
    });
};
