<?php

// https://github.com/flowjs/flow-php-server
require_once './vendor/autoload.php';
require_once '../config.php';
require_once 'src/includes/common.php';
require_once 'src/includes/utils.php';

$temp_folder = $config["upload_folder"] . "/temp";
$uploads_folder = $config["upload_folder"] . "/uploads";

if (!is_dir($config["upload_folder"])) {
    mkdir($config["upload_folder"], 0777, true);
    if (!is_dir($config["upload_folder"])) {
        trace("ERROR: no pudo crearse la carpeta " . $config["upload_folder"]);
    }
}

if (!is_dir($temp_folder)) {
    mkdir($temp_folder, 0777, true);
}

if (!is_dir($uploads_folder)) {
    mkdir($uploads_folder, 0777, true);
}



$flow_config = new \Flow\Config();
$flow_config->setTempDir($temp_folder);
$file = new \Flow\File($flow_config);
$request = new \Flow\Request();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($file->checkChunk()) {
        header("HTTP/1.1 200 Ok");
    } else {
        header("HTTP/1.1 204 No Content");
        return ;
    }
} else {
    if ($file->validateChunk()) {
        $file->saveChunk();
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "error, invalid chunk upload request, retry"
        ));
        header("HTTP/1.1 400 Bad Request");
        return ;
    }
}

function encodeFilename ($filename) {
    trace("encodeFilename() <-", $filename);
    $filename = str_replace(" ", "-",$filename);
    trace("encodeFilename() ->", $filename);
    return $filename;
}

if ($file->validateFile()) {
    $folder = md5(time());
    mkdir("$uploads_folder/$folder/", 0777, true);
    $filename = encodeFilename($request->getFileName());
    if ($file->save("$uploads_folder/$folder/" . $filename)) {
        echo json_encode(array(
            "success" => true,
            "url" => "api/uploads/$folder/" . $filename,
            "hash" => "$folder"
        ));
    } else {
        // This is not a final chunk, continue to upload
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "message" => "Cat'n save file"
        ));    
    }    
} else {
    // This is not a final chunk, continue to upload
    echo json_encode(array(
        "success" => false,
        "message" => "This is not a final chunk, continue to upload"
    ));    
}

