<?php

$files1 = scandir("upload/");
$encodePhotos;
error_reporting(0);
foreach($files1 as $key => $value){
	
	$imagedata = file_get_contents("upload/".$value);
	$encodePhotos[]= base64_encode($imagedata);
}
$cadenaResp= json_encode($encodePhotos);
echo $cadenaResp;


?>