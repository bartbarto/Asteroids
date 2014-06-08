var collision = {
    planePos: {x: 0, y: 200, z:0},
    check: function() {

        // var ray = new THREE.Ray( planeMeshList[0].position, new THREE.Vector3( 0, 0, 1 ) );
        var rays = [
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(1, 0, -1),
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(-1, 0, -1),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(-1, 0, 1)
        ];

        var caster = new THREE.Raycaster();
        // var c = THREE.Collisions.rayCastNearest(ray);
        // console.log(c);

        if(planeMeshList[0]){
            collision.planePos = new THREE.Vector3().setFromMatrixPosition(planeMeshList[0].matrixWorld);
        }

        for (i = 0; i < rays.length; i += 1) {

            // We reset the raycaster to this direction
            if (planeMeshList[0] && !game.hitSomething) {

                caster.set(collision.planePos, rays[i]);
                collisions = caster.intersectObjects(collidableMeshList);
                if (collisions.length > 0 && collisions[0].distance < 5 && !game.hitSomething) {


                    collision.hit();

                }
            }
            // Test if we intersect with any obstacle mesh

        }

        if (collision.planePos.y < 0) {
            // game.over();

            if (!game.hitSomething) {

                collision.hit();

            }
        }
    },
    hit: function() {
        if (!game.hitSomething) {
            game.hitSomething = true;
            planeMaker.makePlaneExplode();
            console.log('te laag');
        }

        // collision.check(true);
    }
}
