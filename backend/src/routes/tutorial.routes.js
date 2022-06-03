const TutorialController = require("../controllers/tutorial.controller");

const TutorialRoutes = require("express").Router();

TutorialRoutes.post("/", TutorialController.create);

/**
 * @swagger
 * /tutorials:
 *  get:
 *    tags:
 *      - tutorial
 *    summary: retreive all tutorials
 *    description: retreive all tutorials
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A successful response
 */
TutorialRoutes.get("/", TutorialController.findAll);

TutorialRoutes.get("/:id", TutorialController.findOne);

TutorialRoutes.put("/:id", TutorialController.update);

TutorialRoutes.delete("/:id", TutorialController.delete);

TutorialRoutes.delete("/", TutorialController.deleteAll);

module.exports = TutorialRoutes;
