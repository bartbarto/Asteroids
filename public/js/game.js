var game = {
    paused: false,
    sound: null,
    music: null,
    volume: 0,
    started: false,
    win: function() {
        console.log('uitgespeeld, je hebt door ' + ringsHit + ' van de ' + rings.length + ' ringen gevlogen');
        this.endOfLevel();
    },

    over: function() {
        controls.freeze = true;
    },
    start: function(){
        game.started = true;
        game.volume = 0.5;
        game.music = createjs.Sound.play("Space Oddity", {loop:-1, volume: 0.9});
    },
    pause: function() {

        if (!this.paused) {
            this.paused = true;
            controls.freeze = true;
            game.sound.volume = game.volume;
            game.sound.pause();

            // if(game.music){
            try{
                game.music.pause();
            }catch(e){}
            // }

            if(game.started){
                $('.pause').fadeIn(100);
            }
        } else {
            this.paused = false;
            controls.freeze = false;
            game.sound.volume = game.volume;
            game.sound.resume();

            if(game.music){
                game.music.resume();
            }

            $('.pause').fadeOut(10);
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

        controls.lat = 0;
        controls.lon = 0;
        controls.theta =0;
        controls.phi =0;

        ringsHit = 0;
    },
    endOfLevel: function() {
        levelEnded = true;
        // controls.freeze();

        this.nextLevel();
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
                case 32: //space
                    // controls.autoForward = !controls.autoForward;
                    if(!game.started){
                        game.start();
                    }
                    game.pause();
                    break;
                case 27: //esc
                    game.pause();
                    return false;
                    break;
                case 65: //a
                    game.pause();
                    planeMaker.autoSwitch();
                    return false;
                    break;
            }
        });
    }
}

var planeControls = {
    setWithMouse: function(x, y) {

        plane.rotation.y = -x;
        plane.rotation.z = (-1.5 * x);
        plane.rotation.x = (-1.2 * y);

        plane.position.y = (-2 - 50 * y) * movementScaleY;
        plane.position.x = x * movementScaleX;

        for (var i = 0; i < planeMaterials.length; i++) {
            var planeMaterial = planeMaterials[i] || {};
            planeMaterial.transparent = true;

            if (y < 0) {
                planeMaterial.opacity = 0.7;
            } else if (y < 0.2) {
                planeMaterial.opacity = 0.95;
            } else {
                planeMaterial.opacity = 1;
            }
        };
    },
    setWithLeap: function(rotX, rotZ) {
        plane.rotation.x = rotX * 0.5;
        plane.rotation.z = rotZ;
    },
    rotatePropeller: function(propeller, axis){

        if(!game.paused){
            switch(axis){
                case 'x':
                    propeller.rotation.x += 1;
                    break;
                case 'y':
                    propeller.rotation.y += 1;
                    break;
                case 'z':
                    propeller.rotation.z += 1;
                    break;
            }

        }

        setTimeout(function() {
            planeControls.rotatePropeller(propeller, axis)
        }, 20)
    },
    rotatePlane: function(mesh) {
        if(!game.paused){
            mesh.rotation.y += 0.03;
        }

        setTimeout(function() {
            planeControls.rotatePlane(mesh)
        }, 20)
    }
}
