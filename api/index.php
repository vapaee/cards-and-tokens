<?php

// header('Access-Control-Allow-Origin: *');

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/src/autoload.php';
require_once __DIR__.'/src/includes/common.php';
require_once __DIR__.'/src/includes/utils.php';
require_once __DIR__.'/../config.php';
require_once __DIR__.'/../model.php';

use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

// https://github.com/silexphp/Silex/issues/1047
$app['request'] = function() use($app) {
    return $app['request_stack']->getCurrentRequest();
};

// Vapaee restAPI --------------------------------------------------
$app->register(new Vapaee\Provider\DatabaseServiceProvider(), array());
$app["db"]->restAPI($config["basename"], $config["password"], $DATA, $app);

// DB Auto config (reset) ------------------------------------------------
$app->mount('/db', include 'src/Controller/DBAutoConfigController.php');

// Accesing to uploaded files
$app->get('/uploads/{path}', function($path) use ($app) {
    global $config;
    $filename = $config["upload_folder"] . "/uploads/$path";
    if (file_exists($filename)) {
        ob_end_clean(); //limpia el buffer de salida
        return $app->sendFile($filename);
    } else {
        return new Response('{"error":"File not found: ' . $path . '"}', 404);
    }   
})->assert('path', '.+');

// Open Graph -------------------------------------------------
$app->get('/opengraph', function() use ($app) { return insert_open_graph_metatags(""); });
$app->get('/opengraph/', function() use ($app) {  return insert_open_graph_metatags(""); });

// cross domain OPTIONS request -> Response 200 OK
$app->match("{url}", function($url) use ($app) { return "OK"; })->assert('url', '.*')->method("OPTIONS");

// Controller.php ---------------------------------------------------------------
require_once __DIR__.'/common.php';
require_once __DIR__.'/../controller.php';


$app->run();
