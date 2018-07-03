 <?php
$DATA = array (
    "model" => array (
        // -------------------------
        // Common to all apps ------
        // -------------------------
        "user" => array(
            "vapaee_id" => array( "type" => "int(32)" ),
            "name" => array( "type" => "varchar(150)" ),
            "profile" => array( "type" => "profile" ),
            "cache" => array("type" => "json")
        ),
        "app" => array(
            "_extends" => "publisher",
            "creator" => array( "type" => "user" ),
            "client_id" => array( "type" => "varchar(80)" ),
            "client_secret" => array( "type" => "varchar(80)", "private" => true ),
            "redirect_uri" => array( "type" => "varchar(400)" ),
            // "name" => array( "type" => "varchar(150)" ),
            "url" => array( "type" => "varchar(400)" ),
            "brief" => array( "type" => "text" ),
            "created_at" => array( "type" => "timestamp" ),
            
            // "updated_at" => array( "type" => "timestamp" ),
            // en casa tengo este error
            // #1293 - Incorrect table definition; there can be only one TIMESTAMP column with CURRENT_TIMESTAMP in DEFAULT or ON UPDATE clause
            "inventory" => array( "type" => "json" )
        ),
        "oauth_cache" => array(
            "access_token" => array( "type" => "varchar(50)" ),
            "client_id" => array( "type" => "varchar(128)" ),
            "vapaee_id" => array( "type" => "int(32)" ),
            "user" => array( "type" => "user" ),
            "expires" => array( "type" => "timestamp" ),
            "scope" => array( "type" => "varchar(80)" )
        ),
        // -------------------------
        // -------------------------
        // -------------------------
        "publisher" => array(
            "namespace" => array( "type" => "varchar(128)" ),
            "name" => array( "type" => "varchar(150)" ),
            "publisher_id" => array( "type" => "id", "calculated" => true ),
            "img" => array( "type" => "json" ),
            "owner" => array( "type" => "user" )
        ),
        "profile" => array(
            "_extends" => "publisher",
            "name" => array( "type" => "varchar(150)" ),
            "owner" => array( "type" => "user" )
        ),
        // ------------------
        "album" => array( // especificación
            "publisher" => array( "type" => "publisher" ),
            "namespace" => array( "type" => "varchar(128)" ),
            "creator" => array( "type" => "user" ),
            "numbered" => array( "type" => "boolean" ),
        ),        
        "collection" => array( // instancia de album
            "_extends" => "container",
            "album" => array( "type" => "album" ),
            "owner" => array( "type" => "user" )
        ),
        // ------------------
        "aura" => array( // especificación
            "publisher" => array( "type" => "publisher" ),
            "namespace" => array( "type" => "varchar(128)" ),
            "creator" => array( "type" => "user" ),
            "app" => array( "type" => "app" ),
            "name" => array( "type" => "varchar(128)" ),
            "img" => array( "type" => "json" ),
            "points" => array( "type" => "json" )
        ),
        "aurafx" => array( // instancia de album
            "_extends" => "container",
            "expires" => array( "type" => "timestamp" ),
            "aura" => array( "type" => "aura" ),
            "owner" => array( "type" => "user" )
        ),
        // ------------------
        "mastery" => array(
            "namespace" => array( "type" => "varchar(128)" ),
            "name" => array( "type" => "varchar(128)" ),
            "img" => array( "type" => "json" ),
            "creator" => array( "type" => "user" ),
            "app" => array( "type" => "app" ),
            "spec" => array( "type" => "json" )
        ),
        "experience" => array(
            "_extends" => "container", // how tokens are deployed
            "mastery" => array( "type" => "mastery" ),
            "app" => array( "type" => "app" ),
            "points" => array( "type" => "cache" )
        ),
        "effect" => array(
            "mastery" => array( "type" => "mastery" ),
            "experience" => array( "type" => "experience" ),
            "app" => array( "type" => "app" ),
            "owner" => array( "type" => "user" ),
            "points" => array( "type" => "json" ),
            "created_at" => array( "type" => "timestamp" )
        ),
        // ------------------
        "collectible" => array(
            "publisher" => array( "type" => "publisher" ),
            "creator" => array( "type" => "user" ),
            "type" => array( "type" => "varchar(10)" ) // card | sticker
        ),
        "edition" => array(
            "collectible" => array( "type" => "collectible" ),
            "creator" => array( "type" => "user" ),
            "url" => array( "type" => "varchar(50)" ),
            "released" => array( "type" => "boolean" ),
            "released_time" => array( "type" => "timestamp" ),
            "opinion" => array("type" => "cache")
        ),
        "opinion" => array(
            "edition" => array( "type" => "edition" ),
            "owner" => array( "type" => "user" ),
            "points" => array( "type" => "json" )
        ),
        // ------------------
        "tokenspec" => array( // especificación
            "publisher" => array( "type" => "publisher" ),
            "namespace" => array( "type" => "varchar(128)" ),
            "creator" => array( "type" => "user" ),
            "name" => array( "type" => "varchar(128)" ),
            "img" => array( "type" => "json" ),
            "aspect" => array( "type" => "json" )
        ),
        // ------------------
        "container" => array( // instancia de album
            "owner" => array( "type" => "user" ),
            "capacity" => array( "type" => "user" ),
            "structure" => array( "type" => "json" ),
            "structure_def" => array( "type" => "json" ),
        ),
        "inventory" => array( // instancia de album
            "_extends" => "container",
            // tuve q repetir el owner acá para poder consultar con el app y el owner a la vez
            "owner" => array( "type" => "user" ),
            "app" => array( "type" => "app" )
        ),
        "item" => array(
            "owner" => array( "type" => "user" ),
            "cols" => array( "type" => "int(8)" ),
            "rows" => array( "type" => "int(8)" ),
            "container" => array( "type" => "container" )
        ),
        "copy" => array(
            "_extends" => "item",
            "multiplicity" => array( "type" => "int(32)" ),
            "edition" => array("type" => "edition"),
            "collectible" => array("type" => "collectible")
        ),
        "token" => array(
            "_extends" => "item",
            "tokenspec" => array( "type" => "tokenspec" ),
            "level" => array( "type" => "int(5)", "calculated" => true ),
            "points" => array( "type" => "json" )
        ),
        "deck" => array(
            "_extends" => "container",
            "prueba" => array( "type" => "varchar(128)" ),
        ),
        "tokencase" => array(
            "_extends" => "item",
            "level" => array( "type" => "int(5)" ),
        ),
        "box" => array(
            "_extends" => "item",
            "deck" => array( "type" => "deck" ),
            "size" => array( "type" => "int(5)" ),
        ),
        "envelop" => array(
            "_extends" => "item",
            "deck" => array( "type" => "deck" ),
            "opened" => array( "type" => "boolean" ),
        ),
        // ------------------
        // market ---------------------
        // market ---------------------
        // market ---------------------
        // ------------------
        "market" => array(
            "publisher" => array( "type" => "publisher" ),
            "product" => array( "type" => "float" ),// "item" || "currency"
            "product_item" => array( "type" => "item" ),
            "product_currency" => array( "type" => "currency" ),
            "currency" => array( "type" => "currency" ),
            "price" => array( "type" => "float" ),
            "snapshot" => array( "type" => "json" ),
            "snapshot_time" => array( "type" => "timestamp" )
        ),        
        "order" => array(
            "owner" => array( "type" => "user" ),
            "type" => array( "type" => "varchar(5)" ), // "sell" || "buy"
            "price" => array( "type" => "float" ),
            "amount" => array( "type" => "float" ),
            "remaining" => array( "type" => "float" ),
            "currency" => array( "type" => "currency" ),
            "market" => array( "type" => "market" ),
            "created" => array( "type" => "timestamp" )
        ),
        "transaction" => array(
            "buyer" => array( "type" => "user" ),
            "seller" => array( "type" => "user" ),
            "buy" => array( "type" => "order" ),
            "sell" => array( "type" => "order" ),
            "price" => array( "type" => "float" ),
            "amount" => array( "type" => "float" ),
            "type" => array( "type" => "varchar(5)" ),     // "sell" || "buy"
            "product" => array( "type" => "varchar(10)" ), // : "item" || "currency"
            "market" => array( "type" => "market" ),
            "timestamp" => array( "type" => "timestamp" )
        ),
        "currency" => array( // especificación
            "publisher" => array( "type" => "publisher" ),
            "creator" => array( "type" => "user" ),
            "name" => array( "type" => "varchar(128)" ),
            "namespace" => array( "type" => "varchar(128)" ),
            "img" => array( "type" => "json" )
        ),
        "wallet" => array( // especificación
            "owner" => array( "type" => "user" ),
            "currency" => array( "type" => "currency" ),
            "amount" => array( "type" => "float" )
        ),
    ),
    
    "calculated" => array(
        "publisher" => function ($e, $id, $op, $app) {
            $e["publisher_id"] = $id;
            return $e;
        },
    )
);


    