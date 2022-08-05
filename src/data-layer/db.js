const mongoose = require("mongoose");
const env = require("../utils/env");

exports.connect = async () => {
  try {
    await mongoose.connect(env.MONGO_URL, {
      useNewUrlParser: true,
    });

    console.log("Mongodb is Connected!");
  } catch (err) {
    console.error("[ERROR] Mongodb: ", err);
    console.log("[ERROR] Mongoose: ", err);
  }
};
