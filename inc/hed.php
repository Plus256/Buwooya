<?php
require_once("inc/cnf.php");
require_once("inc/fun.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<meta name="viewport" content="initial-scale=1.0">
<meta name="description" content="<?php echo $full_name; ?>">
<meta name="keywords" content="Buwooya, Childcare, Ministries, Uganda">
<link rel="shortcut icon" href="fav.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="css/glb.css" />
<link rel="stylesheet" type="text/css" href="css/mob.css" />
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="css/ie.css" />
<![endif]-->
<!--[if !IE]><!-->
<link rel="stylesheet" type="text/css" href="css/nie.css" />
<!--<![endif]-->
<title><?php echo $full_name; ?></title>
<!--Designed and Developed by Spyda-->
<!--Plus256 Network, LLC-->
<!--www.plus256.com-->
<script type="text/javascript" src="js/fun.js"></script>
<script type="text/javascript" src="js/apply.js"></script>
<script src="//use.typekit.net/nww6oyv.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
</head>
<body onkeydown="getKey(event);">
<noscript id="noscript"><?php echo $noscript; ?></noscript>
<div id="dialog_box_overlay"></div>
<div id="dialog_box">
	<div id="dialog_box_head"></div>
    <div id="dialog_box_body"></div>
    <div id="dialog_box_foot"></div>
</div>