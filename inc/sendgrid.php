<?php
//sendMsg('info@minzani.com', 'bu@bu.com', 'bTest', 'bbTest');
function sendMsg($to, $frm, $sbj, $msg){
	//msg lines should not exceed 70 characters. it's a PHP rule, so we wrap
	$msg=wordwrap($msg, 70);
	$msg_fot='Copyright &copy; '.date('Y').' <a href="http://www.buwooyachildcare.org" target="_NEW">Buwooya Childcare Ministries</a>';
	//HTML message formatting/////////////////////////////////////////////////////////////////////////////////////////////////
	$html_msg='<html>';
	$html_msg.='<head>';
	/////////The Style Sheet//////////////////////////////////////////////////////////////////
	$html_msg.='<style type="text/css">';
	$html_msg.='a{text-decoration:none; color:#09F;} a:hover{text-decoration:underline;}';
	$html_msg.='body{width:70%; margin:auto; font-family:Verdana, Geneva, sans-serif; font-size:120%; color:#036; background:#FFF;}';
	$html_msg.='#msg_hed{padding:10px; background:rgb(255, 0, 0); color:#FFF; font-weight:bold;}';
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
	sendGrid($to, $sbj, $html_msg, $frm);
}

function sendGrid($to, $sbj, $html_msg, $frm){
    $url = 'https://api.sendgrid.com/';
    $user = 'wagaba';
    $pass = 'Psalm@23#';
    
    $params = array(
        'api_user'  => $user,
        'api_key'   => $pass,
        'to'        => $to,
        'subject'   => $sbj,
        'html'      => $html_msg,
        'text'      => $html_msg,
        'from'      => $frm,
        'fromname'  => 'Buwooya Childcare Ministries',
      );
    
    $request =  $url.'api/mail.send.json';
    
    // Generate curl request
    $session = curl_init($request);
    // Tell curl to use HTTP POST
    curl_setopt ($session, CURLOPT_POST, true);
    // Tell curl that this is the body of the POST
    curl_setopt ($session, CURLOPT_POSTFIELDS, $params);
    // Tell curl not to return headers, but do return the response
    curl_setopt($session, CURLOPT_HEADER, false);
    // Tell PHP not to use SSLv3 (instead opting for TLS)
    curl_setopt($session, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    
    // obtain response
    $response = curl_exec($session);
    curl_close($session);
    
    if($response=='{"message":"success"}'){
		echo '{"ret":"2"}';
	}
	else{
		echo '{"ret":"3"}';
	}
}

?>