var mongoose = require('../connections/mongoose');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var defaultSession = require('../variables/session').defaultSession;


function checkAuth (req, res, next) {
	console.log('auth', req.session);

    if(req.session && req.session.user){
        next();
    }else {
        res.redirect('/signin');
    }
}

function session(){
    var store = new mongoStore({ mongooseConnection: mongoose.connection });
    return new  defaultSession(store);
}


var model ={
    checkAuth:checkAuth,
    session:expressSession(session())
};

module.exports = model;