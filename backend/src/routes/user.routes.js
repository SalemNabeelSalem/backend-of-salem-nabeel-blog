const UserController = require("../controllers/user.controller");

const UserRoutes = require("express").Router();

/**
 * @swagger
 * /users/register:
 *  post:
 *    tags:
 *      - user
 *    summary: create new user.
 *    description: create new user.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: UserRequest
 *        description: user input data.
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            full_name:
 *              type: string
 *              description: user full name.
 *              example: john doe
 *            email:
 *              type: string
 *              description: user email address.
 *              example: jhon_doe@gmail.com
 *            password:
 *              type: string
 *              description: user password.
 *              example: 12345678
 *    responses:
 *      200:
 *        description: A successful response
 */
UserRoutes.post("/register", UserController.registre);

UserRoutes.post("/login", UserController.login);

module.exports = UserRoutes;
