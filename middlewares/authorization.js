const debug = require("debug")("shop-tree-backend:server");

const { jwtVerify } = require("jose");

const secret = new TextEncoder().encode("privateKey");

async function Authorization(req, res, next) {
  const { authorization } = req.headers;

  try {
    await jwtVerify(authorization, secret);
  } catch (error) {
    next(error.message.toString());
  }

  next();
}

module.exports = Authorization;
