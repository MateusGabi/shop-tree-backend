var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('shop-tree-backend:server');

// magic call to .env
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// import ConnectDB from "./middlewares/connectDB";
var ConnectDB = require("./middlewares/connectDB");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(ConnectDB)

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
