<?php
define('ROOT', dirname(__FILE__));
define('BASE', '/dev/mozfest/trunk/public_html/');
require_once(ROOT.'/php/common.inc.php');

define('PART', 'cross');
define('DEBUG', true);

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US"> 
 
	<head profile="http://gmpg.org/xfn/11"> 
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
		<title>Robot - MozFest</title>
		
		<link type="text/css" href="css/black-tie/jquery-ui-1.8.16.custom.css" rel="stylesheet" />	
		<link type="text/css" href="css/blueprint.css" rel="stylesheet" />
		
		<script type="text/javascript" src="<?=BASE?>js/jquery-1.6.2.min.js"></script>
		
		<script type="text/javascript" src="<?=BASE?>js/jquery-ui-1.8.16.custom.min.js"></script>
		
		<script type="text/javascript" src="<?=BASE?>js/Three.js"></script>
		<script type="text/javascript" src="<?=BASE?>js/Stats.js"></script>
		
		<script type="text/javascript" src="<?=BASE?>js/RequestAnimationFrame.js"></script>
		
		<script type="text/javascript" src="<?=BASE?>js/common.js"></script>
		
		<script type="text/javascript" src="<?=BASE?>js/parts/base.js"></script>
		<script type="text/javascript" src="<?=BASE?>js/parts/round.js"></script>
		
		<script type="text/javascript" src="<?=BASE?>js/construct.js"></script>
		
		<script type="text/javascript">
		<!--
		
// PRESET VARIABLES
var debug = <?=DEBUG?>;
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

		-->
		</script>
	</head>
	<body>
	
		<div id="canvas"></div>
		
		<div id="container">
			
			<div id="dynamics">

				<div id="alerts">
					<div id="loader">&nbsp;</div>
					<span id="message" class="error">Javascript is still loading or not running as expected.<br />This page uses WebGL (works in google chrome and most firefox browsers)<br />Find out how to get WebGL <a href="http://get.webgl.org/">here</a></span>
				</div>
							
			</div>
			
		</div>
		
	</body>
</html>