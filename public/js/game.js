var game = {
    paused: false,
    win: function() {
        console.log('uitgespeeld, je hebt door ' + ringsHit + ' van de ' + rings.length + ' ringen gevlogen');
    },

    over: function() {
        controls.freeze = true;

    },

    pause: function() {
        if (!this.paused) {
            this.paused = true;
            controls.freeze = true;
        } else {
            this.paused = false;
            controls.freeze = false;
        }
    },
    nextLevel: function() {
        sceneMaker.removeRings();
        rings = [];

        level++;

        sceneMaker.makeRings();

        camPos = levels[level - 1].cameraStart;
        camera.position.x = camPos.x;
        camera.position.y = camPos.y;
        camera.position.z = camPos.z;
        camera.rotation.y = 0;

        ringsHit = 0;
    },
    endOfLevel: function(){
        levelEnded = true;
        controls.freeze();
        //UI.message = 'uitgespeeld, je hebt door ' + ringsHit + ' van de ' + rings.length + ' ringen gevlogen';
        //UI.showDialog();
    }
}

var gameControls = {
    init: function() {
    	controls = new THREE.FirstPersonControls(camera);
	    controls.movementSpeed = 80;
	    controls.lookSpeed = 0.05;
	    controls.lookVertical = true;
	    controls.allowKeys = false;
	    // controls.autoForward = true;

        document.addEventListener('keydown', function(e) {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 32:
                    controls.autoForward = !controls.autoForward;
                    break; // space
                case 79:
                    controls.moveLeft = true;
                    console.log('leftie');
                    break; // o
                case 80:
                    controls.moveRight = true;
                    console.log('rightie');
                    break; // p
                case 81:
                    console.log('freezing');
                    // controls.freeze = !controls.freeze;
                    game.pause();
                    break; // q
            }
        });

        document.addEventListener('keyup', function(e) {
            switch (e.keyCode) {
                case 79:
                    controls.moveLeft = false;
                    break; // o
                case 80:
                    controls.moveRight = false;
                    break; // p
            }
        });
    }
}