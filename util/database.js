const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://Cathy-user:ilovepots@cluster0.j3a2v.mongodb.net/bloodDoc?retryWrites=true&w=majority'
  )
  .then( client => {
    console.log('Connected!');
    _db = client.db();                      // Store connection to the database in _db
    callback(client);
  })
  .catch(err => {
    console.log(err);
    throw err;
  });

};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;