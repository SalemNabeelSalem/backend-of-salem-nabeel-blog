module.exports = (app) => {
  const tutorial = require("../controllers/tutorial.controller.js");

  let router = require("express").Router();

  router.post("/", tutorial.create);

  router.get("/", tutorial.findAll);

  router.get("/:id", tutorial.findOne);

  router.get("/:title", tutorial.findAllByTitle);

  router.put("/:id", tutorial.update);

  router.delete("/:id", tutorial.delete);

  router.delete("/", tutorial.deleteAll);

  app.use("/api/tutorial", router);
};
