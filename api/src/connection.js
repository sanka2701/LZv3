const mongoose = require("mongoose");

const User = require("./User.model");

const connection = "mongodb://mongo:27017/liptov-zije";

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
