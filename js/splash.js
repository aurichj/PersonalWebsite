start();


function start(){
	var screenDim = window.innerWidth / window.innerHeight;
	var mobile = false;
	if(screenDim < 0.8){
		mobile = true;
	}
	var myStyle = 'width: 70%;cursor: default;height: 80px;font-family: Bebas Neue Regular; font-size:100%;float: left; height: 100%;position: relative; ';
	var myStyleMobile = 'width: 100%;cursor: default;font-family: Bebas Neue Regular; font-size:100%;float: left; height: 100%;position: relative; ';
	var buttonStyle = 'width: 33%;cursor: default;height: 80px;font-family: Bebas Neue Regular; font-size:100%;float: left; height: 100%;position: relative; text-align: center;';
	var buttonStyleClickable = 'width: 33%;cursor: pointer;height: 80px;font-family: Bebas Neue Regular; font-size:100%;float: left; height: 100%;position: relative; ';
	var buttonStyleMobile = 'width: 50%;cursor: default;height: 15%;font-family: Bebas Neue Regular; font-size:150%;float: left;position: relative; text-align: center;';
	var imgStyleMobile = 'width: 100%;cursor: default;height: 40%;font-family: Bebas Neue Regular; font-size:100%;float: left;position: relative; ';
	var sideStyle = 'width: 15%;cursor: default;height: 100%;font-family: Bebas Neue Regular; font-size:300%;float: left; position: relative;  background-color: #f0eeef;';
	var vertSpaceStyleTop = 'width: 100%;cursor: default;height: 10%;font-family: Bebas Neue Regular; font-size:300%;float: left; position: relative;  <!--background-color: #f0eeef;-->';
	var vertSpaceStyleMiddle = 'width: 100%;cursor: default;height: 10%;font-family:Bebas Neue Regular; font-size:300%;float: left; position: relative;  <!--background-color: #f0eeef;-->';
	var vertSpaceStyleBottom = 'width: 100%;cursor: default;height: 10%;font-family: Bebas Neue Regular; font-size:300%;float: left; position: relative;  <!--background-color: #f0eeef;-->';
	var vertContentStyle = 'width: 100%;cursor: default;height: 10%;font-family: Bebas Neue Regular; font-size:200%;float: left; position: relative; vertical-align: bottom;';
	var vertContentStyleImage = 'width: 100%;cursor: default;height: 40%;font-family: Bebas Neue Regular; font-size:300%;float: left; position: relative; vertical-align: bottom;';
	var vertContentStyleMobile = 'width: 100%;cursor: default;height: 20%;font-family: Bebas Neue Regular; font-size:200%;float: left; position: relative; vertical-align: bottom;';

	var projectDiv = document.createElement('div');
	projectDiv.id = 'project';
	projectDiv.className = 'project';
	projectDiv.innerHTML = '<center>project</center>';
	var projectimg = document.createElement("img");
	projectimg.src = "splash/ic_dashboard_black_24dp.png";		
	projectimg.style.maxWidth = "100%";
	projectimg.style.maxHeight = "100%";
	projectimg.style.margin = "0 auto";
	projectimg.style.display ="block";
	projectDiv.appendChild(projectimg);
	projectDiv.onclick=function(){window.location = 'http://jaurich.co/projects.html';};
	projectDiv.style.cursor = 'pointer';

	var photoDiv = document.createElement('div');
	photoDiv.id = 'photo';
	photoDiv.className = 'photo';
	photoDiv.innerHTML = '<center>photo</center>';
	var photoimg = document.createElement("img");
	photoimg.src = "splash/ic_camera_alt_black_24dp.png";		
	photoimg.style.maxWidth = "100%";
	photoimg.style.maxHeight = "100%";
	photoimg.style.margin = "0 auto";
	photoimg.style.display ="block";
	photoDiv.appendChild(photoimg);
	photoDiv.onclick=function(){window.location = 'http://photo.jaurich.co';};
	photoDiv.style.cursor = 'pointer';

	var blogDiv = document.createElement('div');
	blogDiv.id = 'blog';
	blogDiv.className = 'blog';
	blogDiv.innerHTML = '<center>blog</center>';
	var blogimg = document.createElement("img");
	blogimg.src = "splash/ic_cloud_black_24dp.png";		
	blogimg.style.maxWidth = "100%";
	blogimg.style.maxHeight = "100%";
	blogimg.style.margin = "0 auto";
	blogimg.style.display ="block";
	blogDiv.appendChild(blogimg);
	blogDiv.onclick=function(){window.open("http://blog.jaurich.co");};
	blogDiv.style.cursor = 'pointer';
	
	
	var socialDiv = document.createElement('div');
	socialDiv.id = 'social';
	socialDiv.className = 'social';
	socialDiv.innerHTML = '<center>social</center>';
	var fbImage = document.createElement("img");
	fbImage.src = "splash/facebook-variation.png";		
	fbImage.style.maxWidth = "100%";
	fbImage.style.maxHeight = "100%";
	var tmblrImage = document.createElement("img");
	tmblrImage.src = "splash/tumblr-variation.png";		
	tmblrImage.style.maxWidth = "100%";
	tmblrImage.style.maxHeight = "100%";
	var gthbImage = document.createElement("img");
	gthbImage.src = "splash/github.png";		
	gthbImage.style.maxWidth = "100%";
	gthbImage.style.maxHeight = "100%";
	socialDiv.appendChild(fbImage);
	socialDiv.appendChild(gthbImage);
	socialDiv.appendChild(tmblrImage);
	fbImage.onclick=function(){window.open("http://www.facebook.com/josh.aurich");};
	tmblrImage.onclick=function(){window.open("http://eggsworth12.tumblr.com/");};
	gthbImage.onclick=function(){window.open("http://github.com/aurichj");};
	fbImage.style.cursor = 'pointer';
	tmblrImage.style.cursor = 'pointer';
	gthbImage.style.cursor = 'pointer';

	var resumeDiv = document.createElement('div');
	resumeDiv.id = 'resume';
	resumeDiv.className = 'resume';
	resumeDiv.innerHTML = '<center>resume</center>';
	var resumeimg = document.createElement("img");
	resumeimg.src = "splash/ic_folder_black_24dp.png";		
	resumeimg.style.maxWidth = "100%";
	resumeimg.style.maxHeight = "100%";
	resumeimg.style.margin = "0 auto";
	resumeimg.style.display ="block";
	resumeDiv.appendChild(resumeimg);
	resumeDiv.onclick=function(){window.open("/ViewerJS/#../resume/Josh_Aurich_Resume_ext.pdf");};
	resumeDiv.style.cursor = 'pointer';
	

	var contactDiv = document.createElement('div');
	contactDiv.id = 'contact';
	contactDiv.className = 'contact';
	contactDiv.innerHTML = '<center>contact</center>';
	var contactimg = document.createElement("img");
	contactimg.src = "splash/ic_sms_black_24dp.png";		
	contactimg.style.maxWidth = "100%";
	contactimg.style.maxHeight = "100%";
	contactimg.style.margin = "0 auto";
	contactimg.style.display ="block";
	contactDiv.appendChild(contactimg);
	

	if(mobile){
		projectDiv.style.cssText = buttonStyleMobile;
		photoDiv.style.cssText = buttonStyleMobile;
		blogDiv.style.cssText = buttonStyleMobile;
		socialDiv.style.cssText = buttonStyleMobile;
		resumeDiv.style.cssText = buttonStyleMobile;
		contactDiv.style.cssText = buttonStyleMobile;
		
		var contentDiv = document.createElement('div');
		contentDiv.id = 'content';
		contentDiv.className = 'content';
		document.getElementById('main').appendChild(contentDiv);
		contentDiv.style.cssText = myStyleMobile;
		
		var vertSpaceDiv1 = document.createElement('div');
		vertSpaceDiv1.id = 'vertSpace1';
		vertSpaceDiv1.className = 'vertSpace1';
		vertSpaceDiv1.style.cssText = vertSpaceStyleTop;
		
		var imgDiv = document.createElement('div');
		imgDiv.id = 'content';
		imgDiv.className = 'content';
		document.getElementById('main').appendChild(imgDiv);
		imgDiv.style.cssText = imgStyleMobile;
		
		var img = document.createElement("img");
		img.src = "splash/logo.jpg";		
		img.style.maxWidth = "100%";
		img.style.maxHeight = "100%";
		imgDiv.style.textAlign ="center";
		imgDiv.appendChild(img);
		
		var vertContentDiv1 = document.createElement('div');
		vertContentDiv1.id = 'vertContent3';
		vertContentDiv1.className = 'vertContent3';
		vertContentDiv1.style.cssText = vertContentStyleMobile;
		
		var vertContentDiv2 = document.createElement('div');
		vertContentDiv2.id = 'vertContent3';
		vertContentDiv2.className = 'vertContent3';
		vertContentDiv2.style.cssText = vertContentStyleMobile;
		
		var vertContentDiv3 = document.createElement('div');
		vertContentDiv3.id = 'vertContent3';
		vertContentDiv3.className = 'vertContent3';
		vertContentDiv3.style.cssText = vertContentStyleMobile;
		
		contentDiv.appendChild(imgDiv);
		vertContentDiv1.appendChild(projectDiv);
		vertContentDiv1.appendChild(photoDiv);
		vertContentDiv2.appendChild(blogDiv);
		vertContentDiv2.appendChild(socialDiv);
		vertContentDiv3.appendChild(resumeDiv);
		vertContentDiv3.appendChild(contactDiv);
		contentDiv.appendChild(vertContentDiv1);
		contentDiv.appendChild(vertContentDiv2);
		contentDiv.appendChild(vertContentDiv3);
		//contentDiv.style.backgroundImage ='url("grey2X.png")';
	}else{
		projectDiv.style.cssText = buttonStyleClickable;
		photoDiv.style.cssText = buttonStyleClickable;
		blogDiv.style.cssText = buttonStyleClickable;
		socialDiv.style.cssText = buttonStyle;
		resumeDiv.style.cssText = buttonStyleClickable;
		contactDiv.style.cssText = buttonStyle;
		
		var vertSpaceDiv1 = document.createElement('div');
		vertSpaceDiv1.id = 'vertSpace1';
		vertSpaceDiv1.className = 'vertSpace1';
		vertSpaceDiv1.style.cssText = vertSpaceStyleTop;
	
		var vertSpaceDiv2 = document.createElement('div');
		vertSpaceDiv2.id = 'vertSpace2';
		vertSpaceDiv2.className = 'vertSpace2';
		vertSpaceDiv2.style.cssText = vertSpaceStyleMiddle;
		
		var vertSpaceDiv3 = document.createElement('div');
		vertSpaceDiv3.id = 'vertSpace3';
		vertSpaceDiv3.className = 'vertSpace3';
		vertSpaceDiv3.style.cssText = vertSpaceStyleMiddle;
		
		var vertSpaceDiv4 = document.createElement('div');
		vertSpaceDiv4.id = 'vertSpace4';
		vertSpaceDiv4.className = 'vertSpace4';
		vertSpaceDiv4.style.cssText = vertSpaceStyleBottom;
		
		var vertContentDiv1 = document.createElement('div');
		vertContentDiv1.id = 'vertContent1';
		vertContentDiv1.className = 'vertContent1';
		vertContentDiv1.style.cssText = vertContentStyle;
		
		vertContentDiv1.appendChild(projectDiv);
		vertContentDiv1.appendChild(photoDiv);
		vertContentDiv1.appendChild(blogDiv);
		
		var vertContentDiv2 = document.createElement('div');
		vertContentDiv2.id = 'vertContent2';
		vertContentDiv2.className = 'vertContent2';
		vertContentDiv2.style.cssText = vertContentStyleImage;
		
		var img = document.createElement("img");
		img.src = "splash/logo.jpg";		
		img.style.maxWidth = "100%";
		img.style.maxHeight = "100%";
		vertContentDiv2.style.textAlign ="center";
		vertContentDiv2.appendChild(img);
		
		var vertContentDiv3 = document.createElement('div');
		vertContentDiv3.id = 'vertContent3';
		vertContentDiv3.className = 'vertContent3';
		vertContentDiv3.style.cssText = vertContentStyle;
		
		vertContentDiv3.appendChild(socialDiv);
		vertContentDiv3.appendChild(resumeDiv);
		vertContentDiv3.appendChild(contactDiv);
	
		var leftDiv = document.createElement('div');
		leftDiv.id = 'leftSide';
		leftDiv.className = 'leftSide';		
		document.getElementById('main').appendChild(leftDiv);
		leftDiv.style.cssText = sideStyle;
		//leftDiv.style.backgroundImage ='url("brushed.png")';
		
		var contentDiv = document.createElement('div');
		contentDiv.id = 'content';
		contentDiv.className = 'content';
		//contentDiv.innerHTML = 'social';
		document.getElementById('main').appendChild(contentDiv);
		document.getElementById("content").style.cssText = myStyle;
		contentDiv.appendChild(vertSpaceDiv1);
		contentDiv.appendChild(vertContentDiv1);
		contentDiv.appendChild(vertSpaceDiv2);
		contentDiv.appendChild(vertContentDiv2);
		contentDiv.appendChild(vertSpaceDiv3);
		contentDiv.appendChild(vertContentDiv3);
		contentDiv.appendChild(vertSpaceDiv4);
		contentDiv.style.backgroundImage ='url("splash/grey.png")';
		
		var rightDiv = document.createElement('div');
		rightDiv.id = 'rightSide';
		rightDiv.className = 'rightSide';
		document.getElementById('main').appendChild(rightDiv);
		rightDiv.style.cssText = sideStyle;
		//rightDiv.style.backgroundImage ='url("brushed.png")';
	}	
}