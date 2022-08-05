const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("../utils/env");
const { getUserByEmail } = require("./user.logic");
const BadRequestError = require("../utils/errors/BadRequestError");

async function login(password, email) {
  const user = await getUserByEmail(email);
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    throw new BadRequestError("Invalid Credentials");
  }
  return createJwtToken({ email });
}

function createJwtToken({ email }) {
  const accessToken = jwt.sign(
    {
      email: email,
    },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return accessToken;
}

function isTokenValid(bearerToken) {
  // ? remove the 'Bearer '
  const jwtToken = bearerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(jwtToken, env.JWT_SECRET);
    if (Date.now() >= decoded.exp * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { isTokenValid, login };
