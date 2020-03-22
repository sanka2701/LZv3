const express = require('express');
const connectDb = require('./src/connection');
const cors = require('cors');

const userController = require('./src/controlers/user.controler');
const tagController = require('./src/controlers/tag.controler');
const placeController = require('./src/controlers/place.controler');
const potwController = require('./src/controlers/potw.controller');

const PORT = process.env.PORT || 80;
const app = express();

app.use(cors());
app.use(express.static(process.env.UPLOADS_DIR));

app.use(express.json());
app.use(userController);
app.use(tagController);
app.use(placeController);
app.use(potwController);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  console.log(`Database Url ${process.env.MONGO_URL}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
