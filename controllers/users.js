'use strict';

var model = require('../models/user');
var async = require("async");

function root(request, response) {
    response.render('user', {title: 'user'});
    //response.sendFile(__dirname, '../public/index.html');
}
function chat(request, response) {
    response.render('chat', {title: 'Chat'});
}

function newUser(request, response) {
    var params = request.body;
    var user = new model({username: params.username, password: params.password});
    user.save(function (error, document) {
        response.redirect('/');
    });
}

function message(user, userFriend, message, callback) {
    var variables = [user, userFriend, message];
    console.log('message variables', variables);
    async.parallel([
            function(next){
                saveMessage(user, userFriend, message , next)
            },
            function(next){
                saveMessage(userFriend, user, message , next)
            }
        ],
// optional callback
        function(err, results){
            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.
            console.log('async results:', results);
            callback(err, results);
        });
}


function saveMessage(user, userFriend, message , callback) {
    model.findOneAndUpdate({"username": user, "chats.username": userFriend}, {"$push": {"chats.$.messages": message}})
        .exec(function (err, response) {
            if (err) {
                console.log('err', err);
                callback(err);
            } else {
                console.log('response', response);
                callback(null, response);
            }
        });
}

function searchUser(request, response) {
    model.findOne({name: 'han'}, function (err, docs) {
        response.send()
    });
}

var controller = {
    new: newUser,
    root: root,
    chat: chat,
    searchUser: searchUser,
    message: message
};

module.exports = controller;


