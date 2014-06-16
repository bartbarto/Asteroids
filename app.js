// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Create a simple Express application
app.configure(function() {
    // Turn down the logging activity
    app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
    res.send('app is running <br><br><br>&copy;Kerm.is 2014')
})

var port = process.env.PORT || 3000;

// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(port);

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level', 1);


// attach Socket.io to our HTTP server
// io = socketio.listen(server);
//
var room;
var roomio;

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {

    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('newRoom', function(data) {
        room = data.room;
        room = room.toUpperCase();

    });
    socket.on('room', function(room) {
        room = room;
        roomio = room.toUpperCase();

        if(roomio){
            socket.join(roomio);
            roomdata = io.sockets.manager.rooms['/'+roomio];
            io.sockets.in(roomio).emit('roomJoined', roomdata);
        }
    });

    socket.on('message', function(data) {

        if(roomio){
            io.sockets.in(data.room).emit('message', data);
        }
    })


    socket.on('motionData', function(data) {

        if(roomio){
            io.sockets.in(data.room).emit('motionDataOut', data);
        }
    })

    socket.on('command', function(data) {


        if(roomio){
            switch(data.to){
                case 'mobile':
                    io.sockets.in(data.room).emit('commandToMobile', data);
                    break;
                case 'desktop':
                    io.sockets.in(data.room).emit('commandToDesktop', data);
                    break;
            }
        }
    })

    socket.on('disconnect', function(){
        socket.broadcast.to(roomio).emit('mobile_disconnect', {room: roomio});
    });

});
