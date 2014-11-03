<?php
$img_dir = "images/featured1/";

$images = scandir($img_dir);

$html = 'featured1|';

foreach($images as $img) 	{ 
		if($img === '.' || $img === '..') {continue;} 		

			if (  (preg_match('/.JPG/',$img))  || (preg_match('/.jpg/',$img))  ||  (preg_match('/.gif/',$img)) || (preg_match('/.tiff/',$img)) || (preg_match('/.png/',$img)) ) {				

			 $html .= $img; 
			 $html .= ','; 
			} else { continue; }	
	} 
	
$img_dir = "images/featured2/";

$images = scandir($img_dir);
$html .= '|featured2|';

foreach($images as $img) 	{ 
		if($img === '.' || $img === '..') {continue;} 		

			if (  (preg_match('/.JPG/',$img))  || (preg_match('/.jpg/',$img))  ||  (preg_match('/.gif/',$img)) || (preg_match('/.tiff/',$img)) || (preg_match('/.png/',$img)) ) {				

			 $html .= $img; 
			 $html .= ','; 
			} else { continue; }	
	} 
	
$img_dir = "images/featured3/";

$images = scandir($img_dir);
$html .= '|featured3|';

foreach($images as $img) 	{ 
		if($img === '.' || $img === '..') {continue;} 		

			if (  (preg_match('/.JPG/',$img))  || (preg_match('/.jpg/',$img))  ||  (preg_match('/.gif/',$img)) || (preg_match('/.tiff/',$img)) || (preg_match('/.png/',$img)) ) {				

			 $html .= $img; 
			 $html .= ','; 
			} else { continue; }	
	} 
	
$img_dir = "images/gallery/";

$images = scandir($img_dir);
$html .= '|gallery|';

foreach($images as $img) 	{ 
		if($img === '.' || $img === '..') {continue;} 		

			if (  (preg_match('/.JPG/',$img))  || (preg_match('/.jpg/',$img))  ||  (preg_match('/.gif/',$img)) || (preg_match('/.tiff/',$img)) || (preg_match('/.png/',$img)) ) {				

			 $html .= $img; 
			 $html .= ','; 
			} else { continue; }	
	} 

echo $html ;
?>