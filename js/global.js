// PRESET VARIABLES
var debug = true;
var name, vessel;
var tempString = '<?=$tempString?>';
var pi = Math.PI;
var interVal;
		
var oldNow = false;
var oldAutoY = 0
var newAutoY = 0;

var mouseState = 0;
var mouseFac = 1.0;
		
var targetRotationY = 0;
var targetRotationYOnMouseDown = 0;
var targetRotationX = 0;
var targetRotationXOnMouseDown = 0;

var mouseHeader = false;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
	
var has_gl;
var SCREEN_WIDTH, SCREEN_HEIGHT;
var renderer, camParent, camera, scene, canvas, stats;
var modelParent, Model, Models, Material;
var rendertype;
var facemat, wiremat, blue, black, white, orange;

var sceneLimit = 4000.0;
var sceneHalf = sceneLimit * 0.5;

var building = true;
var checkTargets = false;
var partVar = 4;
var infancy = 1500;
var partOffset = 192;
var activeParts = new Array();
var Connectors = new Array();
var newConnectors = new Array();

var rendertype = false;

var blue = 0x03106D;
var white = 0xFFFFFF;
var grey = 0xCCCCCC;
var black = 0x000000;
var orange = 0xFF6600;

var botList = ['base', 'round'];
var partList = ['head', 'arm_l', 'arm_r', 'leg_l', 'leg_r'];

var partRand, frameRand;
