const { isValidObjectId } = require("mongoose");
const recipes = require("../data-layer/controllers/recipes.controller");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const BaseError = require("../utils/errors/BaseError");

const getAllRecipes = async (options) => {
  const { subCategory } = options;
  let filter = {};

  if (subCategory) {
    filter = { subCategory: subCategory };
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

module.exports = { getAllRecipes, getOneRecipe, createRecipe };
