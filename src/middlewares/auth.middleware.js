const jwt = require("jsonwebtoken");

function verifyJsonWebToken(req, res, next) {
  const token = req.headers["x-authorization"];

  if (!token) {
    // http status code 401: unauthorized
    res.status(401).send({ message: "no token provided." });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    // http status code 401: unauthorized
    res.status(401).send({ message: "invalid token." });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    // http status code 403: forbidden
    res.status(403).send({ message: "you are not authorized." });
    return;
  }

  next();
}

module.exports = {
  verifyJsonWebToken,
  isAdmin,
};
