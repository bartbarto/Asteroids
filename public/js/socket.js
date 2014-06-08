/////////////////////////////////////
/////   Socket Stuff
////////////////////////////////////
var room = generateRoomId();
var socketController = {
    currentURL: window.location.href,
    loc: window.location,
    room: '',
    socket: io.connect(this.currentURL),
    phoneObj: {
        rotX: 0,
        rotY: 0,
        rotZ: 0
    },
    controllerJoined: false,
    init: function() {


        //To catch when there is a port in the url, mainly for testing
        if (this.loc.port != undefined && this.loc.port > 1) {
            this.currentURL = this.loc.protocol + '//' + this.loc.hostname + ':' + this.loc.port;
        } else {
            this.currentURL = this.loc.protocol + '//' + this.loc.hostname;
        }
    },
    connect: function() {
        socketController.socket.on('connect', this.socketConnected);
        socketController.socket.on('message', this.socketMessage);
        socketController.socket.on('motionDataOut', this.socketMotionDataOut);
        socketController.socket.on('commandToDesktop', this.command);

        this.updateInstructions();
    },
    socketConnected: function() {
        // Connected, let's sign-up for to receive messages for this room
        socketController.socket.emit('room', room.toUpperCase());
        socketController.socket.emit('message', {
            msg: 'client joined room with ID ' + room
        });
    },
    socketMessage: function(data) {
        console.log('Incoming message:', data);
        if (data.msg.indexOf('mobile joined') != -1 && !socketController.controllerJoined) {
            controls.socketControl = true;

            //send the plane when the mobile joins
            socketController.sendPlane(planePicked);

        }
    },

    socketMotionDataOut: function(data) {
        // console.log('Incoming motionData:', data);
        // Tilt Left/Right [gamma]
        // Tilt Front/Back [beta]
        // Direction [alpha]


        /* Forward - Backwards -> converting to radians*/
        var rotationX = data.beta * .017453292519943295;

        /* Left -Right -> converting to radians*/
        var rotationZ = -data.gamma * .017453292519943295;

        if (!controls.freeze && controls.socketControl) {

            controls.socketMove(rotationZ, rotationX);
            // $('.info').html('rotZ ->' + rotationZ+' -- rotX ->' + rotationX);

            planeControls.setWithSocket(rotationX, rotationZ);
        }

        // rod.moveRodStrings('nothing');
    },
    updateInstructions: function() {
        $('.urlFounded').html(this.currentURL);
        $('.roomGenerated').html(this.room);
        $('.instruct').fadeIn('fast')

        var genURL = this.currentURL + '/mobile/#' + room;

        $('.room_id').html(room);

        $('.instruct').qrcode({
            text: genURL,
            render: "canvas",
            background: "#EFEFEF",
            foreground: "#000000",
            width: 200,
            height: 200
        });
    },
    command: function(data) {
        if (data.command) {
            switch (data.command) {
                case 'start':
                    if(!game.started){
                        game.start()
                    }
                    break;
                case 'stop':
                    game.pause();
                    break;
                case 'next':
                    if(game.levelScreenActive){
                        game.nextLevel();
                    }
                    break;
            }
        }
    },
    sendPlane:function(plane){
        socketController.socket.emit('command', {
            room: room,
            to: 'mobile',
            switch: plane
        });
    }

}

socketController.init();
socketController.connect();

function generateRoomId() {
    var text = "";
    var possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
