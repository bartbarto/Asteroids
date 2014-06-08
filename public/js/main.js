/*

TODO:

Muntjes/ sterretjes tussen de ringen. ✓
(pijl naar volgende ring?)
Levels ✓
preloader ✓
controls kiezen ✓
model kiezen ✓

collisions ✓

meer levels ✓
meer wolkjes ✓
meer landschappen ✓

Minimap ✓

vuurwerk

countdown voor begin level

Animatie als je door ring vliegt ipv op groen te zetten

cinematic screen ratio (21:9) -> op C drukken
Muziek toggle -> op M drukken

 */
var mapBuilding = 0;



var scene, camera, renderer;
var light, controls;
var lastTime;
var rings = [],
    stars = [];
var ringsHit = 0;
var starsHit = 0;
var levelEnded = false;
var gameOver = false;

var level = 1;

var movementScaleX = 1.5;
var movementScaleY = 1.5;

var planePicked, plane, planeMaterials = [];

var collidableMeshList = [];

var planeMeshList = [];

var queue;

$(function() {
    //redirect if on mobile
    if (Modernizr.touch) {
        // var isMobile = window.matchMedia("only screen and (max-width: 760px)");

        // if (isMobile.matches) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.replace("http://fly.kerm.is/connect");
            alert();
        }
        // }
    }
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.loadManifest([
        // {id: "physijs_worker",src: "/js/libs/physijs_worker.js"},
        {
            id: "landscape",
            src: "/models/islands.js"
        }, {
            id: "cloud",
            src: "/models/cloud.js"
        }, {
            id: "texture_1",
            src: "/img/ring_normal.png"
        }, {
            id: "texture_2",
            src: "/img/ring_final.png"
        }, {
            id: "texture_3",
            src: "/img/star_texture.png"
        }, {
            id: "F22",
            src: "/models/F22.js"
        }, {
            id: "falcon",
            src: "/models/falcon.js"
        }, {
            id: "main",
            src: "/models/plane_main.js"
        }, {
            id: "toy",
            src: "/models/toy_plane.js"
        }, {
            id: "UFO",
            src: "/models/UFO.js"
        }, {
            id: "falcon_sound",
            src: "/sounds/falcon-cockpit-loop01.wav"
        }, {
            id: "jet_sound",
            src: "/sounds/jet.wav"
        }, {
            id: "propeller_sound",
            src: "/sounds/prop3.wav"
        }, {
            id: "UFO_sound",
            src: "/sounds/ufoFlying.mp3"
        }, {
            id: "ping",
            src: "/sounds/ping.mp3"
        }, {
            id: "boom",
            src: "/sounds/Explosion.mp3"
        }, {
            id: "Space Oddity",
            src: "/sounds/space_oddity.mp3"
        }
    ]);


})

function handleComplete() {
    // $('.overlay').delay(10).fadeOut('slow');

    $('.overlay').delay(10).fadeOut('normal')

    init();
    animate();

    // createjs.Sound.play("music", {loop:-1});
}

function handleProgress(e) {
    var percentLoaded = Math.round(e.loaded * 100);
    $('.percentLoaded').html(percentLoaded + ' %');
    $('.progress').css('width', percentLoaded + '%')
}

var overCam;

function init() {

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    renderer.setClearColor(0xd8e7ff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 14000);
    camera.position.y = 100;
    // camera.position.z = -500;
    // camera.lookAt(0,0,0)
    //
    //


    scene = new THREE.Scene();
    if(!mapBuilding){
        scene.fog = new THREE.FogExp2(0xd0e0f0, 0.00015);
    }
    scene.add(camera);

    if (mapBuilding) {
        // debug
        overCam = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 30000);
        overCam.position.y = 3300;
        overCam.position.z = 150;
        overCam.position.x = 190;
        overCam.rotation.x = -1.57;

        $('.ticket-holder').hide();
        // end debug
        scene.add(overCam);
    }


    gameControls.init();
    // controls.movementSpeed = 1.2;
    controls.leapControl = false;

    sceneMaker.build();

    lastTime = performance.now();

    //object to put the plane in
    plane = new THREE.Object3D();

    //To load the planes
    planeMaker.loadPlane('main');

    camera.add(plane);


    var winW = window.innerWidth;
    var winH = window.innerHeight;

    document.addEventListener('mousemove', function(event) {

        if (!controls.freeze && !controls.leapControl) {
            var x = (event.pageX / winW - 0.5);
            var y = (event.pageY / winH - 0.5);

            planeControls.setWithMouse(x, y)

        }
    });

    setTimeout(function() {
        game.pause();
        // game.pause();
    }, 100)

}


function animate() {

    requestAnimationFrame(animate);

    hitTest();

    if (!controls.freeze) {
        // camera.position.y -= 0.3;
        animateRings();
        animateStars();
    }
    var time = performance.now() / 1000;

    controls.update(time - lastTime);

    if (!mapBuilding) {
        renderer.render(scene, camera);
    } else {
        renderer.render(scene, overCam);
    }

    lastTime = time;

    collision.check();
}

function animateStars() {
    for (var i = 0; i < stars.length; i++) {
        stars[i].rotation.y += (Math.random() / 10)
    };
}

function animateRings() {
    for (var i = 0; i < game.animatedRings.length; i++) {

        if (game.animatedRings[i].direction != 'down' && game.animatedRings[i].position.y < game.animatedRings[i].originalPosition + 20) {

            game.animatedRings[i].position.y += 0.2;


        }
        if (game.animatedRings[i].position.y >= game.animatedRings[i].originalPosition + 20) {

            game.animatedRings[i].direction = 'down';

        }
        if (game.animatedRings[i].direction == 'down') {
            game.animatedRings[i].position.y -= 0.2;

        }
        if (game.animatedRings[i].position.y <= game.animatedRings[i].originalPosition - 20) {

            game.animatedRings[i].direction = 'up';

        }
        // console.log(game.animatedRings[i].position.y);
    };
}



function hitTest() {
    var planePos = new THREE.Vector3();

    if (plane.children[0]) {
        planePos.setFromMatrixPosition(plane.children[0].matrixWorld);
    }

    //check for the rings
    for (var i = 0; i < rings.length; i++) {

        // var camPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
        var ringPos = new THREE.Vector3(rings[i].position.x, rings[i].position.y, rings[i].position.z);
        var dT = planePos.distanceTo(ringPos);
        // console.log('distance -> ', dT);
        if (dT < 22 && rings[i].hit != true) {

            rings[i].hit = true;
            ringsHit++;

            if (rings[i].final) {
                setTimeout(function() {
                    game.endOfLevel();
                }, 400)

            }

            sceneMaker.ringsOut(rings[i]);

            game.updateScore();
        }

        //clearing of the values
        ringPos = null;
        dT = null;
    };

    for (var i = 0; i < stars.length; i++) {

        // var camPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
        var starPos = new THREE.Vector3(stars[i].position.x, stars[i].position.y, stars[i].position.z);
        var dT = planePos.distanceTo(starPos);
        // console.log('distance -> ', dT);
        if (dT < 7 && stars[i].hit != true) {

            stars[i].hit = true;
            starsHit++;
            createjs.Sound.play("ping");

            sceneMaker.starsOut(stars[i]);

        }

        //clearing of the values
        starPos = null;
        dT = null;

        game.updateScore();
    };


}
