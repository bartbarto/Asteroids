var game = {
    paused: false,
    sound: null,
    music: null,
    volume: 0.5,
    started: false,
    message: '',
    animatedRings: [],
    levelScreenActive: false,
    hitSomething: false,
    over: false,
    win: function() {
        // console.log('uitgespeeld, je hebt door ' + ringsHit + ' van de ' + rings.length + ' ringen gevlogen');
        // console.log('Je hebt ' + starsHit + ' van de ' + stars.length + ' sterren gevangen');
        // this.endOfLevel();
    },
    start: function() {
        game.started = true;
        $('.info').hide();
        $('.info-score').addClass('active');
        game.volume = 1;
        game.music = createjs.Sound.play("Space Oddity", {
            loop: -1,
            volume: 0.9
        });
        game.sound.resume();

        camPos = levels[level - 1].cameraStart;
        camera.position.x = camPos.x;
        camera.position.y = camPos.y;
        camera.position.z = camPos.z;
        camera.rotation.y = 0;

        controls.freeze = false;
    },
    pause: function() {

        if (!this.paused) {
            this.paused = true;
            controls.freeze = true;
            game.sound.setMute(true);
            // game.sound.pause();

            // if(game.music){
            try {
                game.music.pause();
            } catch (e) {}
            // }

            if (game.started) {
                $('.pause').fadeIn(100);
            }
        } else if (!game.over) {
            $('.pause').hide();

            this.paused = false;
            if (!game.hitSomething) {
                controls.freeze = false;
                game.sound.setMute(false);
                // game.sound.resume();
            }

            if (game.music) {
                game.music.resume();
            }



            game.message = '';
            game.updatePauseMessage();
        }
    },
    nextLevel: function() {
        $('.big').css({
            right: '500%'
        });

        $('.next-level-button').hide();
        //only do this after the big ticket is gone from the screen
        setTimeout(function() {
            $('.big').remove();
            $('.next-level-button').hide();
            $('.info-score').addClass('active');
            game.levelScreenActive = false;
            sceneMaker.removeRings();
            rings = [];
            stars = [];

            controls.movementSpeed += 5;

            level++;


            if (level <= 10) {

                //make a new level
                sceneMaker.makeRings();

                camPos = levels[level - 1].cameraStart;
                camera.position.x = camPos.x;
                camera.position.y = camPos.y;
                camera.position.z = camPos.z;
                camera.rotation.y = 0;



                controls.lat = 0;
                controls.lon = 0;
                controls.theta = 0;
                controls.phi = 0;

                ringsHit = 0;
                starsHit = 0;

                controls.freeze = false;
                // game.sound.resume();
                game.sound.play({
                    loop: -1
                });
                game.sound.setMute(false);

                //collision related
                camera.add(plane);
                game.hitSomething = false;

                $('.parcour').css('background-image', "url('/img/minimaps/level"+level+".png')")

            } else {
                game.over = true;
                //show delen op facebook ofzo
            }

        }, 500);
        setTimeout(function(){
            $('.next-level-button').hide();
        }, 1500)
    },
    endOfLevel: function() {

        var newTicket = $('.info-score').clone();
        newTicket.removeClass('active');
        newTicket.removeClass('ripping');
        newTicket.children('.next-level-button').hide();

        levelEnded = true;
        controls.freeze = true;
        $('.info-score').addClass('ripping');
        setTimeout(function() {
            $('.info-score').addClass('big');
            $('.ticket-holder').append(newTicket)
        }, 500)

        setTimeout(function() {
            $('.next-level-button').fadeIn();
        }, 1500)

        game.levelScreenActive = true;
        // game.sound.pause();
        game.sound.setMute(true);

        // controls.freeze();

        // this.nextLevel();
        //UI.message = 'uitgespeeld, je hebt door ' + ringsHit + ' van de ' + rings.length + ' ringen gevlogen';
        //UI.showDialog();
    },
    updatePauseMessage: function() {
        game.message += '<br>Press space to continue';
        if (controls.socketControl) {
            game.message = '<br>Press <strong>Pause</strong> on your phone to continue'
        };
        $('.pause-message').html(game.message);
    },
    updateScore: function() {
        var ringString = ringsHit + ' / ' + rings.length;
        var starString = starsHit + ' / ' + stars.length;
        var levelString = 'Level ' + level;

        $('.score-card .rings').html(ringString);
        $('.score-card .stars').html(starString);
        $('.info-score .subtitle').html(levelString);

        // $('.next-level-button').hide();
    }
}

var gameControls = {
    init: function() {
        controls = new THREE.FirstPersonControls(camera);
        controls.movementSpeed = 90;
        controls.lookSpeed = 0.068;
        controls.lookVertical = true;
        controls.allowKeys = false;
        // controls.autoForward = true;

        document.addEventListener('keydown', function(e) {
            // console.log(e.keyCode);
            switch (e.keyCode) {
                case 32: //space
                    // controls.autoForward = !controls.autoForward;
                    if (game.levelScreenActive && !game.paused) {
                        game.nextLevel();
                    } else if (game.levelScreenActive && game.paused) {
                        $('.pause').fadeOut();
                        game.paused = false;
                    } else {
                        if (!game.started) {
                            game.start();
                        }
                        game.pause();
                    }
                    break;
                case 27: //esc
                    if (game.levelScreenActive && !game.paused) {
                        game.nextLevel();
                    } else if (game.levelScreenActive && game.paused) {
                        $('.pause').fadeOut();
                        game.paused = false;
                    } else {
                        game.pause();
                    }
                    return false;
                    break;
                case 65: //a
                    // game.pause();
                    // planeMaker.autoSwitch();
                    return false;
                    break;
            }
        });
    }
}

var planeControls = {
    setWithMouse: function(x, y) {

        if (!game.leapControl && !game.socketControl) {
            plane.rotation.y = -x;
            plane.rotation.z = (-1.5 * x);
            plane.rotation.x = (-1.2 * y);

            plane.position.y = (-2 - 50 * y) * movementScaleY;
            plane.position.x = x * movementScaleX;

            for (var i = 0; i < planeMaterials.length; i++) {
                var planeMaterial = planeMaterials[i] || {};
                planeMaterial.transparent = true;

                if (y < 0) {
                    // planeMaterial.opacity = 0.7;
                } else if (y < 0.2) {
                    // planeMaterial.opacity = 0.95;
                } else {
                    planeMaterial.opacity = 1;
                }
            };
        }
    },
    setWithLeap: function(rotX, rotZ) {
        plane.rotation.x = rotX * 0.5;
        plane.rotation.z = rotZ;
    },
    setWithSocket: function(rotX, rotZ) {
        plane.rotation.x = rotX * 0.5;
        plane.rotation.z = rotZ;
    },
    rotatePropeller: function(propeller, axis) {

        if (!controls.freeze) {
            switch (axis) {
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
        if (!controls.freeze) {
            mesh.rotation.y += 0.03;
        }

        setTimeout(function() {
            planeControls.rotatePlane(mesh)
        }, 20)
    }
}
