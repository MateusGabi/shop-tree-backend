var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('shop-tree-backend:server');
var MongoClient = require('mongodb').MongoClient;

// magic call to .env
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/**
 * Middleware that creates a connection to MongoDB Atlas and injects a connection object
 * into the request object.
 */
function useMongoDB() {
    return async function (req, res, next) {
        let connection = null;
        try {
            connection = await MongoClient.connect(process.env.DATABASE_URL || DB_URL, { useUnifiedTopology: true })
        } catch (error) {
            throw new Error('Failed to connect to database.')
        }
        debug('Connected to database :)')
        req.db_connection = connection;
        req.database = connection.db('kitara');
        next()
    }
}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(useMongoDB())

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
