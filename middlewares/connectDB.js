
var debug = require('debug')('shop-tree-backend:server');
var MongoClient = require('mongodb').MongoClient;

/**
 * Middleware that creates a connection to MongoDB Atlas and injects a connection object
 * into the request object.
 */
async function ConnectDB(req, res, next) {
    let connection = null;
    try {
        connection = await MongoClient.connect(process.env.DATABASE_URL || "", { useUnifiedTopology: true })
    } catch (error) {
        next(new Error('Failed to connect to database.'))
    }

    debug('Connected to database :)')
    req.db_connection = connection;
    req.database = connection.db('kitara');
    next();
}

module.exports = ConnectDB;