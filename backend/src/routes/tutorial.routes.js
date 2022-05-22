const TutorialController = require("../controllers/tutorial.controller.js");

const TutorialRoutes = require("express").Router();

TutorialRoutes.post("/", TutorialController.create);

TutorialRoutes.get("/", TutorialController.findAll);

TutorialRoutes.get("/:id", TutorialController.findOne);

TutorialRoutes.put("/:id", TutorialController.update);

TutorialRoutes.delete("/:id", TutorialController.delete);

TutorialRoutes.delete("/", TutorialController.deleteAll);

module.exports = TutorialRoutes;
