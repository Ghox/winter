'use strict';
var jwt = require('jsonwebtoken');
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
				console.log('document',document);
				if(document&&!err){
					var user = document.toJSON();

					if(user.password == params.password){
						request.session.user = user;
						var token = jwt.sign(user, 'jwtSecret', { expiresInMinutes: 60*60 });
						response.cookie('username', user.username);
						response.json(token);
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