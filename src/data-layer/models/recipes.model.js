const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Le titre est Obligatoire!"] },
  category: {
    type: String,
    required: [true, "La categorie est Obligatoire!"],
    enum: ["Breads", "Desserts", "Entries", "MainCourses"],
  },
  subCategory: {
    type: String,
    required: [true, "La sous-categorie est Obligatoire!"],
    enum: [
      "Dough",
      "Halots",
      "OthersBreads",
      "Cakes",
      "DessertsPlus",
      "Passover",
      "Pies",
      "CookedSalads",
      "FreshSalads",
      "Sauces",
      "Soups",
      "Chickens",
      "Dairies",
      "Fishes",
      "Holidays",
      "Meats",
      "Vegans",
    ],
  },
  cookingTime: { type: String, required: false, max: 6 },
  preparationTime: { type: String, required: false, max: 6 },
  numberOfPersons: { type: Number, required: false, min: 1, max: 50 },
  ingredients: { type: String, required: false },
  preparation: { type: String, required: false },
  cooking: { type: String, required: false },
  comments: { type: String, required: false },
  variations: { type: String, required: false },
  grades: { type: Number, required: false, min: 1, max: 5 },
  linkToOtherSite: { type: String, required: false },
  linkToPhoto: { type: String, required: false },
});

// recipeSchema.index({ title: "text" });

module.exports = mongoose.model("recipe", recipeSchema);
