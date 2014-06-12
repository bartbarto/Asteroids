// var socket = io.connect('http://192.168.1.13:3000');
var currentURL = window.location.href;
var loc = window.location;
console.log(loc);
if (loc.port != undefined) {
    var currentURL = loc.protocol + '//' + loc.hostname + ':' + loc.port;
} else {
    var currentURL = loc.protocol + '//' + loc.hostname;
}
console.log(currentURL);
var socket = io.connect(currentURL);

var room = queryParam('roomNumber');
if (room == '') {
    room = location.hash.replace('#', '');
}
if (room == '') {
    room = 'NoRoom' + Math.round(Math.random() * 100000);
}

room = room.toUpperCase();

var motionD = {
    room: room
};

var allowed = false;

$(function() {

    socket.on('connect', function() {
        // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', room);
        socket.emit('message', {
            room: room,
            msg: 'mobile joined room with ID ' + room
        });

        $('.connect').html("Connected to " + room);
    });

    socket.on('message', function(data) {
        console.log('Incoming message:', data.msg);
    });

    socket.on('roomJoined', function(roomdata){
        if (roomdata.length < 3) {
            allowed = true;
        }else{

        }
        if(!allowed){
            $('.connect').html('Not allowed, 2nd controller');
        }
    })

    socket.on('commandToMobile', function(data) {
        if(data.switch){
            console.log(data.switch);
            switch(data.switch){
                case 'main':
                    $('.plane').css('background-image', "url('/img/planes_top/plane_main.png')")
                    break;
                case 'toy':
                    $('.plane').css('background-image',  "url('/img/planes_top/toy_plane.png')")
                    break;
                case 'UFO':
                    $('.plane').css('background-image',  "url('/img/planes_top/UFO.png')")
                    break;
                case 'F22':
                console.log('f22 picked')
                    $('.plane').css('background-image', "url('/img/planes_top/F22.png')")
                    break;
                case 'falcon':
                    $('.plane').css('background-image', "url('/img/planes_top/falcon.png')")
                    break;
                }
        }
    });


    $('.start').bind("tap", function(e) {
        sendCommand('start');
    });

    $('.stop').bind("tap", function(e) {
        sendCommand('stop');
    });

    $('.next').bind("tap", function(e) {
        sendCommand('next');
    });

    // socket.emit('message', {msg: 'emit-test'})

    if (window.DeviceOrientationEvent) {
        // $('.x').html("DeviceOrientation is supported");
        window.addEventListener('deviceorientation', handleMotion, false);
    } else {
        $('.connect').html("<br>Motion Control is not supported in this browser");
    }

    function handleMotion(event) {

        motionD = {
            room: room,
            gamma: event.gamma,
            beta: event.beta,
            alpha: event.alpha
        }

    }

})

setInterval(function() {
    if(allowed){
        socket.emit('motionData', motionD)
    }
}, 1000 / 30)

function sendCommand(command){
    if(allowed){
        socket.emit('command', {
            room: room,
            to: 'desktop',
            command: command
        })
    }
}

/////// to get room from URL //////////

function queryParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
