<?php

$VAPAEE_ENDPOINT = "http://accounts.vapaee.com/index.php?route=extension/module/oauth/endpoint";


// $app->get('/opengraph/{path}', function($path) use ($app) {
//     return insert_open_graph_metatags("$path");
// })->assert('path', '.+');


// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// Vapaée oauth access token cache ---------------------------------------------------------------
function getOrCreateUser($vapaee_id, $name, $app) {
    global $config; $namespace = $config['namespace'];
    trace("---------------- $namespace.getOrCreateUser($vapaee_id) -------------------");
    trace("vamos a getUser()");
    $user = getUser($vapaee_id, $app);
    trace("volvimos de getUser()");
    if ($user) {
        setcookie("user_id", $user["id"]);
    } else {
        trace("cnt.setUser($vapaee_id)");
        $user = setUser($vapaee_id, $name, $app);
        setcookie("user_id", $user["id"]);
    }    
    return $user;
}

function syncApps($user_id, $access_token, $app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace.syncApps($user_id, $access_token)");
    global $VAPAEE_ENDPOINT;
    try {
        $url = $VAPAEE_ENDPOINT . "/listall&access_token=$access_token";
        $remote_apps = file_get_contents($url);
        if (is_string($remote_apps)) $remote_apps = json_decode($remote_apps, true);
        $select_creator = array("creator" => $user_id);
        $local_apps = $app["db"]->http_get("app", $select_creator, array("unbox" => true));
        
        foreach ($remote_apps as $remote) {
            $remote["done"] = false;
            foreach ($local_apps as $l => $local) {
                if ($remote["client_id"] == $local["client_id"]) {
                    $local_apps[$l]["client_id"] = "done";
                    $remote["done"] = true;
                    if (
                        $remote["name"] != $local["name"] ||
                        $remote["redirect_uri"] != $local["redirect_uri"] ||
                        $remote["url"] != $local["url"] ||
                        $remote["brief"] != $local["brief"] ||
                        $remote["img"] != $local["img"] ||
                        $remote["namespace"] != $local["namespace"]
                       ) {
                        trace("- UPDATE app local ", $remote["name"]);
                        $app["db"]->http_put("app", $local["id"], $remote);
                    }
                }
            }

            if (!$remote["done"]) {
                $remote["creator"] = $user_id;
                $remote["owner"] = $user_id;
                trace("- CREATE app local ", $remote["name"]);
                $app["db"]->http_post("app", $remote);
            }
        }

        foreach ($local_apps as $local) {
            if ($local["client_id"] != "done") {
                trace("- DELETE app local ", $local["name"], $local["client_id"]);
                $app["db"]->http_delete_id("app", $local["id"]);
            }
        }



    } catch (Exception $e) {
        $result = null;
    }      
}

function verifyAccessToken($access_token, $app) {
    global $config; $namespace = $config['namespace'];
    trace("$namespace.verifyAccessToken($access_token)");
    global $VAPAEE_ENDPOINT;
    $today = date("Y-m-d H:i:s");
    $entry = $app["db"]->delete("oauth_cache", array("expires" => array( '$lt' => $today)));
    $find = array("access_token" => $access_token, "expires" => array( '$gt' => $today));
    $entry = $app["db"]->select("oauth_cache", $find);
    
    trace("$namespace: localmente tenemos $access_token", $entry);    
    
    if (sizeof($entry) == 0) {
        try {
            $url = $VAPAEE_ENDPOINT . "/checktoken&access_token=$access_token";
            $result = file_get_contents($url);
            if (is_string($result)) $result = json_decode($result, true);
            
            if (isset($result["error"])) {
                $result = null;
                $access_token = "";
            } else {
                if (is_string($result["state"])) $result["state"] = json_decode($result["state"], true);
                trace("(vapaee.checktoken) ----> ", $result);
                $access_token = $result["access_token"];
            }
        } catch (Exception $e) {
            $result = null;
        }
        
        if ($result === null) {
            // trace("cnt.NO AUTENTICA");
            return false;
        } else {
            // trace("cnt.AUTENTICA");

            $vapaee_id = $result["vapaee_id"];
            $user = getOrCreateUser($vapaee_id, $result["name"], $app);

            trace('$user', $user);
            if (isset($user["cache"])) {
                $user_cache = $user["cache"];
                if (is_string($user_cache)) {
                    $user_cache = json_decode($user["cache"], true);
                }
            } else {
                $user_cache = null;
            }
            
            $update_user = false;
            $update_apps = false;
            
            if ($result["name"] != $user["name"]) {
                $update_user = true;
            }
            /*if (isset($result["img"]) && $result["img"] != $user["img"]) {
                $update_user = true;
            }*/
            
            if (!isset($user_cache) || $user_cache["apps"] != $result["state"]["apps"]) {
                $update_user = true;
                $update_apps = true;
            }
            
            if ($update_user) {
                $app["db"]->http_put("user", $user["id"], array(
                    "name" => $result["name"],
                    "cache" => array("apps" => $result["state"]["apps"]),
                ));
            }
            
            $result["user"] = $user["id"];
            
            if (!is_object($result["user"])) {
                $result["user"] = array("id" => $result["user"]);
            }
            $app["db"]->create("oauth_cache", $result);
            
            if ($update_apps) {
                syncApps($user["id"], $access_token, $app);
            }
            
            
            return verifyAccessToken($access_token, $app);
        }
        
    } else {
        $entry = $entry[0];
    }
    return $entry;
}

function autenticationError() {
    return array("error" => "invalid access_token");
}

$app->get('/sync/apps', function() use ($app) {
    $access_token = $_GET["access_token"];
    $credentials = verifyAccessToken($access_token, $app);
    if ($credentials) {
        
        $result = syncApps($credentials["user"]["id"], $access_token, $app);
        return json_encode($result);
    } else {
        return json_encode(autenticationError());
    }
});

$app->get('/verify/{token}', function($token) use ($app) {
    return json_encode(verifyAccessToken($token, $app));
});
