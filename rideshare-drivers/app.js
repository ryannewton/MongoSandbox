const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if(false && process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost/rideshare-drivers');
}

app.use(bodyParser.json());
routes(app);

module.exports = app;
