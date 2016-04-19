'use strict';
var express = require('express');
var app = express();
app.use(express.static('public'));


var blocks = require('./routes/users');


app.use('/users', blocks);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});