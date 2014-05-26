var sceneMaker = {
    build: function() {

        light = new THREE.HemisphereLight(0xfffff0, 0x101020, 1.25);
        light.position.set(0.75, 1, 0.25);
        scene.add(light);

        var l = new THREE.ObjectLoader();
        l.load('js/island.js', function(mesh) {
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 100;
            mesh.position.x += 400;
            mesh.rotation.y = 1.57;
            scene.add(mesh);
        })

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
