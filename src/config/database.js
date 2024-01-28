// config/database.js

const mongoose = require('mongoose');
require('dotenv').config();



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/defaultdatabase';

main().then(res => console.log("db connected successfully..!!",))
main().catch(err => console.log("db not connected...!!!", err));


async function main() {
  await mongoose.connect(dbUrl);
  // Get the current database name
  const currentDbName = mongoose.connection.getClient().s.options.dbName;
  console.log('Current Database Name:', currentDbName);

}




module.exports = {
  url: dbUrl,
  options: {
    serverSelectionTimeoutMS: 5000,
  },
};
