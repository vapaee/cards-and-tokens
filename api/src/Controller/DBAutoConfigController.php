<?php

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

// AUX --------------------------------------------------------

// CONTROLLER -----------------------------------------------------
$ctrl = $app['controllers_factory'];

// Auto configure database -----------------------------------------------------------------------------------------

$ctrl->get('/list', function() use ($app) {
    $result = $app["db"]->list_tables();
    if (!is_array($result)) return $result;
    return json_encode($result);    
});

$ctrl->get('/drop/{tablename}', function($tablename) use ($app) { 
    $result = $app["db"]->drop_table($tablename);
    if (!is_array($result)) return $result;
    return json_encode($result);
});

$ctrl->get('/create/{tablename}', function($tablename) use ($app) {
    $result = $app["db"]->create_table($tablename);
    if (!is_array($result)) return $result;
    return json_encode($result);
});

$ctrl->get('/reset', function() use ($app) {
    $app["db"]->reset();
    $tables = $app["db"]->list_tables();
    return json_encode(array("reset"=>"successful", "tables" => $tables));
});


return $ctrl;