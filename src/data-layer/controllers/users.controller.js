const userModel = require("../models/users.model");

async function read(filter, proj) {
  return await userModel.find(filter, proj);
}

async function readOne(filter, proj) {
  return await userModel.findOne(filter, proj);
}

async function findById(id) {
  const res = await userModel.findById(id);
  return res;
}

module.exports = {
  read,
  readOne,
  findById,
};
