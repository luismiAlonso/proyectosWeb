<?php

// new filename

$filename = 'pic_'.date("Y_m_d").'.jpeg';
$dir="./upload/".$filename;
base64ToImage($_POST["photo"],$dir);

function base64ToImage($imageData,$dirname){
    //$data = 'data:image/png;base64,AAAFBfj42Pj4';
    list($type, $imageData) = explode(';', $imageData);
    list(,$extension) = explode('/',$type);
    list(,$imageData)      = explode(',', $imageData);
    //$fileName = uniqid().'.'.$extension;
    $imageData = base64_decode($imageData);
    file_put_contents($dirname, $imageData);
}

