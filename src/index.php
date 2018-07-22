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
    html, body {
        background-color: black;
        color: white;
    }
  </style>
</head>
<body class="hide-at-work--">
  <app-root></app-root>
  <!--script type="text/javascript" src="assets/sc2.min.js"></script-->
  <script type="text/javascript" src="runtime.js"></script>
  <script type="text/javascript" src="polyfills.js"></script>
  <script type="text/javascript" src="styles.js"></script>
  <script type="text/javascript" src="scripts.js"></script>
  <script type="text/javascript" src="vendor.js"></script>
  <script type="text/javascript" src="main.js"></script>
</body>
</html>