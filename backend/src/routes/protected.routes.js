const ProtectedRoutes = require("express").Router();

const { verifyJsonWebToken } = require("../middlewares/jwt.validation");

/**
 * @swagger
 * tags:
 *   name: protected
 *   description: apis that require authentication.
 */

/**
 * @swagger
 * /protected:
 *  get:
 *    tags: [protected]
 *    security:
 *      - bearerAuth: []
 *    summary: access to protected resources
 *    description: access to protected resources
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A successful response
 */
ProtectedRoutes.get("/protected", verifyJsonWebToken, (req, res) => {
  res.json({ message: "access to protected resources" }).status(200);
});

module.exports = ProtectedRoutes;
