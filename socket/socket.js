module.exports = function (server) {

    var socketioJwt = require('socketio-jwt');
    var groupController = require('../controllers/group');
    var userController = require('../controllers/users');
    var io = require('socket.io').listen(server);

    var users = {};
    var userList = [];

    function getUser(username){
        return userList.filter(function (elem) {
            if (elem === username) {
                return true;
            }
        })[0];
    }

    function deleteUser(username){
        delete users[username];
        var index = userList.indexOf(username);
        userList.splice(index, 1);
    }


    io.set('authorization', socketioJwt.authorize({
            secret: 'jwtSecret',
            handshake: true
        }
    ));

    io.use(function (socket, next) {
        var username = socket.handshake.query.username;
        console.log('username', username);
        if (!username) {
            console.log('Not authorized');
            return next(new Error('Not authorized'));
        }

        var user = getUser(username);
        if (!user) {
            userList.push(socket.handshake.query.username);
        }
        socket.username = username;
        users[socket.handshake.query.username] = socket.id;
        socket.broadcast.emit('connect_user', username);
        next();
    });

    io.on('connection', function (client) {
        console.log('user '+client.username+' connected to socket io');
        client.emit('users', userList);

        //io.sockets.connected[client.id].emit('message', 'for your eyes only');

        client.on('message', function (message) {

            groupController.message(message, function (err) {
                if (err) {
                    //response.status(500).send({error:'failed to save message'});
                    client.emit('message', 'error' + ' : message ' + message.data + ' was not sent');
                } else {
                    client.emit('message', 'you' + ' : ' + message.data, message.groupId);
                    client.broadcast.to(message.groupId).broadcast.emit('message', message.username + ' : ' + message.data, message.groupId);
                    //client.broadcast.emit('message', message.username + ' : ' + message.data, groupId);
                }
            });
        });

        client.on('private_message', function (request) {
            var userId = users[request.receiver];
            if (userId) {
            var message = {
                message:request.data,
                username:request.sender
            };
            userController.message(client.username, request.receiver, message, function(err, response){
                if (err) {
                    client.emit('private_message', 'error' + ' : message ' + message.message + ' was not sent');
                } else {
                    client.emit('private_message', 'you' + ' : ' + message.message);
                    io.sockets.connected[userId].emit('private_message', request.sender + ' : ' + message.message);
                }
            });
            } else {
                client.emit('private_message', 'error' + ' : message ' + request.data + ' was not sent');
            }
        });

        client.on('disconnect', function (event) {
            console.log('user '+client.username+' disconnected from socket io')
            var username = client.username;
            deleteUser(username);
            client.broadcast.emit('disconnect_user', username);
        });

        client.on('join', function (clientName, groupId) {
            client.join(groupId);
            client.broadcast.to(groupId).broadcast.emit('message', clientName + ': joined the room', groupId);
        });


    });

    return io;


};

