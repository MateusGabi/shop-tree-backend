var express = require('express');
var debug = require('debug')('shop-tree-backend:server');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const usersCollection = req.database.collection('users');
  const usersArray = await usersCollection.find().toArray();

  // return object
  res.json({ users: usersArray });

  // close connection
  req.db_connection.close()
});

/* POST users creating */
router.post("/", async function (req, res, next) {

  const usersCollection = req.database.collection("users");

  const { email: userEmail, name: userName, username: userUserName, password: userPassword } = req.body;

  let userInsertion = null;
  try {
    userInsertion = await usersCollection.insertOne({ email: userEmail, name: userName, username: userUserName, password: userPassword })
  } catch (error) {
    res.json({ error }).status(501);
    next()
  }

  res.json({ message: "User created!" }).status(201);
})

module.exports = router;
