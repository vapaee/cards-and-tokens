<?php


// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// API: Cards & Tokens  --------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

$app->get("/", function() use ($app) {
    return json_encode(array(
        "API" => "Cards & tokens",
        "version" => "0.1"
    ));
});






function getUserdata($credentials, $app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace.getUserdata()", $credentials);
    $user_id = $credentials["user"]["id"];
    $op = array("unbox"=>true, "mapping"=>"id", "no-detail" => true, "secure" => true);
    
    $user = $app["db"]->http_get_id("user", $user_id);
        
    $select_owner = array("owner" => $user_id);
    $select_creator = array("creator" => $user_id);
    
    $user["data"] = array();
    // definido por el usuario
    $user["data"]["app"] = $app["db"]->http_get("app", $select_creator, $op);
    $user["data"]["collectible"] = $app["db"]->http_get("collectible", $select_creator, $op); // cartas y stikers, tanto las creadas x el user como las que colecciona
    $user["data"]["album"] = $app["db"]->http_get("album", $select_creator, $op);
    // $user["data"]["mastery"] = $app["db"]->http_get("mastery", $select_creator, $op);
    // $user["data"]["tokenspec"] = $app["db"]->http_get("tokenspec", $select_creator, $op);
    // estado del usuario en diferentes aspecots
    // $user["data"]["experience"] = $app["db"]->http_get("experience", $select_owner, $op); // lista de piramide de tokens para una mastery
    // $user["data"]["aurafx"] = $app["db"]->http_get("aurafx", $select_owner, $op); // lista de aura activas que alteran algún atributo de laguna mastery
    $user["data"]["inventory"] = $app["db"]->http_get("inventory", $select_owner, $op); // contenido de cada inventario
    $user["data"]["collection"] = $app["db"]->http_get("collection", $select_owner, $op); // estado actual de cada album que el usuario está colecfcionando
    // $user["data"]["effect"] = $app["db"]->http_get("effect", $select_owner, $op); // la lista de todos los effects q modifican la experiencia de algúna maestría
    // profile
    $user["data"]["profile"] = $app["db"]->http_get("profile", $select_owner, $op);
    // $user["data"]["aura"] = $app["db"]->http_get("aura", $select_creator, $op);
    // items
    // $user["data"]["token"] = $app["db"]->http_get("token", $select_owner, $op);
    $user["data"]["copy"] = $app["db"]->http_get("copy", $select_owner, $op);
    // $user["data"]["tokencase"] = $app["db"]->http_get("tokencase", $select_owner, $op);
    $user["data"]["envelop"] = $app["db"]->http_get("envelop", $select_owner, $op);
    // $user["data"]["box"] = $app["db"]->http_get("box", $select_owner, $op);
    // market
    // $user["data"]["currency"] = $app["db"]->http_get("currency", $select_creator, $op);
    // $user["data"]["wallet"] = $app["db"]->http_get("wallet", $select_owner, $op);
    
    
    // hasta acá tenemos las sólo las apps que fueron creadas por el usuario
    // faltan las que el usuario está subscrito
    foreach ($user["data"]["inventory"] as $i => $inventory) {
        $app_id = $inventory["app"]["id"];
        $inv_id = $inventory["id"];
        $found = false;
        foreach ($user["data"]["app"] as $a => $app) {
            if ($app["id"] == $app_id) {
                // si el usuario está subscrito a su propia aplicación lo marcamos como tal
                $user["data"]["app"][$a]["subscribed"] = true;
                $user["data"]["app"][$a]["inventory"] = array("id" => $inv_id);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            // si el usuario no es el creador de esta app, le traemos la app y la marcamos como subscribed = true
            $user["data"]["app"]["id-$app_id"] = $this->app["db"]->http_get_id("app", $app_id, array("unbox" => true, "no-detail" => true));
            if ($user["data"]["app"]["id-$app_id"]) {
                $user["data"]["app"]["id-$app_id"]["subscribed"] = true; 
                $user["data"]["app"]["id-$app_id"]["inventory"] = array("id" => $inv_id);
            } else {
                trace("ERROR: App not found in database with id $app_id (referenced from inventory $inv_id)");
            }
        }
    }

    
    // hasta acá tenemos las sólo los álbums que fueron creadas por el usuario
    // faltan las que el usuario está coleccionando
    foreach ($user["data"]["collection"] as $i => $collection) {
        $album_id = $collection["album"]["id"];
        $coll_id = $collection["id"];
        $found = false;
        foreach ($user["data"]["album"] as $a => $album) {
            if ($album["id"] == $album_id) {
                // si el usuario está subscrito a su propio album lo marcamos como tal
                $user["data"]["album"][$a]["subscribed"] = true;
                $user["data"]["album"][$a]["collection"] = array("id" => $coll_id);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            // si el usuario no es el creador de este álbum, le traemos el álbum y la marcamos como subscribed = true
            $user["data"]["album"]["id-$album_id"] = $this->app["db"]->http_get_id("album", $album_id, array("unbox" => true, "no-detail" => true));
            if ($user["data"]["album"]["id-$album_id"]) {
                $user["data"]["album"]["id-$album_id"]["subscribed"] = true; 
                $user["data"]["album"]["id-$album_id"]["collection"] = array("id" => $coll_id);
            } else {
                trace("ERROR: Album not found in database with id $album_id (referenced from cellection $coll_id)");
            }
        }
    }

    

    return $user;
}

$app["db"]->on("post:user", function ($user, $op, $app) {
    
    $profile = array(
        "name" => $user["name"],
        "img" => json_encode(array("pic" => "http://via.placeholder.com/200x200")),
        "owner" => $user["id"]
    );
    if (isset($user["pic"])) $profile["pic"] = $user["pic"];

    $profile = $app["db"]->http_post("profile", $profile, array("unbox" => true));
    $app["db"]->http_put("user", $user["id"], array(
        "profile" => $profile["id"]
    ));
    return $user;
});

$app->get('/userdata', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET '/userdata'");
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $access_token = $_GET["access_token"];
        $result = verifyAccessToken($access_token, $app);
        // trace("cnt./userdata -> verifyAccessToken devolvio: ", $result);
        if ($result) {
            $userdata = getUserdata($result, $app);
            return json_encode($userdata);
        } else {
            return json_encode(autenticationError());
        }
    }    
});

// STEEM ----------------

function verifySteemAccessToken($access_token, $account, $name, $app) {
    // $credentials["user"]["id"]
    $credentials = null;
    $op = array("unbox"=>true, "mapping"=>"id", "no-detail" => true, "secure" => true);
    $oauth_steem = $app["db"]->http_get("oauth_steem", array("account" => $account), $op);
    trace("verifySteemAccessToken()", $oauth_steem);
    if ($oauth_steem) {
        $user = $app["db"]->http_get_id("user", $oauth_steem["user"]["id"], $op);
        $app["db"]->http_put("oauth_steem", $oauth_steem["id"], array(
            "access_token" => $access_token
        ));
    } else {
        $user = $result = $app["db"]->http_post("user", array("name" => $name));

        $app["db"]->http_post("oauth_steem", array(
            "user" => $user["id"], 
            "access_token" => $access_token, 
            "account" => $account
        ), $op);
    }
    return array(
        "user" => $user
    );
}



$app->get('/steem/user', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET '/userdata'");
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $access_token = $_GET["access_token"];
        $name = $_GET["name"];
        $account = $_GET["account"];
        $result = verifySteemAccessToken($access_token, $account, $name, $app);
        // trace("cnt./userdata -> verifyAccessToken devolvio: ", $result);
        if ($result) {
            $userdata = getUserdata($result, $app);
            return json_encode($userdata);
        } else {
            return json_encode(autenticationError());
        }
    }    
});

// -----------------------------------------------------------------------------------------------
// API: Cards & Tokens (DEPRECATED) --------------------------------------------------------------------------
/*

$app->get("/update_experience_points/{exp_id}", function($exp_id) use ($app) {
    $result = updateExperiencePoints($exp_id, null, null, $app);
    return json_encode($result);
});

function updateExperiencePoints($_experience, $_mastery, $_effects, $app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace.updateExperiencePoints()");
    $effects = $_effects;
    $mastery = $_mastery;
    $user_id = getUserId();
    $experience = $_experience;
    $op = array("unbox"=>true);
    if (is_string($_experience) || is_int($_experience)) {
        $experience = $app["db"]->http_get_id("experience", $_experience, $op); // la lista de todos los effects q modifican la experiencia de algúna maestría
    }
    
    if (!isset($effects)) {
        $effects = $app["db"]->http_get("effect", array("owner" => $user_id), $op); // la lista de todos los effects q modifican la experiencia de algúna maestría
    }
    
    if (!isset($mastery)) {
        $mastery = $app["db"]->http_get_id("mastery", $experience["mastery"]["id"], $op); // la lista de todos los effects q modifican la experiencia de algúna maestría
    }
    
    $points = array();
    $mastery_current_level = 1000;  // averiguar $mastery_current_level
    
    
    foreach($mastery["spec"]["attr"] as $namespace => $attr) {
        $points[$namespace] = array( "mastery" => 0, "points" => 0, "levelup" => 0, "level" => 0, "value" => floatval($attr["levels"][0]["value"]) );
    }
    
    foreach ($effects as $effect) {
        trace("------> OPAAAA ENTREEEE", $effect);
        if ($effect["experience"]["id"] == $experience["id"]) {
            foreach ($effect["points"] as $attr_fx) {
                // $attr_fx["mastery"]["id"]
                // $attr_fx["attr"]["namespace"]
                // $attr_fx["property"]["code"]
                $attr_namespace = $attr_fx["attr"]["namespace"];
                switch ($attr_fx["property"]["code"]) {
                    case 0: // Level
                        $property = "levelup"; break;
                    case 1: // Points
                        $property = "points"; break;
                        break;
                    case 3: // Mastery level required
                        $property = "mastery"; break;
                        break;
                }
                $points[$attr_namespace][$property] += intval($effect["effect"]);
                trace("effect $property", $effect["effect"], $points[$attr_namespace][$property]);
            }
        }
    }
    // en este punto se cuantos puntos tiene en cada attributo de la maestría -> points
    // por tanto definir que nivel le corresponde a cada attr -> level
    // y con eso el valor que dice el nivel -> value
    
    foreach($mastery["spec"]["attr"] as $namespace => $attr) {
        foreach ($attr["levels"] as $lvl => $level) {
            $level_up = $points[$namespace]["levelup"];
            if ($lvl - $level_up < 0) $level_up = $lvl;
            if (
                $attr["levels"][$lvl - $level_up]['require']['points'] < $points[$namespace]['points'] &&
                $level['require']['mastery'] - $points[$namespace]['mastery'] < $mastery_current_level
                ) {
                    $points[$namespace]['value'] = $level['value'];
                    $points[$namespace]['level'] = $level['lvl'];
            }
        }
    }
    
    foreach ($points as $namespace => $attr) {
        unset($points[$namespace]["levelup"]);
        unset($points[$namespace]["mastery"]);
    }
    
    $experience = $app["db"]->http_put("experience", $experience["id"], array(
        "points" => $points
    ));
    
    
    / *
    
   
    - iterar sobre los attr del spec del mastery
      - por cada uno generar una entrada vacía en $points[attr["namespace"]] = array( "points" => 0, "levelup" => 0, "level" => 0, "value" => attr["levels"][0]["value"] )
    - iterar sobre los effects
      - si el mastery que modifican es el $mastery entonces
        - por cada effect, iterar sobre sus attr in points
          - modificar el valor actual de $points[attr["namespace"]][$effect["property"]] += $effect["effect"];
          - en realidad hay que hacer un switch $effect["property"]["code"]
    // en este punto se cuantos puntos tiene en cada attributo de la maestría -> points
    // por tanto definir que nivel le corresponde a cada attr -> level
    // y con eso el valor que dice el nivel -> value
    - iterar sobre los attr del spec del mastery
      - iterar sobre los $level del attr
        - si el nivel es "N" continue;
        - si el nivel cumple con los requerimientos (
            $level[$lvl - $points[$attr["namespace"]]['levelup']] ['require']['points'] < $points[$attr["namespace"]]['points'] &&
            $lvl['require']['mastery'] - $points[$attr["namespace"]]['mastery'] < $mastery_current_level
        )
          - $points[$attr["namespace"]]['value'] = $lvl['value'];
          - $points[$attr["namespace"]]['level'] = $lvl['lvl'];


    * /
    
    return $experience;
}


function getUserdata($credentials, $app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace.getUserdata()", $credentials);
    $user_id = $credentials["user"]["id"];
    $op = array("unbox"=>true, "mapping"=>"id");
    
    $user = $app["db"]->http_get_id("user", $user_id);
        
    $select_owner = array("owner" => $user_id);
    $select_creator = array("creator" => $user_id);
    
    $user["data"] = array();
    // definido por el usuario
    $user["data"]["app"] = $app["db"]->http_get("app", $select_creator, $op);
    $user["data"]["collectible"] = $app["db"]->http_get("collectible", $select_creator, $op); // cartas y stikers, tanto las creadas x el user como las que colecciona
    $user["data"]["album"] = $app["db"]->http_get("album", $select_creator, $op);
    $user["data"]["mastery"] = $app["db"]->http_get("mastery", $select_creator, $op);
    $user["data"]["tokenspec"] = $app["db"]->http_get("tokenspec", $select_creator, $op);
    // estado del usuario en diferentes aspecots
    $user["data"]["experience"] = $app["db"]->http_get("experience", $select_owner, $op); // lista de piramide de tokens para una mastery
    $user["data"]["aurafx"] = $app["db"]->http_get("aurafx", $select_owner, $op); // lista de aura activas que alteran algún atributo de laguna mastery
    $user["data"]["inventory"] = $app["db"]->http_get("inventory", $select_owner, $op); // contenido de cada inventario
    $user["data"]["collection"] = $app["db"]->http_get("collection", $select_owner, $op); // estado actual de cada album que el usuario está colecfcionando
    $user["data"]["effect"] = $app["db"]->http_get("effect", $select_owner, $op); // la lista de todos los effects q modifican la experiencia de algúna maestría
    // profile
    $user["data"]["profile"] = $app["db"]->http_get("profile", $select_owner, $op);
    $user["data"]["aura"] = $app["db"]->http_get("aura", $select_creator, $op);
    // items
    $user["data"]["token"] = $app["db"]->http_get("token", $select_owner, $op);
    $user["data"]["copy"] = $app["db"]->http_get("copy", $select_owner, $op);
    $user["data"]["tokencase"] = $app["db"]->http_get("tokencase", $select_owner, $op);
    $user["data"]["envelop"] = $app["db"]->http_get("envelop", $select_owner, $op);
    $user["data"]["box"] = $app["db"]->http_get("box", $select_owner, $op);
    // market
    $user["data"]["currency"] = $app["db"]->http_get("currency", $select_creator, $op);
    $user["data"]["wallet"] = $app["db"]->http_get("wallet", $select_owner, $op);
    
    
    
    trace('$user["data"]["inventory"]', $user["data"]["inventory"]);
    trace('$user["data"]["collection"]', $user["data"]["collection"]);
    foreach ($user["data"]["inventory"] as $i => $inventory) {
        $found = false;
        foreach ($user["data"]["app"] as $a => $app) {
            if ($app["id"] == $inventory["app"]["id"]) {
                $user["data"]["app"][$a]["subscribed"] = true;
                $user["data"]["app"][$a]["inventory"] = array("id" => $inventory["id"]);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            trace("NOT FOUND app_id:", $inventory["app"]["id"]);
            $user["data"]["app"]["id-".$inventory["app"]["id"]] = $app["db"]->http_get_id("app", $inventory["app"]["id"], array("unbox" => true));
        }
    }
    return $user;
}


$app->get('/userdata', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET '/userdata'");
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $access_token = $_GET["access_token"];
        $result = verifyAccessToken($access_token, $app);
        // trace("cnt./userdata -> verifyAccessToken devolvio: ", $result);
        if ($result) {
            $userdata = getUserdata($result, $app);
            return json_encode($userdata);
        } else {
            return json_encode(autenticationError());
        }
    }
    
});


function subscribeApp($credentials, $app_id, $app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace.subscribeApp($app_id)");
    / *
    + primero preguntar si no hay un inventory con el owner en userid y app $app_id
    + si no hay entonces
      
      + crear un inventario con owner: userid, app:$app_id
      - traer todos los mastery
      - por cada mastery, crear un experience con todo en cero y owner: userid, app:$app_id
    * 
    $user_id = $credentials["user"]["id"];
    $mas_select = array("app" => $app_id);
    $inv_select = array("owner" => $user_id, "app" => $app_id);
    
    $inventory = $app["db"]->http_get("inventory", $inv_select, array("unbox" => true));
    $_app = $app["db"]->http_get_id("app", $app_id, array("unbox"));
    trace('$inventory', $inventory);
    trace('$_app', $_app);
    if (sizeof($inventory) > 0) {        
        trace('ERROR: sin implementar !!!!!', $inventory, '<-');
    } else {
        if (isset($_app)) {
            $inventory = array(
                "owner" => $user_id,
                "app" => $app_id,
                "capacity" => 1234,         // TODO: <<<<<<<------------- capacity ????
                "structure" => array(),     // TODO: <<<<<<<------------- structure ????
                "structure_def" => array()  // TODO: <<<<<<<------------- structure_def ????
            );
            $inventory = $app["db"]->http_post("inventory", $inventory, array("unbox" => true));
            trace('$inventory', $inventory);
            //
            $experiences = array();
            $masteries = $app["db"]->http_get("mastery", $mas_select, array("unbox" => true));
            trace('$masteries', $masteries);
            foreach($masteries as $key => $mastery) {

                $experience = array(
                    "owner" => $user_id,
                    "mastery" => $mastery["id"],
                    "app" => $app_id,
                    "capacity" => 1234,
                    "structure" => array(),
                    "structure_def" => array(),
                    "points" => array()
                );           
                
                $experience = $app["db"]->http_post("experience", $experience, array("unbox" => true));
            trace('$experience', $experience);
                $experiences["id-" . $experience["id"]] = $experience;
            }
            
            return array(
                "inventory" => $inventory,
                "experience" => $experiences
            );
            
        } else {
            trace("ERROR: We don't have any app with id '$app_id'");
            return array("error" => "We don't have any app with id '$app_id'");
        }
    }
    
}

function toNamespace($text) {
    $namespace = "";
    $words = explode(" ", $text);
    $first = true;
    foreach ($words as $word) {
        if (strlen($word)>0) {
            if (!$first) {
                $namespace = "$namespace-";
            }
            $first = false;
            $namespace = "$namespace$word";
        }
    }
    
    return strtolower($namespace);
}

$app->put("/subscribe/{app_id}", function($app_id) use ($app) {
    
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $access_token = $_GET["access_token"];
        $credentials = verifyAccessToken($access_token, $app);
        // trace("cnt./userdata -> verifyAccessToken devolvio: ", $result);
        if ($credentials) {
            $result = subscribeApp($credentials, $app_id, $app);
            return json_encode($result);
        } else {
            return json_encode(autenticationError());
        }
    }
    
});

$app->get("/unsubscribe/{app_id}", function($app_id) use ($app) {
    
});

$app["db"]->on("post:user", function ($user, $op, $app) {
    
    $profile = array(
        "name" => $user["name"],
        "img" => json_encode(array("pic" => "http://via.placeholder.com/200x200")),
        "owner" => $user["id"],
        "namespace" => toNamespace($user["name"])
    );
    if (isset($user["pic"])) $profile["pic"] = $user["pic"];

    $profile = $app["db"]->http_post("profile", $profile, array("unbox" => true));
    $app["db"]->http_put("user", $user["id"], array(
        "profile" => $profile["id"]
    ));
    return $user;
});

// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// API: Cards & Tokens - Trade Market  -----------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
*/
function putHeaders() {
    header('Allow: POST, GET, OPTIONS, PUT, DELETE'); 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE'); 
}

putHeaders();