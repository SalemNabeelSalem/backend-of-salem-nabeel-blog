const db = require("../models/index.js");

const Tutorial = db.tutorials;

/** create a new tutorial */
exports.create = (req, res) => {
  /** validate the request */
  if (!req.body.title) {
    res.status(400).send({ message: "title can not be empty." });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({ message: "description can not be empty." });
    return;
  }

  /** create a new tutorial */
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
  });

  /** save tutorial in the database */
  tutorial
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "some error occurred while creating the tutorial.",
      });
    });
};

/** retrieve all tutorials */
exports.findAll = (req, res) => {
  /** retrieve all tutorials from the database */
  Tutorial.find()
    .then((tutorials) => {
      res.send(tutorials);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "some error occurred while retrieving tutorials.",
      });
    });
};

/** find a single tutorial with an id */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((tutorial) => {
      if (!tutorial) {
        res.status(404).send({ message: "tutorial not found with id: " + id });
      } else {
        res.send(tutorial);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "error retrieving tutorial with id: " + id,
      });
    });
};

/** retrieve all tutorials with a title containing the search term */
exports.findAllByTitle = (req, res) => {
  const title = req.params.title;

  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((tutorials) => {
      res.send(tutorials);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "some error occurred while retrieving tutorials.",
      });
    });
};

/** update a single tutorial with an id */
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((tutorial) => {
      if (!tutorial) {
        res.status(404).send({
          message: `cannot update tutorial with id = [${id}]. maybe tutorial was not found!`,
        });
      } else {
        res.send(tutorial);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "error updating tutorial with id = " + id,
      });
    });
};

/** delete a single tutorial with an id */
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((tutorial) => {
      if (!tutorial) {
        res.status(404).send({
          message: `cannot delete tutorial with id = [${id}]. maybe tutorial was not found!`,
        });
      } else {
        res.send({ message: "tutorial deleted successfully!" });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "could not delete tutorial with id = " + id,
      });
    });
};

/** delete all tutorials */
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((tutorials) => {
      res.send({
        message: `${tutorials.deletedCount} tutorials were deleted!`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "some error occurred while removing all tutorials.",
      });
    });
};
