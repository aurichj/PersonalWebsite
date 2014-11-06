/** This function either randomly generates, if currentBlockSize == null, or selects from the options which aren't currentBlockSize if argument defined. **/
function getNextBlock(currentBlockSize){
	var blockOptions = new Array(2);
	var blockSize;
	if(currentBlockSize == null){
		var val = Math.random();
		if(val < 0.33333333){
			blockSize = "small";
		}else if(val > 0.66666666){
			blockSize = "medium";
		}else{
			blockSize = "large";
		}
	}else{
		if(currentBlockSize == "small"){
			blockOptions[0] = "medium";
			blockOptions[1] = "large";
		}else if(currentBlockSize == "medium"){
			blockOptions[0] = "small";
			blockOptions[1] = "large";
		}else if(currentBlockSize == "large"){
			blockOptions[0] = "small";
			blockOptions[1] = "medium";
		}
		if(Math.random() > 0.5){
			blockSize = blockOptions[0];
		}else{
			blockSize = blockOptions[1];
		}
	}
	return blockSize;
}

/**Generates the next cube based off the suplied texture and whether or not it is vertical**/
function getCube(vertical,blockSize, i){
	var x1,y1,x2,y2,a,scaleOutside, scaleInside;
	scaleOutside = 3;
	scaleInside = 2.7;
	if(blockSize == "small"){
		a = 1/2;
	}else if(blockSize == "medium"){
		a = 3/4;
	}else if(blockSize == "large"){
		a = 1;
	}
	if(vertical == false){
		x1 = 1*a*scaleOutside;
		x2 = 0.95*a*scaleInside;
		y1 = 0.66*a*scaleOutside;
		y2 = 0.63*a*scaleInside;
	}else{
		x1 = 0.66*a*scaleOutside;
		x2 = 0.63*a*scaleInside;
		y1 = 1*a*scaleOutside;
		y2 = 0.95*a*scaleInside;
	}
	var geometry = new THREE.BoxGeometry(x1,y1,0.00001);
	var material = new THREE.MeshBasicMaterial({color: 0x000000,transparent: true, opacity: 0, overdraw: true});
	var cube = new THREE.Mesh( geometry, material );	
	var geometry2 = new THREE.PlaneGeometry(x2,y2);
	var material2 = materials[index][i];
	var cube2 = new THREE.Mesh( geometry2, material2 );
	cube2.position.x = cube.position.x;
	cube2.position.y = cube.position.y;
	cube2.position.z = cube.position.z+0.0001;
	cube.add( cube2 );
	cube.geometry.computeBoundingBox();
	cube.name = 'parentCube';
	cube2.name = 'cube2';
	return cube;
}

/** Initialize the scene, set up a camera and renderer and add a point light at our camera position **/
function initScene(){
	clock = new THREE.Clock();
	clock.start();
	var height = window.innerHeight-80;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 1000 );
	//alert(webgl_detect());
	if (webgl_detect()){
		renderer = new THREE.WebGLRenderer({ canvas: canvas1, antialias: true });
	}else{
		renderer = new THREE.CanvasRenderer({ canvas: canvas1, antialias: true });
	}
	
	
	renderer.setSize( window.innerWidth, height );

	document.body.appendChild( renderer.domElement );
	camera.position.z = 3.75;
	camera.position.y = 0.7;
	var pointLight = new THREE.PointLight( 0xFFFFFF );
	pointLight.position.x = camera.position.x;
	pointLight.position.y = camera.position.y;
	pointLight.position.z = camera.position.z;
	scene.add(pointLight);
	rootNode = new THREE.Object3D();
}

/** detects if webgl available or if we must default to canvas **/
function webgl_detect(return_context)
{
    if (!!window.WebGLRenderingContext) {
        var canvas = document.createElement("canvas"),
             names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
           context = false;

        for(var i=0;i<4;i++) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter == "function") {
                    // WebGL is enabled
                    if (return_context) {
                        // return WebGL object if the function's argument is present
                        return true;
                    }
                    // else, return just true
					//alert('have webgl');
                    return true;
                }
            } catch(e) {/**alert('error on webgl');**/ return false;}
        }
        // WebGL is supported, but disabled
		//alert('webgl disabled');
        return false;
    }
    // WebGL not supported
	//alert('webgl not supported');
    return false;
}

/** Detects if two boxes have a collision. **/
function hasCollision(box1,box2){			
	var collision = false;
	var bounds1 = new THREE.Box3().setFromObject(box1);
	var bounds2 = new THREE.Box3().setFromObject(box2);
	var tolerance = 0.1;
	if( !(bounds1.max.x < bounds2.min.x+tolerance || bounds1.min.x > bounds2.max.x-tolerance || bounds1.min.y > bounds2.max.y-tolerance || bounds1.max.y < bounds2.min.y+tolerance) ){
		collision = true;
	}
	return collision;
}

/** Snaps dynamicBox onto a specified side of staticBox. **/
function snap(side, staticBox, dynamicBox){
	var bounds1 = new THREE.Box3().setFromObject(staticBox);
	var bounds2 = new THREE.Box3().setFromObject(dynamicBox);	
	var dynamicBoxXSize, dynamicBoxYSize;
	dynamicBoxXSize = bounds2.max.x - bounds2.min.x;
	dynamicBoxYSize = bounds2.max.y - bounds2.min.y;
	if(side == "top_left"){
		dynamicBox.position.x = bounds1.min.x + (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.max.y + (dynamicBoxYSize/2);
	}else if(side == "top_right"){
		dynamicBox.position.x = bounds1.max.x - (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.max.y + (dynamicBoxYSize/2);
	}else if(side == "bottom_left"){
		dynamicBox.position.x = bounds1.min.x + (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.min.y - (dynamicBoxYSize/2);
	}else if(side == "bottom_right"){
		dynamicBox.position.x = bounds1.max.x - (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.min.y - (dynamicBoxYSize/2);
	}else if(side == "right_top"){
		dynamicBox.position.x = bounds1.max.x + (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.max.y - (dynamicBoxYSize/2);		
	}else if(side == "right_bottom"){
		dynamicBox.position.x = bounds1.max.x + (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.min.y + (dynamicBoxYSize/2);		
	}else if(side == "left_top"){
		dynamicBox.position.x = bounds1.min.x - (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.max.y - (dynamicBoxYSize/2);		
	}else if(side == "left_bottom"){
		dynamicBox.position.x = bounds1.min.x - (dynamicBoxXSize/2);
		dynamicBox.position.y = bounds1.min.y + (dynamicBoxYSize/2);	
	}
}

/** Randomly generates a position. **/
function randomPosition(){
	var var1,var2,result;
	if(Math.random() < 0.5){
		var1 = "top";	
	}else{
		var1 = "bottom";
	}
	if(Math.random() < 0.5){
		var2 = "left";
	}else{
		var2 = "right";
	}
	if(Math.random() < 0.5){
		result = var1+"_"+var2;
	}else{
		result = var2+"_"+var1;
	}
	return result;
}

/** Powerhouse function that finds the optimal position for a dynamicCube inside the current array of cubes which satisfies all constraints. **/
function optimalPosition(previousCubeArray, dynamicCube, rootNode){
	var locations = ["top_left","top_right","bottom_left","bottom_right","right_top","right_bottom","left_top","left_bottom"];
	var minArea = [999999];
	var minPosition = new Array(1);
	var minCubeIndex = new Array(1);
	var rectangleRatio = new Array(1);
	
	var secondaryArea = new Array(1);
	var secondaryPosition = new Array(1);
	var secondaryCubeIndex = [-1];
	var secondaryRectangleRatio = new Array(1);
	getScreenCornerPositions();
	for(i = 0; i < previousCubeArray.length-1; i++){		
		for(j = 0; j < locations.length; j++){
			snap(locations[j],previousCubeArray[i],dynamicCube);
			var collision = false;
			for(k = 0; (k < previousCubeArray.length-1); k++){
				collision = collision || hasCollision(previousCubeArray[k],dynamicCube);
			}
			if(getArea(rootNode) <= minArea[0] && !collision && checkBounds(rootNode)){
				if(minArea[0] == 999999){
					minPosition[0] = locations[j];
					minCubeIndex[0] = i;
					minArea[0] = getArea(rootNode);
					rectangleRatio[0] = calculateRectangleRatio(rootNode);
				}else{
					minPosition[minPosition.length] = locations[j];
					minCubeIndex[minPosition.length] = i;
					minArea[minPosition.length] = getArea(rootNode);
					rectangleRatio[minPosition.length] = calculateRectangleRatio(rootNode);
				}
				
			}else if(!collision && checkBounds(rootNode)){
				if(secondaryCubeIndex[0] = -1){
					secondaryPosition[0] = locations[j];
					secondaryCubeIndex[0] = i;
					secondaryArea[0] = getArea(rootNode);
					secondaryRectangleRatio[0] = calculateRectangleRatio(rootNode);
				}else{
					secondaryPosition[secondaryPosition.length] = locations[j];
					secondaryCubeIndex[secondaryPosition.length] = i;
					secondaryArea[secondaryPosition.length] = getArea(rootNode);
					secondaryRectangleRatio[secondaryPosition.length] = calculateRectangleRatio(rootNode);
				}
			}
		}
	}
	var result = true;
	if(minArea[0] != 999999){
		var ourRatio = 2/3;
		var minRectangleRatio = Math.abs(rectangleRatio[0]-ourRatio);
		var index = 0;
		
		for(l = 0; l < rectangleRatio.length; l++){
			if(Math.abs(rectangleRatio[0] - ourRatio) < minRectangleRatio){
				minRectangleRatio = Math.abs(rectangleRatio[0] - ourRatio);
				index = l;
			}
		}
		snap(minPosition[index],previousCubeArray[minCubeIndex[index]],dynamicCube);
	}else if(secondaryCubeIndex != -1){
		var ourRatio = 2/3;
		var minRectangleRatio = Math.abs(secondaryRectangleRatio[0]-ourRatio);
		var index = 0;
		
		for(l = 0; l < secondaryRectangleRatio.length; l++){
			if(Math.abs(secondaryRectangleRatio[0] - ourRatio) < minRectangleRatio){
				minRectangleRatio = Math.abs(secondaryRectangleRatio[0] - ourRatio);
				index = l;
			}
		}
		snap(secondaryPosition[index],previousCubeArray[secondaryCubeIndex[index]],dynamicCube);
		alert("Using secondary");
	}else{
		result = false;
	}
	return result;
}

/** Gives the area of the supplied node. **/
function getArea(node){
	var bounds = new THREE.Box3().setFromObject(node);
	return (bounds.max.x - bounds.min.x)*(bounds.max.y - bounds.min.y)
}

/** Returns height/width of the node. **/
function calculateRectangleRatio(node){
	var bounds = new THREE.Box3().setFromObject(node);
	return (bounds.max.y - bounds.min.y)/(bounds.max.x - bounds.min.x);
}

/** Checks if our node sits inside the hard-coded bounds of the scene. **/
function checkBounds(node){
	var inBounds = true;
	var bounds = new THREE.Box3().setFromObject(node);
	if(bounds.min.x < Math.max(-5,screenCornerPositions[0].x-0.5) || bounds.max.x > Math.min(5,screenCornerPositions[1].x+0.5) || bounds.min.y < -1.25 || bounds.max.y > 3.5){
		inBounds = false;
	}
	return inBounds;
}

/** Adjusts the node to fit inside the bounds of the scene. **/
function boundYAdjust(node){
	var adjust = 0;
	var bounds = new THREE.Box3().setFromObject(node);
	if(bounds.min.y < -1.25){
		adjust = -1.25 - bounds.min.y;
	}else if (bounds.max.y > 3.5){
		adjust = 3.5 - bounds.max.y;
	}
	return adjust;
}

/** Centers the node on the scene. **/
function centerRootNode(node){
	var bounds = new THREE.Box3().setFromObject(node);
	var xAvg = (bounds.max.x - bounds.min.x)/2;
	var dif = xAvg - bounds.max.x;
	node.position.x = node.position.x+dif;
}

/** Builds debug cubes to visually outline the bounds of the scene. **/
function myDebug(){
	var test1 = new THREE.BoxGeometry(0.1,0.1,0.05);
	var material1 = new THREE.MeshLambertMaterial({color: 0x00FF00});
	var cube1 = new THREE.Mesh( test1, material1 );	
	var test2 = new THREE.BoxGeometry(0.1,0.1,0.05);
	var material2 = new THREE.MeshLambertMaterial({color: 0x00FF00});
	var cube2 = new THREE.Mesh( test2, material2 );	
	scene.add(cube1);
	scene.add(cube2);
	var test3 = new THREE.BoxGeometry(0.1,0.1,0.05);
	var material3 = new THREE.MeshLambertMaterial({color: 0x00FF00});
	var cube3 = new THREE.Mesh( test3, material3 );	
	var test4 = new THREE.BoxGeometry(0.1,0.1,0.05);
	var material4 = new THREE.MeshLambertMaterial({color: 0x00FF00});
	var cube4 = new THREE.Mesh( test4, material4 );	
	scene.add(cube3);
	scene.add(cube4);
	cube2.position.x = -5;
	cube1.position.x = 5;
	cube3.position.y = 3.5;
	cube4.position.y = -1.25;
	cube1.name = "debugcube1";
	cube2.name = "debugcube2";
	cube3.name = "debugcube3";
	cube4.name = "debugcube4";
}

/** Produces the buttons on the featured page which scroll through images. **/
function makeButtons(position){
	scene.remove(button1);
	scene.remove(button2);
	scene.remove(button3);
	var sphereMaterial1,sphereMaterial2,sphereMaterial3;
	sphereMaterial1 = new THREE.MeshBasicMaterial({color: 0xD0D0D0, overdraw: true});
	sphereMaterial2 = new THREE.MeshBasicMaterial({color: 0xD0D0D0, overdraw: true});
	sphereMaterial3 = new THREE.MeshBasicMaterial({color: 0xD0D0D0, overdraw: true});
	if(position == 1){
		sphereMaterial1 = new THREE.MeshBasicMaterial({color: 0x404040, overdraw: true});	
	}else if(position == 2){
		sphereMaterial2 = new THREE.MeshBasicMaterial({color: 0x404040, overdraw: true});
	}else if(position = 3){
		sphereMaterial3 = new THREE.MeshBasicMaterial({color: 0x404040, overdraw: true});
	}
	
	var radius = 0.04, segments = 40, rings = 40;
	button1 = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings),sphereMaterial1);
	button1.position.x = -0.7;
	button1.position.y = -1.7;
	button1.name = 'button1';
	scene.add(button1);
	button2 = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings),sphereMaterial2);
	button2.position.x = 0;
	button2.position.y = -1.7;
	button2.name = 'button2';
	scene.add(button2);
	button3 = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings),sphereMaterial3);
	button3.position.x = 0.7;
	button3.position.y = -1.7;
	button3.name = 'button3';
	scene.add(button3);
}

/** Rebuilds the scene with fresh new blocks. **/
function refreshBlocks(){
	scene.remove(rootNode);
	
	for (i = 0; i < imageCount; i++) {		
		rootNode.remove(cubeList[i]);		
	}
	//rootNode.update();
	rootNode = new THREE.Object3D();
	cubeList = new Array(1);
	cubePositionList = new Array(imageCount);
	bezierCurvesIn = new Array(imageCount);
	bezierCurvesOut = new Array(imageCount);
	iterator = new Array(imageCount);
	
	for (i = 0; i < imageCount; i++) {
		var nextBlock = getNextBlock(null);
		if(i == 0){
			cubeList[i] = getCube(imageOrientation[index][i]  == 'Vertical',nextBlock,i);					
			rootNode.add(cubeList[i]);
			if(!checkBounds(rootNode)){
				cubeList[i].position.y = cubeList[i].position.y + boundYAdjust(rootNode);
			}
		}else{
			cubeList[i] = getCube(imageOrientation[index][i]  == 'Vertical',nextBlock,i);
			rootNode.add(cubeList[i]);
			if(!optimalPosition(cubeList, cubeList[i], rootNode)){
				rootNode.remove(cubeList[i]);
				cubeList[i] = getCube(imageOrientation[index][i] == 'Vertical',"small",i);
				rootNode.add(cubeList[i]);
				if(!optimalPosition(cubeList, cubeList[i], rootNode)){
					rootNode.remove(cubeList[i]);
				}
			}				
		}
		//cubeList[i].position.z = Math.random()*0.5;	
		cubeList[i].name = 'cubesssss';
	}
	centerRootNode(rootNode);
	//myDebug();
	for(i = 0; i < imageCount; i++){
		cubePositionList[i] = new Array(3);
		cubePositionList[i][0] = cubeList[i].position.x;
		cubePositionList[i][1] = cubeList[i].position.y;
		cubePositionList[i][2] = cubeList[i].position.z;
		cubeList[i].position.x = 10;
		//cubeList[i].position.y = 0;
		cubeList[i].position.z = 0;
		
		bezierCurvesIn[i] = new THREE.QuadraticBezierCurve3();
		bezierCurvesIn[i].v0 = new THREE.Vector3(10, cubePositionList[i][1], cubePositionList[i][2]);
		bezierCurvesIn[i].v1 = new THREE.Vector3(5, cubePositionList[i][1], cubePositionList[i][2]);
		bezierCurvesIn[i].v2 = new THREE.Vector3(cubePositionList[i][0], cubePositionList[i][1], cubePositionList[i][2]);	
		bezierCurvesOut[i] = new THREE.QuadraticBezierCurve3();
		bezierCurvesOut[i].v0 = new THREE.Vector3(cubePositionList[i][0], cubePositionList[i][1], cubePositionList[i][2]);
		bezierCurvesOut[i].v1 = new THREE.Vector3(-5, cubePositionList[i][1], cubePositionList[i][2]);
		bezierCurvesOut[i].v2 = new THREE.Vector3(-10, cubePositionList[i][1], cubePositionList[i][2]);	
		iterator[i] = -1*Math.random();
	}
	//alert(cubeList.length);
	scene.add(rootNode);
}

/** Adjusts the state of operations depending on if blocks are coming inbound or outbound to the screen to allow for blocks to enter. **/
function enterBlocks(){
	if(!inBound && !outBound){
		inBound = true;
	}else if(!inBound && outBound){
		//Currently outBound!
	}else if(inBound && !outBound){
		//Already inBound!
	}else if(inBound && outBound){
		counter = 0;
		refreshBlocks();
		outBound = false;
	}
}

/** Adjusts the state of operations depending on if blocks are coming inbound or outbound to the screen to allow for blocks to exit. **/
function exitBlocks(){
	for(i = 0; i < cubeList.length; i++){
		iterator[i] += -1 *Math.random();
	}
	if(!inBound && !outBound){
		outBound = true;
	}else if(!inBound && outBound){
		//Currently outBound!
	}else if(inBound && !outBound){
		outBound = true;
		inBound = false;
	}else if(inBound && outBound){
		//Undefined
	}
}

/** AJAX wrapper to get list of images off the server. **/
function getImages(){
var images = '';
	jQuery.ajax({            
			url: "featured1.php", 
		type: "GET",          
		dataType: "HTML", 
		async: false,
			success: function( data ) { 
				images = data;					
			},
			error: function(jqXHR, data ) {        
		alert ('Ajax request Failed.');    
		}
		});  
	var imgArr = new Array(4);
	imgArr[0] = images.split("|")[7].substring(0, images.split("|")[7].length - 1).split(",");
	imgArr[1] = images.split("|")[1].substring(0, images.split("|")[1].length - 1).split(",");
	imgArr[2] = images.split("|")[3].substring(0, images.split("|")[3].length - 1).split(",");
	imgArr[3] = images.split("|")[5].substring(0, images.split("|")[5].length - 1).split(",");
	return imgArr;
}

/** Builds the popup when an image is clicked. **/
function buildPopupCube(i,textureSrc,orientation){
	var x1,y1,x2,y2,a,scaleOutside,scaleInside;
	 scaleOutside = 1; scaleInside = 1;
	 if(orientation == null){
		if(imageOrientation[index][i] == 'Vertical'){
			a = 1.5;
			x1 = 0.67*a*scaleOutside;
			x2 = 0.63*a*scaleInside;
			y1 = 1*a*scaleOutside;
			y2 = 0.95*a*scaleInside;	
		}else{
			a = 2;
			x1 = 1*a*scaleOutside;
			x2 = 0.95*a*scaleInside;
			y1 = 0.67*a*scaleOutside;
			y2 = 0.63*a*scaleInside;
		}
	}else{
		if(orientation){
			a = 1.5;
			x1 = 0.67*a*scaleOutside;
			x2 = 0.63*a*scaleInside;
			y1 = 1*a*scaleOutside;
			y2 = 0.95*a*scaleInside;	
		}else{
			a = 2;
			x1 = 1*a*scaleOutside;
			x2 = 0.95*a*scaleInside;
			y1 = 0.67*a*scaleOutside;
			y2 = 0.63*a*scaleInside;
		}
	}

	var geometry2 = new THREE.PlaneGeometry(x2,y2);
	var material2;
	
	if(textureSrc == null){
		material2 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, overdraw: true,map: THREE.ImageUtils.loadTexture("images/highDef/"+images[index][i].split("/")[2])});
	}else{
		//alert(textureSrc);
		material2 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, overdraw: true,map: THREE.ImageUtils.loadTexture("../"+textureSrc)});
	}
	popupCube = new THREE.Mesh( geometry2, material2 );
	
	var geometry = new THREE.BoxGeometry(x1,y1,0.05);
	var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, overdraw: true});
	var cube = new THREE.Mesh( geometry, material );
	var geometry3 = new THREE.BoxGeometry(x1*1.005,y1*1.005,0.05);
	var material3 = new THREE.MeshBasicMaterial({color: 0x000000, overdraw: true});
	var cube3 = new THREE.Mesh( geometry3, material3 );	
	popupCube.add( cube );
	popupCube.add( cube3 );
	popupCube.position.x = camera.position.x;
	popupCube.position.y = camera.position.y;
	popupCube.position.z = camera.position.z-1;
	cube.position.z = -0.06;
	cube3.position.z = -0.061;
	
	if(orientation == null){
		scene.add(popupCube);

	}else{
		popupCube.position.x = -rootNode.position.x;
		popupCube.position.y = camera.position.y-rootNode.position.y;
		rootNode.add(popupCube);		
		//alert(rootNode.positon.y+" "+popupCube.position.y+" "+camera.position.y);
	}
}

/** If one of the main page buttons is clicked, this function facilitates that page change. **/
function refreshPage(){
	if(page == "featured"){
		cubeList = new Array(1);
		cubePositionList = new Array(imageCount);
		bezierCurvesIn = new Array(imageCount);
		bezierCurvesOut = new Array(imageCount);
		iterator = new Array(imageCount);
		makeButtons(index);
		inBound = false;
		outBound = false;
		index = 2;
		counter = 0;
		idle = false;
		refreshBlocks();
		enterBlocks();
	}else if(page == "gallery"){
		//alert(window.innerHeight/window.innerWidth);
		if( window.innerHeight/window.innerWidth < 0.65){
			makeGallery(0,5);
		}else if(window.innerHeight/window.innerWidth < 1){
			makeGallery(1,4);
		}else{
			makeGallery(2,3);
		}
	}else if(page == "artist"){
		buildPage("artist");
	}else if(page == "contact"){
		buildPage("contact");
	}
}

/** Builds either the "contact" or "artist" pages. **/
function buildPage(page){
	var x1,y1,x2,y2,a,scaleOutside,scaleInside;
	scaleOutside = 1.05; scaleInside = 1;
	a = 2;
	if(window.innerHeight/window.innerWidth > 1.05){
		x1 = 0.4998*a*scaleOutside;
		x2 = 0.47*a*scaleInside;
		y1 = 0.67*a*scaleOutside;
		y2 = 0.63*a*scaleInside;
	}else{
		x1 = 1*a*scaleOutside;
		x2 = 0.95*a*scaleInside;
		y1 = 0.67*a*scaleOutside;
		y2 = 0.63*a*scaleInside;
	}
	var material2;
	var geometry2 = new THREE.PlaneGeometry(x2,y2);
	if(page == "artist"){
		rootNode = new THREE.Mesh( geometry2, contactMaterial );	
	}else if(page == "contact"){
		material2 = new THREE.MeshBasicMaterial({color: 0xFFFFFF, overdraw: true, map: THREE.ImageUtils.loadTexture("images/contact.jpg")});
		rootNode = new THREE.Mesh( geometry2, material2 );	
	}	
	
	var geometry = new THREE.BoxGeometry(x1,y1,0.05);	
	var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, overdraw: true});
	
	var cube = new THREE.Mesh( geometry, material );	
	rootNode.add( cube );
	rootNode.position.x = camera.position.x;
	rootNode.position.y = camera.position.y;
	rootNode.position.z = camera.position.z-1;
	cube.position.z = -0.06;	
	scene.add(rootNode);
}

/** Builds the gallery page. **/
function makeGallery(minSize,maxSize){
	rootNode = new THREE.Object3D();
	var columnsCount = new Array(5);
	var columnsIndex = new Array(5);
	var columnsOrientation = new Array(5);
	var columns = new Array(5);
	var index = 0;
	var count = 0;
	
	//var minSize, maxSize;
	//minSize = 0; maxSize = 5;
	for(i = minSize; i < maxSize; i++){
		columnsCount[i] = 0;
		columnsIndex[i] = 0;
	}
	
	for(i = 0; i < images[0].length; i++){
		columnsCount[index]++;
		index++;
		if(index > maxSize -1){
			index = minSize;
		}
	}
	for(i = minSize; i < maxSize; i++){
		columns[i] = new Array(columnsCount[i]);
		columnsOrientation[i] = new Array(columnsCount[i]);
	}
	index = minSize;
	for(i = 0; i < images[0].length; i++){
		if(columnsCount[index] > 0){
			columnsOrientation[index][columnsIndex[index]] = imageOrientation[0][count];
			columns[index][columnsIndex[index]] = getGalleryCube(columnsOrientation[index][columnsIndex[index]] == "Vertical", count);
			rootNode.add(columns[index][columnsIndex[index]]);
			columnsIndex[index]++;
			count++			
		}		
		index++;
		if(index > maxSize -1){
			index = minSize;
		}
	}
	for(i = minSize; i < maxSize; i++){
		for(j = 0; j < columns[i].length; j++){
			var xVal;
			if(i == 0){
				xVal = -4.18;
				if(j == columns[0].length-1){
					minScreenY = columns[0][j].position.y - 1.386;
				}
			}else if(i == 1){
				xVal = -2.09;
			}else if(i == 2){
				xVal = 0;
			}else if(i == 3){
				xVal = 2.09;
			}else if(i == 4){
				xVal = 4.18;
			}
			columns[i][j].position.x = xVal;
			if(j == 0){
				columns[i][j].position.y = 3;
			}else{
				if(columnsOrientation[i][j] == "Vertical"){
					if(columnsOrientation[i][j-1] == "Vertical"){
						columns[i][j].position.y = columns[i][j-1].position.y - 1.386;
					}else{
						columns[i][j].position.y = columns[i][j-1].position.y - 1.386;
					}					
				}else{
					if(columnsOrientation[i][j-1] == "Vertical"){
						columns[i][j].position.y = columns[i][j-1].position.y - 1.386;
					}else{
						columns[i][j].position.y = columns[i][j-1].position.y - 1.386;
					}					
				}
			}				
		}		
				
	}		
	scene.add(rootNode);
}

/** Generates the next cube for the gallery based off the suplied texture and whether or not it is vertical **/
function getGalleryCube(vertical, i){
	var x,y,scale;
	scale = 2;
	if(vertical == false){
		x = 0.95*scale;
		y = 0.63*scale;
	}else{
		x = 0.4177*scale;
		y = 0.63*scale;
	}
	var geometry2 = new THREE.PlaneGeometry(x,y);
	var material2 = materials[0][i];
	var cube2 = new THREE.Mesh( geometry2, material2 );
	cube2.name = images[0][i];
	return cube2;
}

/** Gets the scene positions of the corners of the user's screen. **/
function getScreenCornerPositions(){
	var vector = new THREE.Vector3(-1,1,0.5 );
	var projector = new THREE.Projector();
	projector.unprojectVector( vector, camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	var posTopLeft = camera.position.clone().add( dir.multiplyScalar( distance ) );
	posTopLeft.x = posTopLeft.x + 0.5;
	
	vector = new THREE.Vector3(1,1,0.5 );
	projector.unprojectVector( vector, camera );
	dir = vector.sub( camera.position ).normalize();
	distance = - camera.position.z / dir.z;
	var posTopRight = camera.position.clone().add( dir.multiplyScalar( distance ) );
	posTopRight.x = posTopRight.x - 0.5;
	
	vector = new THREE.Vector3(1,-1,0.5 );
	projector.unprojectVector( vector, camera );
	dir = vector.sub( camera.position ).normalize();
	distance = - camera.position.z / dir.z;
	var posBotRight = camera.position.clone().add( dir.multiplyScalar( distance ) );
	posBotRight.x = posBotRight.x - 0.5;
	posBotRight.y = posBotRight.y + 0.5;
	
	vector = new THREE.Vector3(-1,-1,0.5 );
	projector.unprojectVector( vector, camera );
	dir = vector.sub( camera.position ).normalize();
	distance = - camera.position.z / dir.z;
	var posBotLeft = camera.position.clone().add( dir.multiplyScalar( distance ) );
	posBotLeft.x = posBotLeft.x + 0.5;
	posBotLeft.y = posBotLeft.y + 0.5;
	
	////[0]                [1]
	////
	////
	////[3]                [2]
	screenCornerPositions[0] = posTopLeft;
	screenCornerPositions[1] = posTopRight;
	screenCornerPositions[2] = posBotRight;
	screenCornerPositions[3] = posBotLeft;
}