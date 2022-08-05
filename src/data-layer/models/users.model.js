const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "L'email est Obligatoire!"] },
  password: {
    type: String,
    required: [true, "le mot de passe est Obligatoire"],
    min: [4, "le mot de passe est trop court"],
  },
});

module.exports = mongoose.model("user", userSchema);
