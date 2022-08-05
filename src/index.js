const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const env = require("./utils/env");
const db = require("./data-layer/db");
const recipeRouter = require("./routes/recipe.router");
const authMiddleware = require("./middlewares/auth.middleware");
const { login } = require("./business-logic/auth.logic");

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API RecipeOfSabine" });
});

app.all("/healthz", (req, res) => {
  res.status(200).send();
});

app.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const token = await login(password, email);
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(error.status).json({ message: error.message });
  }
});

// Routers
app.use("/recipes", recipeRouter);

app.listen(env.PORT, async () => {
  await db.connect();
  console.log(`Server is running on port ${env.PORT}.`);
});
