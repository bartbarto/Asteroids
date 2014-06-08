/////////////////////////////////////////////
//      Leap stuff                        //
////////////////////////////////////////////
var controller, leapObj, leapConnected;

var count = 0;

var leapController = {
    leapObj : {},
    leapConnected: false,
    init: function() {
        controller = new Leap.Controller();
        controller.connect();

        controller.on('connect', this.controllerConnected)
        controller.on('animationFrame', this.onAnimationframe)
    },
    controllerConnected: function() {
        console.log('Leap connected')
        this.leapConnected = true;
    },
    onAnimationframe: function(frame) {
        // your code here
        count++;
        try {
            var pointables = frame.hands;

            if(count > 10 && pointables[0]){

                /* Forward - Backwards */
                var rotationX = pointables[0].pitch();

                /* Left -Right */
                var rotationZ = pointables[0].roll();

                if(!controls.freeze && controls.leapControl){
                    controls.leapMove(rotationZ, rotationX);
                    // $('.info').html('rotZ ->' + rotationZ+' -- rotX ->' + rotationX);

                    planeControls.setWithLeap(rotationX, rotationZ);
                }


            }

        } catch (e) {
            console.log('error',e);
        }
    }

}

leapController.init();