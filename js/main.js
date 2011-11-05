$(document).ready(function(){
	
	partRand = new Rc4Random(''+Math.random());
	vessel = 'a random robot';

	var currentTime = new Date()
	oldNow = currentTime.getTime();
	
	$('#message').hide();

	has_gl = 0;
	
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	try {
		message('Creating webgl renderer',false, true);
		
		// create a WebGL renderer
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		
		canvas = document.getElementById('canvas');
		if(debug){
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			stats.domElement.style.left = '0px';
			canvas.appendChild( stats.domElement );
		}
			
		// attach the render-supplied DOM element
		canvas.appendChild(renderer.domElement);
		rendertype = 'webgl';
		
	}catch (e) {

		message("Your browser doesn\'t support WebGL<br />Find out how to get WebGL <a href=\"http://get.webgl.org/\"><u>here</u></a>",true, false);
		
	}
	
	
	if(rendertype){
	
		message('Loading scene',false, true);

		camera = new THREE.TrackballCamera({

			fov: 35, 
			aspect: SCREEN_WIDTH / SCREEN_HEIGHT,
			near: 1,
			far: sceneHalf,

			rotateSpeed: 6.0,
			zoomSpeed: 1.2,
			panSpeed: 0.8,

			noZoom: false,
			noPan: true,

			//staticMoving: false,
			//dynamicDampingFactor: 0.3,

			keys: [ 65, 83, 68 ],
			
			domElement:document.getElementById('canvas')

		});
		
		camera.position.y		= 2.5;
		camera.position.z		= -10;
		camera.position.normalize().multiplyScalar(100);
		
		camParent		= new THREE.Object3D();
		modelParent		= new THREE.Object3D();
		modelParent.rotation.x = -Math.PI/2;
		
		// Create the scene
		scene		= new THREE.Scene();
		scene.fog	= new THREE.Fog(blue, sceneHalf-300, sceneHalf);
		
		scene.addObject(modelParent);
		
		camParent.addChild(camera);
		
		scene.addObject(camParent);
		
		//facemat = new THREE.MeshBasicMaterial( { color: white, opacity: 1.0, shading: THREE.FlatShading } );
		facemat = new THREE.MeshLambertMaterial( { color: white, opacity: 1.0 } );
		//wiremat = new THREE.MeshBasicMaterial( { color: blue, opacity: 1.0, wireframe: true, wireframeLinewidth: 1.0 } );
		
		//Material = [facemat,wiremat]; 
		Material = [facemat]; 
		
		// SET UP LIGHTS
		d1		= new THREE.DirectionalLight( 0xE0E0E0);
		d1.target	= modelParent;
		d1.position.y	= 500;
		d1.position.z	= -250;
		scene.addObject( d1 );
		
		d2		= new THREE.DirectionalLight( 0xB0B0B0 );
		d2.position.x	= 100;
		d2.position.z	= 50;
		scene.addObject( d2 );	
		
		var ambient	= new THREE.AmbientLight( 0x111111 );
		scene.addObject(ambient);
		
		message('Constructing '+vessel, false, true);
		
		makeRobot();
		
		$('#message').hide();
		$('#container').show();
		
		canvas = document.getElementById('canvas');
		
		window.addEventListener('resize', onWindowResize, false);
		canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );
		canvas.addEventListener( 'touchstart', onDocumentTouchStart, false );
		canvas.addEventListener( 'touchmove', onDocumentTouchMove, false );

		animate();
	}
});



// Add the 3d model
function makeRobot(segments){

	Models = new Array();

	bot = botList[Math.round(partRand.getRandomNumber() * (botList.length-1))];
	
	// Make the torso!
	part = makeMesh(bot,'torso');
	part.doubleSided = false;
	part.useQuaternion = true;
	var currentTime = new Date()
	part.birthTime = currentTime.getTime();
	
	modelParent.addChild(part);
	
	connectors = part.geometry.connectors;
	
	Models['torso'] = part;
	
	// Loop through all the limbs and create a part for each
	for (var i = 0; i < partList.length; i ++ ){
		makePart(partList[i], connectors);
	}
	
}


// Add a limb for the robot
function makePart(type, connectors){

	if (debug) console.log('making a '+type);
	
	bot = botList[Math.round(partRand.getRandomNumber() * (botList.length-1))];
	
	// Make the head
	part = makeMesh(bot, type);
	part.doubleSided = false;
	
	c = connectors[type];

	part.position.set(c.position[0], c.position[1], c.position[2]);
	part.update();
	
	modelParent.addChild(part);
	
	Models[type] = part;

}


// Make the mesh!
function makeMesh(bot,type){
	if(bot == 'round') return new THREE.Mesh( new round(type),  Material);
	return new THREE.Mesh( new base(type),  Material);
}


// Animate function
function animate() {
	requestAnimationFrame( animate );
	render();
	if(debug)	stats.update();
}


// Each render of a frame!
// We update the models in here
function render() {

	var now		= Date.now();
	timeSpent	= now - oldNow;
	
	//now /= 5000;
	newAutoY	= (Math.PI * now) * 0.00015;
	
	difAutoY	= oldAutoY - newAutoY;
	
	if(mouseState == 1 && mouseFac > 0.0){
		mouseFac -= 0.05;
	}else if(mouseState == 0 && mouseFac < 1.0){
		mouseFac += 0.005;
	}
	if(mouseFac < 0.0){
		mouseFac = 0.0;
	}else if(mouseFac > 1.0){
		mouseFac = 1.0;
	}
	
	difAutoY *= mouseFac;
	delete mouseFac;	// jme- WHATA ???
	
	modelParent.rotation.z += difAutoY;
	
	oldNow		= now;
	oldAutoY	= newAutoY;
	delete now, timeSpent, difAutoY, newAutoY;	// jme- whata double ??	
	renderer.render(scene, camera);
}
