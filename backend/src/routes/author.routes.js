const AuthorController = require("../controllers/author.controller");

const AuthorRoutes = require("express").Router();

/**
 * @swagger
 * /authors:
 *  post:
 *    tags:
 *      - author
 *    summary: create new author.
 *    description: create new author.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: AuthorRequest
 *        description: author input data.
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: author name.
 *              example: John Doe
 *            email:
 *              type: string
 *              description: author email.
 *              example: jhon_doe@gmail.com
 *    responses:
 *      200:
 *        description: A successful response
 */
AuthorRoutes.post("/", AuthorController.create);

/**
 * @swagger
 * /authors:
 *  get:
 *    tags:
 *      - author
 *    summary: retreive all authors
 *    description: retreive all authors
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A successful response
 */
AuthorRoutes.get("/", AuthorController.findAll);

module.exports = AuthorRoutes;
