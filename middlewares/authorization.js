const debug = require("debug")("shop-tree-backend:server");

const { JWT, JWK } = require("jose");

const key = JWK.asKey("privateKey");

async function Authorization(req, res, next) {
  const { authorization } = req.headers;

  try {
    JWT.verify(authorization, key, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    next(error.message.toString());
  }

  next();
}

module.exports = Authorization;
