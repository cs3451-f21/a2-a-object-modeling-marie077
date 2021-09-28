// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
    }

    /*
	Set up the scene during class construction
	*/
	initializeScene(){
        const objectRoot = new THREE.Group();
        const head = new THREE.Group();
        const tentacles = new THREE.Group();
        const plant = new THREE.Group();

        var material = new THREE.MeshToonMaterial( { color: 0xd64864} );
        //octopus head
        var radius =  7.4;  
        var widthSegments = 12;  
        var heightSegments = 8;  
        var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        var mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(1,0,0);
        head.add( mesh );

        //first eye
        var eyeMaterial = new THREE.MeshToonMaterial( { color: 0x473232} );
        radius = 1;  
        var detail = 3;  
        const geometryEye = new THREE.DodecahedronGeometry(radius, detail);
        var meshEye = new THREE.Mesh(geometryEye, eyeMaterial);
        meshEye.position.set(-2, 1, 6);
        head.add(meshEye);


        //second eye
        var meshEye = new THREE.Mesh(geometryEye, eyeMaterial);
        meshEye.position.set(4, 1, 6);
        head.add(meshEye);

        //nose
        radius =  1;  
        const tubeRadius =  1;  
        radialSegments = 26;  
        const tubularSegments = 48;  
        const geometryNose = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
        var meshNose = new THREE.Mesh(geometryNose, material);
        meshNose.position.set(1,0,8);
        head.add(meshNose);

        //inner nose
        var innerMaterial =  new THREE.MeshToonMaterial( { color: 0x1a1919} );
        const geometryInner = new THREE.DodecahedronGeometry(radius, detail);
        var meshInner = new THREE.Mesh(geometryEye, innerMaterial);
        meshInner.position.set(1, 0, 8);
        head.add(meshInner);
       
        //octopus tentacles 
        // tentacle 1    
        radius =  1.7;  
        widthSegments = 12;  
        heightSegments = 8;  
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(7, -6,-1);
        tentacles.add(mesh);
    
        //tentacle 2
        radius =  1.7;  
        widthSegments = 12;  
        heightSegments = 8;  
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(-5.5,-5,1);
        tentacles.add( mesh );

        //tentacle 3
        radius =  1.7;  
        widthSegments = 12;  
        heightSegments = 8;  
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(-4,-6, -3);
        tentacles.add( mesh );

        //tentacle 4
        radius =  1.7;  
        widthSegments = 12;  
        heightSegments = 8;  
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(4,-6, -5);
        tentacles.add( mesh );

        //tentacle 5
        radius =  1.7;  
        widthSegments = 12;  
        heightSegments = 8;  
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(-0.5,-6, -5);
        tentacles.add( mesh );

         //tentacle 6
         radius =  1.7;  
         widthSegments = 12;  
         heightSegments = 8;  
         geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
         mesh = new THREE.Mesh( geometry, material);
         mesh.position.set(-3, -6, 4);
         tentacles.add( mesh );
 
        //  tentacle 7
         radius =  1.7;  
         widthSegments = 12;  
         heightSegments = 8;  
         geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
         mesh = new THREE.Mesh( geometry, material);
         mesh.position.set(5, -7, 3);
         tentacles.add( mesh );

        //tentacle 8
        radius =  1.7;  
        widthSegments = 12;  
        heightSegments = 8;  
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(1,-7, 5);
        tentacles.add( mesh );

        //octopus plant
        var stemColor = new THREE.MeshToonMaterial( { color: 0x1ba942} );
        var radiusTop =  0.6;  
        var radiusBottom =  0.6;  
        var height = 3.6;  
        var radialSegments = 12;  
        var geometryPlant = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        var meshPlant = new THREE.Mesh( geometryPlant, stemColor);
        meshPlant.position.set(0, 8.5, 1);
        plant.add(meshPlant);

        //petal
        const petalColor = new THREE.MeshToonMaterial( { color: 0xf7c313} );
        radius = 2;  
        const geometryPetal = new THREE.OctahedronGeometry(radius);
        var meshPetal = new THREE.Mesh( geometryPetal, petalColor);
        meshPetal.position.set(0, 10, 1);
        plant.add(meshPetal);
        
        objectRoot.add(head, tentacles, plant);

        this.scene.add(objectRoot);
    }

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){}
}

// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
}

exec()