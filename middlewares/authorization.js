const debug = require("debug")("shop-tree-backend:server");

const { JWT } = require("jose");

async function Authorization(req, res, next) {
  const { authorization } = req.headers;

  try {
    JWT.verify(authorization, "privateKey", {
      algorithms: ["HS256"],
    });
  } catch (error) {
    next(error.message.toString());
  }

  next();
}

module.exports = Authorization;
