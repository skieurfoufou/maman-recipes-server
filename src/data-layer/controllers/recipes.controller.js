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

async function update(id, data) {
  return await recipeModel.findByIdAndUpdate(id, data);
}

async function remove(id) {
  return await recipeModel.findByIdAndDelete(id);
}

module.exports = {
  read,
  readOne,
  create,
  update,
  remove,
  findById,
};
