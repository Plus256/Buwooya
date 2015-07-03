<?php
require_once("config.php");
if(isset($_GET['opt'])){
	$opt=$_GET['opt'];
	switch($opt){
		
		case "User":
		require_once("usr.php");
		break;
		
		case "Product":
		require_once("prod.php");
		break;
		
		case "PurchaseOrder":
		require_once("pord.php");
		break;
		
		case "SalesOrder":
		require_once("sord.php");
		break;
		
		case "Analytics":
		require_once("tics.php");
		break;

	}
}
?>