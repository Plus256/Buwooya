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
<meta name="description" content="<?php echo $full_name; ?> | <?php echo $short_description; ?>">
<meta name="keywords" content="Banana, Village, Uganda, Tourism, Accomodation, Travel, Resort, Holiday, Retreat, Center">
<link rel="shortcut icon" href="fav.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="css/glb.css" />
<link rel="stylesheet" type="text/css" href="css/mob.css" />
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="css/ie.css" />
<![endif]-->
<!--[if !IE]><!-->
<link rel="stylesheet" type="text/css" href="css/nie.css" />
<!--<![endif]-->
<title><?php echo $short_name; ?> | <?php echo $short_description; ?></title>
<!--Designed and Developed by TopWeb-->
<!--Plus256 Network, LLC-->
<!--www.plus256.com-->
<script type="text/javascript" src="js/fun.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlccpaXJsssaiZ0A_tjcKW9g5OigbfZ0M"></script>
<script type="text/javascript">
  function initialize() {
	var mapOptions={
	  center:new google.maps.LatLng(0.100600, 32.522669), zoom:10
	};
	var map=new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var marker=new google.maps.Marker({
		position:new google.maps.LatLng(0.100600, 32.522669),
		map:map,
		title:"Banana Village"
    });  
  }
  google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>
<body onkeydown="getKey(event);">
<noscript id="noscript"><?php echo $noscript; ?></noscript>
<div id="dialog_box_overlay"></div>
<div id="dialog_box">
	<div id="dialog_box_head"></div>
    <div id="dialog_box_body"></div>
    <div id="dialog_box_foot"></div>
</div>