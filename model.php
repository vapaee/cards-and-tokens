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
            "dailyprize" => array( "type" => "timestamp" )
        ),
        "app" => array(
            "_extends" => "publisher",
            "creator" => array( "type" => "user" ),
            "client_id" => array( "type" => "varchar(80)" ),
            "client_secret" => array( "type" => "varchar(80)", "private" => true ),
            "redirect_uri" => array( "type" => "varchar(400)" ),
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
        "oauth_steem" => array(
            "access_token" => array( "type" => "varchar(500)" ),
            "account" => array( "type" => "varchar(128)" ),
            "user" => array( "type" => "user" ),
            "expires" => array( "type" => "timestamp" )
        ),        
        // -------------------------
        // -------------------------
        // -------------------------
        "publisher" => array(
            "name" => array( "type" => "varchar(150)" ),
            "slug" => array( "type" => "varchar(150)" ),
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
        "collectible" => array(
            "publisher" => array( "type" => "publisher" ),
            "creator" => array( "type" => "user" ),
            "edition" => array( "type" => "edition" ), // apunta a la última edición (en la mayoría de los casos, a la única que hay)
            "deployable" => array( "type" => "boolean" ), // card | sticker
            "steem" => array( "type" => "json" ),
            "steem_votes" => array( "type" => "int(32)" ),
            "type" => array( "type" => "varchar(10)" )  // collection | numered | ads | consumible | aura | item
        ),        
        "edition" => array(
            "collectible" => array( "type" => "collectible" ),
            "creator" => array( "type" => "user" ),
            "url" => array( "type" => "varchar(250)" ),
            "preload" => array( "type" => "json" ),
            "preview" => array( "type" => "json" ),
            "deploy" => array( "type" => "json", "detail" => true ),
            "copies" => array( "type" => "int(10)" ),
            "released" => array( "type" => "boolean" ),
            "released_time" => array( "type" => "timestamp" )
        ),
        // ------------------
        "sticker" => array(
            "_extends" => "collectible",
            "text" => array( "type" => "json" ),
        ),
        "card" => array(
            "_extends" => "collectible",
            "slug" => array("type" => "varchar(150)"),
            "text" => array( "type" => "json" ),
        ),
        // ------------------
        "album" => array( // especificación
            "publisher" => array( "type" => "publisher" ),
            "slug" => array( "type" => "varchar(150)" ),
            "creator" => array( "type" => "user" ),
            "numbered" => array( "type" => "boolean" ),
            "preload" => array( "type" => "json" ),
            "preview" => array( "type" => "json" ),
            "deploy" => array( "type" => "json", "detail" => true )
        ),        
        "collection" => array( // instancia de album
            "_extends" => "container",
            "album" => array( "type" => "album" ),
            "points" => array( "type" => "int(32)" ),
            "position" => array( "type" => "int(32)" ),
            "owner" => array( "type" => "user" )
        ),
        // ------------------     
        "container" => array(
            "owner" => array( "type" => "user" ),
            "capacity" => array( "type" => "int(8)" ),
            "empty" => array( "type" => "int(8)" ),
            "spec" => array( "type" => "container_spec" )
        ),
        "slot" => array(
            "owner" => array( "type" => "user" ),
            "item" => array( "type" => "item" ),
            "data" => array( "type" => "json" ),
            "container" => array( "type" => "container" ),
            "index" => array( "type" => "int(8)" )
        ),
        "container_spec" => array(
            "name" => array( "type" => "varchar(150)" ),
            "structure_def" => array( "type" => "json" )
        ),
        "inventory" => array( //
            "_extends" => "container",
            // tuve q repetir el owner acá para poder consultar con el app y el owner a la vez
            "slug" => array( "type" => "varchar(150)", "calculated" => true),
            "owner" => array( "type" => "user" ),
            "app" => array( "type" => "app" ),
        ),
        "item" => array(
            "owner" => array( "type" => "user" ),
            "spec" => array( "type" => "item_spec"),
            // "container" => array( "type" => "container" )
        ),
        "item_spec" => array(
            "name" => array( "type" => "varchar(150)" ),
            "img" => array( "type" => "json" ),
            "cols" => array( "type" => "int(8)" ),
            "rows" => array( "type" => "int(8)" )
        ),
        "copy" => array(
            "_extends" => "item",
            "multiplicity" => array( "type" => "int(32)" ),
            "collectible" => array("type" => "collectible"),
            "edition" => array("type" => "edition")
        ),
        "deck" => array(
            "_extends" => "container",
            "prueba" => array( "type" => "varchar(128)" ),
        ),
        "envelop" => array(
            "_extends" => "item",
            "deck" => array( "type" => "deck" ),
            "opened" => array( "type" => "boolean" ),
        ),
        // -------------------------------
        "pending" => array(
            "owner" => array( "type" => "varchar(70)" ),
            "task" => array( "type" => "varchar(100)" ),
            "params" => array( "type" => "json" ),
            "created" => array( "type" => "timestamp" )
        ),
    ),
    
    "calculated" => array(
        "publisher" => function ($e, $id, $op, $app) {
            $e["publisher_id"] = $id;
            return $e;
        }
    ),

    "populate" => array(
        "init" => function ($app) {
            
            
            
        }
    )

);


    