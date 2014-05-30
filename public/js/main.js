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

var plane, planeMaterial;

init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer({
        antialias: false,
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


    planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xEFEFEF,
        transparent: true
    });

    // plane = new THREE.Mesh(new THREE.CubeGeometry(40, 3, 3), planeMaterial);
    planeBody = new THREE.Mesh(new THREE.CubeGeometry(8, 3, 40), planeMaterial);

    plane = new THREE.Object3D();

    var planeLoader = new THREE.ObjectLoader();
    planeLoader.load('/models/plane_main.js', function(mesh) {
        var scale = 0.2;
        mesh.scale.set(scale,scale,scale);
        mesh.position.y = 0;

        movementScaleX = 0.2;
        movementScaleY = 0.2;

        var propeller = mesh.children[0].children[0];

        plane.position.z = -10;
        plane.rotation.x = 0.2;
        plane.add(mesh);

        planeControls.rotatePropeller(propeller);

    })

    // var planeLoader = new THREE.ObjectLoader();
    // planeLoader.load('/models/plane_main.js', function(mesh) {
    //     var scale = 0.2;
    //     mesh.scale.set(scale,scale,scale);
    //     mesh.position.y = 0;

    //     movementScaleX = 0.2;
    //     movementScaleY = 0.2;

    //     plane.position.z = -10;
    //     plane.rotation.x = 0.2;
    //     plane.add(mesh);

    // })

    camera.add(plane);

    // planeBody.position.z = 10;
    // planeBody.position.y = -1.5;
    // // plane.rotation.y = 1.57;
    // plane.rotation.x = 0.2;

    // plane.position.set(0, -2, -50)


    // plane.add(planeBody)

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
        game.pause();
    }, 1000)

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
