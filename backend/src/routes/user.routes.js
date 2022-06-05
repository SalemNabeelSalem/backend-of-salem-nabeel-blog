const UserController = require("../controllers/user.controller");

const UserRoutes = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: user
 *   description: apis for user management.
 */

/**
 * @swagger
 * /users/register:
 *  post:
 *    tags: [user]
 *    summary: user registeration.
 *    description: user registeration.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: UserRegisterationRequest
 *        description: user registeration request.
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

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags: [user]
 *    summary: user login.
 *    description: user login.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: UserLoginRequest
 *        description: user login request.
 *        required: true
 *        schema:
 *          type: object
 *          properties:
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
UserRoutes.post("/login", UserController.login);

module.exports = UserRoutes;
