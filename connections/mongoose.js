/**
 * Created by rd-hc on 15/04/16.
 */
var mongoose = require('mongoose');
var uristring = 'mongodb://localhost/test';


// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

module.exports = mongoose;
