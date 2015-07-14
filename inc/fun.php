<?php
require_once("cnf.php");
require_once("sendgrid.php");
//get the number of days in the month
if(isset($_GET['get_month_days'])){
  $this_month=$_GET['this_month'];
  $q=mysqli_query($conn, "select * from month where id=$this_month");
  while($r=mysqli_fetch_assoc($q)){
    echo $r['days'];//return month days
  }
}
//getting months according to selected year
if(isset($_GET['get_months'])){
  $selected_year=$_GET['this_year'];
  $this_year=date('Y');
  $this_month=date('n');//minimum month
  $data=array();
  if($selected_year==$this_year){
    $q=mysqli_query($conn, "select * from month where id>=$this_month");
  }
  else{
    $q=mysqli_query($conn, "select * from month");
  }
  while($r=mysqli_fetch_assoc($q)){
    $month_id=$r['id']; $month_name=$r['name'];//return month days
    $rec=array("id"=>$month_id, "name"=>$month_name);
    array_push($data, $rec);
  }
  echo json_encode($data);
}
if(isset($_GET['get_from_month_days'])){
  $selected_month=$_GET['this_month'];
  $this_year=date('Y');
  $this_month=date('n');//current month
  $today=date('j');//this day of the month
  $q=mysqli_query($conn, "select * from month where id=$selected_month");
  $r=mysqli_fetch_assoc($q);
  $days=$r['days'];//return month days
  $data=array();
  $data=array("days"=>$days, "today"=>$today, "month"=>$this_month, "year"=>$this_year);//rerurn server date object
  echo json_encode($data);
}
//message API
if(isset($_GET['send_msg'])){
    if(!empty($_POST['frm'])){
		$mail_check=spamCheck($_POST['frm']);
		if($mail_check==false){
			echo '{"ret":"0"}';
		}
		else{
			if(!empty($_POST['msg']) && $_POST['msg']!="Write Message Here..." && preg_match("/^[0-9a-zA-Z]+/", $_POST['msg'])){
				$to="buwooyachildcareministries@gmail.com";
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
