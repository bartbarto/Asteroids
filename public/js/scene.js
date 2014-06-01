var sceneMaker = {
    build: function() {

        light = new THREE.HemisphereLight(0xfffff0, 0x101020, 1.25);
        light.position.set(0.75, 1, 0.25);
        scene.add(light);

        // var sunlight = new THREE.DirectionalLight();
        // sunlight.position.set(-2000, 2500, -2500);
        // sunlight.intensity = 0.5;
        // sunlight.castShadow = true;
        // sunlight.shadowDarkness = 0.9;
        // sunlight.shadowMapWidth = sunlight.shadowMapHeight = 2048;
        // sunlight.shadowCameraNear = 250;
        // sunlight.shadowCameraFar = 600;
        // sunlight.shadowCameraLeft = -200;
        // sunlight.shadowCameraRight = 200;
        // sunlight.shadowCameraTop = 200;
        // sunlight.shadowCameraBottom = -200;

        // scene.add(sunlight);


        var l = new THREE.ObjectLoader();
        l.load('js/island.js', function(mesh) {
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 100;
            mesh.position.x += 400;
            mesh.rotation.y = 1.57;
            scene.add(mesh);

            game.pause()
            setTimeout(function(){
                game.pause()
            },100)
        })
        //
        //
        // var mesh, texture;

        // var worldWidth = 256,
        //     worldDepth = 256,
        //     worldHalfWidth = worldWidth / 2,
        //     worldHalfDepth = worldDepth / 2;

        // var data = generateHeight( worldWidth, worldDepth );
        // // var clock = new THREE.Clock();

        // var geometry = new THREE.PlaneGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
        // geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        // for (var i = 0, l = geometry.vertices.length; i < l; i++) {

        //     geometry.vertices[i].y = data[i] * 2;

        // }

        // // texture = new THREE.Texture(generateTexture(data, worldWidth, worldDepth), new THREE.UVMapping(), THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);
        // // texture.needsUpdate = true;

        // texture = new THREE.MeshLambertMaterial( {color: 0x9B5823} );

        // // mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        // //     map: texture
        // // }));

        // mesh = new THREE.Mesh(geometry, texture);
        // mesh.position.y = -100;
        // mesh.scale.set()
        // scene.add(mesh);

        this.makeRings();
    },
    makeRings: function() {

        var ringPositions = levels[level - 1].ringPositions;


        // TorusGeomtery -> ( radius, tube, segmentsR, segmentsT, arc )
        var ringGeo = new THREE.TorusGeometry(20, 3, 10, 10);
        var ringMat = new THREE.MeshBasicMaterial({
            color: 0xFF0000,
            transparent: true,
            opacity: 0.5
        });
        var ringFinalMat = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8
        });
        var ring = new THREE.Mesh(ringGeo, ringMat);

        for (var i = 0; i < ringPositions.length; i++) {

            var r = ring.clone();
            r.position.set(ringPositions[i].position.x, ringPositions[i].position.y, ringPositions[i].position.z);
            r.rotation.set(ringPositions[i].rotation.x, ringPositions[i].rotation.y, ringPositions[i].rotation.z);

            if (ringPositions[i].final) {
                r.material = ringFinalMat;
                r.final = true;
            }

            scene.add(r);

            rings.push(r);
            // rings[i].hit = false;
        };
    },
    removeRings: function() {
        for (var i = 0; i < rings.length; i++) {
            scene.remove(rings[i]);
        };
    }
}

function generateHeight( width, height ) {

                var size = width * height, data = new Uint8Array( size ),
                perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

                for ( var j = 0; j < 4; j ++ ) {

                    for ( var i = 0; i < size; i ++ ) {

                        var x = i % width, y = ~~ ( i / width );
                        data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

                    }

                    quality *= 5;

                }

                return data;

            }

            function generateTexture( data, width, height ) {

                var canvas, canvasScaled, context, image, imageData,
                level, diff, vector3, sun, shade;

                vector3 = new THREE.Vector3( 0, 0, 0 );

                sun = new THREE.Vector3( 1, 1, 1 );
                sun.normalize();

                canvas = document.createElement( 'canvas' );
                canvas.width = width;
                canvas.height = height;

                context = canvas.getContext( '2d' );
                context.fillStyle = '#000';
                context.fillRect( 0, 0, width, height );

                image = context.getImageData( 0, 0, canvas.width, canvas.height );
                imageData = image.data;

                for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

                    vector3.x = data[ j - 2 ] - data[ j + 2 ];
                    vector3.y = 2;
                    vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
                    vector3.normalize();

                    shade = vector3.dot( sun );

                    imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
                    imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
                    imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
                }

                context.putImageData( image, 0, 0 );

                // Scaled 4x

                canvasScaled = document.createElement( 'canvas' );
                canvasScaled.width = width * 4;
                canvasScaled.height = height * 4;

                context = canvasScaled.getContext( '2d' );
                context.scale( 4, 4 );
                context.drawImage( canvas, 0, 0 );

                image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
                imageData = image.data;

                for ( var i = 0, l = imageData.length; i < l; i += 4 ) {

                    var v = ~~ ( Math.random() * 5 );

                    imageData[ i ] += v;
                    imageData[ i + 1 ] += v;
                    imageData[ i + 2 ] += v;

                }

                context.putImageData( image, 0, 0 );

                return canvasScaled;

            }
