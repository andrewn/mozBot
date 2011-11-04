function onWindowResize( event ) {
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight; // - $('#header').height();
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}
function onDocumentMouseDown( event ) {
	event.preventDefault();
	canvas.addEventListener( 'mouseup', onDocumentMouseUp, false );
	canvas.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseState = 1;
}
function onDocumentMouseUp( event ) {
	canvas.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	canvas.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseState = 0;
}
function onDocumentMouseOut( event ) {
	canvas.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	canvas.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseState = 0;
}
function onDocumentTouchStart( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
	}
}
function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
	}
}

// Display a message!
function message(m, b, l){
	$('#message').html(m);
	$('#message').show();
	if(b){
		$('#message').addClass('error');
	}else{
		$('#message').removeClass('error');
	}
	if(l){
		$('#message').addClass('loading');
	}else{
		$('#message').removeClass('loading');
	}
}

// Function for making sure text only uses url safe symbols
function makeSafeUrl(thisText, allowSpace){
	var w = "!@#$%^&*()+=[]\\\';,./{}|\":<>?";
	var s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
	var x = new Array('אבגדהו', 'ח', 'טיךכ', 'לםמן', 'ס', 'נףעפץצר', 'שתûü', '‎ÿ');
	var r = new Array('a', 'c', 'e', 'i', 'n', 'o', 'u', 'y');

	if(allowSpace){
		s = s + ' ';
	}else{
		x.push(' ');
		r.push('_');
	}

	//thisText = thisText.toLowerCase();
	var newText = new Array();

	for (i = 0; i < thisText.length; i++){
		thisChar = thisText.charAt(i);
		if(w.indexOf(thisChar) == -1){
			if(s.match(''+thisChar+'')){
				newText[i] = thisChar;
			}else{
				for (j = 0; j < x.length; j++){
					if(x[j].match(thisChar)){
						newText[i] = r[j];
					}
				}
			}
		}
	}

	return newText.join('');
}

function Rc4Random(seed)
{
	var keySchedule = [];
	var keySchedule_i = 0;
	var keySchedule_j = 0;
	
	function init(seed) {
		for (var i = 0; i < 256; i++)
			keySchedule[i] = i;
		
		var j = 0;
		for (var i = 0; i < 256; i++)
		{
			j = (j + keySchedule[i] + seed.charCodeAt(i % seed.length)) % 256;
			
			var t = keySchedule[i];
			keySchedule[i] = keySchedule[j];
			keySchedule[j] = t;
		}
	}
	init(seed);
	
	function getRandomByte() {
		keySchedule_i = (keySchedule_i + 1) % 256;
		keySchedule_j = (keySchedule_j + keySchedule[keySchedule_i]) % 256;
		
		var t = keySchedule[keySchedule_i];
		keySchedule[keySchedule_i] = keySchedule[keySchedule_j];
		keySchedule[keySchedule_j] = t;
		
		return keySchedule[(keySchedule[keySchedule_i] + keySchedule[keySchedule_j]) % 256];
	}
	
	this.getRandomNumber = function() {
		var number = 0;
		var multiplier = 1;
		for (var i = 0; i < 8; i++) {
			number += getRandomByte() * multiplier;
			multiplier *= 256;
		}
		return number / 18446744073709551616;
	}
}

// Just make sure we've got slightly neat numbers for exports
function roundIsh(nr){
	return Math.round(nr * 10000000000) / 10000000000;
}
function rounder(nr){
	return Math.round(nr * 100) / 100;
}

// Convert degrees to radians
function radians(nr){
	return pi * (nr/180);
}

// Convert radians to degrees
function degrees(nr){
	return nr * (180/pi);
}