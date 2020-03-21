const mongoose = require("mongoose");

const User = require("./models/User.model");

const databaseURL = process.env.MONGO_URL;

const connectDb = () => {
  return mongoose.connect(databaseURL,  { useNewUrlParser: true });
};

module.exports = connectDb;
