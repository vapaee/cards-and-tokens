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
    $user["profile"] = $app["db"]->http_get_id("profile", $user["profile"]["id"], array("unbox"=>true, "secure" => true));

    $user["data"]["app"] = $app["db"]->http_get("app", $select_creator, $op);
    $user["data"]["album"] = $app["db"]->http_get("album", $select_creator, $op);
    $user["data"]["card"] = $app["db"]->http_get("card", $select_creator, $op);
    $user["data"]["edition"] = $app["db"]->http_get("edition", $select_creator, $op);
    // $user["data"]["mastery"] = $app["db"]->http_get("mastery", $select_creator, $op);
    // $user["data"]["tokenspec"] = $app["db"]->http_get("tokenspec", $select_creator, $op);
    // estado del usuario en diferentes aspecots
    // $user["data"]["experience"] = $app["db"]->http_get("experience", $select_owner, $op); // lista de piramide de tokens para una mastery
    // $user["data"]["aurafx"] = $app["db"]->http_get("aurafx", $select_owner, $op); // lista de aura activas que alteran algún atributo de laguna mastery
    $user["data"]["inventory"] = $app["db"]->http_get("inventory", $select_owner, $op); // contenido de cada inventario
    $user["data"]["collection"] = $app["db"]->http_get("collection", $select_owner, $op); // estado actual de cada album que el usuario está colecfcionando
    $user["data"]["slot"] = $app["db"]->http_get("slot", $select_owner, $op);
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
        foreach ($user["data"]["app"] as $a => $_app) {
            if ($_app["id"] == $app_id) {
                // si el usuario está subscrito a su propia aplicación lo marcamos como tal
                $user["data"]["app"][$a]["subscribed"] = true;
                $user["data"]["app"][$a]["inventory"] = array("id" => $inv_id);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            // si el usuario no es el creador de esta app, le traemos la app y la marcamos como subscribed = true
            $user["data"]["app"]["id-$app_id"] = $app["db"]->http_get_id("app", $app_id, array("unbox" => true, "no-detail" => true));
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
            $user["data"]["album"]["id-$album_id"] = $app["db"]->http_get_id("album", $album_id, array("unbox" => true, "no-detail" => true));
            if ($user["data"]["album"]["id-$album_id"]) {
                $user["data"]["album"]["id-$album_id"]["subscribed"] = true; 
                $user["data"]["album"]["id-$album_id"]["collection"] = array("id" => $coll_id);
            } else {
                trace("ERROR: Album not found in database with id $album_id (referenced from cellection $coll_id)");
            }
        }
    }
    
    
    // hasta acá tenemos las cartas que fueron creadas por el usuario
    // faltan las que el usuario compró
    foreach ($user["data"]["copy"] as $i => $copy) {
        $card_id = $copy["collectible"]["id"];
        $copy_id = $copy["id"];
        $edit_id = $copy["edition"]["id"];
        $found = false;
        if (!isset($user["data"]["card"]["id-$card_id"])) {
            $user["data"]["card"]["id-$card_id"] = $app["db"]->http_get_id("card", $card_id, array("unbox" => true, "no-detail" => true));
        }

        if (!isset($user["data"]["edition"]["id-$edit_id"])) {
            $user["data"]["edition"]["id-$card_id"] = $app["db"]->http_get_id("edition", $edit_id, array("unbox" => true, "no-detail" => true));
        }
    }
    


    return $user;
}

$app->get('/prueba', function() use ($app) {
    $unbox = array("unbox" => true);
    trace("----------- prueba ------------");
    // Construyo un Inventario
    $inventory = array(
        "capacity" => 8, // arbitrario, hay que definir bien la capacidad inicial
        "empty" => 8,
        "spec" => 2, // Specification for inventory
        "owner" => 1,
        "app" => 1 // Cards & tokens app
    );
    $inventory = $app["db"]->http_post("inventory", $inventory, $unbox);


    // Esto no va a ser así definitivamente. Sólo para este prototipo. ------------
    $collection = array(
        "album" => 1,
        "owner" => 1,
        "spec" => 1, // album
        "capacity" => 9,
        "empty" => 9
    );
    $collection = $app["db"]->http_post("collection", $collection, $unbox);
    // ----------------------------------------------------------------------------

    return json_encode($app["db"]->getAll("container",array()));
});

$app["db"]->on("post:user", function ($user, $op, $app) {
    
    // El usuario debe tener al menos un perfil
    $random = md5(time());
    $profile = array(
        "name" => $user["name"],
        "slug" => "ctn" . substr($random, 0, 29),
        "img" => json_encode(array("avatar" => "http://via.placeholder.com/200x200")),
        "owner" => $user["id"]
    );
    
    if (isset($_GET["avatar"])) $profile["img"] = json_encode(array("avatar" => $_GET["avatar"]));
    $unbox = array("unbox" => true);
    $profile = $app["db"]->http_post("profile", $profile, $unbox);
    $app["db"]->http_put("user", $user["id"], array(
        "profile" => $profile["id"],
        "dailyprize" => "2000-01-01 00:00:00"
    ));

    // Construyo un Inventario
    $inventory = array(
        "capacity" => 8, // arbitrario, hay que definir bien la capacidad inicial
        "empty" => 8,
        "spec" => 2, // Specification for inventory
        "owner" => $user["id"],
        "app" => 1 // Cards & tokens app
    );
    $inventory = $app["db"]->http_post("inventory", $inventory, $unbox);


    // Esto no va a ser así definitivamente. Sólo para este prototipo. ------------
    $collection = array(
        "album" => 1,
        "owner" => $user["id"],
        "spec" => 1, // album
        "capacity" => 9,
        "empty" => 9
    );
    $collection = $app["db"]->http_post("collection", $collection, $unbox);
    // ----------------------------------------------------------------------------














    // Esto es de prueba (ini)-----------
    /*
    $copy = array(
        "collectible" => 1,
        "edition" => 1,
        "owner" => $user["id"],
        "multiplicity" => 1,
        "spec" => 1, // "card"
        "container" => $inventory["container_id"]
    );
    $copy = $app["db"]->http_post("copy", $copy, $unbox);
    $app["db"]->http_put("inventory", $inventory["id"], array(
        "structure" => array("s1" => $copy["id"])
    ));

    $copy = array(
        "collectible" => 2,
        "edition" => 2,
        "owner" => $user["id"],
        "multiplicity" => 1,
        "spec" => 1, // "card"
        "container" => $collection["container_id"]
    );
    $copy = $app["db"]->http_post("copy", $copy, $unbox);

    $collection = array(
        "album" => 1,
        "owner" => $user["id"],
        "spec" => 1, // album
        "structure" => array("s3" => $copy["id"]),
        "capacity" => 8
    );
    $collection = $app["db"]->http_post("collection", $collection, $unbox);
    */
    // Esto es de prueba (fin)-----------

    return $user;
});



/*
$app->get('/userdata', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET 'userdata'");
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
*/

$app->get('/dailyprize', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET 'dailyprize' --------------");

    
    $op = array("secure" => true, "unbox" => true);
    $result = verifySteemAccessToken($app);
    $user_id = $result["user"]["id"];
    $user = $app["db"]->http_get_id("user", $user_id, $op);

    // ---------------------------------------------------------------------
    // checking if has past at least one day -------------------------------
    $lastprize = date_create($user["dailyprize"]);
    $hoy = date_create(date("Y-m-d H:i:s"));
    $interval = date_diff($hoy, $lastprize);
    $days = $interval->format("%a");
    if ($days == 0) {
        $h = $interval->format("%h");
        $m = $interval->format("%i");
        $s = $interval->format("%s");
        $remaining = 24 * 60 * 60 - $h * 60 * 60 - $m * 60 - $s;
        return '{"error":"less than a day", "countdown":"'.$remaining.'","h":"'.$h.'","m":"'.$m.'","s":"'.$s.'"}';
    }

    // ---------------------------------------------------------------------
    // checking if there's space in the inventory --------------------------
    $inventory = $app["db"]->http_get("inventory", array("owner" => $user_id), $op);
    $inventory = $inventory[0];

    if ($inventory["empty"] == 0) {
        return '{"error":"inventory is full"}';
    }

    $container_id = $inventory["container_id"];
    $slots = $app["db"]->http_get("slot", array("container" => $container_id), $op);
    $candidates = [];
    // we turn on all candidates slots
    for ($i=0; $i<$inventory["capacity"]; $i++) {
        array_push($candidates, true);
    }
    // then we turn off slots actually used
    foreach ($slots as $key => $slot) {
        $candidates[ $slot["index"] ] = false;
    }

    // we took first empty slot
    $slot_index = -1;
    for ($i=0; $i<$inventory["capacity"]; $i++) {
        if ($candidates[$i]) {
            $slot_index = $i;
            break;
        }
    }

    // trace('$slot_index', $slot_index, '$candidates: ', $candidates);


    // ---------------------------------------------------------------------
    // we create the new slot and the item
    $collectibles = $app["db"]->http_get("card", null, $op);
    $coll_index = rand(0, sizeof($collectibles)-1);
    $card = $collectibles[$coll_index];
    $edition = $app["db"]->http_get_id("edition", $card["edition"]["id"], $op);

    $copy = array(
        "collectible" => $card["collectible_id"],
        "edition" => $card["edition"]["id"],
        "owner" => $user["id"],
        "multiplicity" => 1,
        "spec" => 1, // "card"
        "container" => $inventory["container_id"]
    );
    $copy = $app["db"]->http_post("copy", $copy, $op);

    $slot = array(
        "owner" => $user["id"],
        "item" => $copy["item_id"],
        "container" => $inventory["container_id"],
        "index" => $slot_index,
    );
    $slot = $app["db"]->http_post("slot", $slot, $op);

    $to = $app["db"]->http_put("inventory", $inventory["id"], array(
        "empty" => $inventory["empty"] - 1
    ));
    
    $app["db"]->http_put("user", $user["id"], array(
        "dailyprize" => "CURRENT_TIMESTAMP"
    ));

    return json_encode(array(
        "slot" => $slot,
        "copy" => $copy,
        "card" => $card,
        "edition" => $edition,
        "success" => true
    ));
});




$app->post('/swap/slots', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        usleep(rand(0,2000000));
        $content = $app["request"]->getContent();
        $content = json_decode($content);
        trace("$namespace GET 'swap slots' from ($content->from,$content->fromi) to ($content->to,$content->toi) ---------------------");

        $credentials = verifySteemAccessToken($app);
        if (!isset($credentials)) {
            return json_encode(array("error" => "user not logged"));
        }
        $from = null;
        $to = null;

        $op = array("unbox"=>true);
        $select_to   = array("container" => $content->to, "index" => $content->toi);
        $select_from = array("container" => $content->from, "index" => $content->fromi);

        $slot_to   = $app["db"]->http_get("slot", $select_to, $op);
        $slot_from = $app["db"]->http_get("slot", $select_from, $op);

        trace('$slot_from', $slot_from, isset($slot_from));
        trace('$slot_to', $slot_to, isset($slot_to));

        if (
            ($slot_to && $slot_to[0]["owner"]["id"] != $credentials["user"]["id"]) ||
            ($slot_from && $slot_from[0]["owner"]["id"] != $credentials["user"]["id"])
        ) {
            trace("ERROR: ");
            trace('$credentials', $credentials);
            trace('(isset($slot_to) && $slot_to[0]["owner"]["id"] != $credentials["user"]["id"])', (isset($slot_to) && $slot_to[0]["owner"]["id"] != $credentials["user"]["id"]));
            trace('(isset($slot_from) && $slot_from[0]["owner"]["id"] != $credentials["user"]["id"])', (isset($slot_from) && $slot_from[0]["owner"]["id"] != $credentials["user"]["id"]));

            trace('$slot_to[0]', $slot_to[0]);
            trace('$slot_to[0]["owner"]', $slot_to[0]["owner"]);
            trace('$slot_to[0]["owner"]["id"]', $slot_to[0]["owner"]["id"]);

            return json_encode(array("error" => "user logged is not the owner of the slots"));
        }

        if (is_array($slot_to) && sizeof($slot_to) == 1) {
            $slot_to = $slot_to[0];
            $from = $app["db"]->http_put("slot", $slot_to["id"], array(
                "container" => $content->from,
                "index" => $content->fromi
            ));
            $from = $from["slot"];
        }
        
        if (is_array($slot_from) && sizeof($slot_from) == 1) {
            $slot_from = $slot_from[0];
            $to = $app["db"]->http_put("slot", $slot_from["id"], array(
                "container" => $content->to,
                "index" => $content->toi
            ));
            $to = $to["slot"];
            if (!$slot_to) {
                if ($content->from != $content->to) {
                    $container_from = $app["db"]->http_get_id("container", $content->from, $op);
                    $container_to   = $app["db"]->http_get_id("container", $content->to, $op);
                    $container_from = $app["db"]->http_put("container", $container_from["container_id"], array(
                        "empty" => $container_from["empty"]+1
                    ));
                    $container_to = $app["db"]->http_put("container", $container_to["container_id"], array(
                        "empty" => $container_to["empty"]-1
                    ));    
                }
            }

        }
        
        return json_encode(array(
            "to" => $to, "from" => $from
        ));
    }    
});





// STEEM ----------------
function verifySteemAccessToken($app) {
    global $config; $namespace = $config['namespace'];
    if (!isset($_COOKIE["access_token"]) && !isset($_GET["access_token"])) {
        trace("ERROR: no access_token found in cookies", $_COOKIE, "or GET params", $_GET);
        return null;
    }
    if (isset($_COOKIE["access_token"])) {
        $access_token = $_COOKIE["access_token"];    
    }
    if (isset($_GET["access_token"])) {
        $access_token = $_GET["access_token"];    
    }

    // $one_year = 360 * 24 * 60 * 60;
    // setcookie("access_token", $access_token, time()+$one_year);

    // $credentials["user"]["id"]
    $credentials = null;
    $op = array("unbox"=>true, "secure" => true);
    $oauth_steem = $app["db"]->http_get("oauth_steem", array("access_token" => $access_token), $op);
    trace("$namespace.verifySteemAccessToken()", $access_token, $oauth_steem);
    if ($oauth_steem) {
        if(is_array($oauth_steem)) {
            $oauth_steem = $oauth_steem[0];
        }
        trace("$namespace.verifySteemAccessToken()   ENCONTRE!  ", $oauth_steem);
        $user = $app["db"]->http_get_id("user", $oauth_steem["user"]["id"], $op);
    } else {
        trace("$namespace.verifySteemAccessToken()   NO ENCONTRE!  CHEKAMOS EL TOKEN EN STEEM... ");

        $opts = array(
            "ssl" => array(
                "verify_peer"=>false,
                "verify_peer_name"=>false,
            ),
            "http" => array(
                "method"  => "POST",
                "header"  => array(
                    "Content-Type: application/x-www-form-urlencoded",
                    "authorization: $access_token\r\n",
                    ":authority: steemconnect.com\r\n",
                    ":path: /api/me\r\n",
                    ":method: POST\r\n",
                    ":scheme: https\r\n",
                    "accept: application/json, text/plain, */* \r\n\r\n"
                ),
                "content" => "{}"
            )
        );
        $context  = stream_context_create($opts);
        $result = file_get_contents('https://steemconnect.com/api/me', false, $context);
        $steemuser = json_decode($result, true);
        if (!isset($steemuser)) {
            trace(" -------------- ERROR ------------");
            trace($result);
            return null;
        }
        $profile = array("name" => $steemuser["name"]);
        if (isset($steemuser["account"]) && isset($steemuser["account"]["json_metadata"])) {
            $aux = json_decode($steemuser["account"]["json_metadata"], true);
            if ($aux && isset($aux["profile"])) {
                $profile = $aux["profile"];
            }
        }
        $steemuser["profile"] = $profile;
        $account = $steemuser["name"];
        $name = isset($profile["name"]) ? $profile["name"] : $account;
        /*
        trace("------------ STEEM RESULT --------------------");
        trace($steemuser);
        trace($profile);
        trace($name);
        trace("----------------------------------------------");
        */

        $old_oauth_steem = $app["db"]->http_get("oauth_steem", array("account" => $account), $op);
        if ($old_oauth_steem) {
            if(is_array($old_oauth_steem)) {
                $old_oauth_steem = $old_oauth_steem[0];
            }
            trace("Aahhh ya habia estado el usuario '$account' pero cambio el access_token");
            $user = $old_oauth_steem["user"];
            $user = $app["db"]->http_get_id("user", $user["id"], $op);
            $app["db"]->http_delete_id("oauth_steem", $old_oauth_steem["id"]);
        } else {
            trace("NUEVO USUSARIO !!!!!!", $name);
            $user = $app["db"]->http_post("user", array("name" => $name), array("unbox" => true, "secure" => true));
        }

        $app["db"]->http_post("oauth_steem", array(
            "user" => $user["id"], 
            "access_token" => $access_token, 
            "account" => $account
        ), $op);
    }
    trace("$namespace.verifySteemAccessToken() return ", array("user" => $user));
    return array(
        "user" => $user
    );
}

$app->get('/steem/user', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET '/steem/user' ---------------------");
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $result = verifySteemAccessToken($app);
        // trace("cnt./userdata -> verifyAccessToken devolvio: ", $result);
        if ($result) {
            $userdata = getUserdata($result, $app);
            return json_encode($userdata);
        } else {
            return json_encode(autenticationError());
        }
    }    
});

function putHeaders() {
    header('Allow: POST, GET, OPTIONS, PUT, DELETE'); 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE'); 
}

putHeaders();