<?php
ob_start();
session_start();
$host = "localhost";
$pass = "Psalm%100";
$user = "plus256dbadmin";
$db = "sente";
$plus256="Plus256";
$network="Plus256 Network, LLC";
$slogan="Transform your World";
$tagline="Transform your Business";
$noscript="Enable JavaScript in your browser to have the best experience at Plus256";
$notice="Sente";
$profile="image/logo.png";
$cover="image/cover.jpg";
$description="Devoted to Providing Absolute Solutions";
$location="Kampala Uganda";
$tel="+256 788 628 316";
$mail="mail@plus256.com";
mysql_connect($host, $user, $pass) or die("Connection to host Failed: ".mysql_error());
mysql_select_db($db) or die("Database Not Found: ".mysql_error());
?>