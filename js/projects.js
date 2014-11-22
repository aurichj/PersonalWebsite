var totalHeight = 150;
initPage();
addProject("Space Game","projects/spacegame.jpg","Exploring client-server based architecture in software development. This project aims to develop a multiplayer game in a procedurally generated environment.","");
addProject("Spherical Geomipmapping","projects/geomipmap.jpg","An experiment in terrain mipmapping techniques for spherical bodies. Developed in JAVA utilizing the JMonkeyEngine for visualization, this project renders terrain in subdivided levels of detail around the camera to minimize memory requirements while maintaining quality visual realization for the end user. This project also explores noise functions for procedural terrain generation.","http://jaurich.co/projects/geomipmap.html");
addProject("API-A-Day","projects/api.jpg","A journey in discovering new APIs. Join me as I implement small custom applications, each one based upon the capabilities of a new API.","");


document.getElementById("leftSide").style.height = Math.max(document.getElementById("leftSide").clientHeight,totalHeight);
document.getElementById("rightSide").style.height = Math.max(document.getElementById("rightSide").clientHeight,totalHeight);

function initPage(){
	var sideStyle = 'width: 15%;height: 100%;font-family: Bebas Neue Regular; font-size:300%;float: left; position: relative;  background-color: #f0eeef;';
	var myStyle = 'width: 70%;height: 80px;font-family: Bebas Neue Regular; font-size:100%;float: left; height: 100%;position: relative; ';

	var leftDiv = document.createElement('div');
	leftDiv.id = 'leftSide';
	leftDiv.className = 'leftSide';		
	document.getElementById('main').appendChild(leftDiv);
	leftDiv.style.cssText = sideStyle;
	//leftDiv.style.backgroundImage ='url("brushed.png")';

	var contentDiv = document.createElement('div');
	contentDiv.id = 'content';
	contentDiv.className = 'content';

	document.getElementById('main').appendChild(contentDiv);
	document.getElementById("content").style.cssText = myStyle;
	//contentDiv.style.backgroundImage ='url("splash/grey.png")';

	var headerDiv = document.createElement('div');
	headerDiv.style.cssText = 'width: 100%;height: 150px;font-family: Bebas Neue Regular; font-size:100%;float: left; position: relative; text-align: center;';
	var spaceDiv = document.createElement('div');
	spaceDiv.style.cssText = 'cursor: default;height: 80px;font-family: Bebas Neue Light; font-size:150%;float: left;width: 4%;height: 100%;position: relative; top: 60;';
	var textDiv1 = document.createElement('div');
	var textDiv2 = document.createElement('div');
	textDiv1.style.cssText = 'cursor: pointer;height: 80px;font-family: Bebas Neue Bold; font-size:300%;float: left; height: 100%;position: relative; top: 42; ';
	textDiv2.style.cssText = 'cursor: pointer;height: 80px;font-family: Bebas Neue Light; font-size:150%;float: left; text-align: left;width: 40%;height: 100%;position: relative; top: 60;';

	textDiv1.onclick=function(){window.location = 'http://jaurich.co';};
	textDiv2.onclick=function(){window.location = 'http://jaurich.co';};
	headerDiv.appendChild(spaceDiv);
	headerDiv.appendChild(textDiv1);
	headerDiv.appendChild(textDiv2);
	textDiv1.innerHTML = 'projects';
	textDiv2.innerHTML = 'A collection of works.';
	document.getElementById("content").appendChild(headerDiv);
	
	
	var rightDiv = document.createElement('div');
	rightDiv.id = 'rightSide';
	rightDiv.className = 'rightSide';
	document.getElementById('main').appendChild(rightDiv);
	rightDiv.style.cssText = sideStyle;
	//rightDiv.style.backgroundImage ='url("brushed.png")';
}

function addProject(name,imgLocation,text,link){
	var vertSpaceStyleMiddle = 'width: 100%;height: 50px;font-family:Bebas Neue Regular; font-size:300%;float: left; position: relative;  <!--background-color: #f0eeef;-->';
	var buttonStyle = 'width: 100%;height: 250px;font-family: Bebas Neue Regular; font-size:100%;float: left; position: relative; text-align: center;';
	var divStyle = 'vertical-align: middle;width: 33%;height: 100%;font-family: Bebas Neue Regular; font-size:100%;float: left; position: relative; text-align: center;margin: auto;';
	
	var leftDiv = document.createElement('div');
	var para = document.createElement("p");
	var node = document.createTextNode(name);
	var innerDiv = document.createElement('div');
	
	para.appendChild(node);	
	leftDiv.appendChild(innerDiv);
	innerDiv.appendChild(para);
	
	innerDiv.style.cssText = "display: inline-block;";
	para.style.cssText = "display: table-cell; height: 250px; vertical-align: middle;";
	leftDiv.style.cssText = divStyle;
	
	var middleDiv = document.createElement('div');
	middleDiv.style.cssText = divStyle;
	
	var rightDiv = document.createElement('div');
	var para2 = document.createElement("p");
	var node2 = document.createTextNode(text);
	var innerDiv2 = document.createElement('div');
	
	para2.appendChild(node2);	
	rightDiv.appendChild(innerDiv2);
	innerDiv2.appendChild(para2);
	
	innerDiv2.style.cssText = "display: inline-block;";
	para2.style.cssText = "display: table-cell; height: 250px; vertical-align: middle;";
	rightDiv.style.cssText = divStyle;
	
	var newDiv = document.createElement('div');
	newDiv.id = name;
	newDiv.className = name;
	//newDiv.innerHTML = text;
	var newImg = document.createElement("img");
	newImg.src = imgLocation;		
	newImg.style.maxWidth = "100%";
	newImg.style.maxHeight = "100%";
	newImg.style.margin = "0 auto";
	newImg.style.display ="block";
	middleDiv.appendChild(newImg);
	newDiv.style.cssText = buttonStyle;
	newDiv.appendChild(leftDiv);
	if(imgLocation != ""){
		newDiv.appendChild(middleDiv);
	}
	newDiv.appendChild(rightDiv);
	
	//newDiv.onclick=function(){window.open("http://jaurich.co/projects.html");};
	
	var vertSpaceDiv = document.createElement('div');
	vertSpaceDiv.id = 'vertSpace'+name;
	vertSpaceDiv.className = 'vertSpace'+name;
	vertSpaceDiv.style.cssText = vertSpaceStyleMiddle;
	
	//contentDiv.appendChild(newDiv);
	//contentDiv.appendChild(vertSpaceDiv);
	if(link != ""){
		newDiv.style.cursor = 'pointer';
		newDiv.onclick=function(){window.location = link;};
	}
	document.getElementById("content").appendChild(newDiv);
	document.getElementById("content").appendChild(vertSpaceDiv);
	totalHeight+=300;
}