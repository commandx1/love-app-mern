const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@${process.env.clusterName}.r5ftb24.mongodb.net/customer?retryWrites=true&w=majority`;
const adminDB = mongoose.createConnection(mongoString);

const dbSchema = new mongoose.Schema({
    db_name: String,
});

const CustomerDb = adminDB.model('db_1', dbSchema);

module.exports = CustomerDb;
