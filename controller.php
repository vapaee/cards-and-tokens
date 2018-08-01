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
        "profile" => $profile["id"]
    ));

    // Construyo un Inventario
    $inventory = array(
        "capacity" => 8, // arbitrario, hay que definir bien la capacidad inicial
        "structure" => array(),
        "spec" => 2, // Specification for inventory
        "owner" => $user["id"],
        "app" => 1 // Cards & tokens app
    );
    $inventory = $app["db"]->http_post("inventory", $inventory, $unbox);




    // Esto es de prueba (ini)-----------
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
    // Esto es de prueba (fin)-----------

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



$app->post('/swap/slots', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET '/swap/slots'");
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $content = $app["request"]->getContent();
        $content = json_decode($content);
        $from = null;
        $to = null;

        $op = array("unbox"=>true);
        $select_to   = array("container" => $content->to, "index" => $content->toi);
        $select_from = array("container" => $content->from, "index" => $content->fromi);

        $slot_to   = $app["db"]->http_get("slot", $select_to, $op);
        $slot_from = $app["db"]->http_get("slot", $select_from, $op);

        trace('$slot_from', $slot_from);
        trace('$slot_to', $slot_to);

        if (is_array($slot_to) && sizeof($slot_to) == 1) {
            $slot_to = $slot_to[0];
            $to = $app["db"]->http_put("slot", $slot_to["id"], array(
                "container" => $content->from,
                "index" => $content->fromi
            ));
        }
        
        if (is_array($slot_from) && sizeof($slot_from) == 1) {
            $slot_from = $slot_from[0];
            $from = $app["db"]->http_put("slot", $slot_from["id"], array(
                "container" => $content->to,
                "index" => $content->toi
            ));
        }
        
        return json_encode(array(
            "to" => $to, "from" => $from
        ));
    }    
});





// STEEM ----------------
function verifySteemAccessToken($access_token, $account, $name, $app) {
    // $credentials["user"]["id"]
    $credentials = null;
    $op = array("unbox"=>true, "secure" => true);
    $oauth_steem = $app["db"]->http_get("oauth_steem", array("account" => $account), $op);
    trace("verifySteemAccessToken()", $access_token, $account, $name);
    if ($oauth_steem) {
        if(is_array($oauth_steem)) {
            $oauth_steem = $oauth_steem[0];
        }
        // trace("verifySteemAccessToken()   ENCONTRE!  ", $oauth_steem);
        $user = $app["db"]->http_get_id("user", $oauth_steem["user"]["id"], $op);
        $app["db"]->http_put("oauth_steem", $oauth_steem["id"], array(
            "access_token" => $access_token
        ));
    } else {
        // trace("verifySteemAccessToken()   NO ENCONTRE!   ");
        $user = $app["db"]->http_post("user", array("name" => $name), array("unbox" => true, "secure" => true));

        $app["db"]->http_post("oauth_steem", array(
            "user" => $user["id"], 
            "access_token" => $access_token, 
            "account" => $account
        ), $op);
    }
    // trace("verifySteemAccessToken() return ", array("user" => $user));
    return array(
        "user" => $user
    );
}

$app->get('/steem/user', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET '/steem/user'");
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

function putHeaders() {
    header('Allow: POST, GET, OPTIONS, PUT, DELETE'); 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE'); 
}

putHeaders();