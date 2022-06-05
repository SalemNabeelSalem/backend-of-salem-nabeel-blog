const jwt = require("jsonwebtoken");

function generateJsonWebToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
}

function verifyJsonWebToken(req, res, next) {
  const token = req.headers("x-authorization");

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

module.exports = generateJsonWebToken;
