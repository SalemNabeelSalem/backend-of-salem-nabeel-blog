const jwt = require("jsonwebtoken");

function generateJsonWebToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
}

module.exports = {
  generateJsonWebToken,
};
