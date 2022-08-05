const users = require("../data-layer/controllers/users.controller");
const { isValidEmail } = require("../utils/email");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");

const getUserByEmail = async (email) => {
  if (!isValidEmail(email)) {
    throw new BadRequestError(`email is not valid email`);
  }

  const res = await users.readOne({ email });
  if (!res) {
    throw new NotFoundError(`no user found with email ${email}!`);
  }
  return res;
};

module.exports = { getUserByEmail };
