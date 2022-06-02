const AuthorController = require("../controllers/author.controller");

const AuthorRoutes = require("express").Router();

AuthorRoutes.post("/", AuthorController.create);

AuthorRoutes.get("/", AuthorController.findAll);

module.exports = AuthorRoutes;
