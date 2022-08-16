const { isValidObjectId } = require("mongoose");
const recipes = require("../data-layer/controllers/recipes.controller");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const BaseError = require("../utils/errors/BaseError");
const InternalServerError = require("../utils/errors/InternalServerError");

const getAllRecipes = async (options) => {
  const { subCategory, q } = options;
  let filter = {};

  if (subCategory) {
    filter.subCategory = subCategory;
  }

  if (q) {
    filter["title"] = { $regex: q, $options: "i" };
  }

  const allRecipes = await recipes.read(filter);
  if (allRecipes.length === 0) {
    throw new NotFoundError("no recipes found!");
  }
  return allRecipes;
};

const getOneRecipe = async (id) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError(`id is not valid ObjectId`);
  }

  const res = await recipes.findById(id);
  if (!res) {
    throw new NotFoundError(`no recipe found with id ${id}!`);
  }
  return res;
};

const createRecipe = async (newRecipe) => {
  if (!newRecipe.title || !newRecipe.category || !newRecipe.subCategory) {
    throw new BaseError(500, `no recipe created`);
  }
  const res = await recipes.create(newRecipe);

  return res;
};

const updateRecipe = async (id, recipe) => {
  if (!recipe.title || !recipe.category || !recipe.subCategory) {
    throw new BadRequestError(
      `missing data -- title, category, or subCategory`
    );
  }
  const res = await recipes.update(id, recipe);

  return res;
};

const deleteRecipe = async (id) => {
  try {
    const res = await recipes.remove(id);
    return res;
  } catch (error) {
    throw new InternalServerError("Error deleting recipe");
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
