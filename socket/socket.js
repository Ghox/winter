

module.exports = function (server) {

        var socketioJwt = require('socketio-jwt');
        var groupController = require('../controllers/group');
        var io = require('socket.io').listen(server);

        io.set('authorization', socketioJwt.authorize({
            secret: 'jwtSecret',
            handshake: true
        }));

        io.on('connection', function (client) {

            client.on('message', function (message) {

                groupController.message(message, function(err){
                    if(err){
                        //response.status(500).send({error:'failed to save message'});
                        client.emit('message', 'error' + ' : message ' + message.data+' was not sent');
                    }else{
                        client.emit('message', 'you' + ' : ' + message.data, message.groupId);
                        client.broadcast.to(message.groupId).broadcast.emit('message', message.username + ' : ' + message.data, message.groupId);
                        //client.broadcast.emit('message', message.username + ' : ' + message.data, groupId);
                    }
                });
            });
            client.on('log', function (name, group) {

                console.log('///////////////////////////////////////////');

                console.log( name + ' joined the room');

            });

            client.on('join', function(clientName ,groupId){
                client.join(groupId);
                client.broadcast.to(groupId).broadcast.emit('message',clientName+ ': joined the room', groupId);
            });


        });

        return io;


    };
