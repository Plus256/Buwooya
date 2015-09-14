<?php
ob_start();
session_start();
/*local credentials*/
$host="127.0.0.1";
$db="buwooya";
$user="root";
$pwd="root";
$port=3306;
$conn=mysqli_connect($host, $user, $pwd, $db, $port) or die(mysqli_error());
/*end of local*/

/*remote credentials*
$host="127.0.0.1";
$db="plus256buwooya";
$user="plus256dbadmin";
$pwd="Psalm_23*";
$port=3306;
$conn=mysqli_connect($host, $user, $pwd, $db, $port) or die(mysqli_error());
/*end of remote*/
$short_name="Buwooya Childcare";
$full_name="Buwooya Childcare Ministries";
$slogan="Empowering the Vulnerable";
$logo="gra/logo_theme.png";
$noscript="Enable JavaScript in your browser to have the best experience at ".$short_name;
?>
