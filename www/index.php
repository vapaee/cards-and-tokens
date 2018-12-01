<!doctype html>
<?php include '../config.php'; ?>
<?php include '../api/src/includes/utils.php'; ?>
<?php include '../api/src/includes/common.php'; ?>

<?php insert_open_graph(); ?>
<?php insert_cookie_api(); ?>
<?php insert_globals(); ?>
<!--?php check_vapaee_user(); ?-->

<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?php echo $config["site_name"]; ?></title>
    <base href="/">

    <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" type="<?php echo $config["favicon_type"]; ?>" href="<?php echo $config["favicon_url"]; ?>" />
    <style>
        body, html { height: 100vh; margin: 0; overflow: hidden; background-color: black !important; color: white; }
        body[loading] app-root { display: none;  }
        div.img-preload { opacity: 0; pointer-events: none; position: fixed; top:-5000px; left: -5000px; }
    </style>
    <style>
        body {
            background-color: black;
        }
        body[loading] > *:not(.cnt-page-preload-anim) {
            display: none !important;
        }
        body[loading] > div.cnt-page-preload-anim {
            display:inline-block;
        }
        body:not([loading]) > .cnt-page-preload-anim {
            display: none;
        }
        .circle1 {
            border: 5px solid rgba(255, 0, 0, 1);
            box-shadow: 0 0 35px rgb(255, 118, 0);
            -moz-animation: spinPulse 1s infinite ease-in-out;
            -webkit-animation: spinPulse 1s infinite ease-in-out;
            width: 50px;
            height: 50px;
        }
        .circle2 {
            border: 5px solid rgb(0, 0, 255);
            box-shadow: 0 0 35px rgb(70, 78, 255);
            -moz-animation: spinoffPulse 1s infinite ease-in-out;
            -webkit-animation: spinoffPulse 1s infinite ease-in-out;
            width: 30px;
            height: 30px;
        }
        div.cnt-page-preload-anim {
            pointer-events: none;
            background-color: rgba(0,0,0,0);
            opacity: .9;
            border-right: 5px solid rgba(0,0,0,0);
            border-left: 5px solid rgba(0,0,0,0);
            border-radius: 50px;
            position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto;
        }
        @-moz-keyframes spinPulse {
            0% { -moz-transform: rotate(160deg); opacity: 0; box-shadow: 0 0 1px #2187e7; }
            50% { -moz-transform: rotate(145deg); opacity: 1; }
            100% { -moz-transform: rotate(-320deg); opacity: 0; };
        }
        @-moz-keyframes spinoffPulse {
            0% { -moz-transform: rotate(0deg); }
            100% { -moz-transform: rotate(360deg); };
        }                    
        @-webkit-keyframes spinPulse {
            0% { -webkit-transform: rotate(160deg); opacity: 0; box-shadow: 0 0 1px #2187e7; }
            50% { -webkit-transform: rotate(145deg); opacity: 1; }
            100% { -webkit-transform: rotate(-320deg); opacity: 0; };
        }
        @-webkit-keyframes spinoffPulse {
            0% { -webkit-transform: rotate(0deg); }
            100% {-webkit-transform: rotate(360deg); };
        }  
    </style>      
<link rel="stylesheet" href="styles.47f0980081e21ca28461.css"></head>
<body class="hide-at-work-" loading="true">
    <div class="img-preload">
        <img src="/assets/loading.gif">
        <img src="/assets/coming-soon.jpg">
    </div>
    <div id="fb-root"></div>
    <!-- loading -->
    <div class="cnt-page-preload-anim circle1"></div>
    <div class="cnt-page-preload-anim circle2"></div>

    <app-root></app-root>
<script type="text/javascript" src="runtime.a66f828dca56eeb90e02.js"></script><script type="text/javascript" src="polyfills.2c76d7e644202d6cda56.js"></script><script type="text/javascript" src="scripts.8c207f9bd5b40aba18d3.js"></script><script type="text/javascript" src="main.fce98008f91f92fe1aa0.js"></script></body>
</html>
 