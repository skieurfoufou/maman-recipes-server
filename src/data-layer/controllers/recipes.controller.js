const recipeModel = require("../models/recipes.model");

async function read(filter, proj) {
  return await recipeModel.find(filter, proj);
}

async function readOne(filter, proj) {
  return await recipeModel.findOne(filter, proj);
}

async function findById(id) {
  const res = await recipeModel.findById(id);
  return res;
}

async function create(newRecipe) {
  return await recipeModel.create(newRecipe);
}

async function update(id, updateFlight) {
  return await recipeModel.findByIdAndUpdate(id, updateFlight);
}

async function del(id) {
  return await recipeModel.delete(id);
}

module.exports = {
  read,
  readOne,
  create,
  update,
  delete: del,
  findById,
};
