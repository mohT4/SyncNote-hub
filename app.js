const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log('MONGOOSE CONNECTED ...'));

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
