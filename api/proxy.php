<?php
header('Access-Control-Allow-Origin: *');

// https://gist.github.com/xxnoobmanxx/89329fa61997b3775487b0c155cda41f
$url = isset($_GET['url']) ? $_GET['url'] : null;
if (!$url) {
    die('Please, inform URL');
}
$imgInfo = getimagesize( $url );
if (stripos($imgInfo['mime'], 'image/') === false) {
    die('Invalid image file');
}
header("Content-type: ".$imgInfo['mime']);
readfile( $url );