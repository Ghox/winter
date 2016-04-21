/**
 * Created by rd-hc on 21/04/16.
 */




var socketio = (function () {
    var socket;

    function createConnection(token){
        socket = io.connect('http://localhost:3000', {
            query: 'token=' + token
        });

        socket
            .on('connect', function () {
                console.log('authenticated');
            })
            .on('disconnect', function () {
                console.log('disconnected');
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

