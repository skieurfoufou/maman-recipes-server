const express = require("express");
const router = express.Router();
const recipeLogic = require("../business-logic/recipe.logic");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", async (req, res) => {
  const { subCategory } = req.query;
  try {
    const recipesRes = await recipeLogic.getAllRecipes({ subCategory });
    res.send(recipesRes);
  } catch (err) {
    res.status(err.status || 500).send({ errors: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const recipeRes = await recipeLogic.getOneRecipe(id);
    res.send(recipeRes);
  } catch (err) {
    res.status(err.status || 500).send({ errors: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const createRecipeRes = await recipeLogic.createRecipe(body);
    res.send(createRecipeRes);
  } catch (err) {
    res.status(err.status || 500).send({ errors: err.message });
  }
});

module.exports = router;
