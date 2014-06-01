/*

TODO:

Muntjes/ sterretjes tussen de ringen.
(pijl naar volgende ring?)
Levels
preloader
controls kiezen
model kiezen

meer levels
landschappen



 */


var scene, camera, renderer;
var light, controls;
var lastTime;
var rings = [];
var ringsHit = 0;
var levelEnded = false;
var gameOver = false;

var level = 1;

var movementScaleX = 1;
var movementScaleY = 1;

var plane, planeMaterials = [];

var queue;

$(function() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.loadManifest([
        // {id: "physijs_worker",src: "/js/libs/physijs_worker.js"},
        {
            id: "landscape",
            src: "/js/island.js"
        },{
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
            id: "Space Oddity",
            src: "/sounds/space_oddity.mp3"
        }
    ]);


})

function handleComplete() {
    $('.overlay').delay(10).fadeOut('slow');
    init();
    animate();

    // createjs.Sound.play("music", {loop:-1});
}

function handleProgress(e) {
    var percentLoaded = Math.round(e.loaded * 100);
    $('.percentLoaded').html(percentLoaded + ' %');
    $('.progress').css('width', percentLoaded + '%')
}


function init() {

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });
    renderer.setClearColor(0xd8e7ff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.y = 100;
    // camera.position.z = -500;
    // camera.lookAt(0,0,0)



    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xd0e0f0, 0.00025);
    scene.add(camera);


    gameControls.init();
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

    document.addEventListener('mousemove', function() {

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
    }
    var time = performance.now() / 1000;

    controls.update(time - lastTime);
    renderer.render(scene, camera);

    lastTime = time;

}



function hitTest() {
    for (var i = 0; i < rings.length; i++) {

        var planePos = new THREE.Vector3();
        planePos.setFromMatrixPosition(plane.matrixWorld);

        // var camPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
        var ringPos = new THREE.Vector3(rings[i].position.x, rings[i].position.y, rings[i].position.z);
        var dT = planePos.distanceTo(ringPos);
        // console.log('distance -> ', dT);
        if (dT < 20 && rings[i].hit != true) {
            rings[i].material = new THREE.MeshBasicMaterial({
                color: 0x00FF00,
                transparent: true,
                opacity: 0.5
            });
            rings[i].hit = true;
            ringsHit++;
            if (rings[i].final) {
                game.win();
            }
        }

        if (planePos.y < 5) {
            game.over();
        }

        //clearing of the values
        ringPos = null;
        dT = null;
    };
}
