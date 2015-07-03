<?php
if(isset($_GET['fetchEntry'])){
	fetchEntry();
}
if(isset($_GET['searchEntry'])){
	searchEntry();
}
if(isset($_GET['chQty'])){
	if(isset($_GET['id'])){
		chQty($_GET['id']);
	}
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
            <input type="text" name="name" placeholder="Product Name" id="p_name" /><!--rejected id="name" (it would alter the size of the field) why?-->
            </div>
            <div>
            <input type="text" name="price" placeholder="Current Unit Price" id="price" />
            </div>
            <div>
            <input type="text" name="open_qty" placeholder="Opening Stock Quantity" id="open_qty" />
            </div>
            <div>
            <input type="text" name="unit" placeholder="Unit of Measurement" id="unit" />
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
	$price=$_POST['price'];
	$unit=$_POST['unit'];
	if($unit==""){
		$unit="PCS";
	}
	$pic=$_FILES['pic']['name'];
	if($pic==""){
			$pic="logo.png";
	}
	if(!empty($_POST['open_qty'])){
		$open_qty=$_POST['open_qty'];//opening stock
		$open_bal=($price*$open_qty);//opening balance calculation
	}
	else{
		$open_qty=0;//cater for empty field
		$open_bal=0;//cater for empty field
	}
	$upload=move_uploaded_file($_FILES['pic']['tmp_name'], "../image/".$_FILES['pic']['name']);
	//if($upload){
		$q=mysql_query("insert into pic (src) values ('$pic')");
		if($q){
			mysql_query("select last_insert_id() into @pic");//store the last id of inserted pic
			$q=mysql_query("insert into product (name, price, unit, pic, qty) values ('$name', '$price', '$unit', @pic, $open_qty)");
			if($q){//insert into items table as well: cat==1
				mysql_query("select last_insert_id() into @item");//store the last id of inserted pic
				$q=mysql_query("insert into itm (name, cat, price, unit, pic, qty) values ('$name', 2, '$price', '$unit', @pic, $open_qty)");
				$q=mysql_query("insert into prole (par, pro, dr) values ('Opening Stock', @item, '$open_bal')");//insert opening stock balance
			}
			else{
				//echo "Entry not created successfully".mysql_error();
			}
		}
	//}
	//else{
		//echo "You must attach a photo to the information!";
	//}
}

//fetch customer information
function fetchEntry(){
	$q=mysql_query("select f.id, f.name, f.price, f.qty, f.unit, p.src from product as f join pic as p on f.pic=p.id order by f.name asc");
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$i++;
			$id=$r['id'];
			$name=$r['name'];
			$price=$r['price'];
			$qty=$r['qty'];
			$unit=$r['unit'];
			$pic="image/".$r['src'];
			$json_data.='"rec'.$i.'":{"id":"'.$id.'", "name":"'.$name.'", "price":"'.$price.'", "qty":"'.$qty.'", "units":"'.$unit.'", "pic":"'.$pic.'"},';
		}
		$json_data=chop($json_data, ",");
		$json_data.='}';
		echo $json_data;
	}
	else{
		echo mysql_error();
	}
}

function searchEntry(){
	$term=$_POST['term'];
	$q=mysql_query("select f.id, f.name, f.price, f.qty, f.unit, p.src from product as f join pic as p on f.pic=p.id where f.name like '%$term%' order by f.name asc");
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$i++;
			$id=$r['id'];
			$name=$r['name'];
			$price=$r['price'];
			$qty=$r['qty'];
			$unit=$r['unit'];
			$pic="image/".$r['src'];
			$json_data.='"rec'.$i.'":{"id":"'.$id.'", "name":"'.$name.'", "price":"'.$price.'", "qty":"'.$qty.'", "units":"'.$unit.'", "pic":"'.$pic.'"},';
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
	$q=mysql_query("select f.id, f.name, f.price, f.qty, f.unit, p.src from product as f join pic as p on f.pic=p.id where f.id=$infoId");
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$i++;
			$id=$r['id'];
			$name=$r['name'];
			$price=$r['price'];
			$qty=$r['qty'];
			$date=date('D, M d, Y ');
			$unit=$r['unit'];
			$pic="image/".$r['src'];
			$json_data.='"id":"'.$id.'", "name":"'.$name.'", "price":"'.$price.'", "qty":"'.$qty.'", "units":"'.$unit.'", "pic":"'.$pic.'", "date":"'.$date.'"';
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
	$q=mysql_query("select f.id, f.name, f.price, f.qty, f.unit, p.src from product as f join pic as p on f.pic=p.id where f.id=$infoId");
	$r=mysql_fetch_assoc($q);
	$id=$r['id'];
	$name=$r['name'];
	$price=$r['price'];
	$unit=$r['unit'];
	$open_qty=$r['qty'];
	$pic="image/".$r['src'];
	$q=mysql_query("select * from prole where pro=$infoId");//get no of transactions of item
	$trans=@mysql_num_rows($q);
	?>
	<div id="form_wrapper">
	<form method="post" enctype="multipart/form-data" name="edit_entry_form">
    	<div id="form_lft">
            <div>
            <input type="text" name="name" placeholder="Input Name" id="p_name" value="<?php echo $name; ?>" />

            </div>
            <div>
            <input type="text" name="price" placeholder="Current Unit Price" id="price" value="<?php echo $price; ?>" />
            </div>
            <?php
			if($trans<2){//allow for only one transaction because of the nature of stock
			?>
            <div>
            <input type="text" name="open_qty" placeholder="Opening Stock Quantity" id="open_qty" value="<?php echo $open_qty; ?>" />
            </div>
            <?php
			}
			?>
            <div>
            <input type="text" name="unit" placeholder="Unit of Measurement" id="unit" value="<?php echo $unit; ?>" />
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
	//the only thing that links input and item tables is the pic field!
	//get the pic
	$q=mysql_query("select pic from product where id=$infoId");
	$r=mysql_fetch_assoc($q);
	$up_pic=$r['pic'];//pic to effect change
	$name=$_POST['name'];
	$price=$_POST['price'];
	$unit=$_POST['unit'];
	if($unit==""){
			$unit="PCS";
	}
	if(isset($_POST['open_qty'])){
		$open_qty=$_POST['open_qty'];
		$open_bal=($open_qty*$price);//opening stock balance
		$pic=$_FILES['pic']['name'];
		$upload=move_uploaded_file($_FILES['pic']['tmp_name'], "../image/".$_FILES['pic']['name']);
		$q=mysql_query("update product
						set name='$name', price='$price', unit='$unit', qty=$open_qty
						where id=".$infoId."");
		if(!$q){echo mysql_error();}
		else{//update items table as well
			$q=mysql_query("update itm
						set name='$name', price='$price', unit='$unit', qty=$open_qty
						where pic=".$up_pic."");
			$q=mysql_query("update prole set dr=$open_bal where pro=$infoId and par='Opening Stock'");
		}
		if($upload){
			$q=mysql_query("update pic set src='$pic' where id=".$up_pic."");
			if(!$q){echo mysql_error();}
		}
	}
	else{//avoid errors when the open qty field was not displayed
		$pic=$_FILES['pic']['name'];
		$upload=move_uploaded_file($_FILES['pic']['tmp_name'], "../image/".$_FILES['pic']['name']);
		$q=mysql_query("update product
						set name='$name', price='$price', unit='$unit'
						where id=".$infoId."");
		if(!$q){echo mysql_error();}
		else{//update items table as well
			$q=mysql_query("update itm
						set name='$name', price='$price', unit='$unit'
						where pic=".$up_pic."");
		}
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
	$q=mysql_query("select pic from product where id=$infoId");
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

function chQty($itm_id){
	$q=mysql_query("select qty from product where id=$itm_id");
	if($q){
		$r=mysql_fetch_assoc($q);
		$qty=$r['qty'];
		$json_data='{"qty":"'.$qty.'"}';
		echo $json_data;
	}
}
?>