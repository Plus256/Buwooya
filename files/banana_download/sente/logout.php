<?php
require_once("include/config.php");
$_SESSION = array();
session_destroy();
$succ="Account Secure";
header('Location: index.php?succ='.$succ.'');
?>