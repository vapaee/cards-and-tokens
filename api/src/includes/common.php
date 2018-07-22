<?php

function insert_open_graph() {
    global $config;
    echo file_get_contents($config["site_url"] . "/api/opengraph" . $_SERVER["REQUEST_URI"]);
}

function insert_cookie_api() {
    echo "<script>\n";
    echo "   var cookie = (function() {\n";
    echo "      var set = function(name, value, seconds) {\n";
    echo "          var expires = ''\n";
    echo "          if (typeof seconds == 'number') {\n";
    echo "              expires = seconds>0 ? '; expires=' + new Date(new Date().getTime() + seconds * 1000).toGMTString() : \n";
    echo "                        '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';\n";
    echo "          }\n";
    echo "          var nextvalue = value == '' ? '' : encodeURIComponent(value)\n";
    echo "          var cookie = name + '=' + nextvalue + expires + '; path=/';\n";
    echo "          document.cookie = cookie;\n";
    echo "      };\n";
    echo "      var map = function() {\n";
    echo "          var map = {};\n";
    echo "          var kvs = document.cookie.split('; ');\n";
    echo "          for (var i = 0; i < kvs.length; i++) { var kv = kvs[i].split('='); map[kv[0]] = decodeURIComponent(kv[1]); }\n";
    echo "          return map;\n";
    echo "      };\n";
    echo "      var get = function(name) { return map()[name]; };\n";
    echo "      var remove = function(name) { set(name, '', -1); };\n";
    echo "      return { set: set, get: get, remove: remove, map: map };\n";
    echo "   })();\n";
    echo "</script>\n";
}

function check_local_user() {
    
}

function insert_globals() {
    global $config;
    echo "<script>\n";
    echo "   cookie.set('vapaee_client_id', '".$config["vapaee_client_id"]."');\n";
    echo "   cookie.set('site_url', '".$config["site_url"]."');\n";
    echo "   cookie.set('site_name', '".$config["site_name"]."');\n";
    echo "   cookie.set('app_module_name', '".$config["app_module_name"]."');\n";
    echo "   cookie.set('app_url_default', '".$config["app_url_default"]."');\n";
    echo "   cookie.set('facebook_app_id', '".$config["fb_app_id"]."');\n";
    echo "   cookie.set('facebook_page', '".$config["fb_page"]."');\n";
    echo "   cookie.set('google_app_id', '".$config["google_app_id"]."');\n";
    echo "   cookie.set('site_social_image', '".$config["site_social_image"]."');\n";
    echo "   cookie.set('favicon_url', '".$config["favicon_url"]."');\n";
    echo "   cookie.set('user_service', '".$config["user_service"]."');\n";
    echo "   cookie.set('userdata_service', '".$config["userdata_service"]."');\n";
    echo "</script>\n";
}

function check_vapaee_user() {
    global $config; $basename = $config['basename'];
    // trace("$basename.check_vapaee_user() COOKIES['foreign_token']: " . (isset($_COOKIE["foreign_token"]) ? $_COOKIE["foreign_token"]: ""));

    $parts = explode("/", $_SERVER["REQUEST_URI"]);
    $file = $parts[sizeof($parts)-1];
    if (strpos($file, '.') !== false) {
        trace("$basename.check_vapaee_user() FILE NOT FOUND: " . $file);
        header("HTTP/1.0 404 Not Found");
        die();
    }
    
    if (!isset($_COOKIE["foreign_token"]) || isset($_GET["ignore_foreign"])) {
       // $URL = "http://accounts.vapaee.com/index.php?route=oauth/endpoint/createforeign";
        $URL = "http://accounts.vapaee.com/index.php?route=extension/module/oauth/endpoint/createforeign";
        $foreign_token = md5(time());
        $url = "$URL&foreign_token=$foreign_token&client_id=" . $config["vapaee_client_id"];
        if (isset($_COOKIE["access_token"])) {
            $url .= "&access_token=".$_COOKIE["access_token"];
        }
        setcookie("foreign_token", $foreign_token, time() + 1400, "/");
        // error_log("CONFIG  token: " . $foreign_token . " " . $_SERVER['REQUEST_URI']);
        // header("Location: $url");
        echo "<script>\n";
        echo "   window.location.href='$url';\n";
        echo "</script>\n";
        echo "</head><body></body></html>\n";
        trace("$basename.check_vapaee_user() ***** $foreign_token *****");
        die();
    } else {
        echo "<script>\n";
        echo "   var foreign_token = cookie.get('foreign_token');\n";
        echo "</script>\n";
    }
}

// Open Graph -------------------------------------------------
function config_is_set($coso) {
    return (isset($coso) && is_string($coso) && strlen($coso) > 0);
}

function insert_open_graph_metatags($path) {
    global $config;
    // trace("insert_open_graph_metatags($path)", $config);
    
    echo "<!-- Open Graph -->\n";
    echo "<meta property='og:type' content='website'>\n";
    echo "<meta property='path' content='$path'>\n";
    
    // "og:image:width" y "og:image:height""og:image:width" y "og:image:height"
    if (config_is_set($config["site_url"]))          echo "<meta property='og:url' content='" . $config["site_url"] . $path ."'>\n";
    if (config_is_set($config["site_name"]))         echo "<meta property='og:title' content='" . $config["site_name"] . "'>\n";
    if (config_is_set($config["site_name"]))         echo "<meta property='og:site_name' content='" . $config["site_name"] . "'>\n";
    if (config_is_set($config["site_social_image"])) echo "<meta property='og:image' content='" . $config["site_social_image"] . "'>\n";
    // trace('$config', $config);
    if (isset($config["image_size"]) && is_array($config["image_size"])) {
        echo "<meta property='og:image:width' content='" . $config["image_size"]["width"] . "'>\n";
        echo "<meta property='og:image:height' content='" . $config["image_size"]["height"] . "'>\n";
    }
    if (config_is_set($config["fb_app_id"]))         echo "<meta property='fb:app_id' content='" . $config["fb_app_id"] . "'>\n";
    if (config_is_set($config["locale"]))            echo "<meta property='og:locale' content='" . $config["locale"] . "'>\n";
    if (config_is_set($config["description"]))       echo "<meta property='og:description' content='" . $config["description"] . "'>\n";
    return "";
};

// ------------------------------------------------

function error($msj) {
    trace($msj);
    return '{"error": "'.$msj.'"}';
}

function getUserIP() {
    if( array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER) && !empty($_SERVER['HTTP_X_FORWARDED_FOR']) ) {
        if (strpos($_SERVER['HTTP_X_FORWARDED_FOR'], ',')>0) {
            $addr = explode(",",$_SERVER['HTTP_X_FORWARDED_FOR']);
            return trim($addr[0]);
        } else {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
    }
    else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

function getZone($ip) {
    if ("127.0.0.1" == "$ip") {
        $result = file_get_contents("https://ipapi.co/json/");        
    } else {
        $result = file_get_contents("https://ipapi.co/$ip/json/");
    }
    
    $result = json_decode($result, true);
    
    
    if (!$result || !isset($result["timezone"])) {
        trace("ERROR: getZone() - No se pudo obtener la zona del usuario para el ip: $ip", $result);
        return array(
            "timezone" => "error",
            "city" =>  "error",
            "country" =>  "error",
            "latitude" =>  0,
            "longitude" =>  0,
            "region" =>  "error"
        );
    }
    trace("getZone($ip) -->", is_string($result), is_object($result), is_array($result), $result);
    return $result;
}

// -------------------------------------

function getUserId () {
    global $config; $basename = $config['basename'];
    $id = 0;
    if (array_key_exists("user_id", $_SESSION)) {
        // trace('getUserId() $_SESSION', $_SESSION, '$_SESSION["user_id"]', $_SESSION["user_id"]);
        // trace('getUserId() is_numeric($_SESSION["user_id"])', is_string($_SESSION["user_id"]));
        $id = $_SESSION["user_id"];
        if (is_string($id)) $id = intval($id);
        $_SESSION["user_id"] = $id;
    } else {
        trace('getUserId() $_SESSION', $_SESSION);
    }
    // trace('getUserId() $id:', $id);
    return $id;
}

function setUserId ($id) {
    global $config; $basename = $config['basename'];
    // trace("$basename.setUserId($id)");
    $_SESSION["user_id"] = intval($id);
}


function getUser($vapaee_id, $app) {
    global $config; $basename = $config['basename'];
    // trace("$basename.getUser($vapaee_id)");
    $result = array();
    if ($vapaee_id > 0) {
        $find = array( "vapaee_id" => "$vapaee_id" );
        $result = $app["db"]->select("user", $find, array());
        trace("$basename.getUser($vapaee_id)  select user :", $result);
    }
    if (sizeof($result) == 1){
        $user = $result[0];
        setUserId($user["id"]);
        // trace($user);
        return $user;
    } else {
        setUserId(0);
        return null;
    }
}

function setUser($vapaee_id, $name, $app) {
    global $config; $basename = $config['basename'];
    // trace("$basename.setUser($vapaee_id)");
    $ip = getUserIP();
    $zone = getZone($ip);
        
    $user = array(
        "vapaee_id" => $vapaee_id,
        "name" => $name
    );

    $result = $app["db"]->http_post("user", $user);
    
    return $app["db"]->select("user", array( "id" => $result["id"] ), array());
}

// http://stackoverflow.com/a/5216199/2274525
function curPageURL() {
    $pageURL = 'http';
    if (array_key_exists("HTTPS", $_SERVER) && $_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } else {
        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}

function getBaseUrl () {
    $str = curPageURL();
    $str = explode("/api/", $str)[0];
    return $str;
}

function getApiUrl () {
    return getBaseUrl() . "/api";
}

//----------------------------------------

