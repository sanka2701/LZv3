const mongoose = require("mongoose");
const databaseURL = process.env.MONGO_URL;

const connectDb = () => {
  return mongoose.connect(databaseURL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
};

module.exports = connectDb;
