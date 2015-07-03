<?php
if(isset($_GET['fetchEntry'])){
	fetchEntry();
}
if(isset($_GET['plAcc'])){
	if(isset($_GET['id'])){
		plAcc($_GET['id']);
	}
}
if(isset($_GET['fetchLinks'])){
	fetchLinks();
}
if(isset($_GET['getForm'])){
	getForm();
}
if(isset($_GET['saveEntry'])){
	saveEntry();
}
if(isset($_GET['moreInfo'])){
	if(isset($_GET['id'])){
		moreInfo($_GET['id']);
	}
}
if(isset($_GET['editEntry'])){
	if(isset($_GET['id'])){
		editEntry($_GET['id']);
	}
}
if(isset($_GET['upEntry'])){
	if(isset($_GET['id'])){
		upEntry($_GET['id']);
	}
}
if(isset($_GET['delEntry'])){
	if(isset($_GET['id'])){
		delEntry($_GET['id']);
	}
}

//create customer form
function getForm(){
	?>
    <div id="form_wrapper">
	<form method="post" enctype="multipart/form-data" name="entry_form">
    	<div id="form_lft">
            <div>
            <input type="text" name="name" placeholder="Full Name" id="p_name" /><!--rejected id="name" (it would alter the size of the field) why?-->
            </div>
            <div>
            <input type="text" name="unm" placeholder="Username" id="unm" />
            </div>
            <div>
            <input type="text" name="pwd" placeholder="Password" id="pwd" />
            </div>
            <div>
            <input type="file" id="file_upload_field" name="pic" onchange="handleFiles(this.files)" />
            </div>
        </div>
        <div id="form_rt">
        	<div id="pic_upload">
            </div>
        </div>
    </form>
    <div class="spacer"></div>
    </div>
    <?php
}

//save customer information
function saveEntry(){
	$name=$_POST['name'];
	$unm=$_POST['unm'];
	$pwd=$_POST['pwd'];
	$hash=hash('sha256', $pwd);
	$pic=$_FILES['pic']['name'];
	if($pic==""){
		$pic="logo.png";
	}
	$upload=move_uploaded_file($_FILES['pic']['tmp_name'], "../image/".$_FILES['pic']['name']);
	//if($upload){
		$q=mysql_query("insert into pic (src) values ('$pic')");
		if($q){
			mysql_query("select last_insert_id() into @pic");//store the last id of inserted pic
			$q=mysql_query("insert into user (name, uname, pic, hash) values ('$name', '$unm', @pic, '$hash')");
		}
	//}
	//else{
		//echo "You must attach a photo to the information!";
	//}
}

//fetch customer information
function fetchEntry(){
	$q=mysql_query("select *, u.id as uid from user as u join pic as p on u.pic=p.id order by u.id desc");
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$i++;
			$id=$r['uid'];
			$name=$r['name'];
			$unm=$r['uname'];
			$level=$r['level'];
			if($level==0){
				$level="Teller";
			}
			else{
				$level="Admin";
			}
			$hash=$r['hash'];
			$pic="image/".$r['src'];
			$json_data.='"rec'.$i.'":{"id":"'.$id.'", "name":"'.$name.'", "unm":"'.$unm.'", "level":"'.$level.'", "pic":"'.$pic.'"},';
		}
		$json_data=chop($json_data, ",");
		$json_data.='}';
		echo $json_data;
	}
	else{
		echo mysql_error();
	}
}

//fetch links for specific module
function fetchLinks(){
?>
<a href='index.php'>Dashboard</a>
<a href='index.php?option=SalesOrder'>Sales</a>
<?php
if($_SESSION['level']==1){//only admins can access this module
?>
<a href='index.php?option=Product'>Products</a>
<a href='index.php?option=PurchaseOrder'>Purchases</a>
<a href='index.php?option=Analytics'>Analytics</a>
<a href='index.php?option=User'>Users</a>
<?php
}
?>
<?php
}

//fetch more customer information
function moreInfo($infoId){
	$q=mysql_query("select u.id, u.name, u.uname, u.level, p.src from user as u join pic as p on u.pic=p.id where u.id=$infoId");
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$i++;
			$id=$r['id'];
			$name=$r['name'];
			$unm=$r['uname'];
			$level=$r['level'];
			if($level==0){
				$level="Teller";
			}
			else{
				$level="Admin";
			}
			$date=date('D, M d, Y ');
			$pic="image/".$r['src'];
			$json_data.='"id":"'.$id.'", "name":"'.$name.'", "unm":"'.$unm.'", "level":"'.$level.'", "pic":"'.$pic.'", "date":"'.$date.'"';
		}
		$json_data=chop($json_data, ",");
		$json_data.='}';
		echo $json_data;
	}
	else{
		echo mysql_error();
	}
}

//edit customer information
function editEntry($infoId){
	$q=mysql_query("select u.id, u.name, u.uname, p.src from user as u join pic as p on u.pic=p.id where u.id=$infoId");
	$r=mysql_fetch_assoc($q);
	$id=$r['id'];
	$name=$r['name'];
	$unm=$r['uname'];
	$pic="image/".$r['src'];
	?>
	<div id="form_wrapper">
	<form method="post" enctype="multipart/form-data" name="edit_entry_form">
    	<div id="form_lft">
            <div>
            <input type="text" name="name" placeholder="Full Name" id="p_name" value="<?php echo $name; ?>" />

            </div>
            <div>
            <input type="text" name="unm" placeholder="Username" id="price" value="<?php echo $unm; ?>" />
            </div>
            <div>
            <input type="text" name="pwd" placeholder="New Password" id="unit" />
            </div>
            <div>
            <input type="file" id="update_file_upload_field" name="pic" onchange="handleFiles(this.files, 1)" />
            </div>
        </div>
        <div id="form_rt">
        	<div id="update_pic_upload">
            	<img src="<?php echo $pic; ?>" class="prev_img" />
            </div>
        </div>
    </form>
    <div class="spacer"></div>
    </div>
	<?php
}

//update customer information
function upEntry($infoId){
	$q=mysql_query("select pic from user where id=$infoId");
	$r=mysql_fetch_assoc($q);
	$up_pic=$r['pic'];//pic to effect change
	$name=$_POST['name'];
	$unm=$_POST['unm'];
	$pwd=$_POST['pwd'];
	if($pwd!=""){
		$hash=hash('sha256', $pwd);
		$pic=$_FILES['pic']['name'];
		$upload=move_uploaded_file($_FILES['pic']['tmp_name'], "../image/".$_FILES['pic']['name']);
		$q=mysql_query("update user
						set name='$name', uname='$unm', hash='$hash'
						where id=".$infoId."");
		if($upload){
			$q=mysql_query("update pic set src='$pic' where id=".$up_pic."");
			if(!$q){echo mysql_error();}
		}
	}
	else{
		$pic=$_FILES['pic']['name'];
		$upload=move_uploaded_file($_FILES['pic']['tmp_name'], "../image/".$_FILES['pic']['name']);
		$q=mysql_query("update user
						set name='$name', uname='$unm'
						where id=".$infoId."");
		if($upload){
			$q=mysql_query("update pic set src='$pic' where id=".$up_pic."");
			if(!$q){echo mysql_error();}
		}
	}
}

//delete customer
function delEntry($infoId){
	//the only thing that links input and item tables is the pic field!
	//get the pic
	$q=mysql_query("select pic from user where id=$infoId");
	$r=mysql_fetch_assoc($q);
	$pic=$r['pic'];
	$q=mysql_query("delete from product where id=$infoId");
	if($q){
		$q=mysql_query("delete from itm where pic=$pic");
		//echo "Deleted permanently";
	}
}

function plAcc($infoId){
	$q=mysql_query("select *, date_format(date, '%M-%d-%Y') as date, date_format(date, '%e') as period from prole where pro=$infoId");
	$acc_bal=0;//the account balance is zero initially
	$num_rec=@mysql_num_rows($q);
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$cur=$i++;
			$next="rec".($cur+1);
			$id=$r['id'];
			$par=$r['par'];
			$vt=$r['vt'];
			$vr=$r['vr'];
			$itm=$r['pro'];
			$dr=$r['dr'];
			$cr=$r['cr'];
			$acc_bal+=($cr-$dr);//we keep it as the value of the credit balance less debit balance
			$date=$r['date'];
			$period=$r['period'];//after which we close and open new period
			$json_data.='"rec'.$cur.'":{"id":"'.$id.'", "par":"'.ucwords($par).'", "vt":"'.$vt.'", "vr":"'.$vr.'", "itm":"'.$itm.'",
						"dr":"'.$dr.'", "cr":"'.$cr.'", "date":"'.$date.'", "acc_bal":"'.$acc_bal.'", "period":"'.$period.'", "num_rec":"'.$num_rec.'", "next":"'.$next.'"},';
		}
		$json_data=chop($json_data, ",");
		$json_data.='}';
		echo $json_data;
	}
}
?>