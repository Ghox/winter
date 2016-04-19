

module.exports = function (server) {
        var groupsModel = require('../models/group');
        var groupController = require('../controllers/group');
        var io = require('socket.io').listen(server);
        var clients = {};

        io.on('connection', function (client) {
            
            client.rooms = ['troll','chata','yuca'];

            client.join('troll');
            
            client.broadcast.to('troll').broadcast.emit('message', 'nadie joined the room');

            client.on('message', function (message) {

                groupController.message(message, function(err){
                    if(err){
                        //response.status(500).send({error:'failed to save message'});
                        client.emit('message', 'error' + ' : message ' + message.data+' was not sent');
                    }else{
                        client.emit('message', 'you' + ' : ' + message.data);

                        client.broadcast.emit('message', message.username + ' : ' + message.data);
                    }
                });
            });
            client.on('log', function (name, group) {

                console.log('///////////////////////////////////////////');

                console.log( name + ' joined the room');

            });
            client.on('join', function(group){

            });


        });
        io.clients = clients;
        return io;


    };
