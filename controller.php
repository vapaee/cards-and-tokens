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

function getUserFromCredentials($credentials, $app) {
    $user_id = $credentials["user"]["id"];
    $op = array("unbox"=>true, "mapping"=>"id", "no-detail" => true, "secure" => true);
    $user = $app["db"]->http_get_id("user", $user_id);
    $user["profile"] = $app["db"]->http_get_id("profile", $user["profile"]["id"], array("unbox"=>true, "secure" => true));
    return $user;
}

function getUserdata($credentials, $app) {
    global $config; $namespace = $config['namespace'];
    // trace("$namespace.getUserdata()", $credentials);
    
    $op = array("unbox"=>true, "mapping"=>"id", "no-detail" => true, "secure" => true);
    $user = getUserFromCredentials($credentials, $app);
        
    $select_owner = array("owner" => $user["id"]);
    $select_creator = array("creator" => $user["id"]);
    
    $user["data"] = array();
    // definido por el usuario

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
        "img" => json_encode(array("avatar" => "/assets/noavatar.png")),
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

    return $user;
});

function getUserFromSteemAccessToken($app, $op = array("secure" => true, "unbox" => true)) {
    $result = verifySteemAccessToken($app);
    $user_id = $result["user"]["id"];
    $user = $app["db"]->http_get_id("user", $user_id, $op);
    return $user;
}

function getDailyPriceRemainintTimeFromUser($user) {
    $lastprize = date_create($user["dailyprize"]);
    $hoy = date_create(date("Y-m-d H:i:s"));
    $interval = date_diff($hoy, $lastprize);
    $days = $interval->format("%a");
    $remaining = 0;
    if ($days == 0) {
        $h = $interval->format("%h");
        $m = $interval->format("%i");
        $s = $interval->format("%s");
        $remaining = 24 * 60 * 60 - $h * 60 * 60 - $m * 60 - $s;
    }
    return array(
        "days" => $days,
        "sec" => $remaining,
        "lastprize" => $lastprize
    );
}

$app->post('/update/collectible/votes', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $content = $app["request"]->getContent();
        $content = json_decode($content);
        trace("$namespace GET 'update.collectible.votes' card: $content->slug votes:$content->votes ---------------------");
        $op = array("unbox" => true);
        // este select lo hago para conseguir el id de la carta
        $card = $app["db"]->http_get("card", array("slug" => $content->slug), $op);
        if (sizeof($card) == 1) {
            $card = $card[0];
    trace('$card', $card, '<--');
            $collectible = $app["db"]->http_put("card", $card["id"], array(
                "steem_votes" => $content->votes
            ), $op);
            if (array_key_exists("card", $collectible)) {
                $collectible = $collectible["card"];
            }
    trace('$collectible', '-->', $collectible);
            if ($collectible["steem_votes"] == $content->votes) {
                return '{"success":true, "card":'.json_encode($collectible).'}';
            }
            
        } else {

        }
        
    } 

    return '{"success":true}';

});

$app->get('/dailyprize/claim', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    // trace("$namespace GET 'dailyprize' --------------");
    $op = array("unbox"=>true);
    $user = getUserFromSteemAccessToken($app, $op);
    $remaining = getDailyPriceRemainintTimeFromUser($user);
    if ($remaining["days"] == 0) {
        $remaining["error"] = "less than a day";
        return json_encode($remaining);
    }

    // ---------------------------------------------------------------------
    // checking if there's space in the inventory --------------------------
    $inventory = $app["db"]->http_get("inventory", array("owner" => $user["id"]), $op);
    $inventory = $inventory[0];

    if ($inventory["empty"] == 0) {
        return '{"error":"inventory is full"}';
    }

    $id = $inventory["id"];
    $slots = $app["db"]->http_get("slot", array("container" => $id), $op);
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
        "container" => $inventory["id"]
    );
    $copy = $app["db"]->http_post("copy", $copy, $op);

    $slot = array(
        "owner" => $user["id"],
        "item" => $copy["item_id"],
        "data" => array("collectible" => $card["id"]),
        "container" => $inventory["id"],
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

$app->get('/dailyprize/countdown', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    // trace("$namespace GET 'dailyprize.countdown' --------------");
    
    $op = array("unbox"=>true);
    $user = getUserFromSteemAccessToken($app, $op);
    $remaining = getDailyPriceRemainintTimeFromUser($user);
    return json_encode($remaining);
    
});

$app->post('/swap/slots', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $content = $app["request"]->getContent();
        $content = json_decode($content);
        // trace("$namespace GET 'swap.slots' from ($content->from,$content->fromi) to ($content->to,$content->toi) ---------------------");

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

        // trace('$slot_from', $slot_from, isset($slot_from));
        // trace('$slot_to', $slot_to, isset($slot_to));

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
                    $container_from = $app["db"]->http_put("container", $container_from["id"], array(
                        "empty" => $container_from["empty"]+1
                    ));
                    $container_to = $app["db"]->http_put("container", $container_to["id"], array(
                        "empty" => $container_to["empty"]-1
                    ));    
                }
            }

        }
        
        // simulando una demora en el servidor
        usleep(rand(0,2000000));

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
    // trace("$namespace.verifySteemAccessToken()", $access_token, $oauth_steem);
    if ($oauth_steem) {
        if(is_array($oauth_steem)) {
            $oauth_steem = $oauth_steem[0];
        }
        // trace("$namespace.verifySteemAccessToken()   ENCONTRE!  ", $oauth_steem);
        $user = $app["db"]->http_get_id("user", $oauth_steem["user"]["id"], $op);
    } else {
        // trace("$namespace.verifySteemAccessToken()   NO ENCONTRE!  CHEKAMOS EL TOKEN EN STEEM... ");

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
        
        // trace("------------ STEEM RESULT --------------------");
        // trace($steemuser);
        // trace($profile);
        // trace($name);
        // trace("----------------------------------------------");
        

        $old_oauth_steem = $app["db"]->http_get("oauth_steem", array("account" => $account), $op);
        if ($old_oauth_steem) {
            if(is_array($old_oauth_steem)) {
                $old_oauth_steem = $old_oauth_steem[0];
            }
            // trace("Aahhh ya habia estado el usuario '$account' pero cambio el access_token");
            $user = $old_oauth_steem["user"];
            $user = $app["db"]->http_get_id("user", $user["id"], $op);
            $app["db"]->http_delete_id("oauth_steem", $old_oauth_steem["id"]);
        } else {
            $user = $app["db"]->http_post("user", array("name" => $name), array("unbox" => true, "secure" => true));
            trace("NUEVO USUSARIO !!!!!!", $user["id"], $account, $name);
        }

        $app["db"]->http_post("oauth_steem", array(
            "user" => $user["id"], 
            "access_token" => $access_token, 
            "account" => $account
        ), $op);
    }
    // trace("$namespace.verifySteemAccessToken() return ", array("user" => $user));
    return array(
        "user" => $user
    );
}

// returns a structure containing the total points a collection has plus the details on each card included
function calculateSteemPoints($collection_id, $app) {
    // trace("calculateSteemPoints()", $collection_id);
    $op = array("unbox" => true);
    $total = 0;
    $items = array();
    $slots = $app["db"]->http_get("slot", array("container" => $collection_id), $op);
    foreach ($slots as $i => $slot) {
        $item = array( "item" => $slot["item"]["id"]);
        $card_id = $slot["data"]["collectible"];
        $card = $app["db"]->http_get_id("collectible", $card_id, $op);
        $item["collectible"] = $card["id"];
        $pts = $card["steem_votes"];
        $total += $pts;
        $item["steem_votes"] = $pts;
        // trace("calculateSteemPoints() - ", $item);
        array_push($items, $item);
    }

    // trace("calculateSteemPoints() ", $total, "<-");

    return array(
        "total" => $total,
        "items" => $items
    );
}

// calcula y guarda la cantidad total de puntos que tiene una collection en particular
function updateCollectionSteemPoints($collection_id, $app) {
    // trace("updateCollectionSteemPoints()", $collection_id);
    $op = array("unbox" => true);
    $steemPoints = calculateSteemPoints($collection_id, $app);
    $new_pts = $steemPoints["total"];
    $collection = $app["db"]->http_get_id("collection", $collection_id, $op);
    $old_pts = $collection["points"];
    if ($old_pts != $new_pts) {
        // trace("updateCollectionSteemPoints() UPDATE !!!!", $old_pts, "-->", $new_pts);
        $app["db"]->http_put("collection", $collection_id, array(
            "points" => $new_pts
        ));
        $collection["points"] = $new_pts;
        $collection["position"] = updateCollectionPosition($collection, $new_pts - $old_pts, $app);
    }

    return array(
        "succes" => true,
        "points" => $new_pts,
        "position" => $collection["position"],
        "steem" => $steemPoints,
        "collection" => $collection
    );
}

/* $app->get("/update_collections", function() use ($app) {
    $result = updateCollectionSteemPoints(2, $app);
    return json_encode($result);
}); */

$app->post("/update_collection", function() use ($app) {
    global $config; $namespace = $config['namespace'];
    $content = $app["request"]->getContent();
    $content = json_decode($content);
    // trace("$namespace POST 'update_collection' collection ($content->collection) ---------------------");
    $result = updateCollectionSteemPoints($content->collection, $app);
    return json_encode($result);
});

$app->post("/crear_carta", function() use ($app) {
    global $config; $namespace = $config['namespace'];
    // trace("$namespace POST 'crear_carta' ---------------------");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $content = $app["request"]->getContent();
        $content = json_decode($content, true);

        $credentials = verifySteemAccessToken($app);
        if (!isset($credentials)) {
            trace("ERROR: user not logged -- ");
            return json_encode(array("error" => "user not logged"));
        }
    
        $user = getUserFromCredentials($credentials, $app);
        if ($user["id"] != 1) {
            trace("ERROR: OPA!!! UN ALGUIEN ESTA TRATANDO DE HACKEARNOS !!!");
            trace($user);
            trace($credentials);
            return json_encode(array("error" => "you are not admin"));
        }

        $unbox  = array("unbox"=>true);

        // Card
        $card = array(
            // collectible ----
            "publisher" => 1,
            "creator" => 1,
            "edition" => 1,
            "deployable" => true,
            "steem" => array("empty" => true),
            "steem_votes" => 0,
            "type" => "collection",
            // Card ---------
            "slug" => $content["model"]["slug"],
            "text" => array("title" => $content["model"]["title"], "subtitle" => "by @" . $content["model"]["steemuser"] . " for Steemit OpenMic")
        );
        $card = $app["db"]->http_post("card", $card, $unbox);        

        $content["deploy"]["data"] = $content["model"];
        // Edition
        $edition = array(
            "collectible" => 1,
            "creator" => 1,
            "url" => "first",
            "preload" => array($content["model"]["bgimage"]),
            "preview" => $content["preview"],
            "data" => $content["model"],
            "deploy" => $content["deploy"],
            "copies" => 0,
            "released" => true
        );
        $edition = $app["db"]->http_post("edition", $edition, $unbox);
        $edition["collectible"] = $card["id"];
        $card["edition"] = $edition["id"];

        $app["db"]->http_put("edition", $edition["id"], array(
            "collectible" => $card["id"]
        ));

        $app["db"]->http_put("card", $card["id"], array(
            "edition" => $edition["id"]
        ));
                
        // Pending
        $pending = array(
            "owner" => "steem@".$content["model"]["steemuser"],
            "task" => "claim-openmic-card",
            "params" => array( "card" => $card["id"], "edition" => $edition["id"] )
        );
        $pending = $app["db"]->http_post("pending", $pending, $unbox);

        return json_encode(array(
            "success" => true,
            "card" => $card,
            "edition" => $edition,
            "pending" => $pending
        ));
    }
});



// calcula y guarda las posiciones de las colecciones de un album
// Este procedimiento es muy costoso y no tiene optimizaciones
function updateAlbumRanking($album_id, $app) {
    /*
        - obtener todas las collecciones de el álbum concreto (ordenadas por points)
        - por cada collection
          - si no coincide su position con el índice que le tocó en el ordenamiento
            - update tupla

    */
}

function updateCollectionPosition($collection, $delta_points, $app) {
    // trace("updateCollectionPosition()", array("id"=>$collection["id"], "position"=>$collection["position"], "points"=>$collection["points"]), $delta_points);
    $album_id = $collection["album"]["id"];
    $init_pos = $collection["position"];

    // trace("---------------- INIT -----------------");
    if ($delta_points > 0) {
        // si el delta es positivo (gané puntos, subí en el ranking)
        $select = array("album" => $album_id, "position" => array('$lt' => $collection["position"]));
        $order_by = array("unbox" => true, "order" => array("by" => "position", "wey" => "DESC")); // ASC|DESC
        $collections = $app["db"]->http_get("collection", $select, $order_by);

    // trace("updateCollectionPosition() collections ", $collections);
    // trace("updateCollectionPosition() collection:", $collection["position"], "points:", $collection["points"]);
        foreach ($collections as $coll) {
    // trace("updateCollectionPosition() position:", $coll["position"], "points:", $coll["points"]);
            if ($collection["points"] > $coll["points"]) {
                $collection["position"] = $coll["position"];
    // trace("escalamos -> position:", $collection["position"]);
                $app["db"]->http_put("collection", $coll["id"], array(
                    "position" => $coll["position"]+1 // bajar en el ranking es aumnetar el número de la posición
                ));            
            } else {
                break;
            }
        }
    } else {
        // si el delta es negativo (perdí puntos, bajé en el ranking)  
        $select = array("album" => $album_id, "position" => array('$gt' => $collection["position"]));
        $order_by = array("unbox" => true, "order" => array("by" => "position", "wey" => "ASC")); // ASC|DESC
        $collections = $app["db"]->http_get("collection", $select, $order_by);
    // trace("updateCollectionPosition() collections ", $collections);
    // trace("updateCollectionPosition() collection:", $collection["position"], "points:", $collection["points"]);
        foreach ($collections as $coll) {
    // trace("updateCollectionPosition() position:", $coll["position"], "points:", $coll["points"]);
            if ($collection["points"] < $coll["points"]) {
                $collection["position"] = $coll["position"];
    // trace("descendemos -> position:", $collection["position"]);
                $app["db"]->http_put("collection", $coll["id"], array(
                    "position" => $coll["position"]-1 // subir en el ranking es decremendar el número de la posición
                ));
            } else {
                break;
            }
        }
    }
    if ($init_pos != $collection["position"]) {
    // trace("quedamos en -> position:", $collection["position"]);
        $app["db"]->http_put("collection", $collection["id"], array(
            "position" => $collection["position"]
        ));
    } 
    // trace("---------------- FIN -----------------");

    return $collection["position"];
}


$app->get('/google/user', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace GET 'google.user' ---------------------");
    putHeaders();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $id_token = $_GET["id_token"];
        $client = new Google_Client(['client_id' => '1079652811584-1a0710pi1pcvlnlait89dbadlo6p5emm.apps.googleusercontent.com']);
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {
            $userid = $payload['sub'];
            trace("GOOGLE RESPONSE", $payload);
            /*
{
    "iss": "accounts.google.com",
    "azp": "1079652811584-1a0710pi1pcvlnlait89dbadlo6p5emm.apps.googleusercontent.com",
    "aud": "1079652811584-1a0710pi1pcvlnlait89dbadlo6p5emm.apps.googleusercontent.com",
    "sub": "111522924485227241656",
    "email": "viter.rod@gmail.com",
    "email_verified": true,
    "at_hash": "V0vILO6SApQs02eyNiNSiA",
    "name": "Viterbo Rodriguez",
    "picture": "https:\\/\\/lh5.googleusercontent.com\\/-O726ebpeNtw\\/AAAAAAAAAAI\\/AAAAAAAAAGA\\/G7d3xnX9zQk\\/s96-c\\/photo.jpg",
    "given_name": "Viterbo",
    "family_name": "Rodriguez",
    "locale": "es-419",
    "iat": 1537629549,
    "exp": 1537633149,
    "jti": "a632eb19b010bb9c50ae3c42ada902fc5c0e2e1d"
}            
            */
            return json_encode($payload);
        } else {
            // Invalid ID token
            trace("GOOGLE RESPONSE: Invalid ID token", $id_token);
            return json_encode(autenticationError());
        }
    }    
});




$app->get('/steem/user', function() use ($app) {
    global $config; $namespace = $config['namespace'];
    // trace("$namespace GET 'steem.user' ---------------------");
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




/// Open graph -------------------------------------------------------
$app->get('/opengraph/{path}', function($path) use ($app) {
    return insert_opengraph("$path", $app);
})->assert('path', '.+');


function insert_opengraph($path) {
    global $config;
    // trace("insert_opengraph($path)");
    $info = array(
        "site_url" => $config["site_url"],
        "site_name" => $config["site_name"],
        "site_social_image" => $config["site_social_image"],
        "description" => $config["description"],
        "favicon_url" => $config["favicon_url"],
        "favicon_type" => $config["favicon_type"],
        "locale" => $config["locale"],
        "page_title" => $config["site_name"],
        "fb_app_id" => $config["fb_app_id"]
    );
    if (strpos($path, 'deploy/card/') !== false) {
        $slug = explode('/card/', $path);
        $slug = $slug[1];
        $info["site_social_image"] = $info["site_url"] . "/assets/cards/openmic/images/opengraph/$slug.png";
        $info["image_size"] = array(
            "width" => "540",
            "height" => "282"
        );
    } else if (strpos($path, 'deploy/album/openmic-100-weeks') !== false) {
        
        $info["site_social_image"] = $info["site_url"] . "/assets/albums/openmic/preview-thumbnail.png";
        $info["image_size"] = array(
            "width" => "200",
            "height" => "240"
        );

        // deploy\\/album\\/openmic-100-weeks
    } else {
        $info = $config;
        $config['page_title'] = $config["site_name"];
    }
    insert_opengraph_metatags($path, $info);
    return "";

};

function insert_opengraph_metatags($path, $info) {
    
    // trace("insert_opengraph_metatags($path)");
    

    if (!isset($info['page_title'])) {
        $info['page_title'] = $info["site_name"];
    }    
    echo "<!-- Open Graph -->\n";
    echo "<meta property='og:type' content='website'>\n";
    echo "<meta property='path' content='$path'>\n";
    
    // "og:image:width" y "og:image:height""og:image:width" y "og:image:height"
    if (config_is_set($info["site_url"]))          echo "<meta property='og:url' content='" . $info["site_url"] . $path ."'>\n";
    if (config_is_set($info["page_title"]))         echo "<meta property='og:title' content='" . $info["page_title"] . "'>\n";
    if (config_is_set($info["site_name"]))         echo "<meta property='og:site_name' content='" . $info["site_name"] . "'>\n";
    if (config_is_set($info["site_social_image"])) echo "<meta property='og:image' content='" . $info["site_social_image"] . "'>\n";
    // trace('$info', $info);
    if (isset($info["image_size"]) && is_array($info["image_size"])) {
        echo "<meta property='og:image:width' content='" . $info["image_size"]["width"] . "'>\n";
        echo "<meta property='og:image:height' content='" . $info["image_size"]["height"] . "'>\n";
    }
    if (config_is_set($info["fb_app_id"]))         echo "<meta property='fb:app_id' content='" . $info["fb_app_id"] . "'>\n";
    if (config_is_set($info["locale"]))            echo "<meta property='og:locale' content='" . $info["locale"] . "'>\n";
    if (config_is_set($info["description"]))       echo "<meta property='og:description' content='" . $info["description"] . "'>\n";
    return "";
};