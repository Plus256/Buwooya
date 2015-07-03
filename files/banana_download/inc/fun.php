<?php
require_once("cnf.php");

if(isset($_GET['send_msg'])){
	sendMsg();
}

function sendMsg(){
	if(!empty($_POST['frm'])){
		$mail_check=spamCheck($_POST['frm']);
		if($mail_check==false){
			echo '{"ret":"0"}';
		}
		else{
			//not empty and not equal to the default and begins with at least one alphanumeric character
			if(!empty($_POST['msg']) && $_POST['msg']!="Write Message Here..." && preg_match("/^[0-9a-zA-Z]+/", $_POST['msg'])){//starting with only zero returns false, why?
				$to="leisure@bananavillageuganda.com";
				$frm=cleanInput($_POST['frm']);
				$sbj=cleanInput($_POST['sbj']);
				$msg=cleanInput($_POST['msg']);
				//msg lines should not exceed 70 characters. it's a PHP rule, so we wrap
				$msg=wordwrap($msg, 70);
				$msg_fot='Copyright &copy; '.date('Y').' <a href="http://www.plus256.com" target="_NEW">Plus256 Network, Ltd</a>';
				//HTML message formatting/////////////////////////////////////////////////////////////////////////////////////////////////
				$html_msg='<html>';
				$html_msg.='<head>';
				/////////The Style Sheet//////////////////////////////////////////////////////////////////
				$html_msg.='<style type="text/css">';
				$html_msg.='a{text-decoration:none; color:#09F;} a:hover{text-decoration:underline;}';
				$html_msg.='body{width:50%; margin:auto; font-family:Verdana, Geneva, sans-serif; font-size:120%; color:#036; background:#FFF;}';
				$html_msg.='#msg_hed{padding:10px; background:rgb(140, 198, 63); color:#FFF; font-weight:bold;}';
				$html_msg.='#msg_hed{border-radius:10px 10px 0 0; -moz-border-radius:10px 10px 0 0; -webkit-border-radius:10px 10px 0 0;}';
				$html_msg.='#msg_bod{padding:10px;}';
				$html_msg.='#msg_fot{padding:10px; font-size:85%; color:#A1A1A1; text-align:center; border:1px solid #EAEAEA;}';
				$html_msg.='#msg_fot{border-radius:0 0 10px 10px; -moz-border-radius:0 0 10px 10px; -webkit-border-radius:0 0 10px 10px;}';
				$html_msg.='</style>';
				/////////////////////////////////////////////////////////////////////////////////////////
				$html_msg.='</head>';
				$html_msg.='<body>';
				///////////////////
				$html_msg.='<div id="msg_hed">';
				$html_msg.=$sbj;
				$html_msg.='</div>';
				///////////////////////////
				$html_msg.='<div id="msg_bod">';
				$html_msg.=$msg;
				$html_msg.='</div>';
				//////////////////////////
				$html_msg.='<div id="msg_fot">';
				$html_msg.=$msg_fot;
				$html_msg.='</div>';
				//////////////////////////
				$html_msg.='</body>';
				$html_msg.='</html>';
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				$hed='From: '.$frm.''."\r\n";
				$hed.='Reply-To: '.$frm.''."\r\n";
				//headers to send HTML email
				$hed.='MIME-Version: 1.0'."\r\n";
				$hed.='Content-type: text/html; charset=iso-8859-1'."\r\n";
				if(mail($to, $sbj, $html_msg, $hed)){
					echo '{"ret":"2"}';
				}
				else{
					echo '{"ret":"3"}';
				}
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