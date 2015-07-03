<?php
if(isset($_GET['fetchEntry'])){
	fetchEntry();
}
if(isset($_GET['fetchLinks'])){
	fetchLinks();
}
if(isset($_GET['itmForm'])){
	itmForm();
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
if(isset($_GET['appro'])){
	if(isset($_GET['id'])){
		appro($_GET['id']);
	}
}
if(isset($_GET['getInsInput'])){
	if(isset($_GET['id'])){
		getInsInput($_GET['id']);
	}
}
if(isset($_GET['editEntry'])){
	if(isset($_GET['id'])){
		editEntry($_GET['id']);
	}
}
if(isset($_GET['getOitm'])){
	if(isset($_GET['id'])){
		getOitm($_GET['id']);
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

//create supplier form
function getForm(){
	$q=mysql_query("select id from pord order by id desc limit 1");//used when formatting our reference number. //get only id of last record (order by id desc limit 1)
	$r=mysql_fetch_assoc($q);
	$id;
	if(@mysql_num_rows($q)<1){
		$id=1;//default if table is empty
	}
	else{
		$id=$r['id']+1;//get id of returned record, add 1, because it will be the next record
	}
	$ref=$id.rand(0, 999999999);//get the returned id and append a random number of 9 digits
	$ref=substr($ref, 0, 10)//always keep the string down to 10 characters
	?>
    <div id="form_wrapper">
	<form method="post" enctype="multipart/form-data" name="entry_form">
    	<div><input type="text" name="cust_name" placeholder="Supplier Name" id="cust_name" /></div>
    	<div id="form_title">
        	Purchase Order <span id="ref">(PO - <?php echo $ref; ?>)</span>
        </div>
        <div id="o_date">
			<?php echo date('D, M d, Y'); ?>
        </div>
        <div id="sup_sel_div">
        </div>
        <div id="supp_name"></div>
         <div id="po_sta"></div><!--holds current status-->
         <div id="ed_sta"></div><!--holds current status before editing-->
        <div id="sup_id"></div><!--shall have to be removed. just here for an emergency-->
        <div id="form_itm">
            <table class="itm_tbl">
                <thead>
                <th>Item</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>VAT (18%)</th><th>Subtotal</th><th></th>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
        </div>
        <div id="form_totals">
        <table id="itm_tbl_totals">
            <tbody id="itm_tbl_totals_tbody">
            <tr><td>Untaxed Amount (UGX)</td><td id="po_subt"></td></tr>
            <tr><td>Taxes (UGX)</td><td id="po_tax"></td></tr>
            <tr id="total"><td>Total (UGX)</td><td id="po_tot"></td></tr>
            </tbody>
        </table>
        </div>
        <div id="form_comm">
        <textarea name="comm" placeholder="Comments, Terms, Conditions" id="comm"></textarea>
        </div>
    </form>
    <div class="spacer"></div>    
    </div>
    <?php
}

//save supplier information
function saveEntry(){
	$ref=$_POST['ref'];
	$supp=$_POST['supp'];
	if($supp==""){
		$supp="Random Supplier";
	}
	$sbt=$_POST['sbt'];
	$tax=$_POST['tax'];
	$tot=$_POST['tot'];
	$term=$_POST['term'];
	$po_sta=$_POST['po_sta'];//order status
	$ed_sta=mysql_real_escape_string($_POST['ed_sta']);//previous status
	$itmtbl=$_POST['itmtbl'];//this is the item table container of values already a string
	$itmtbl=explode(",/,", $itmtbl);//turn string into array
	$lst=end($itmtbl);//last sub array
	$lst=chop($lst, ",/");//remove trailing ,/
	$itmtbl=array_slice($itmtbl, 0, -1);//remove last sub which has trail
	array_push($itmtbl, $lst);//add last without trail.
	function ex($_){//fn to use as first argument for array map
		return explode(',', $_);
	}
	$itmtbl=array_map("ex", $itmtbl);//U NOW HAVE A CLEAN MULTIDIMENSIONAL ARRAY TO USE
	//print_r($itmtbl);
	//don't forget to insert into status
	$q=mysql_query("insert into pord (ref, sup, sbt, tax, tot, term, sta) values ('$ref', '$supp', '$sbt', '$tax', '$tot', '$term', '$po_sta')");
	if($q){
		echo "THANK YOU JESUS<br />";
		//time to insert into the items table
		mysql_query("select last_insert_id() into @pord");//store the last id of inserted purchase order
		//loop through the items array
		foreach($itmtbl as $rec){
			//get each record values
			for($i=0; $i<sizeof($rec); $i++){
				$itm=$rec[0];
				$des=$rec[1];
				$qty=$rec[2];
				$upr=$rec[3];
				$vat=$rec[4];
				$sbt=$rec[5];
			}
			$q=mysql_query("insert into poitm (itm, des, pord, sbt, vat, upr, qty) values ('$itm', '$des', @pord, '$sbt', '$vat', '$upr', '$qty')");
			if($q){//////////////////////////////////////ACCOUNTS AND INVENTORY ARE AFFECTED AT THIS POINT///////////////////////////////////////////////////////
				$inv=$ref;
				$inv=end(explode("-", $inv));//get the las part of the order reference
				$inv="PR - ".$inv;
				$inv=chop($inv, ")");
				$q=mysql_query("select id from product where name='$itm'");//store the last id of inserted item
				$r=mysql_fetch_assoc($q);
				$p_itm=$r['id'];
				$q=mysql_query("insert into prole (par, vt, vr, pro, dr, sord) values ('$supp', 'Purchases', '$inv', $p_itm, ($sbt+$vat), @pord)");////debit item account
				$q=mysql_query("select qty, pic from product where name='$itm'");//get available quantity
				$r=mysql_fetch_assoc($q);
				$prev_qty=$r['qty'];
				$pic=$r['pic'];//input and itm are joined by this id[pic]
				$new_qty=$prev_qty+$qty;//determine new quantity to update input
				$q=mysql_query("update product set qty='$new_qty' where name='$itm'");
			}
			/////////////////////////////////////////////////////////////////////////////////////////
			else{
				echo mysql_error()."poitm";
			}
		}
	}
	else{
		echo mysql_error()."pord";
	}
}

//fetch supplier information
function fetchEntry(){
	$q=mysql_query("select p.id, p.ref, p.sup, p.sbt, p.tot, p.sta, date_format(p.date, '%a, %M %d, %Y') as date
					from pord as p order by p.id desc");
	$num_rec=@mysql_num_rows($q);
	if($q){
		$json_data='{';
		$i=0;
		while($r=mysql_fetch_assoc($q)){
			$i++;
			$id=$r['id'];
			$q2=mysql_query("select date_format(date, '%a, %M %d, %Y') as prev from pord where id=(select max(id) from sord where id<$id)");
			$r2=mysql_fetch_assoc($q2);
			$prev=$r2['prev'];
			$ref=$r['ref'];
			$sup=ucwords($r['sup']);
			if($sup==""){
				$sup="Random Supplier";
			}
			$sbt=$r['sbt'];
			$tot=$r['tot'];
			$date=$r['date'];
			$json_data.='"rec'.$i.'":{"id":"'.$id.'", "ref":"'.$ref.'", "supp":"'.$sup.'", "sbt":"'.$sbt.'", "tot":"'.$tot.'", "num_rec":"'.$num_rec.'", "prev":"'.$prev.'", "date":"'.$date.'"},';
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

//fetch more supplier information
function moreInfo($infoId){
	$level=$_SESSION['level'];
	$q=mysql_query("select * from poitm where pord=$infoId");
	if(mysql_num_rows($q)<1){
		$q=mysql_query("select o.id as oid, o.ref, o.sup, o.sbt as osbt, o.tax, o.tot, o.sta, o.term, date_format(o.date, '%a, %b %d, %Y') as date
							from pord as o where o.id=$infoId");
		if($q){
			$json_data='{';
			$i=0;
			while($r=mysql_fetch_assoc($q)){
				$i++;
				$oid=$r['oid']; $ref=$r['ref']; $sname=ucwords($r['sup']); $osbt=$r['osbt']; $tax=$r['tax']; $tot=$r['tot']; $sta=$r['sta']; $term=$r['term']; $date=$r['date'];
				if($sname==""){
					$sname="Random supplier";
				}
				$json_data.='"rec'.$i.'":{"oid":"'.$oid.'", "ref":"'.$ref.'", "sname":"'.$sname.'", "osbt":"'.$osbt.'", "tax":"'.$tax.'", "tot":"'.$tot.'",
					"sta":"'.$sta.'", "term":"'.$term.'", "level":"'.$level.'", "date":"'.$date.'"},';
			}
			$json_data=chop($json_data, ",");
			$json_data.='}';
			echo $json_data;
		}
		else{
			echo mysql_error();
		}
	}
	else{
		$q=mysql_query("select o.id as oid, o.ref, o.sup, o.sbt as osbt, o.tax, o.tot, o.sta, o.term, date_format(o.date, '%a, %b %d, %Y') as date,
					i.id as iid, i.itm, i.des, i.sbt as isbt, i.vat, i.upr, i.qty from pord as o join poitm as i
					on i.pord=o.id where o.id=$infoId");
		if($q){
			$json_data='{';
			$i=0;
			while($r=mysql_fetch_assoc($q)){
				$i++;
				$oid=$r['oid']; $ref=$r['ref']; $sname=ucwords($r['sup']); $osbt=$r['osbt']; $tax=$r['tax']; $tot=$r['tot']; $sta=$r['sta']; $term=$r['term']; $date=$r['date'];
				$itm=$r['itm']; $des=$r['des'];$isbt=$r['isbt'];$vat=$r['vat'];$upr=$r['upr'];$qty=$r['qty'];
				$q2=mysql_query("select id as iid from product where name='$itm'");//getting item from product table using name reference from soitm table
				$r2=mysql_fetch_assoc($q2);
				$iid=$r2['iid'];
				if($sname==""){
					$sname="Random supplier";
				}
				$json_data.='"rec'.$i.'":{"oid":"'.$oid.'", "ref":"'.$ref.'", "sname":"'.$sname.'", "osbt":"'.$osbt.'", "tax":"'.$tax.'", "tot":"'.$tot.'",
					"sta":"'.$sta.'", "term":"'.$term.'", "level":"'.$level.'", "date":"'.$date.'","iid":"'.$iid.'","itm":"'.$itm.'","des":"'.$des.'","isbt":"'.$isbt.'",
						"vat":"'.$vat.'","upr":"'.$upr.'", "qty":"'.$qty.'"},';
			}
			$json_data=chop($json_data, ",");
			$json_data.='}';
			echo $json_data;
		}
		else{
			echo mysql_error();
		}
	}
}

//edit supplier information
function editEntry($infoId){
	$q=mysql_query("select * from poitm where pord=$infoId");
	if(mysql_num_rows($q)<1){
		$q1=mysql_query("select o.id as oid, o.ref, o.sup, o.sbt as osbt, o.tax, o.tot, o.sta, o.term, date_format(o.date, '%a, %b %d, %Y') as date from pord as o where o.id=$infoId");
	}
	else{
		$q1=mysql_query("select o.id as oid, o.ref, o.sup, o.sbt as osbt, o.tax, o.tot, o.sta, o.term, date_format(o.date, '%a, %b %d, %Y') as date,
					i.id as iid, i.itm, i.des, i.sbt as isbt, i.vat, i.upr, i.qty from pord as o join poitm as i
					on i.pord=o.id where o.id=$infoId");
	}
	$r1=mysql_fetch_assoc($q1);
	//do not echo these reults or pass them as JSON. save the details in a hidden cont for fetching to their right places
	//alternatively, or better, call a new function to return the json, in Javascript, and php as well; so that the details can be json parsed and used.
	?>
    <div id="form_wrapper">
	<form method="post" enctype="multipart/form-data" name="entry_form">
    	<div><input type="text" name="cust_name" placeholder="supplier Name" id="cust_name" value="<?php echo $r1['sup']; ?>" /></div>
    	<div id="form_title">
        	Purchase Order <span id="ref"><?php echo $r1['ref']; ?></span>
        </div>
        <div id="o_date">
			<?php echo $r1['date']; ?>
        </div>
        <!--THESE HOLD EDIT VALUES-->
        <div id="h_qty" class="ed_hold"></div><div id="h_upr" class="ed_hold"></div><div id="h_stot" class="ed_hold"></div>
        <div id="h_tax" class="ed_hold"></div><div id="h_desc" class="ed_hold"></div><div id="h_id" class="ed_hold"></div>
        <div id="form_itm">
            <table class="itm_tbl">
                <thead>
                <th>Item</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>VAT (18%)</th><th>Subtotal</th><?php if($r1['sta']==0){?><th></th><?php } ?>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
        </div>
        <div id="form_totals">
        <table id="itm_tbl_totals">
            <tbody id="itm_tbl_totals_tbody">
            <tr><td>Untaxed Amount (UGX)</td><td id="po_subt"></td></tr>
            <tr><td>Taxes (UGX)</td><td id="po_tax"></td></tr>
            <tr id="total"><td>Total (UGX)</td><td id="po_tot"></td></tr>
            </tbody>
        </table>
        </div>
        <div id="form_comm">
        <!--only change fro draft status-->
        <textarea name="comm" placeholder="Comments, Terms, Conditions" id="comm"><?php echo $r1['term']; ?></textarea>
        </div>
    </form>
    <div class="spacer"></div>    
    </div>
    <?php
}

//update supplier information
function upEntry($infoId){
	$ref=$_POST['ref'];
	$supp=mysql_real_escape_string($_POST['supp']);
	$sbt=mysql_real_escape_string($_POST['sbt']);
	$tax=mysql_real_escape_string($_POST['tax']);
	$tot=mysql_real_escape_string($_POST['tot']);
	$term=mysql_real_escape_string($_POST['term']);
	$itmtbl=mysql_real_escape_string($_POST['itmtbl']);//this is the item table container of values already a string
	$itmtbl=explode(",/,", $itmtbl);//turn string into array
	$lst=end($itmtbl);//last sub array
	$lst=chop($lst, ",/");//remove trailing ,/
	$itmtbl=array_slice($itmtbl, 0, -1);//remove last sub which has trail
	array_push($itmtbl, $lst);//add last without trail.
	function ex($_){//fn to use as first argument for array map
		return explode(',', $_);
	}
	$itmtbl=array_map("ex", $itmtbl);//U NOW HAVE A CLEAN MULTIDIMENSIONAL ARRAY TO USE
	print_r($itmtbl);
	//don't forget to insert into status
	$q=mysql_query("update pord set ref='$ref', sup='$supp', sbt='$sbt', tax='$tax', tot='$tot', term='$term' where id=$infoId");
	if($q){
		echo "THANK YOU JESUS<br />";
		/*/
			first, capture the quantities sold previously for all the items in the order - from "poitm"
			add the qty to the respective itm in "product" to signify a return (we may do a debit here, or just increase inventory)
			then, delete from "poitm" all the items with that order number
			plus, delete from "prole" all that pertains to that order number (we need a pord field for prole) (but we need to indicate a return - how?)
			then we can start doing the updates
			normally update the record. poitm, prole, reduce qty in product
			for the "returns" we can get the items that were on the order before, see whether they appear again, and then compare the qty b4 and current
			to get how much was returned, we increase inventory but reduce Purchases. we increase ret inwards but red debtors () and cash
			
		/*/
		$q=mysql_query("select itm, qty from poitm where pord=$infoId");
		while($r=mysql_fetch_assoc($q)){
			$sold_itm=$r['itm'];
			$qs=mysql_query("select qty from product where name='$sold_itm'");
			$rs=mysql_fetch_assoc($qs);
			$avail_qty=$rs['qty'];
			$sold_qty=$r['qty'];
			$before_sold_qty=$avail_qty-$sold_qty;
			$qty_q=mysql_query("update product set qty=$before_sold_qty where name='$sold_itm'");
		}
		$q=mysql_query("delete from poitm where pord=$infoId");
		$q=mysql_query("delete from prole where sord=$infoId and vt='Purchases'");
		//loop through the items array
		foreach($itmtbl as $rec){
			if(sizeof($rec)>1){
				//get each record values
				for($i=0; $i<sizeof($rec); $i++){//these are the different cell values for a single row
					$itm=@$rec[0];
					$des=@$rec[1];
					$qty=@$rec[2];
					$upr=@$rec[3];
					$vat=@$rec[4];
					$sbt=@$rec[5];
				}//we need to increase quantities in case an item is returned! and reduce that of an item that has been added to the order
				$q=mysql_query("insert into poitm (itm, des, pord, sbt, vat, upr, qty) values ('$itm', '$des', $infoId, '$sbt', '$vat', '$upr', '$qty')");
				if($q){//////////////////////////////////////ACCOUNTS AND INVENTORY ARE AFFECTED AT THIS POINT///////////////////////////////////////////////////////
					$inv=$ref;
					$inv=end(explode("-", $inv));//get the las part of the order reference
					$inv="PR - ".$inv;
					$inv=chop($inv, ")");
					$q=mysql_query("select id from product where name='$itm'");//store the last id of inserted item
					$r=mysql_fetch_assoc($q);
					$p_itm=$r['id'];
					////GET A WAY OF DELETING EVERYTHING ABOUT THE ORDER, FIRST
					$q=mysql_query("insert into prole (par, vt, vr, pro, dr, sord) values ('$supp', 'Purchases', '$inv', $p_itm, ($sbt+$vat), $infoId)");//debit item account
					if(!$q){echo mysql_error();}
					//if the current status is done and the previous status is not invoice it means inventory has not been updated yet and the user is skippig the stage!
					$q=mysql_query("select qty, pic from product where name='$itm'");//get available quantity
					$r=mysql_fetch_assoc($q);
					$prev_qty=$r['qty'];
					$pic=$r['pic'];//input and itm are joined ny this id[pic]
					$new_qty=$prev_qty+$qty;//determine new quantity to update input table first
					$q=mysql_query("update product set qty='$new_qty' where name='$itm'");
					if($q){//update inventory table
						$q=mysql_query("select qty from itm where pic=$pic");//get available quantity
						$r=mysql_fetch_assoc($q);
						$prev_qty=$r['qty'];
						$new_qty=$prev_qty+$qty;//determine new quantity to update itm table
						$q=mysql_query("update itm set qty='$new_qty' where pic=$pic");
					}
				echo "THANK YOU JESUS<br />";
				}
				/////////////////////////////////////////////////////////////////////////////////////////
				else{
					echo mysql_error()."poitm";
				}
			}
		}
	}
	else{
		echo mysql_error()."pord";
	}
}

//delete supplier
function delEntry($infoId){
	//first delete the items to avoid foreign key constraints
	$q=mysql_query("delete from poitm where pord=$infoId");
	if($q){
		//now delete the PO
		$q=mysql_query("delete from pord where id=$infoId");
	}
}

function itmForm(){
	$q=mysql_query("select i.id as id, i.name as name, i.price as price from product as i");
	?>
	<div id="itm_form">
		<div id="itm_inner">
			<div id="itm_msg">Add Item</div>
			<div id="itm_tsk">
            	<ul id="r_set"></ul>
				<div>
				<input type="text" placeholder="Search for an Item" id="itm" />
				<input type="text" placeholder="Quantity" id="qty" />
				<input type="text" placeholder="Description" id="desc" />
				</div>
				<div>
				<input type="text" placeholder="Unit Price" id="upr" disabled="disabled"/>
				<input type="text" placeholder="VAT (18.00%)" id="tax" disabled="disabled" />
				<input type="text" placeholder="Subtotal" id="stot" disabled="disabled" />
				</div>
			</div>
			<div id="itm_desc">
			</div>
		</div>
	</div>
	<?php
}

function getOitm($infoId){
	$q=mysql_query("select o.id as oid, o.ref, o.sup, o.sbt as osbt, o.tax, o.tot, o.sta, o.term, date_format(o.date, '%a, %b %d, %Y') as date,
					i.id as iid, i.itm, i.des, i.sbt as isbt, i.vat, i.upr, i.qty from pord as o join poitm as i on i.pord=o.id where o.id=$infoId");
	$json_data='{';
	$i=0;
	while($r=mysql_fetch_assoc($q)){
		$i++;
		$oid=$r['oid']; $ref=$r['ref']; $sname=$r['sup']; $osbt=$r['osbt']; $tax=$r['tax']; $tot=$r['tot']; $sta=$r['sta']; $term=$r['term'];
		$date=$r['date']; $iid=$r['iid']; $itm=$r['itm']; $des=$r['des'];$isbt=$r['isbt'];$vat=$r['vat'];$upr=$r['upr'];$qty=$r['qty'];
		$json_data.='"rec'.$i.'":{"oid":"'.$oid.'", "ref":"'.$ref.'", "sname":"'.$sname.'", "osbt":"'.$osbt.'", "tax":"'.$tax.'", "tot":"'.$tot.'",
			"sta":"'.$sta.'", "term":"'.$term.'", "date":"'.$date.'","iid":"'.$iid.'","itm":"'.$itm.'","des":"'.$des.'","isbt":"'.$isbt.'",
				"vat":"'.$vat.'","upr":"'.$upr.'", "qty":"'.$qty.'"},';
	}
	$json_data=chop($json_data, ",");
	$json_data.='}';
	echo $json_data;
}

function appro($infoId){
	///THANK YOU JEHOVAH! THIS IS INDEED YOUR WORK NOT MINE!
	$qty_test=array();//array to hold returned values of available qty test
	$insuf_qty=array();///this array holds the id's of inputs that are insufficient
	$q=mysql_query("select ref from pord where id=$infoId");
	$r=mysql_fetch_assoc($q);
	$ref=$r['ref'];
	/////
	$q=mysql_query("select itm, qty from poitm where pord=$infoId");
	while($r=mysql_fetch_assoc($q)){
		$req_in=$r['itm'];
		$req_qty=$r['qty'];
		$q1=mysql_query("select qty, id from product where name='$req_in'");
		$r1=mysql_fetch_assoc($q1);
		$av_qty=$r1['qty'];
		$insuf_in=$r1['id'];
		if($av_qty<$req_qty){
			array_push($qty_test, 0);
			array_push($insuf_qty, $insuf_in);
		}
		else{
			array_push($qty_test, 1);
		}
	}
	$qty_test_str=implode(",", $qty_test);////turn the array into a string for easy testing
	if(preg_match("/(0)+/", $qty_test_str)){
		///some items are missing
		///return a json object to instruct javascript on what to do.
		$insuf_qty_str=implode(",", $insuf_qty);////get id's of insufficient inputs as a single string
		$json_data='{"app":"0", "insuf_qty":"'.$insuf_qty_str.'"}';
		echo $json_data;
	}
	else{///all items are available
		//product
		$json_data='{"app":"1"}';
		echo $json_data;
	}
}

function getInsInput($insuf_qty){////THANK YOU JESUS FOR THESE GREAT REVELATIONS/// HALLELUJAH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$insuf_qty=explode(",", $insuf_qty);///explode string back to array
	$json_data='{';
	for($i=0; $i<sizeof($insuf_qty); $i++){
		$ins_itm=$insuf_qty[$i];
		$q=mysql_query("select f.id, f.name, f.price, f.qty, f.unit, p.src from product as f join pic as p on f.pic=p.id where f.id=$ins_itm");
		$r=mysql_fetch_assoc($q);
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
?>