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
        "card" => array(
            "slug" => array("type" => "varchar(150)"),
            "text" => array( "type" => "json" ),
            "images" => array( "type" => "json" ),
            "deploy" => array( "type" => "json", "detail" => true )
        )
    ),
    
    "calculated" => array(
        /*"publisher" => function ($e, $id, $op, $app) {
            $e["publisher_id"] = $id;
            return $e;
        },*/
    )
);


    