<?php
ob_start();
session_start();
$host="localhost";
$db="plusbvu";
$usr="plus256dbadmin";
$pwd="Psalm%100";
mysql_connect($host, $usr, $pwd) or die(mysql_error());
mysql_select_db($db) or die(mysql_error());
$short_name="Banana Village";
$full_name="Banana Village Uganda";
$slogan;
$short_description="Holiday and Retreat Centre";
$long_description="Banana Village is an idyllic Holiday and Retreat Centre.";
$logo;
$cover;
$tel="+256772509692";
$mob="+256705197645";
$mail;
$location;
$pbox;
$noscript="Enable JavaScript in your browser to have the best experience at ".$short_name;
?>