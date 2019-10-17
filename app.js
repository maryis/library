
var express = require('express');

var app = express();


require('./middlewares')(app);//call function (no need to set name of file, because it is index.js)


require('./routes')(app);//call func


require('./services/errorHandler')(app);


module.exports = app;
