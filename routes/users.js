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

module.exports = router;
