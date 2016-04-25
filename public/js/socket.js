/**
 * Created by rd-hc on 21/04/16.
 */




var socketio = (function () {
    var socket;
    var username = getCookie('username');
    console.log(username);
    function createConnection(token){
        socket = io.connect('http://localhost:3000', {
            query: 'token=' + token+'&username='+ username
        }, function(){
            console.log('connected');
        });

        socket
            .on('connect', function () {
                console.log('authenticated');
            })
            .on('disconnect', function () {
                console.log('disconnected');
            })
            .on('error', function(err){
                console.log('err', err);
            });
        return socket;
    }

    function getSocket(token){
        if(!socket && token){
            socket = createConnection(token);
        }
        return socket;
    }

    return getSocket;

})();

