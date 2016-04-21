'use strict';

var model = require('../models/user');

function root(request, response){
        response.render('user', {title:'user'});
        //response.sendFile(__dirname, '../public/index.html');
   }
function chat(request, response){
        response.render('chat', { title : 'Chat' });
    }

function newUser(request, response){
    var params = request.body;
    var user = new model({username:params.username, password:params.password});
    user.save(function(error, document){
        response.redirect('/');
    });
}

function searchUser(request, response){
        model.findOne({name:'han'}, function(err, docs){
            response.send( )
        });
    }

var controller = {
  new:newUser,
  root:root,
  chat:chat,
  searchUser:searchUser
};

module.exports = controller;