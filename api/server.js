const express = require('express');
const connectDb = require('./src/connection');
const userRouter = require('./src/routers/user.router');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  console.log(`Database Url ${process.env.MONGO_URL}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
