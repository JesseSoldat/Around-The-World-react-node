require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pick = require('lodash').pick;

const { mongoose } = require('./db/database');

const PORT = 5000;
const app = express();

app.use(bodyParser.json());

require('./routes/authRoutes')(app, pick);


app.get('*', (req, res) => {
  res.send('Servers got your back');
});

app.listen(PORT, () => {
  console.log(`API Server is running on port: ${PORT}`);
  
});