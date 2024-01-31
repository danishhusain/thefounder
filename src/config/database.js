const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/defaultdatabase';

main().then(() => console.log('db connected successfully..!!'))
  .catch(err => console.error('db not connected...!!!', err));

async function main() {
  await mongoose.connect(dbUrl);

  // Get the current database name
  const currentDbName = mongoose.connection.getClient().s.options.dbName;
  console.log('Current Database Name:', currentDbName);

  // Get all collection names in the current database
  const collections = await mongoose.connection.db.listCollections().toArray();

  // console.log('Collections in the current database:');
  // collections.forEach(collection => console.log(collection.name));


}

module.exports = {
  url: dbUrl,
  options: {
    serverSelectionTimeoutMS: 5000,
  },
};
