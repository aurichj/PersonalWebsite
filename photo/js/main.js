//My code
var loadingMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("images/loading.jpg"),color: 0xFFFFFF, overdraw: true });
var dragging = false;
var clicked = false;
var page = "featured";
var loading = true;
var popup = false;
var imageCount = 9;
var images = new Array(4);
images = getImages();
images[0].reverse();
var materials = new Array(4);
var stackX = 0;
var stackY = 0;
materials[0] = new Array(images[0].length);
materials[1] = new Array(images[1].length);
materials[2] = new Array(images[2].length);
materials[3] = new Array(images[3].length);
var imageOrientation = new Array(4);
imageOrientation[0] = new Array(images[0].length);
imageOrientation[1] = new Array(images[1].length);
imageOrientation[2] = new Array(images[2].length);
imageOrientation[3] = new Array(images[3].length);
var screenCornerPositions = new Array(4);
var minScreenY;
var maxScreenX = 5.72;
var maxScreenY = 3.577;
var startMousePosition = new THREE.Vector3();
var clock, time, delta;
var frames = 60;
var delayOne = false;
for(i = 0; i < 4; i++){
	screenCornerPositions[i] = new THREE.Vector3();
}

var contactMaterial;
if(window.innerHeight/window.innerWidth > 1.05){
	contactMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, overdraw: true, map: THREE.ImageUtils.loadTexture("images/artistVertical.jpg")});
}else{
	contactMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, overdraw: true, map: THREE.ImageUtils.loadTexture("images/artist.jpg")});
}
for(i = 0; i < images[0].length; i++){
	images[0][i] = 'images/gallery/'+images[0][i];
	materials[0][i] = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(images[0][i]),color: 0xFFFFFF, overdraw: true });
}
for(i = 0; i < images[1].length; i++){
	images[1][i] = 'images/featured1/'+images[1][i];
	materials[1][i] = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(images[1][i]),color: 0xFFFFFF, overdraw: true });
}
for(i = 0; i < images[2].length; i++){
	images[2][i] = 'images/featured2/'+images[2][i];
	materials[2][i] = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(images[2][i]),color: 0xFFFFFF, overdraw: true });
}
for(i = 0; i < images[3].length; i++){
	images[3][i] = 'images/featured3/'+images[3][i];
	materials[3][i] = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(images[3][i]),color: 0xFFFFFF, overdraw: true });
}

var projector = new THREE.Projector();
var mouseVector = new THREE.Vector3();
var inBound = false;
var outBound = false;
var index = 2;
var bgColor = 0xFFFFFF;
var scene,camera,renderer,rootNode;
var button1,button2,button3;
var cubeList,cubePositionList,bezierCurvesIn,bezierCurvesOut,iterator;
var counter = 0;
var idle = false;
var popupCube;
initScene();
cubeList = new Array(1);
cubePositionList = new Array(imageCount);
bezierCurvesIn = new Array(imageCount);
bezierCurvesOut = new Array(imageCount);
iterator = new Array(imageCount);
//parse URL bar
var urlBar = document.location.href;
var targetImage;
urlBar = urlBar.split("/")[3];
if(urlBar == "" || urlBar == "featured"){
	makeButtons(index);
}else{
	targetImage = urlBar.split("~")[1];
}
urlBar = urlBar.split("~")[0];
//alert(urlBar);
//alert(targetImage);
//myDebug();

var loadinGeom = new THREE.BoxGeometry(3.333,1,0.01);	
var loadingCube = new THREE.Mesh( loadinGeom, loadingMaterial );
var addedLoading = false;

function getWidthAndHeight(x,y,image) {
	
	var orientation = 'Horizontal';
	if(image.height > image.width){
		orientation = 'Vertical';
	}
	imageOrientation[x][y] = orientation;

    return true;
}

function render() {
	
	//time = clock.getElapsedTime();
	delta = clock.getDelta();
	//alert(delta+" "+time);
	if(loading){
		if(loadingMaterial.map.image != undefined && !addedLoading){
			scene.add(loadingCube);
			loadingCube.position.y = 1;
			addedLoading = true;
		}
		var ready = true;
		for(i = 0; i < 4; i++){
			for(j = 0; j < images[i].length; j++){
				if(materials[i][j].map.image != undefined && !(imageOrientation[i][j] == "Vertical" || imageOrientation[i][j] == "Horizontal")){
					getWidthAndHeight(i,j,materials[i][j].map.image)
				}
				ready = ready && (imageOrientation[i][j] == 'Horizontal' || imageOrientation[i][j] == 'Vertical');			
			}
		}
		if(ready){
			//alert('unpausing');
			if(loading){
				scene.remove(loadingCube);
			}
			loading = false;
			if(urlBar == "gallery"){
				scene.remove(rootNode);
				document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				document.getElementById("gallery").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				page = "gallery";		
				popup = false;
				refreshPage();
				getScreenCornerPositions();
				if(targetImage != "" && targetImage != null){
					for(i = 0; i < images[0].length; i++){
						targetImage = targetImage.replace(" ",'');
						targetImage = targetImage.replace(".",'');
						targetImage = targetImage.replace("(",'');
						targetImage = targetImage.replace(")",'');
						targetImage = targetImage.replace(" ",'');
						targetImage = targetImage.replace("%20",' ');
						targetImage = targetImage.replace(' ','');
						var compare = images[0][i].split("/")[2];
						compare = compare.replace(" ",'');
						compare = compare.replace(".",'');
						compare = compare.replace("(",'');
						compare = compare.replace(")",'');
						compare = compare.replace(" ",'');
						compare = compare.replace(' ','');
						if(targetImage == compare){
							popup = true;
							buildPopupCube(null,images[0][i],imageOrientation[0][i] == "vertical");
						}
					}
				}
				rootNode.position.x = 0;
				rootNode.position.y = 0;
			}else if(urlBar == "artist"){
				scene.remove(rootNode);
				document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				document.getElementById("artist").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
				//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
				page = "artist";
				popup = false;
				refreshPage();
			}else{
				refreshBlocks();
				enterBlocks();
			}
		}else{
			//alert('we are paused');
		}
	}else if(!popup && page == "featured"){
		if(inBound && !outBound){
			for (i = 0; i < cubeList.length; i++) {
				if(iterator[i] >= 0){
					var cubePos = bezierCurvesIn[i].getPoint(iterator[i]);					
					cubeList[i].position.x = cubePos.x;
					cubeList[i].position.y = cubePos.y;
					cubeList[i].position.z = cubePos.z;
				}
				if(iterator[i] < 1){						
					iterator[i] += delta/0.3;//0.05;					
				}
				if(iterator[i] > 1){
					iterator[i] = 1;
				}
			}
			idle = true;
			for(j = 0; j < cubeList.length; j++){
				idle = idle && (iterator[j] == 1);
			}					
		}else if(outBound & !inBound){
			idle = false;
			for (i = 0; i < cubeList.length; i++) {
				if(iterator[i] >= 1){					
					var cubePos = bezierCurvesOut[i].getPoint(iterator[i]-1);					
					cubeList[i].position.x = cubePos.x;
					cubeList[i].position.y = cubePos.y;
					cubeList[i].position.z = cubePos.z;
				}
				if(iterator[i] < 2){						
					iterator[i] += delta/0.3;//0.05;					
				}
				if(iterator[i] > 2){
					iterator[i] = 2;							
				}
			}
			var done = true;
			for(j = 0; j < cubeList.length; j++){
				done = done && (iterator[j] == 2);
			}
			if(done){
				inBound = true;
				enterBlocks();
			}
		}
			
		if(counter > 600){
			exitBlocks();
			index++;
			if(index == 4){
				index = 1;
			}
			makeButtons(index);
			counter = -1;
		}if(counter >= 0){
			counter++;
		}
	}
	
	if(page == "featured"){
		if(idle){
			if(delayOne == true){
				frames = 5;
			}else{
				delayOne = true;
			}
		}else{
			delayOne = false;
			frames = 60;
		}
	}else if(page == "gallery"){
		if(clicked){
			frames = 30;
		}else{
			frames = 25;
		}
	}else{
		frames = 5;
	}		

	setTimeout( function() {

        requestAnimationFrame(render);		

    }, 1000 / frames );
						
	renderer.setClearColor( bgColor, 1);				
	renderer.render(scene, camera);
}
render();

var touchSupported = isTouchSupported();

if(!touchSupported){
window.addEventListener( 'mousedown', onMouseClick, false );
}			
window.addEventListener( 'mouseup', onMouseUp, false );
window.addEventListener("mousemove", dragAround,false);
window.addEventListener("onmousemove", dragAround,false);
window.addEventListener("mousewheel", scrollAround, false);
window.addEventListener("DOMMouseScroll", scrollAround, false);
if(touchSupported){
	window.addEventListener("touchmove", dragAround,false);
	window.addEventListener("touchstart", onMouseClick,false);
	window.addEventListener("touchend", onMouseUp,false);
}
window.addEventListener( 'resize', onWindowResize, false );




function onWindowResize(){
	var height = window.innerHeight-80;
	camera.aspect = window.innerWidth / height;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, height );	
	if(page == "gallery"){
		getScreenCornerPositions();
		rootNode.position.x = 0;
		rootNode.position.y = 0;
		//refreshPage();
	}
}

function isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
 
    if (msTouchEnabled || generalTouchEnabled) {
        return true;
    }
    return false;
}

function scrollAround(e){
	if(page == "gallery" && !popup){		
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		var yDiff = delta==-1?0.2:-0.2;
		var bounds = new THREE.Box3().setFromObject(rootNode);		
		if( !(screenCornerPositions[0].y > bounds.max.y && screenCornerPositions[3].y < bounds.min.y)){
			if( !((screenCornerPositions[3].y == bounds.min.y && yDiff < 0) || (screenCornerPositions[0].y == bounds.max.y && yDiff > 0)) ){
				if(screenCornerPositions[0].y > bounds.max.y+yDiff){
					if( yDiff < 0 ){
						if((rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.max.y) > 0.06){
							rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.max.y;
						}
					}else{
						rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.max.y;
					}						
				}else if(screenCornerPositions[3].y < bounds.min.y+yDiff){
					if(yDiff > 0){
						if((rootNode.position.y+yDiff + screenCornerPositions[3].y - bounds.min.y) < 0.06){
							rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.min.y;
						}
					}else{
						rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[3].y - bounds.min.y;
					}
				}else{
					rootNode.position.y = rootNode.position.y+yDiff;
				}
			}
		}				
	}
}

function dragAround(e){
	if(page == "gallery" && clicked && !popup){		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		if(touchSupported){
			if(x == 0 && y == 0){
				x = e.touches[0].clientX;
				y = e.touches[0].clientY;
			}
		}
		var vector = new THREE.Vector3(( x / window.innerWidth ) * 2 - 1,- ( y / (window.innerHeight-80) ) * 2 + 1, 0.5 );
		var projector = new THREE.Projector();
		projector.unprojectVector( vector, camera );
		var dir = vector.sub( camera.position ).normalize();
		var distance = - camera.position.z / dir.z;
		var currentPos = camera.position.clone().add( dir.multiplyScalar( distance ) );
		var xDiff = currentPos.x - startMousePosition.x;
		var yDiff = currentPos.y - startMousePosition.y;
		if(Math.abs(xDiff) > 0.2 || Math.abs(yDiff) > 0.2 && y > 79){
			//alert(xDiff+" "+yDiff);
			dragging = true;
			//alert(Math.abs(xDiff)+" "+Math.abs(yDiff));
			if(touchSupported && Math.abs(xDiff) < 0.16 && Math.abs(yDiff) < 0.16){
				dragging = false;
			}
		}
		if(dragging){
			var bounds = new THREE.Box3().setFromObject(rootNode);
			if( !(screenCornerPositions[0].x < bounds.min.x && screenCornerPositions[1].x > bounds.max.x)){
				if( !((screenCornerPositions[1].x == bounds.max.x && xDiff < 0) || (screenCornerPositions[0].x == bounds.min.x && xDiff > 0)) ){				
					if(screenCornerPositions[0].x < bounds.min.x+xDiff){
						if( xDiff > 0 ){
							if((rootNode.position.x+xDiff + screenCornerPositions[0].x - bounds.max.x) > 0.06){
								rootNode.position.x = rootNode.position.x+xDiff + screenCornerPositions[0].x - bounds.min.x;
							}
						}else{
							rootNode.position.x = rootNode.position.x+xDiff + screenCornerPositions[0].x - bounds.min.x;
						}
					}else if(screenCornerPositions[1].x > bounds.max.x+xDiff){
						if(xDiff < 0){
							if((rootNode.position.x+xDiff + screenCornerPositions[1].x - bounds.max.x) > 0.06){
								rootNode.position.x = rootNode.position.x+xDiff + screenCornerPositions[1].x - bounds.max.x;
							}
						}else{
							rootNode.position.x = rootNode.position.x+xDiff + screenCornerPositions[1].x - bounds.max.x;
						}					
					}else{
						rootNode.position.x = rootNode.position.x+xDiff;
					}
				}
			}
			
			if( !(screenCornerPositions[0].y > bounds.max.y && screenCornerPositions[3].y < bounds.min.y)){
				if( !((screenCornerPositions[3].y == bounds.min.y && yDiff < 0) || (screenCornerPositions[0].y == bounds.max.y && yDiff > 0)) ){
					if(screenCornerPositions[0].y > bounds.max.y+yDiff){
						if( yDiff < 0 ){
							if((rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.max.y) > 0.06){
								rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.max.y;
							}
						}else{
							rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.max.y;
						}						
					}else if(screenCornerPositions[3].y < bounds.min.y+yDiff){
						if(yDiff > 0){
							if((rootNode.position.y+yDiff + screenCornerPositions[3].y - bounds.min.y) < 0.06){
								rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[0].y - bounds.min.y;
							}
						}else{
							rootNode.position.y = rootNode.position.y+yDiff + screenCornerPositions[3].y - bounds.min.y;
						}
					}else{
						rootNode.position.y = rootNode.position.y+yDiff;
					}
				}
			}
			startMousePosition = currentPos;
		}		
	}
}

function onMouseUp(e){
	var x = e.clientX==undefined?e.layerX:e.clientX;
	var y = e.clientY==undefined?e.layerY:e.clientY;
	if(touchSupported){
			if(x == 0 && y == 0){
				x = e.touches[0].clientX;
				y = e.touches[0].clientY;
			}
	}
	if(!dragging && !popup && y > 79 && page == "gallery"){
		var distance = 1-( (window.innerHeight)/window.innerHeight);
		var height = window.innerHeight-80;
		var width = window.innerWidth;
		mouseVector.x = 2 * (x / width) - 1;
		mouseVector.y = /**2*distance+**/(1 - 2 * ( (y-80) / height ));
		var projector = new THREE.Projector();
		var ray = projector.pickingRay( mouseVector, camera ); // (mouse coord are in screenspace and must be [-1, 1])
		var objects = ray.intersectObjects( scene.children,true );
		if(objects.length > 0){
			popup = true;
			var imageSource = "images/highDef/"+objects[0].object.name.split("/")[2];
			var bounds = new THREE.Box3().setFromObject(objects[0].object);
			buildPopupCube(null,imageSource,(bounds.max.y-bounds.min.y)/(bounds.max.x-bounds.min.x) > 1);
			var name = objects[0].object.name.split("/")[2];
			name = name.replace(" ",'');
			name = name.replace(".",'');
			name = name.replace("(",'');
			name = name.replace(")",'');
			name = name.replace(" ",'');
			//alert(name);
			window.history.pushState('gallery', 'Joshua Aurich - Photography.', '/gallery~'+name);
		}
	}else if(!dragging && popup && y > 79 && page == "gallery"){
		//alert("remove popup");
		popup = false;
		rootNode.remove(popupCube);
		scene.remove(popupCube);
		window.history.pushState('gallery', 'Joshua Aurich - Photography.', '/gallery');
	}
	dragging = false;
	clicked = false;
}

function onMouseClick(e){

	var x = e.clientX==undefined?e.layerX:e.clientX;
	var y = e.clientY==undefined?e.layerY:e.clientY;
	//alert(e.touches[0].clientX+" "+e.touches[0].clientX);
	if(touchSupported){
			if(x == 0 && y == 0){
				x = e.touches[0].clientX;
				y = e.touches[0].clientY;
			}
	}
	//alert(x+" "+y);
	if(!popup && y > 79){
		if(page == "featured"){
			var distance = 1-( (window.innerHeight)/window.innerHeight);
			var height = window.innerHeight-80;
			var width = window.innerWidth;
			mouseVector.x = 2 * (x / width) - 1;
			mouseVector.y = /**2*distance+**/(1 - 2 * ( (y-80) / height ));
			var projector = new THREE.Projector();
			var ray = projector.pickingRay( mouseVector, camera ); // (mouse coord are in screenspace and must be [-1, 1])
			var objects = ray.intersectObjects( scene.children,true );
			if(objects.length > 0 && idle){	
				var intersection = objects[0];
				if(intersection.object == button1){
					index = 1;
					exitBlocks();
					makeButtons(index);
					counter = -1;
				}else if(intersection.object == button2){
					index = 2;
					exitBlocks();
					makeButtons(index);
					counter = -1;
				}else if(intersection.object == button3){
					index = 3
					exitBlocks();
					makeButtons(index);
					counter = -1;
				}else{					
					for(i = 0; i < imageCount; i++){				
						if(objects[0].object == cubeList[i] || objects[1].object == cubeList[i]){				
							buildPopupCube(i,null,null);
							popup = true;
						}
					}
				}
			}
		}else if(page == "gallery"){			
			var vector = new THREE.Vector3(( x / window.innerWidth ) * 2 - 1,- ( y / (window.innerHeight-80) ) * 2 + 1, 0.5 );
			var projector = new THREE.Projector();
			projector.unprojectVector( vector, camera );
			var dir = vector.sub( camera.position ).normalize();
			var distance = - camera.position.z / dir.z;
			startMousePosition = camera.position.clone().add( dir.multiplyScalar( distance ) );			
		}
	}else if(page == "featured"){
		scene.remove(popupCube);
		popup = false;
	}
	if(page == "gallery"){
		clicked = true;
	}
}

document.getElementById("featured").onmousedown = function (e) {
	if(page != "featured" && !loading && e.clientY < 80){
		scene.remove(rootNode);	
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "featured";
		popup = false;
		refreshPage();
		window.history.pushState('featured', 'Joshua Aurich - Photography.', '/featured');
	}
	return true; 
};

document.getElementById("featuredHidden").onmousedown = function (e) {
	if(page != "featured" && !loading && e.clientY < 80){
		scene.remove(rootNode);	
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "featured";
		popup = false;
		refreshPage();
		window.history.pushState('featured', 'Joshua Aurich - Photography.', '/featured');
	}
	return true; 
};

document.getElementById("gallery").onmousedown = function (e) {
	if(page != "gallery" && !loading && e.clientY < 80){
		scene.remove(rootNode);
		if(page == "featured"){
			scene.remove(button1);
			scene.remove(button2);
			scene.remove(button3);
			scene.remove(popupCube);
		}	
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "gallery";		
		popup = false;
		clicked = false;
		refreshPage();
		getScreenCornerPositions();
		window.history.pushState('gallery', 'Joshua Aurich - Photography.', '/gallery');
		rootNode.position.x = 0;
		rootNode.position.y = 0;
	}
	return true; 
};

document.getElementById("galleryHidden").onmousedown = function (e) {
	if(page != "gallery" && !loading && e.clientY < 80){
		scene.remove(rootNode);
		if(page == "featured"){			
			scene.remove(button1);
			scene.remove(button2);
			scene.remove(button3);
			scene.remove(popupCube);
		}
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "gallery";
		popup = false;
		clicked = false;
		refreshPage();
		window.history.pushState('gallery', 'Joshua Aurich - Photography.', '/gallery');
		rootNode.position.x = 0;
		rootNode.position.y = 0;
	}
	return true;
};

document.getElementById("artist").onmousedown = function (e) {
	if(page != "artist" && !loading && e.clientY < 80){	
		scene.remove(rootNode);
		if(page == "featured"){			
			scene.remove(button1);
			scene.remove(button2);
			scene.remove(button3);
		}		
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "artist";
		refreshPage();
		window.history.pushState('artist', 'Joshua Aurich - Photography.', '/artist');
	}
	return true; 
};

document.getElementById("artistHidden").onmousedown = function (e) {
	if(page != "artist" && !loading && e.clientY < 80){
		scene.remove(rootNode);
		if(page == "featured"){			
			scene.remove(button1);
			scene.remove(button2);
			scene.remove(button3);
		}		
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		//document.getElementById("contact").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		//document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "artist";
		refreshPage();
		window.history.pushState('artist', 'Joshua Aurich - Photography.', '/artist');
	}
	return true; 
};
/**
document.getElementById("contact").onmousedown = function (e) {
	if(page != "contact" && !loading && e.clientY < 80){
		scene.remove(rootNode);
		if(page == "featured"){			
			scene.remove(button1);
			scene.remove(button2);
			scene.remove(button3);
		}
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("contact").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "contact";
		refreshPage();
		window.history.pushState('contact', 'Joshua Aurich - Photography.', '/contact');
	}
	return true; 
};

document.getElementById("contactHidden").onmousedown = function (e) {
	if(page != "contact" && !loading && e.clientY < 80){	
		scene.remove(rootNode);
		if(page == "featured"){			
			scene.remove(button1);
			scene.remove(button2);
			scene.remove(button3);
		}
		document.getElementById("featured").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("featuredHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("gallery").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("galleryHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("artist").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("artistHidden").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		document.getElementById("contact").style.cssText = 'cursor: pointer;display: none;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #A7A7A7;';
		document.getElementById("contactHidden").style.cssText = 'cursor: pointer;display: inline;height: 20px;font-family: Bebas Neue Regular; font-size:100%;float: right;width: 68px;position: relative; top: 65; color: #000000;';
		page = "contact";
		refreshPage();
		window.history.pushState('contact', 'Joshua Aurich - Photography.', '/contact');
	}
	return true;
}; **/