const ProtectedRoutes = require("express").Router();

const {
  verifyJsonWebToken,
  isAdmin,
} = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: protected
 *   description: apis that require authentication.
 */

/**
 * @swagger
 * /dashboard:
 *  get:
 *    tags: [protected]
 *    security:
 *      - bearerAuth: []
 *    summary: access to dashboard.
 *    description: access to dashboard.
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A successful response
 */
ProtectedRoutes.get("/dashboard", [verifyJsonWebToken, isAdmin], (req, res) => {
  res.json({ message: "this is a dashboard." }).status(200);
});

module.exports = ProtectedRoutes;
