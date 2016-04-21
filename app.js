
//variable declaration
//libs
var express = require('express');
var app = express();
var url = require('url');
var stylus = require('stylus');
var session_register = require('./utils/session_register');
var bodyParser=require('body-parser');
var session = require('./models/session').session;
//var login = require('./models/session').login;

//proper
var auth = require('./models/session').checkAuth;
var users = require('./routes/user');
var comments = require('./routes/comments');
var group = require('./routes/group');
var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/home');

//engine set
app.set('views', 'views');
app.set('view engine', 'jade');


//routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(session_register);
app.use(session);
app.use('/signin', function(request, response){
        console.log('init data');
        response.render('login', {title:'user'}, function(err, html){
            response.send(html);
        })
});
app.use('/log',login);
app.use('/register',register);
app.use(auth);
app.use('/home', home);
app.use('/group', group);

var server  = app.listen(3000);
var io = require('./socket/socket.js')(server);














