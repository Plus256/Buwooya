<?php
require_once("cnf.php");
//message API
if(isset($_GET['send_msg'])){
    if(!empty($_POST['frm'])){
		$mail_check=spamCheck($_POST['frm']);
		if($mail_check==false){
			echo '{"ret":"0"}';
		}
		else{
			if(!empty($_POST['msg']) && $_POST['msg']!="Write Message Here..." && preg_match("/^[0-9a-zA-Z]+/", $_POST['msg'])){
				$to="love@ourforgottenchildren.org";
				$frm=cleanInput($_POST['frm']);
				$sbj=cleanInput($_POST['sbj']);
				$msg=cleanInput($_POST['msg']);
				sendMsg($to, $frm, $sbj, $msg);
			}
			else{
				echo '{"ret":"1"}';
			}
		}
	}
	else{
		echo '{"ret":"0"}';
	}
}

function spamCheck($field){
	//sanitize email
	$field=filter_var($field, FILTER_SANITIZE_EMAIL);
	//validate email
	if(filter_var($field, FILTER_VALIDATE_EMAIL)){
		return true;
	}
	else{
		return false;
	}
}

function cleanInput($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = strip_tags($data, "<br>");
	return $data;
}
?>
