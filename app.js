
var express = require('express');

var app = express();


require('./middlewares')(app);


require('./routes')(app);


require('./services/errorHandler')(app);


module.exports = app;
