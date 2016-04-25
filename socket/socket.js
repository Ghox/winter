module.exports = function (server) {

    var socketioJwt = require('socketio-jwt');
    var groupController = require('../controllers/group');
    var io = require('socket.io').listen(server);

    var users = {};
    var userList = [];

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

        var user = userList.filter(function(elem){ if(elem===username){ return true;}})[0];
        if(!user){
            userList.push(socket.handshake.query.username);
        }
        users[socket.handshake.query.username] = socket.id;

        next();
    });

    io.on('connection', function (client) {

        client.emit('users', userList);

        console.log(client.id);

        io.sockets.connected[client.id].emit('message', 'for your eyes only');

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

        client.on('private_message', function (message) {
                console.log(message);
                var userId = users[message.receiver];
                if(userId){
                    client.emit('private_message', 'you' + ' : ' + message.data);
                    io.sockets.connected[userId].emit('private_message',message.sender+' : '+ message.data);
                }else{
                    client.emit('private_message', 'error' + ' : message ' + message.data + ' was not sent');
                }

            });


            client.on('log', function (name, group) {


            });

            client.on('join', function (clientName, groupId) {
                client.join(groupId);
                client.broadcast.to(groupId).broadcast.emit('message', clientName + ': joined the room', groupId);
            });


        });

        return io;


    };
