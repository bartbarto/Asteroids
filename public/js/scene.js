var sceneMaker = {
    build: function() {

        light = new THREE.HemisphereLight(0xfffff0, 0x101020, 1.25);
        light.position.set(0.75, 1, 0.25);
        scene.add(light);

        var l = new THREE.ObjectLoader();
        l.load('models/islands.js', function(mesh) {
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 100;
            mesh.position.x += 400;
            mesh.rotation.y = 1.57;
            scene.add(mesh);

            // collidableMeshList.push()

            for (i = 0; i < mesh.children.length; i++) {

                if(mesh.children[i].children[0].name != 'Beak'){ //exclude the ducks
                    collidableMeshList.push(mesh.children[i].children[0]);
                }

            }

        })

        this.cloudinator();

        this.makeRings();
    },
    ringTexture: THREE.ImageUtils.loadTexture("/img/ring_normal.png"),
    finalTexture: THREE.ImageUtils.loadTexture("/img/ring_final.png"),
    makeRings: function() {

        game.animatedRings = [];

        var ringPositions = levels[level - 1].ringPositions;


        // TorusGeomtery -> ( radius, tube, segmentsR, segmentsT, arc )
        var ringGeo = new THREE.TorusGeometry(20, 3, 4, 8);
        var texture = this.ringTexture;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(4, 1);

        var finalTexture = this.finalTexture;
        finalTexture.wrapS = THREE.RepeatWrapping;
        finalTexture.repeat.set(4, 1);

        var ringMat = new THREE.MeshLambertMaterial({
            emissive: 0x606060,
            map: texture,
            color: 0xffffff,
            transparent: true
        });
        var ringFinalMat = new THREE.MeshBasicMaterial({
            emissive: 0x606060,
            map: finalTexture,
            color: 0xFFFFFF,
            transparent: true
        });
        var ring = new THREE.Mesh(ringGeo, ringMat);

        for (var i = 0; i < ringPositions.length; i++) {

            var r = ring.clone();
            r.position.set(ringPositions[i].position.x, ringPositions[i].position.y, ringPositions[i].position.z);
            r.rotation.set(ringPositions[i].rotation.x, ringPositions[i].rotation.y, ringPositions[i].rotation.z);
            r.scale.set(1, 1, 3);

            if (ringPositions[i].final) {
                r.material = ringFinalMat;
                r.scale.set(1, 1, 2);
                r.final = true;
            }

            scene.add(r);

            rings.push(r);
            // rings[i].hit = false;
            //
            if (ringPositions[i].animated) {
                r.originalPosition = ringPositions[i].position.y;
                game.animatedRings.push(r);

            }
        };

        this.makeStars();
    },
    removeRings: function() {
        for (var i = 0; i < rings.length; i++) {
            scene.remove(rings[i]);
        };
        this.removeStars();
    },
    starTexture: THREE.ImageUtils.loadTexture("/img/star_texture.png"),
    makeStars: function() {
        // var starShape = new THREE.Mesh(
        //     new THREE.SphereGeometry(4, 5, 5),
        //     new THREE.MeshLambertMaterial({
        //         color: 0xFFFF00
        //     })
        // );

        var starPoints = [];

        //drawing a star in 2d
        starPoints.push(new THREE.Vector2(0, 6.5));
        starPoints.push(new THREE.Vector2(2, 2));
        starPoints.push(new THREE.Vector2(7, 2.5));
        starPoints.push(new THREE.Vector2(3.5, -2));
        starPoints.push(new THREE.Vector2(5, -7));
        starPoints.push(new THREE.Vector2(-0, -3.5));
        starPoints.push(new THREE.Vector2(-5, -7));
        starPoints.push(new THREE.Vector2(-3.5, -2));
        starPoints.push(new THREE.Vector2(-7, 2.5));
        starPoints.push(new THREE.Vector2(-2, 2));

        var starShape = new THREE.Shape(starPoints);

        var extrusionSettings = {
            size: 1,
            amount: 0.5,
            height: 1,
            curveSegments: 3,
            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: false,
            material: 0,
            extrudeMaterial: 1
        };

        //turning it to the 3rd dimension
        var starGeometry = new THREE.ExtrudeGeometry(starShape, extrusionSettings);
        var starTexture = this.starTexture;
        starTexture.wrapS = THREE.RepeatWrapping;
        starTexture.wrapT = THREE.RepeatWrapping;
        starTexture.repeat.set(0, 0);

        var starMat = new THREE.MeshLambertMaterial({
            emissive: 0x606060,
            map: starTexture,
            color: 0xffffff
        });

        var starMesh = new THREE.Mesh(starGeometry, starMat);
        starMesh.scale.set(0.5, 0.5, 0.5);
        starMesh.position.set(0, 2, 0)
        // starMesh.rotation.y = 1.57;
        // starMesh.rotation.x = 1.57;


        starObject = new THREE.Object3D();
        starObject.add(starMesh);

        for (var i = 0; i < rings.length; i++) {
            // rings[i]
            var star = starObject.clone();
            star.name = 'star';


            if (rings[i + 1]) {
                var starPos = new THREE.Vector3(
                    average(rings[i].position.x, rings[i + 1].position.x) + (-6 + (Math.random() * 12)),
                    average(rings[i].position.y, rings[i + 1].position.y) + (-6 + (Math.random() * 12)),
                    average(rings[i].position.z, rings[i + 1].position.z) + (-6 + (Math.random() * 12))
                );

                star.position.set(starPos.x, starPos.y, starPos.z);

                scene.add(star);

                stars.push(star)
            }



        };
    },
    removeStars: function() {
        for (var i = 0; i < stars.length; i++) {
            scene.remove(stars[i]);
        };
    },
    cloudinator: function() {
        var cl = new THREE.ObjectLoader();
        cl.load('models/cloud.js', function(mesh) {

            var texture = THREE.ImageUtils.loadTexture('img/cloud10.png', null, animate);
            texture.magFilter = THREE.LinearMipMapLinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;

            var fog = new THREE.Fog(0x4584b4, -100, 3000);

            mesh.children[0].children[0].material = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.6,
                emmisive: 0xffffff
            });

            // console.log(mesh.children[0].children[0]);
            // var plMesh = new THREE.Mesh(pl, material);

            for (var i = 0; i < 300; i++) {

                var cloudPos = new THREE.Vector3(-5000 + (10000 * Math.random()),
                    700 * Math.random() + 30, -2500 + (5000 * Math.random()));
                var newCloud = mesh.clone();

                var scale = 0.1 + Math.random() / 2.5;

                newCloud.scale.set(scale, scale, scale);
                newCloud.position.set(cloudPos.x, cloudPos.y, cloudPos.z);
                newCloud.rotation.set(-1 + Math.random() * 2, -1.5 + Math.random() * 3, -1 + Math.random() * 2)

                scene.add(newCloud);


            };
        })

    },
    ringsOut: function(ring){

        ring.material = ring.material.clone();

        var rotAndScaleInt = setInterval(function(){
            ring.rotation.z -= 0.07;
            ring.scale.z += 0.05;
            ring.material.opacity -= 0.02;
        },10)

        setTimeout(function(){
            clearInterval(rotAndScaleInt);
        }, 1000)
    },
    starsOut: function(star){

        var rotAndScaleInt = setInterval(function(){
            star.rotation.y += 0.5;
            star.scale.x -= 0.1;
            star.scale.y -= 0.1;
            star.scale.z -= 0.1;
        },20)

        setTimeout(function(){
            clearInterval(rotAndScaleInt);
            scene.remove(star);
        }, 400)
    }

};

// var clouds = [];

function average(x, y) {
    return (x + y) / 2;
}


window.addEventListener('resize', function() {
    if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}, true);


//for automatix terrain generation
// function generateHeight(width, height) {

//     var size = width * height,
//         data = new Uint8Array(size),
//         perlin = new ImprovedNoise(),
//         quality = 1,
//         z = Math.random() * 100;

//     for (var j = 0; j < 4; j++) {

//         for (var i = 0; i < size; i++) {

//             var x = i % width,
//                 y = ~~ (i / width);
//             data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);

//         }

//         quality *= 5;

//     }

//     return data;

// }

// function generateTexture(data, width, height) {

//     var canvas, canvasScaled, context, image, imageData,
//         level, diff, vector3, sun, shade;

//     vector3 = new THREE.Vector3(0, 0, 0);

//     sun = new THREE.Vector3(1, 1, 1);
//     sun.normalize();

//     canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;

//     context = canvas.getContext('2d');
//     context.fillStyle = '#000';
//     context.fillRect(0, 0, width, height);

//     image = context.getImageData(0, 0, canvas.width, canvas.height);
//     imageData = image.data;

//     for (var i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {

//         vector3.x = data[j - 2] - data[j + 2];
//         vector3.y = 2;
//         vector3.z = data[j - width * 2] - data[j + width * 2];
//         vector3.normalize();

//         shade = vector3.dot(sun);

//         imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
//         imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
//         imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007);
//     }

//     context.putImageData(image, 0, 0);

//     // Scaled 4x

//     canvasScaled = document.createElement('canvas');
//     canvasScaled.width = width * 4;
//     canvasScaled.height = height * 4;

//     context = canvasScaled.getContext('2d');
//     context.scale(4, 4);
//     context.drawImage(canvas, 0, 0);

//     image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
//     imageData = image.data;

//     for (var i = 0, l = imageData.length; i < l; i += 4) {

//         var v = ~~ (Math.random() * 5);

//         imageData[i] += v;
//         imageData[i + 1] += v;
//         imageData[i + 2] += v;

//     }

//     context.putImageData(image, 0, 0);

//     return canvasScaled;

// }


