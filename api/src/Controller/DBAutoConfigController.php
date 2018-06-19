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
    $tables = $app["db"]->list_tables();
    if (!is_array($tables)) return $tables;
    
    foreach ($tables as $table) {
        $result = $app["db"]->drop_table($table);
        if (!is_array($result)) return $result;
    }
    
    $model = $app["db"]->get_model();
    
    foreach ($model as $table => $attribs) {
        $result = $app["db"]->create_table($table);
        if (!is_array($result)) return $result;
    }
    
    $tables = $app["db"]->list_tables();
    
    return json_encode(array("reset"=>"successful", "tables" => $tables));
});


return $ctrl;