var express = require("express");
var debug = require("debug")("shop-tree-backend:server");
var router = express.Router();

const AuthorizationMiddleware = require("../middlewares/authorization");

const { JWT } = require("jose");

// http://localhost:3000/uaa/login
// https://jwt.io/ya
router.post("/login", async function (req, res, next) {
  const usersCollection = req.database.collection("users");

  const { login, password } = req.body;

  const isEmail = login.includes("@");

  let userFound = null;
  if (isEmail) {
    userFound = await usersCollection.findOne({ email: login, password });
  } else {
    userFound = await usersCollection.findOne({ username: login, password });
  }

  delete userFound.password;

  const token = JWT.sign(userFound, "privateKey", {
    algorithm: "HS256",
    expiresIn: "1 hour",
    header: {
      typ: "JWT",
    },
  });

  // return object
  res.json({ user: userFound, token });

  // close connection
  req.db_connection.close();
});

router.get("/me", AuthorizationMiddleware, async function (req, res, next) {
  const { authorization } = req.headers;

  const user = JWT.decode(authorization);

  res.json({ user });
});

module.exports = router;
