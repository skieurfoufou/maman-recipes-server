const express = require("express");
const router = express.Router();
const recipeLogic = require("../business-logic/recipe.logic");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", async (req, res) => {
  const { subCategory, q } = req.query;
  try {
    const recipesRes = await recipeLogic.getAllRecipes({ subCategory, q });
    res.send(recipesRes);
  } catch (err) {
    res.status(err.status).send({ errors: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const recipeRes = await recipeLogic.getOneRecipe(id);
    res.send(recipeRes);
  } catch (err) {
    res.status(err.status).send({ errors: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const createRecipeRes = await recipeLogic.createRecipe(body);
    res.send(createRecipeRes);
  } catch (err) {
    res.status(err.status).send({ errors: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateRecipeRes = await recipeLogic.updateRecipe(id, body);
    res.send(updateRecipeRes);
  } catch (err) {
    res.status(err.status).send({ errors: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await recipeLogic.deleteRecipe(req.params.id);
    res.send({ success: true });
  } catch (err) {
    res.status(err.status).send({ errors: err.message });
  }
});

module.exports = router;
