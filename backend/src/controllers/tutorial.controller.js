const TutorialModel = require("../models/tutorial.model");

/** create a new tutorial */
exports.create = (req, res) => {
  /** validate the request */
  if (!req.body.title) {
    // http status code 400: bad request
    res.status(400).send({ message: "title can not be empty." });
    return;
  }

  if (!req.body.description) {
    // http status code 400: bad request
    res.status(400).send({ message: "description can not be empty." });
    return;
  }

  if (!req.body.section) {
    // http status code 400: bad request
    res.status(400).send({ message: "section can not be empty." });
    return;
  }

  /** blueprint for a new tutorial */
  const tutorial = new TutorialModel({
    title: req.body.title,
    description: req.body.description,
    section: req.body.section,
  });

  /** save tutorial in the database */
  tutorial
    .save()
    .then((data) => {
      // http status code 200: ok
      res.send(data);
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message || "some error occurred while creating the tutorial.",
      });
    });
};

/** retrieve all tutorials */
exports.findAll = (req, res) => {
  let title = req.query.title;

  /** retrieve all tutorials with a title containing the search term */
  if (title) {
    let condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    TutorialModel.find(condition)
      .sort({ created_at: -1 }) // -1 for descending order
      .select("id title description section created_at") // select only the fields that we need
      .then((tutorials) => {
        // http status code 200: ok
        res.send(tutorials);
      })
      .catch((error) => {
        // http status code 500: internal server error
        res.status(500).send({
          message:
            error.message || "some error occurred while retrieving tutorials.",
        });
      });
  } else {
    /**
     * .find(age: { $gt: 18 }) // greater than 18
     * .find(age: { $gte: 18 }) // greater than or equal to 18
     * .find(age: { $lt: 18 }) // less than 18
     * .find(age: { $lte: 18 }) // less than or equal to 18
     * .find(age: { $eq: 18 }) // equal to 18
     * .find(age: { $ne: 18 }) // not equal to 18
     * .find(age: { $in: [18, 19, 20] }) // in the array
     * .find(age: { $nin: [18, 19, 20] }) // not in the array
     * */

    /** retrieve all tutorials from the database */
    TutorialModel.find()
      .sort({ created_at: -1 }) // -1 for descending order
      .select("id title description section created_at") // select only the fields that we need
      .then((tutorials) => {
        // http status code 200: ok
        res.send({
          count: tutorials.length,
          tutorials,
        });
      })
      .catch((error) => {
        // http status code 500: internal server error
        res.status(500).send({
          message:
            error.message || "some error occurred while retrieving tutorials.",
        });
      });
  }
};

/** find a single tutorial with an id */
exports.findOne = (req, res) => {
  const id = req.params.id;

  TutorialModel.findById(id)
    .then((tutorial) => {
      if (!tutorial) {
        // http status code 404: not found
        res.status(404).send({ message: "tutorial not found with id: " + id });
      } else {
        // http status code 200: ok
        res.send(tutorial);
      }
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message: error.message || "error retrieving tutorial with id: " + id,
      });
    });
};

/** update a single tutorial with an id */
exports.update = (req, res) => {
  if (!req.body) {
    // http status code 400: bad request
    res.status(400).send({
      message: "content can not be empty!",
    });
  }

  const id = req.params.id;

  TutorialModel.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      section: req.body.section,
    },
    {
      useFindAndModify: false, // this is to avoid deprecation warning
      new: true, // return the updated tutorial
    }
  )
    .then((tutorial) => {
      if (!tutorial) {
        // http status code 404: not found
        res.status(404).send({
          message: `cannot update tutorial with id = [${id}]. maybe tutorial was not found!`,
        });
      } else {
        // http status code 200: ok
        res.send(tutorial);
      }
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message: error.message || "error updating tutorial with id = " + id,
      });
    });
};

/** delete a single tutorial with an id */
exports.delete = (req, res) => {
  const id = req.params.id;

  TutorialModel.findByIdAndRemove(id)
    .then((tutorial) => {
      if (!tutorial) {
        // http status code 404: not found
        res.status(404).send({
          message: `cannot delete tutorial with id = [${id}]. maybe tutorial was not found!`,
        });
      } else {
        // http status code 200: ok
        res.send({
          message: `tutorial with id = [${id}] was deleted successfully!`,
        });
      }
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message: error.message || "could not delete tutorial with id = " + id,
      });
    });
};

/** delete all tutorials */
exports.deleteAll = (req, res) => {
  TutorialModel.deleteMany({})
    .then((tutorials) => {
      if (tutorials.deletedCount > 0) {
        // http status code 200: ok
        res.send({
          message: `${tutorials.deletedCount} tutorials were deleted successfully!`,
        });
      } else {
        // http status code 404: not found
        res.status(404).send({
          message: `no tutorials to delete!`,
        });
      }
    })
    .catch((error) => {
      // http status code 500: internal server error
      res.status(500).send({
        message:
          error.message || "some error occurred while removing all tutorials.",
      });
    });
};
