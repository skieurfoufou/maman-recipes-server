const { isTokenValid } = require("../business-logic/auth.logic");

const authMiddleware = (req, res, next) => {
  if (!isTokenValid(req.headers.authorization)) {
    res.status(403).json({ message: "Token not valid" });
    return;
  }
  next();
};

module.exports = authMiddleware;
