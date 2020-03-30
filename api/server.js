const express = require('express');
const connectDb = require('./src/connection');
const cors = require('cors');
const polyfill = require('./src/utils/polyfill');

const userRouter = require('./src/routes/user');
const tagRouter = require('./src/routes/tag');
const placeRouter = require('./src/routes/place');
const potwRouter = require('./src/routes/potw');
const eventRouter = require('./src/routes/event');

const PORT = process.env.PORT || 8080;
const app = express();

polyfill();

app.use(cors());
app.use(express.static(process.env.UPLOADS_DIR));

app.use(express.json());

app.use(userRouter);
app.use(potwRouter);
app.use(eventRouter);
app.use(placeRouter);
app.use(tagRouter);
app.use(placeRouter);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  console.log(`Database Url ${process.env.MONGO_URL}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
