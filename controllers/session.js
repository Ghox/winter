'use strict';

var userModel = require('../models/user');

function init(request, response){
	console.log('init page');
	response.render('login', {title:'user'}, function(err, html){
		response.send(html);
	});
}

function login(request, response){


	var params = request.body;
	userModel.findOne({'username':params.username})
			.exec( function(err, document){
				if(document&&!err){
					var user = document.toJSON();
					if(user.password == params.password){
						request.session.user = user;
						//response.writeHead({'Set-Cookie': 'mycookie=test', 'Location':'/home'});
						response.cookie('username', user.username);
						response.redirect('/home');
						//response.end();
					}else{
						response.redirect('/signin');
					}
				}else{
					response.redirect('/signin');
				}
			});
}

function logout(request, response){
	var session = request.session;
	session.destroy(function(){
		response.redirect('/');
	});
}


var controller={
	init:init,
	login:login,
	logout:logout
};

module.exports = controller;