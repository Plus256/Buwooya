window.onload=function(){
	var option=document.URL;
	//when an option is chosen
	if(option.match('option')){
		//selecting divs for dynamic content
		var option_box=document.getElementById("cpanel_inner_left_option");
		var link_box=document.getElementById("cpanel_inner_left_links");
		//holds the buttons
		var main_options_options=document.getElementById("cpanel_inner_main_options_options");
		//holds the search area
		var main_options_search=document.getElementById("cpanel_inner_main_options_search");
		var main_box=document.getElementById("cpanel_inner_main_main");
		//split url and pick last item	
		option=option.split("=");
		option=option[(option.length)-1];	
		option_box.innerHTML=option;
		$(option).style.background="#09F";//highlight active tab
		$(option).firstChild.style.color="#FFF";//highlight active tab
		//fetch icon for specific option
		var bg_img="image/"+option.toLowerCase()+".png";
		option_box.setAttribute("style","background:url('"+bg_img+"') no-repeat; border:1px solid #E1E1E1; background-position:center;");
		//get option call
		getOpt(option);
	}		
}

///////////////////////////////////////////////////////////////////

var msg_dialog=new DialogBox();
var msg_hed=new Head();
var msg_tit=new Title();
var msg_esc=new Esc();
var msg_area=new TextArea();
var send_msg_but=new Button();

////////////////////////////////////////////////////////////////////
var even_top_position=0;
var odd_top_position=0;
////////////////////////////////////////////////////////////////////
msg_tit.innerHTML="Change Calculator";
msg_tit.setAttribute("id", "msg_tit");
////////////////////////////////////////////////////////////////////
msg_esc.innerHTML="+";
msg_esc.setAttribute("id", "msg_esc");
if(window.addEventListener){//browser not IE//////IT IS BEST TO USE THE OBJECT WHEN TESTING IF IT IS SUPPORTED - DETECTING THE BROWSER IS NOT RELIABLE!
	msg_esc.addEventListener("click", function(e){
		//using addEventListener with the function(e) notation eliminates errors
		//the single addEventListener: msg_esc.addEventListener("click", msg_dialog.done(), false); is not effective
		msg_dialog.done();
		e.preventDefault();
	}, false);
}
else{//for IE
	msg_esc.onclick=function (){msg_dialog.done()};
}
////////////////////////////////////////////////////////////////////
var dialog_head_spacer=_("div");
dialog_head_spacer.setAttribute("id", "dialog_head_spacer");
msg_hed.appendChild(msg_tit);
msg_hed.appendChild(msg_esc);
msg_hed.appendChild(dialog_head_spacer);
////////////////////////////////////////////////////////////////////
var frm=_("div");
frm.setAttribute("contentEditable", "true");
frm.setAttribute("id", "frm");
////simulating placeholder
var frm_placeholder="Cash Tendered";//this automatically validates - no further validation required on submition
frm.innerHTML=frm_placeholder;
///
if(window.addEventListener){
	frm.addEventListener("focus", function(e){
		if(frm.innerHTML==frm_placeholder){
			frm.innerHTML="";
		}
		frm.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	frm.onfocus=function (){
		if(frm.innerHTML==frm_placeholder){
			frm.innerHTML="";
		}
		frm.style.color="#036";
	};
}
///
if(window.addEventListener){
	frm.addEventListener("blur", function(e){
		if(frm.innerHTML==""){
			frm.innerHTML=frm_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	frm.onblur=function (){
		if(frm.innerHTML==""){
			frm.innerHTML=frm_placeholder;
		}
	};
}
///
if(window.addEventListener){
	frm.addEventListener("keyup", function(e){
		msg_area.innerHTML=(parseFloat(frm.innerHTML)-parseFloat(sbj.innerHTML)).toFixed(2);
		if(isNaN(msg_area.innerHTML) || parseFloat(msg_area.innerHTML)<0){
			msg_area.style.color="#F00";
			send_msg_but.style.display="none";
		}
		else{
			msg_area.style.color="#0C0";
			send_msg_but.style.display="inline";
		}
		e.preventDefault();
	}, false);
}
else{
	frm.onkeyup=function (){
		msg_area.innerHTML=(parseFloat(frm.innerHTML)-parseFloat(sbj.innerHTML)).toFixed(2);
	};
}
////////////////////////////////////////////////////////////////////
var sbj=_("div");
sbj.setAttribute("class", "msg_dialog_text_input");
sbj.setAttribute("id", "sbj");
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
msg_dialog.tit=msg_hed;
msg_dialog.frm=frm;
msg_dialog.sbj=sbj;
msg_dialog.bod=msg_area;
msg_dialog.fot=send_msg_but;
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
send_msg_but.innerHTML="Complete";
send_msg_but.setAttribute("class", "but");
send_msg_but.setAttribute("id", "send_msg_but");
if(window.addEventListener){
	send_msg_but.addEventListener("click", function(e){
		msg_dialog.done(); compSale();
		e.preventDefault();
	}, false);
}
else{
	send_msg_but.onclick=function (){msg_dialog.done(); compSale();};
}
////////////////////////////////////////////////////////////////////
msg_area.setAttribute("id", "msg_area");
msg_area.innerHTML="0.00";
////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//function definitions
//get selected option
function getOpt(opt){
	switch(opt){
		case "Product":
		/*
		var add_module=_("div");//new div
		add_module.setAttribute("id", "add_module");
		add_module.innerHTML="+";
		var add_module_but=_("button");
		add_module_but.setAttribute("class", "cpanel_button");
		add_module_but.setAttribute("title", opt);
		add_module_but.appendChild(add_module);
		if(window.addEventListener){
			add_module_but.addEventListener("click", getForm(this.title), false);
		}
		else{
			add_module_but.onclick=getForm(this.title);
		}
		$("cpanel_inner_main_options_options").appendChild(add_module_but);
		*/
		document.getElementById("cpanel_inner_main_options_options").innerHTML="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>New</button>";
		document.getElementById("cpanel_inner_main_options_options").innerHTML+="<input type='text' name='qk_search' id='qk_search' placeholder='Search for an Item' title='"+opt+"' onkeyup='searchEntry(this.title)' />";
		break;
		case "SalesOrder":
		document.getElementById("cpanel_inner_main_options_options").innerHTML="<span class='but' id='pos_but' title='"+opt+"' onclick='getForm(this.title)'>Point of Sale</span>";
		break;
		case "Analytics":
		var tics_title=_("div");//new div
		tics_title.setAttribute("id", "tics_title");
		tics_title.innerHTML="General Business Report";
		$("cpanel_inner_main_options_options").appendChild(tics_title);
		break;
		default:
		document.getElementById("cpanel_inner_main_options_options").innerHTML="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
		break;
	}
	fetchEntry(opt);
	fetchLinks(opt);
}

//cancel creation process
function cancel(opt){
	var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
	document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
	if(opt=="Product"){
		document.getElementById("cpanel_inner_main_options_options").innerHTML+="<input type='text' name='qk_search' id='qk_search' placeholder='Search for an Item' title='"+opt+"' onkeyup='searchEntry(this.title)' />";
	}
	if(opt=="SalesOrder"){
		document.getElementById("cpanel_inner_main_options_options").innerHTML="<span class='but' id='pos_but' title='"+opt+"' onclick='getForm(this.title)'>Point of Sale</span>";
	}
	fetchEntry(opt);///we are about to do away with function. we instead call moreInfo() when the cancel button is clicked. - better user experience
}

//image preview before upload
function handleFiles(files, update) {
	var file = files[0];
	var imageType = /image.*/;     
	if (file.type.match(imageType)) {
		var img = document.createElement("img");
		if(update==1){
			var	preview = document.getElementById("update_pic_upload");
		}
		else{
			var	preview = document.getElementById("pic_upload");
		}
		img.classList.add("prev_img");
		img.file = file;
		preview.insertBefore(img, preview.firstChild);		 
		var reader = new FileReader();
		reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
		reader.readAsDataURL(file);
	}
}

//create supplier
function getForm(opt){
	var xhr;
	var url="include/method.php?getForm=1&opt="+opt+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){			
			var data=xhr.responseText;
			if(opt=="SalesOrder"){
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='saveEntry(this.title)' id='checkout'>Sell</button>"+
					"<button class='cpanel_button' title='"+opt+"' onclick='cancel(this.title)' id='cancel_but'>Cancel</button>";
			}
			else{
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='saveEntry(this.title)' id='checkout'>Save</button>"+
					"<button class='cpanel_button' title='"+opt+"' onclick='cancel(this.title)' id='cancel_but'>Cancel</button>";
			}
			document.getElementById("cpanel_inner_main_main").innerHTML=data;			
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			switch(opt){
				case "Product":
				var fileSelect = document.getElementById("pic_upload");
				var	fileElem = document.getElementById("file_upload_field");
				fileSelect.addEventListener("click", function (e) {
				  if (fileElem) {
					fileElem.click();
				  }
				  e.preventDefault(); // prevent navigation to "#"
				}, false);
				break;
				case "User":
				var fileSelect = document.getElementById("pic_upload");
				var	fileElem = document.getElementById("file_upload_field");
				fileSelect.addEventListener("click", function (e) {
				  if (fileElem) {
					fileElem.click();
				  }
				  e.preventDefault(); // prevent navigation to "#"
				}, false);
				break;
				case "PurchaseOrder":
				var po_subt=document.getElementById("po_subt").innerHTML="0.00";//subtotals field initialised with trailing zero labels
				var po_tax=document.getElementById("po_tax").innerHTML="0.00";//tax totals field initialised with trailing zero labels
				var po_tot=document.getElementById("po_tot").innerHTML="0.00";//order totals field initialised with trailing zero labels
				//a return false is added because this button is part of the form and so refreshes the page!
				var p_opt_cont=document.createElement("div");//create a div to hold the options for the purchase order such as the status
				p_opt_cont.setAttribute("id", "p_opt_cont");
				var add_itm=document.createElement("div");//div to hold add item button
				add_itm.setAttribute("id", "add_itm");
				add_itm.innerHTML="<button class='cpanel_button' title='"+opt+"' onclick='itmForm(this.title); return false;'>Item</button>";//button added
				var sup_sel=document.createElement("div");//supplier select dropdown container
				sup_sel.setAttribute("id", "sup_sel");
				sup_sel.innerHTML=document.getElementById("sup_sel_div").innerHTML;//supplier select drop down fetched
				p_opt_cont.appendChild(sup_sel);//supplier select dropdown container added to po options container
				p_opt_cont.appendChild(add_itm);//add item button container added to po options container
				var form_wrapper=document.getElementById("form_wrapper");
				document.getElementById("cpanel_inner_main_main").insertBefore(p_opt_cont, form_wrapper);//prepend options to main container
				///////////////////////////////////////
				break;
				case "SalesOrder":
				var po_subt=document.getElementById("po_subt").innerHTML="0.00";//subtotals field initialised with trailing zero labels
				var po_tax=document.getElementById("po_tax").innerHTML="0.00";//tax totals field initialised with trailing zero labels
				var po_tot=document.getElementById("po_tot").innerHTML="0.00";//order totals field initialised with trailing zero labels
				//a return false is added because this button is part of the form and so refreshes the page!
				var p_opt_cont=document.createElement("div");//create a div to hold the options for the purchase order such as the status
				p_opt_cont.setAttribute("id", "p_opt_cont");
				var add_itm=document.createElement("div");//div to hold add item button
				add_itm.setAttribute("id", "add_itm");
				add_itm.innerHTML="<button class='cpanel_button' title='"+opt+"' onclick='itmForm(this.title); return false;'>Item</button>";//button added
				var sup_sel=document.createElement("div");//supplier select dropdown container
				sup_sel.setAttribute("id", "sup_sel");
				sup_sel.innerHTML=document.getElementById("sup_sel_div").innerHTML;//supplier select drop down fetched
				p_opt_cont.appendChild(sup_sel);//supplier select dropdown container added to po options container
				p_opt_cont.appendChild(add_itm);//add item button container added to po options container
				var form_wrapper=document.getElementById("form_wrapper");
				document.getElementById("cpanel_inner_main_main").insertBefore(p_opt_cont, form_wrapper);//prepend options to main container
				///////////////////////////////////////
				break;
			}
		}
	}
	xhr.send(null);
}

//save supplier
function saveEntry(opt){
	switch(opt){
		case "PurchaseOrder":
		window.print();//first print and then save
		//variable declarations
		var xhr;
		var fd;
		var url="include/method.php?saveEntry=1&opt="+opt+"";
		var ref=document.getElementById("ref").innerHTML;
		var cust=document.getElementById("cust_name").value;
		var sbt=document.getElementById("po_subt").childNodes.item(0).data;
		var tax=document.getElementById("po_tax").childNodes.item(0).data;
		var tot=document.getElementById("po_tot").childNodes.item(0).data;
		var term=document.getElementById("comm").value;
		//getting the item values from their dynamic table
		var itm_det=new Array();//array to hold the values from each row
		var itmtbl=document.getElementById("tbody");
		var itm_rows=itmtbl.rows.length;//number of rows in the item table
		for(var i=0; i<itm_rows; i++){//for every row
			for(var j=0; j<6; j++){//for every cell except the last one that holds the delete buttons (red x's)
				var _tr=itmtbl.rows[i];//current row
				var _td=_tr.cells[j];//column we want
				var _txtnode=_td.childNodes.item(0);//access to the cell data holder
				var _val=_txtnode.data;//get data of cell
				if(j==2){
					var _val=parseFloat(_txtnode.data);//slash units from quantity
				}
				itm_det.push(_val);//insert each value into array
			}
			itm_det.push('/');//row separator character. THANK YOU JESUS. At this point attach the array to form data for sending to php where further processing is done
		}
		fd="ref="+ref+"&supp="+cust+"&sbt="+sbt+"&tax="+tax+"&tot="+tot+"&term="+term+"&itmtbl="+itm_det+"";
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				var data=xhr.responseText;
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				fetchEntry(opt);
			}
		}
		xhr.send(fd);
		break;
		case "SalesOrder":
		msg_dialog.render();
		break;
		case "Product":
		//variable declarations
		var xhr;
		var url="include/method.php?saveEntry=1&opt="+opt+"";
		var fd=new FormData(document.forms.namedItem("entry_form"));
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.onload=function(){
			if(xhr.status==200){
				var data=xhr.responseText;
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				document.getElementById("cpanel_inner_main_options_options").innerHTML+="<input type='text' name='qk_search' id='qk_search' placeholder='Search for an Item' title='"+opt+"' onkeyup='searchEntry(this.title)' />";
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				fetchEntry(opt);
			}
		}
		xhr.send(fd);
		break;
		case "User":
		//variable declarations
		var xhr;
		var url="include/method.php?saveEntry=1&opt="+opt+"";
		var fd=new FormData(document.forms.namedItem("entry_form"));
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.onload=function(){
			if(xhr.status==200){
				var data=xhr.responseText;
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				fetchEntry(opt);
			}
		}
		xhr.send(fd);
		break;
	}
}

//display list of suppliers
function fetchEntry(opt){
	document.getElementById("cpanel_inner_main_main").innerHTML="Loading...";
	var xhr;
	var url="include/method.php?fetchEntry=1&opt="+opt+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("cpanel_inner_main_main").innerHTML="";
			//var data=xhr.responseText;
			//document.getElementById("cpanel_inner_main_main").innerHTML=data
			var data=JSON.parse(xhr.responseText);
			switch(opt){
			case "User":
			///*
			for(var i in data){
				var id=data[i].id;
				document.getElementById("cpanel_inner_main_main").innerHTML+="<div class='return_data'>"+
					"<div class='return_data_img'><a href='' title='"+opt+"' id='"+id+"' onclick='moreInfo(this.id, this.title); return false;'>"+
					"<img src='"+data[i].pic+"' />"+"</a></div>"+
					"<div class='return_data_info'>"+
						"<div>"+"<a href='' title='"+opt+"' id='"+id+"' onclick='moreInfo(this.id, this.title); return false;'>"+data[i].name+"</a>"+"</div>"+
						"<div class='phone'>"+data[i].unm+"</div>"+
						"<div class='email'>"+data[i].level+"</div>"+
					"</div>"+
				"</div>";
			}
			//*/
			break;
			case "Product":
			var url=document.URL;
			url=url.split("=");
			url=url[0];
			var tbl=document.createElement("table");
			var tblhead=document.createElement("thead");
			var tblbody=document.createElement("tbody");
			tbl.setAttribute("class", "wide");
			//create column labels
			for(var k=0; k<4; k++){
				var col_label=document.createElement("th");
				if(k==0){
					var celltext=document.createTextNode("Item Name");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==1){
					var celltext=document.createTextNode("Quantity");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==2){
					var celltext=document.createTextNode("Unit");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==3){
					var celltext=document.createTextNode("Unit Price (UGX)");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
			}
			for(var i in data){//create rows
				var id=data[i].id;
				var cat=data[i].cat;
				var row=document.createElement("tr");
				//get a way of making the rows clickable to redirect to the specific item's 'more details' option
				//var row_link=document.createElement("a");
				//row_link.setAttribute("href", ""+url+"="+cat+"");
				//row_link.setAttribute("onclick", "document.location=this.href;");
				/*just fetch the info from itm table instead*/
				row.setAttribute("id", ""+id+"");
				row.setAttribute("title", ""+opt+"");
				row.setAttribute("onclick", "moreInfo(this.id, this.title);");
				//create cells
				for(var j=0; j<4; j++){
					var cell=document.createElement("td");
					if(j==0){
						var celltext=document.createTextNode(data[i].name);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==1){
						var qty=document.createTextNode(data[i].qty);
						cell.appendChild(qty);
						row.appendChild(cell);
					}
					if(j==2){
						var celltext=document.createTextNode(data[i].units);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==3){
						var celltext=document.createTextNode(data[i].price);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
				}
				tblbody.appendChild(row);
			}
			tbl.appendChild(tblhead);
			tbl.appendChild(tblbody);
			document.getElementById("cpanel_inner_main_main").appendChild(tbl);
			break;
			case "PurchaseOrder":
			//var url=document.URL;
			//url=url.split("=");
			//url=url[0];
			var tbl=document.createElement("table");
			var tblhead=document.createElement("thead");
			var tblbody=document.createElement("tbody");
			tbl.setAttribute("class", "wide");
			//create column labels
			for(var k=0; k<4; k++){
				var col_label=document.createElement("th");
				if(k==0){
					var celltext=document.createTextNode("Reference");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==1){
					var celltext=document.createTextNode("Order Date");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==2){
					var celltext=document.createTextNode("Supplier");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==3){
					var celltext=document.createTextNode("Total");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
			}
			for(var i in data){//create rows
				///////
				var date=data[i].date;//alert(date);//get day of week it was when that record was made. we are interested in monday - start of a new week
				var prev=data[i].prev; //alert(date+" "+prev);
				//var last="rec"+((data[i].num_rec)-1);
				//////
				var id=data[i].id;
				var cat=data[i].cat;
				var row=document.createElement("tr");
				//get a way of making the rows clickable to redirect to the specific item's 'more details' option
				//var row_link=document.createElement("a");
				//row_link.setAttribute("href", ""+url+"="+cat+""); --why was it returning cat as Input all the time? and would return Input undefined
				//if used as an argument for fn: moreinf()? the id also returned water's each time if i tried to get moreInfo by the item type table?!!!!
				//row_link.setAttribute("onclick", "document.location=this.href;");
				/*just fetch the info from itm table instead*/
				row.setAttribute("id", ""+id+"");
				row.setAttribute("title", ""+opt+"");
				row.setAttribute("onclick", "moreInfo(this.id, this.title);");
				//create cells
				for(var j=0; j<4; j++){
					var cell=document.createElement("td");
					if(j==0){
						var celltext=document.createTextNode(data[i].ref);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==1){
						var celltext=document.createTextNode(date);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==2){
						var celltext=document.createTextNode(data[i].supp);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==3){
						var celltext=document.createTextNode(data[i].tot);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
				}
				tblbody.appendChild(row);
				if(date!=prev){//we check different dates here
					var close_tot=document.createElement("tr");
					close_tot.setAttribute("class", "close_tot");
					//alert(date+" "+prev);
					var num_rows=tblbody.rows.length;
					var col_tot=0;//initialise total value
					for(var r=0; r<num_rows; r++){
						var this_tr=tblbody.rows[r];//current row
						
						var el_td_rw=this_tr.cells[0];//eliminate row with this column value
						var el_td_rw_txtnode=el_td_rw.childNodes.item(0);//access to the cell data holder
						var el_td_rw_val=el_td_rw_txtnode.data;
						
						var this_td=this_tr.cells[3];//column we want
						var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
						var cel_val=this_txtnode.data;
						if(cel_val!=""){//take care of empty cells
							var cel_val=parseFloat(cel_val);//without parseFloat(), or parseInt() the values are just concatenated because they are strings
							col_tot+=cel_val;
							if(el_td_rw_val=="Daily Total Purchases"){
								col_tot=0;//set total to zero when you meet this totals row, so that you don't have to repeat it! THANK YOU JESUS
							}
						}
					}
					///////////////////
					for(var j=0; j<4; j++){
						var cell=document.createElement("td");
						if(j==0){
							var celltext=document.createTextNode("Daily Total Purchases");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==1){
							var celltext=document.createTextNode(date);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==2){
							var celltext=document.createTextNode("");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==3){
							cell.setAttribute("class", "cls_tot");
							var celltext=document.createTextNode(col_tot);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
					}
					tblbody.appendChild(close_tot);//closing balance row
				}
			}
			tbl.appendChild(tblhead);
			tbl.appendChild(tblbody);
			document.getElementById("cpanel_inner_main_main").appendChild(tbl);
			break;
			
			case "SalesOrder":
			//var url=document.URL;
			//url=url.split("=");
			//url=url[0];
			var tbl=document.createElement("table");
			var tblhead=document.createElement("thead");
			var tblbody=document.createElement("tbody");
			tbl.setAttribute("class", "wide");
			//create column labels
			for(var k=0; k<4; k++){
				var col_label=document.createElement("th");
				if(k==0){
					var celltext=document.createTextNode("Reference");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==1){
					var celltext=document.createTextNode("Order Date");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==2){
					var celltext=document.createTextNode("Customer");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==3){
					var celltext=document.createTextNode("Total");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
			}
			for(var i in data){//create rows
				///////
				var date=data[i].date;//alert(date);//get day of week it was when that record was made. we are interested in monday - start of a new week
				var prev=data[i].prev; //alert(date+" "+prev);
				//var last="rec"+((data[i].num_rec)-1);
				//////
				var id=data[i].id;
				var cat=data[i].cat;
				var row=document.createElement("tr");
				//get a way of making the rows clickable to redirect to the specific item's 'more details' option
				//var row_link=document.createElement("a");
				//row_link.setAttribute("href", ""+url+"="+cat+""); --why was it returning cat as Input all the time? and would return Input undefined
				//if used as an argument for fn: moreinf()? the id also returned water's each time if i tried to get moreInfo by the item type table?!!!!
				//row_link.setAttribute("onclick", "document.location=this.href;");
				/*just fetch the info from itm table instead*/
				row.setAttribute("id", ""+id+"");
				row.setAttribute("title", ""+opt+"");
				row.setAttribute("onclick", "moreInfo(this.id, this.title);");
				//create cells
				for(var j=0; j<4; j++){
					var cell=document.createElement("td");
					if(j==0){
						var celltext=document.createTextNode(data[i].ref);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==1){
						var celltext=document.createTextNode(date);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==2){
						var celltext=document.createTextNode(data[i].supp);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==3){
						var celltext=document.createTextNode(data[i].tot);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
				}
				tblbody.appendChild(row);
				if(date!=prev){//we check different dates here
					var close_tot=document.createElement("tr");
					close_tot.setAttribute("class", "close_tot");
					//alert(date+" "+prev);
					var num_rows=tblbody.rows.length;
					var col_tot=0;//initialise total value
					for(var r=0; r<num_rows; r++){
						var this_tr=tblbody.rows[r];//current row
						
						var el_td_rw=this_tr.cells[0];//eliminate row with this column value
						var el_td_rw_txtnode=el_td_rw.childNodes.item(0);//access to the cell data holder
						var el_td_rw_val=el_td_rw_txtnode.data;
						
						var this_td=this_tr.cells[3];//column we want
						var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
						var cel_val=this_txtnode.data;
						if(cel_val!=""){//take care of empty cells
							var cel_val=parseFloat(cel_val);//without parseFloat(), or parseInt() the values are just concatenated because they are strings
							col_tot+=cel_val;
							if(el_td_rw_val=="Daily Total Sales"){
								col_tot=0;//set total to zero when you meet this totals row, so that you don't have to repeat it! THANK YOU JESUS
							}
						}
					}
					///////////////////
					for(var j=0; j<4; j++){
						var cell=document.createElement("td");
						if(j==0){
							var celltext=document.createTextNode("Daily Total Sales");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==1){
							var celltext=document.createTextNode(date);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==2){
							var celltext=document.createTextNode("");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==3){
							cell.setAttribute("class", "cls_tot");
							var celltext=document.createTextNode(col_tot);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
					}
					tblbody.appendChild(close_tot);//closing balance row
				}
			}
			tbl.appendChild(tblhead);
			tbl.appendChild(tblbody);
			document.getElementById("cpanel_inner_main_main").appendChild(tbl);
			break;
			}
		}
	}
	xhr.send(null);
}

//get option links
function fetchLinks(opt){
	var xhr;
	var url="include/method.php?fetchLinks=1&opt="+opt+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("cpanel_inner_left_links").innerHTML="";
			var data=xhr.responseText;
			document.getElementById("cpanel_inner_left_links").innerHTML=data
		}
	}
	xhr.send(null);
}

//fetch more information about supplier
function moreInfo(infoId, opt){
	var xhr;
	var url="include/method.php?moreInfo=1&id="+infoId+"&opt="+opt+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){			
			document.getElementById("cpanel_inner_main_main").innerHTML="";
			//document.getElementById("cpanel_inner_main_main").innerHTML=xhr.responseText;
			var data=JSON.parse(xhr.responseText);
			switch(opt){
			case "Product":
			var id=data.id;
			var buttons="<button class='cpanel_button' title='"+opt+"' id='"+id+"' onclick='editEntry(this.id, this.title);'>Edit</button>"+
			"<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
			buttons+="<li class='cpanel_button'>More<span class='info_down_arrow'>&#x25BC;</span>"+
				"<ul class='more_info_opts'>"+
					"<li>"+"Account"+"</li>"+
					"<li title='"+opt+"' id='"+id+"' onclick='conf(this.id, this.title);'>"+"Delete"+"</li>"+
				"</ul>"+
			"</li>";
			buttons+="<li class='cpanel_button'>Export<span class='info_down_arrow'>&#x25BC;</span>"+
				"<ul class='more_info_opts'>"+
					"<li onclick='window.print();'>"+"Print"+"</li>"+
					"<li>"+"Excel"+"</li>"+
					"<li>"+"PDF"+"</li>"+
				"</ul>"+
			"</li>";
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			//////////////info_box/////////
			var info_box_img=document.createElement("div");
			info_box_img.setAttribute("class", "info_box_img");
			info_box_img.innerHTML="<img src='"+data.pic+"' />";
			
			var l_dat=document.createElement("span");
			l_dat.setAttribute("id", "l_dat");
			l_dat.innerHTML=data.date;
			
			var info_box_name=document.createElement("div");
			info_box_name.setAttribute("class", "info_box_name");
			info_box_name.innerHTML=data.name;
			info_box_name.appendChild(l_dat);
			
			var ple=document.createElement("table");//ledger account
			ple.setAttribute("class", "itm_tbl");
			var ple_head=document.createElement("thead");
			var ple_body=document.createElement("tbody");
			ple_body.setAttribute("id", "ple_body");//
			for(var k=0; k<6; k++){//text nodes for the th elements - column labels
				var ple_th=document.createElement("th");
				if(k==0){
					var txt=document.createTextNode("Date");
					ple_th.appendChild(txt);
					ple_head.appendChild(ple_th);
				}
				if(k==1){
					var txt=document.createTextNode("Particulars");
					ple_th.appendChild(txt);
					ple_head.appendChild(ple_th);
				}
				if(k==2){
					var txt=document.createTextNode("Vch Type");
					ple_th.appendChild(txt);
					ple_head.appendChild(ple_th);
				}
				if(k==3){
					var txt=document.createTextNode("Vch No.");
					ple_th.appendChild(txt);
					ple_head.appendChild(ple_th);
				}
				if(k==4){
					var txt=document.createTextNode("Debit");
					ple_th.appendChild(txt);
					ple_head.appendChild(ple_th);
				}
				if(k==5){
					var txt=document.createTextNode("Credit");
					ple_th.appendChild(txt);
					ple_head.appendChild(ple_th);
				}
			}
			plAcc(id, opt);//get account information
			//this function call has actually referenced the tbody id[ple_body]! wow!
			ple.appendChild(ple_head);
			ple.appendChild(ple_body);//THE LORD'S FAVOUR!
			
			var more_acc=document.createElement("div");
			more_acc.setAttribute("id", "more_acc");
			more_acc.appendChild(ple);//ledger table here
			
			/////////////table/////////////
			var more_info=document.createElement("table");
			more_info.setAttribute("class", "more_info");
			var more_info_body=document.createElement("tbody");
			for(var i=0; i<3; i++){//text nodes for the tr elements - row labels
				var more_info_row=document.createElement("tr");
				if(i==0){//first row : unit price
					for(var j=0; j<2; j++){//cells
						var more_info_row_cell=document.createElement("td");
						if(j==0){
							more_info_row_cell.setAttribute("class", "info_box_label");
							var txt=document.createTextNode("Current Price");
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode("UGX "+data.price);
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
					}
					more_info_body.appendChild(more_info_row);
				}
				if(i==1){//Second row: available
					for(var j=0; j<2; j++){//cells
						var more_info_row_cell=document.createElement("td");
						if(j==0){
							more_info_row_cell.setAttribute("class", "info_box_label");
							var txt=document.createTextNode("Quantity Available");
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(data.qty+" "+data.units);
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
					}
					more_info_body.appendChild(more_info_row);
				}
				if(i==2){//third row : unit of measure
					for(var j=0; j<2; j++){//cells
						var more_info_row_cell=document.createElement("td");
						if(j==0){
							more_info_row_cell.setAttribute("class", "info_box_label");
							var txt=document.createTextNode("Unit of Measure");
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(data.units);
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
					}
					more_info_body.appendChild(more_info_row);
				}
			}
			more_info.appendChild(more_info_body);
			/////////////end of table/////////////
			var info_box_info=document.createElement("div");
			info_box_info.setAttribute("class", "info_box_info");
			info_box_info.appendChild(info_box_name);
			info_box_info.appendChild(more_info);//this is the item details table - we are going to extend it horizontally (more td's in those 3 rows!)
			
			var more_bio=document.createElement("div");
			more_bio.setAttribute("class", "more_bio");
			more_bio.appendChild(info_box_img);
			more_bio.appendChild(info_box_info);
			
			var info_box_spacer=_("div");
			info_box_spacer.setAttribute("class", "spacer");
			
			var info_box=document.createElement("div");
			info_box.setAttribute("class", "info_box");
			info_box.appendChild(more_bio);
			info_box.appendChild(more_acc);
			info_box.appendChild(info_box_spacer);
			
			document.getElementById("cpanel_inner_main_main").appendChild(info_box);
			////some dynamic stuff here
			var get_img_width=info_box_img.offsetWidth;//setting dynamic height for the image container! This is also its height//HALLELUJAH!!!!!!! PRAISE BE TO JESUS
			//offsetWidth includes borders while clientWidth does not
			info_box_img.style.height=get_img_width+"px";//GOD IS ABLE. HOSSANAH!
			var tbl_top_pos=more_info.offsetTop;
			var rem_img_ht=get_img_width-(tbl_top_pos+more_info.offsetHeight);//remaining height to spread table through
			var more_info_td=more_info.getElementsByTagName("td");
			for(var i=0;  i<more_info_td.length; i++){//use of "var i in " syntax creates an error
				more_info_td[i].style.padding=(rem_img_ht/6)+"px";
			}
			////////
			break;
			
			case "User":
			var id=data.id;
			var buttons="<button class='cpanel_button' title='"+opt+"' id='"+id+"' onclick='editEntry(this.id, this.title);'>Edit</button>"+
			"<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
			buttons+="<li class='cpanel_button'>More<span class='info_down_arrow'>&#x25BC;</span>"+
				"<ul class='more_info_opts'>"+
					"<li>"+"Account"+"</li>"+
					"<li title='"+opt+"' id='"+id+"' onclick='conf(this.id, this.title);'>"+"Delete"+"</li>"+
				"</ul>"+
			"</li>";
			buttons+="<li class='cpanel_button'>Export<span class='info_down_arrow'>&#x25BC;</span>"+
				"<ul class='more_info_opts'>"+
					"<li onclick='window.print();'>"+"Print"+"</li>"+
					"<li>"+"Excel"+"</li>"+
					"<li>"+"PDF"+"</li>"+
				"</ul>"+
			"</li>";
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			//////////////info_box/////////
			var info_box_img=document.createElement("div");
			info_box_img.setAttribute("class", "info_box_img");
			info_box_img.innerHTML="<img src='"+data.pic+"' />";
			
			var l_dat=document.createElement("span");
			l_dat.setAttribute("id", "l_dat");
			l_dat.innerHTML=data.date;
			
			var info_box_name=document.createElement("div");
			info_box_name.setAttribute("class", "info_box_name");
			info_box_name.innerHTML=data.name;
			info_box_name.appendChild(l_dat);			
			/////////////table/////////////
			var more_info=document.createElement("table");
			more_info.setAttribute("class", "more_info");
			var more_info_body=document.createElement("tbody");
			for(var i=0; i<2; i++){//text nodes for the tr elements - row labels
				var more_info_row=document.createElement("tr");
				if(i==0){//first row : unit price
					for(var j=0; j<2; j++){//cells
						var more_info_row_cell=document.createElement("td");
						if(j==0){
							more_info_row_cell.setAttribute("class", "info_box_label");
							var txt=document.createTextNode("Username");
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(data.unm);
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
					}
					more_info_body.appendChild(more_info_row);
				}
				if(i==1){//Second row: available
					for(var j=0; j<2; j++){//cells
						var more_info_row_cell=document.createElement("td");
						if(j==0){
							more_info_row_cell.setAttribute("class", "info_box_label");
							var txt=document.createTextNode("Level");
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(data.level);
							more_info_row_cell.appendChild(txt);
							more_info_row.appendChild(more_info_row_cell);
						}
					}
					more_info_body.appendChild(more_info_row);
				}
			}
			more_info.appendChild(more_info_body);
			/////////////end of table/////////////
			var info_box_info=document.createElement("div");
			info_box_info.setAttribute("class", "info_box_info");
			info_box_info.appendChild(info_box_name);
			info_box_info.appendChild(more_info);
			
			var more_bio=document.createElement("div");
			more_bio.setAttribute("class", "more_bio");
			more_bio.appendChild(info_box_img);
			more_bio.appendChild(info_box_info);
			
			var info_box_spacer=_("div");
			info_box_spacer.setAttribute("class", "spacer");
			
			var info_box=document.createElement("div");
			info_box.setAttribute("class", "info_box");
			info_box.appendChild(more_bio);
			info_box.appendChild(info_box_spacer);
			
			document.getElementById("cpanel_inner_main_main").appendChild(info_box);
			break;
			case "PurchaseOrder":
			//document.getElementById("cpanel_inner_main_main").innerHTML=xhr.responseText;
			for(var i in data){
				var ref=data[i].ref;//pick the ref # this value changes not in all the returned rows
				var sname=data[i].sname;
				var date=data[i].date;
				var tax=data[i].tax;
				var osbt=data[i].osbt;
				var tot=data[i].tot;
				var term=data[i].term;
				var level=data[i].level;
				var sta=data[i].sta;
				var oid=data[i].oid;
			}
			if(level=="1"){//admins
				var buttons="<button class='cpanel_button' title='"+opt+"' id='"+oid+"' name='"+sta+"' onclick='editEntry(this.id, this.title, this.name);'>Edit</button>";
				buttons+="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				buttons+="<li class='cpanel_button'>More<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li>"+"Invoice"+"</li>"+
						"<li>"+"Mail"+"</li>"+
						"<li>"+"Contacts"+"</li>"+
						"<li title='"+opt+"' id='"+oid+"' onclick='conf(this.id, this.title);'>"+"Delete"+"</li>"+
					"</ul>"+
				"</li>";
				buttons+="<li class='cpanel_button'>Export<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li onclick='window.print();'>"+"Print"+"</li>"+
						"<li>"+"Excel"+"</li>"+
						"<li>"+"PDF"+"</li>"+
					"</ul>"+
				"</li>";
			}
			else{//tellers
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				buttons+="<li class='cpanel_button'>More<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li>"+"Invoice"+"</li>"+
						"<li>"+"Mail"+"</li>"+
						"<li>"+"Contacts"+"</li>"+
					"</ul>"+
				"</li>";
				buttons+="<li class='cpanel_button'>Export<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li onclick='window.print();'>"+"Print"+"</li>"+
						"<li>"+"Excel"+"</li>"+
						"<li>"+"PDF"+"</li>"+
					"</ul>"+
				"</li>";
			}
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			//pick values
			/////ELEMENT CREATION/////////////////////////////
			var p_opt_cont=document.createElement("div");//create a div to hold the options for the purchase order such as the status
			p_opt_cont.setAttribute("id", "p_opt_cont");
			//////STATUS DISPLAYED//////////////
			var form_wrapper=document.createElement("div");
			form_wrapper.setAttribute("id", "form_wrapper");//main container NB: This exactly the PO creation form, just recreated with minor differences
			var form_title=document.createElement("div");//title
			form_title.setAttribute("id", "form_title"); form_title.innerHTML="Purchase Order ";
			var ref_cont=document.createElement("span");//holds reference number
			ref_cont.setAttribute("id", "ref"); ref_cont.innerHTML=ref;//add reference number to span element
			form_title.appendChild(ref_cont);
			var o_date=document.createElement("div");//order date
			o_date.setAttribute("id", "o_date"); o_date.innerHTML=date;
			var supp_name=document.createElement("div");//supplier name
			supp_name.setAttribute("id", "supp_name"); supp_name.innerHTML=sname;
			////////////items table creation///////////////////
			var itm_tbl=document.createElement("table");
			itm_tbl.setAttribute("class", "itm_tbl");
			var itm_tbl_head=document.createElement("thead");
			var itm_tbl_body=document.createElement("tbody");
			for(var k=0; k<5; k++){//text nodes for the th elements - column labels
				var itm_tbl_th=document.createElement("th");
				if(k==0){
					var txt=document.createTextNode("Item");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==1){
					var txt=document.createTextNode("Description");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==2){
					var txt=document.createTextNode("Qty");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==3){
					var txt=document.createTextNode("Unit Price");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==4){
					var txt=document.createTextNode("Subtotal");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
			}
			for(var i in data){//create rows to insert into table
				var iid=data[i].iid;//this id is from the product table - not the poitm table - THANK YOU JESUS
				if(iid!=null){
					var itm_tbl_body_row=document.createElement("tr");
					itm_tbl_body_row.setAttribute("id", iid);
					itm_tbl_body_row.addEventListener("click", function(e){moreInfo(this.id, "Product"); e.preventDefault();}, false);//thank you, JESUS
					for(var j=0; j<5; j++){//text nodes for the td elements - real data into the rows
						var itm_tbl_td=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode(data[i].itm);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==1){
							var txt=document.createTextNode(data[i].des);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==2){
							var txt=document.createTextNode(data[i].qty);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==3){
							var txt=document.createTextNode(data[i].upr);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==4){
							var txt=document.createTextNode(data[i].isbt);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
					}
					itm_tbl_body.appendChild(itm_tbl_body_row);//row attached to body
				}
			}
			itm_tbl.appendChild(itm_tbl_head);//attach column labels to table
			itm_tbl.appendChild(itm_tbl_body);//attach rows
			/////////////////////////////
			//////////totals///////////////
			var form_totals=document.createElement("div");//totals container
			form_totals.setAttribute("id", "form_totals");
			var itm_tbl_totals=document.createElement("table");//totals table
			itm_tbl_totals.setAttribute("id", "itm_tbl_totals");
			var itm_tbl_totals_tbody=document.createElement("tbody");
			itm_tbl_totals_tbody.setAttribute("id", "itm_tbl_totals_tbody");
			for(var i=0; i<3; i++){//totals table rows
				var itm_tbl_totals_row=document.createElement("tr");
				if(i==0){//first row : untaxed amount
					for(var j=0; j<2; j++){//cels
						var itm_tbl_totals_row_cell=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode("Untaxed Amount (UGX)");
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(osbt);
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
					}
					itm_tbl_totals_tbody.appendChild(itm_tbl_totals_row);
				}
				if(i==1){//second row : taxes total
					for(var j=0; j<2; j++){//cels
						var itm_tbl_totals_row_cell=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode("Taxes (UGX)");
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(tax);
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
					}
					itm_tbl_totals_tbody.appendChild(itm_tbl_totals_row);
				}
				if(i==2){//third row : untaxed amount
					itm_tbl_totals_row.setAttribute("id", "total");
					for(var j=0; j<2; j++){//cels
						var itm_tbl_totals_row_cell=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode("Total (UGX)");
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(tot);
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
					}
					itm_tbl_totals_tbody.appendChild(itm_tbl_totals_row);
				}
			}
			itm_tbl_totals.appendChild(itm_tbl_totals_tbody);
			form_totals.appendChild(itm_tbl_totals);
			/////////////////////////
			
			var form_wrapper_spacer=document.createElement("div");
			form_wrapper_spacer.setAttribute("class", "spacer");
			
			var form_itm=document.createElement("div");//form items table wrapper
			form_itm.setAttribute("id", "form_itm");
			form_itm.appendChild(itm_tbl);
			var form_comm=document.createElement("div");//comments area
			form_comm.setAttribute("id", "form_comm");
			form_comm.innerHTML=term;
			//////////////APPENDAGES TO MAIN CONTAINER//////////////////////
			form_wrapper.appendChild(form_title);//add title
			form_wrapper.appendChild(o_date);//add date
			form_wrapper.appendChild(supp_name);//add supplier name
			form_wrapper.appendChild(form_itm);//add items table wrapper
			form_wrapper.appendChild(form_totals);//add totals table wrapper
			form_wrapper.appendChild(form_comm);//add totals table wrapper
			form_wrapper.appendChild(form_wrapper_spacer);
			document.getElementById("cpanel_inner_main_main").appendChild(form_wrapper);//attach main cont to document (main_main to be specific)
			document.getElementById("cpanel_inner_main_main").insertBefore(p_opt_cont, form_wrapper);//prepend options to main container
			break;
			
			case "SalesOrder":
			//document.getElementById("cpanel_inner_main_main").innerHTML=xhr.responseText;
			for(var i in data){
				var ref=data[i].ref;//pick the ref # this value changes not in all the returned rows
				var sname=data[i].sname;
				var date=data[i].date;
				var tax=data[i].tax;
				var osbt=data[i].osbt;
				var tot=data[i].tot;
				var term=data[i].term;
				var level=data[i].level;
				var teller=data[i].teller;
				var sta=data[i].sta;
				var oid=data[i].oid;
			}
			if(level=="1"){//admins
				var buttons="<button class='cpanel_button' title='"+opt+"' id='"+oid+"' name='"+sta+"' onclick='editEntry(this.id, this.title, this.name);'>Edit</button>";
				buttons+="<span class='but' id='pos_but' title='"+opt+"' onclick='getForm(this.title)'>Point of Sale</span>";
				buttons+="<li class='cpanel_button'>More<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li>"+"Invoice"+"</li>"+
						"<li>"+"Mail"+"</li>"+
						"<li>"+"Contacts"+"</li>"+
						"<li title='"+opt+"' id='"+oid+"' onclick='conf(this.id, this.title);'>"+"Delete"+"</li>"+
					"</ul>"+
				"</li>";
				buttons+="<li class='cpanel_button'>Export<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li onclick='window.print();'>"+"Print"+"</li>"+
						"<li>"+"Excel"+"</li>"+
						"<li>"+"PDF"+"</li>"+
					"</ul>"+
				"</li>";
			}
			else{//tellers
				var buttons="<span class='but' id='pos_but' title='"+opt+"' onclick='getForm(this.title)'>Point of Sale</span>";
				buttons+="<li class='cpanel_button'>More<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li>"+"Invoice"+"</li>"+
						"<li>"+"Mail"+"</li>"+
						"<li>"+"Contacts"+"</li>"+
					"</ul>"+
				"</li>";
				buttons+="<li class='cpanel_button'>Export<span class='info_down_arrow'>&#x25BC;</span>"+
					"<ul class='more_info_opts'>"+
						"<li onclick='window.print();'>"+"Print"+"</li>"+
						"<li>"+"Excel"+"</li>"+
						"<li>"+"PDF"+"</li>"+
					"</ul>"+
				"</li>";
			}
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			//pick values
			/////ELEMENT CREATION/////////////////////////////
			var p_opt_cont=document.createElement("div");//create a div to hold the options for the purchase order such as the status
			p_opt_cont.setAttribute("id", "p_opt_cont");
			//////STATUS DISPLAYED//////////////
			var form_wrapper=document.createElement("div");
			form_wrapper.setAttribute("id", "form_wrapper");//main container NB: This exactly the PO creation form, just recreated with minor differences
			var form_title=document.createElement("div");//title
			form_title.setAttribute("id", "form_title"); form_title.innerHTML="Sales Order ";
			var ref_cont=document.createElement("span");//holds reference number
			ref_cont.setAttribute("id", "ref"); ref_cont.innerHTML=ref;//add reference number to span element
			form_title.appendChild(ref_cont);
			var o_date=document.createElement("div");//order date
			o_date.setAttribute("id", "o_date"); o_date.innerHTML=date;
			var supp_name=document.createElement("div");//supplier name
			supp_name.setAttribute("id", "supp_name"); supp_name.innerHTML=sname;
			var teller_name=document.createElement("div");//supplier name
			teller_name.setAttribute("id", "teller_name"); teller_name.innerHTML="You were served by: "+teller;
			////////////items table creation///////////////////
			var itm_tbl=document.createElement("table");
			itm_tbl.setAttribute("class", "itm_tbl");
			var itm_tbl_head=document.createElement("thead");
			var itm_tbl_body=document.createElement("tbody");
			for(var k=0; k<5; k++){//text nodes for the th elements - column labels
				var itm_tbl_th=document.createElement("th");
				if(k==0){
					var txt=document.createTextNode("Item");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==1){
					var txt=document.createTextNode("Description");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==2){
					var txt=document.createTextNode("Qty");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==3){
					var txt=document.createTextNode("Unit Price");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
				if(k==4){
					var txt=document.createTextNode("Subtotal");
					itm_tbl_th.appendChild(txt);
					itm_tbl_head.appendChild(itm_tbl_th);
				}
			}
			for(var i in data){//create rows to insert into table
				var iid=data[i].iid;
				if(iid!=null){
					var itm_tbl_body_row=document.createElement("tr");
						itm_tbl_body_row.setAttribute("id", iid);
						itm_tbl_body_row.addEventListener("click", function(e){moreInfo(this.id, "Product"); e.preventDefault();}, false);//thank you, JESUS
					for(var j=0; j<5; j++){//text nodes for the td elements - real data into the rows
						var itm_tbl_td=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode(data[i].itm);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==1){
							var txt=document.createTextNode(data[i].des);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==2){
							var txt=document.createTextNode(data[i].qty);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==3){
							var txt=document.createTextNode(data[i].upr);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
						if(j==4){
							var txt=document.createTextNode(data[i].isbt);
							itm_tbl_td.appendChild(txt);
							itm_tbl_body_row.appendChild(itm_tbl_td);
						}
					}
					itm_tbl_body.appendChild(itm_tbl_body_row);//row attached to body
				}
			}
			itm_tbl.appendChild(itm_tbl_head);//attach column labels to table
			itm_tbl.appendChild(itm_tbl_body);//attach rows
			/////////////////////////////
			//////////totals///////////////
			var form_totals=document.createElement("div");//totals container
			form_totals.setAttribute("id", "form_totals");
			var itm_tbl_totals=document.createElement("table");//totals table
			itm_tbl_totals.setAttribute("id", "itm_tbl_totals");
			var itm_tbl_totals_tbody=document.createElement("tbody");
			itm_tbl_totals_tbody.setAttribute("id", "itm_tbl_totals_tbody");
			for(var i=0; i<3; i++){//totals table rows
				var itm_tbl_totals_row=document.createElement("tr");
				if(i==0){//first row : untaxed amount
					for(var j=0; j<2; j++){//cels
						var itm_tbl_totals_row_cell=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode("Untaxed Amount (UGX)");
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(osbt);
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
					}
					itm_tbl_totals_tbody.appendChild(itm_tbl_totals_row);
				}
				if(i==1){//second row : taxes total
					for(var j=0; j<2; j++){//cels
						var itm_tbl_totals_row_cell=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode("Taxes (UGX)");
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(tax);
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
					}
					itm_tbl_totals_tbody.appendChild(itm_tbl_totals_row);
				}
				if(i==2){//third row : untaxed amount
					itm_tbl_totals_row.setAttribute("id", "total");
					for(var j=0; j<2; j++){//cels
						var itm_tbl_totals_row_cell=document.createElement("td");
						if(j==0){
							var txt=document.createTextNode("Total (UGX)");
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
						if(j==1){
							var txt=document.createTextNode(tot);
							itm_tbl_totals_row_cell.appendChild(txt);
							itm_tbl_totals_row.appendChild(itm_tbl_totals_row_cell);
						}
					}
					itm_tbl_totals_tbody.appendChild(itm_tbl_totals_row);
				}
			}
			itm_tbl_totals.appendChild(itm_tbl_totals_tbody);
			form_totals.appendChild(itm_tbl_totals);
			/////////////////////////
			
			var form_wrapper_spacer=document.createElement("div");
			form_wrapper_spacer.setAttribute("class", "spacer");
			
			var form_itm=document.createElement("div");//form items table wrapper
			form_itm.setAttribute("id", "form_itm");
			form_itm.appendChild(itm_tbl);
			var form_comm=document.createElement("div");//comments area
			form_comm.setAttribute("id", "form_comm");
			form_comm.innerHTML=term;
			//////////////APPENDAGES TO MAIN CONTAINER//////////////////////
			form_wrapper.appendChild(form_title);//add title
			form_wrapper.appendChild(o_date);//add date
			form_wrapper.appendChild(supp_name);//add supplier name
			form_wrapper.appendChild(teller_name);//add supplier name
			form_wrapper.appendChild(form_itm);//add items table wrapper
			form_wrapper.appendChild(form_totals);//add totals table wrapper
			form_wrapper.appendChild(form_comm);//add totals table wrapper
			form_wrapper.appendChild(form_wrapper_spacer);
			document.getElementById("cpanel_inner_main_main").appendChild(form_wrapper);//attach main cont to document (main_main to be specific)
			document.getElementById("cpanel_inner_main_main").insertBefore(p_opt_cont, form_wrapper);//prepend options to main container
			break;
			}
		}
	}
	xhr.send(null);
}

//fetch form to edit supplier information
function editEntry(infoId, opt){
	switch(opt){//purchase order. switch needed here
		case "PurchaseOrder":
		var xhr;
		var url="include/method.php?editEntry=1&id="+infoId+"&opt="+opt+"";
		var buttons="<button class='cpanel_button' title='"+opt+"' id='"+infoId+"' onclick='upEntry(this.id, this.title)'>Save</button>"+
			"<button class='cpanel_button' title='"+opt+"' onclick='cancel(this.title)' id='cancel_but'>Cancel</button>";
		document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("GET", url);		
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				document.getElementById("cpanel_inner_main_main").innerHTML="";
				getOitm(infoId, opt);//return the items from the DB + the status and other JS required attributes
				var data=xhr.responseText;
				document.getElementById("cpanel_inner_main_main").innerHTML+=data;
				var po_subt=document.getElementById("po_subt").innerHTML="0.00";//subtotals field initialised with trailing zero labels
				var po_tax=document.getElementById("po_tax").innerHTML="0.00";//tax totals field initialised with trailing zero labels
				var po_tot=document.getElementById("po_tot").innerHTML="0.00";//order totals field initialised with trailing zero labels
				var add_itm=document.createElement("div");//div to hold add item button
				add_itm.setAttribute("id", "add_itm");
				add_itm.innerHTML="<button class='cpanel_button' title='"+opt+"' onclick='itmForm(this.title); return false;'>Item</button>";//button added
				var p_opt_cont=document.createElement("div");//create a div to hold the options for the purchase order such as the status
				p_opt_cont.setAttribute("id", "p_opt_cont");
				p_opt_cont.appendChild(add_itm);//add item button container added to po options container
				var form_wrapper=document.getElementById("form_wrapper");
				document.getElementById("cpanel_inner_main_main").insertBefore(p_opt_cont, form_wrapper);//prepend options to main container
			}
		}
		xhr.send(null);
		break;
		case "SalesOrder":
		var xhr;
		var url="include/method.php?editEntry=1&id="+infoId+"&opt="+opt+"";
		var buttons="<button class='cpanel_button' title='"+opt+"' id='"+infoId+"' onclick='upEntry(this.id, this.title)'>Save</button>"+
			"<button class='cpanel_button' title='"+opt+"' onclick='cancel(this.title)' id='cancel_but'>Cancel</button>";
		document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("GET", url);		
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				document.getElementById("cpanel_inner_main_main").innerHTML="";
				getOitm(infoId, opt);//return the items from the DB + the status and other JS required attributes
				var data=xhr.responseText;
				document.getElementById("cpanel_inner_main_main").innerHTML+=data;
				var po_subt=document.getElementById("po_subt").innerHTML="0.00";//subtotals field initialised with trailing zero labels
				var po_tax=document.getElementById("po_tax").innerHTML="0.00";//tax totals field initialised with trailing zero labels
				var po_tot=document.getElementById("po_tot").innerHTML="0.00";//order totals field initialised with trailing zero labels
				var add_itm=document.createElement("div");//div to hold add item button
				add_itm.setAttribute("id", "add_itm");
				add_itm.innerHTML="<button class='cpanel_button' title='"+opt+"' onclick='itmForm(this.title); return false;'>Item</button>";//button added
				var p_opt_cont=document.createElement("div");//create a div to hold the options for the purchase order such as the status
				p_opt_cont.setAttribute("id", "p_opt_cont");
				p_opt_cont.appendChild(add_itm);//add item button container added to po options container
				var form_wrapper=document.getElementById("form_wrapper");
				document.getElementById("cpanel_inner_main_main").insertBefore(p_opt_cont, form_wrapper);//prepend options to main container
			}
		}
		xhr.send(null);
		break;
		case "Product":
		var xhr;
		var url="include/method.php?editEntry=1&id="+infoId+"&opt="+opt+"";
		var buttons="<button class='cpanel_button' title='"+opt+"' id='"+infoId+"' onclick='upEntry(this.id, this.title)'>Save</button>"+
		"<button class='cpanel_button' title='"+opt+"' onclick='cancel(this.title)'>Cancel</button>";
		document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("GET", url);		
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				document.getElementById("cpanel_inner_main_main").innerHTML="";
				//var data=JSON.parse(xhr.responseText);
				var data=xhr.responseText;
				document.getElementById("cpanel_inner_main_main").innerHTML+=data;
				var fileSelect = document.getElementById("update_pic_upload");
				var	fileElem = document.getElementById("update_file_upload_field");
				fileSelect.addEventListener("click", function (e) {
				  if (fileElem) {
					fileElem.click();
				  }
				  e.preventDefault(); // prevent navigation to "#"
				}, false);
			}
		}
		xhr.send(null);
		break;
		case "User":
		var xhr;
		var url="include/method.php?editEntry=1&id="+infoId+"&opt="+opt+"";
		var buttons="<button class='cpanel_button' title='"+opt+"' id='"+infoId+"' onclick='upEntry(this.id, this.title)'>Save</button>"+
		"<button class='cpanel_button' title='"+opt+"' onclick='cancel(this.title)'>Cancel</button>";
		document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("GET", url);		
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				document.getElementById("cpanel_inner_main_main").innerHTML="";
				//var data=JSON.parse(xhr.responseText);
				var data=xhr.responseText;
				document.getElementById("cpanel_inner_main_main").innerHTML+=data;
				var fileSelect = document.getElementById("update_pic_upload");
				var	fileElem = document.getElementById("update_file_upload_field");
				fileSelect.addEventListener("click", function (e) {
				  if (fileElem) {
					fileElem.click();
				  }
				  e.preventDefault(); // prevent navigation to "#"
				}, false);
			}
		}
		xhr.send(null);
		break;
	}
}

//update supplier information
function upEntry(infoId, opt){
	switch(opt){
		case "PurchaseOrder":
		//variable declarations
		var xhr;
		var fd;
		var url="include/method.php?upEntry=1&id="+infoId+"&opt="+opt+"";
		var ref=document.getElementById("ref").innerHTML;
		var supp=document.getElementById("cust_name").value;
		var sbt=document.getElementById("po_subt").childNodes.item(0).data;
		var tax=document.getElementById("po_tax").childNodes.item(0).data;
		var tot=document.getElementById("po_tot").childNodes.item(0).data;
		var term=document.getElementById("comm").value;
		//getting the item values from their dynamic table
		var itm_det=new Array();//array to hold the values from each row
		var itmtbl=document.getElementById("tbody");
		var itm_rows=itmtbl.rows.length;//number of rows in the item table
		for(var i=0; i<itm_rows; i++){//for every row
			for(var j=0; j<6; j++){//for every cell except the last one that holds the delete buttons (red x's)
				var _tr=itmtbl.rows[i];//current row
				var _td=_tr.cells[j];//column we want
				var _txtnode=_td.childNodes.item(0);//access to the cell data holder
				var _val=_txtnode.data;//get data of cell
				if(j==2){
					var _val=parseFloat(_txtnode.data);//slash units from quantity
				}
				itm_det.push(_val);//insert each value into array
			}
			itm_det.push('/');//row separator character. THANK YOU JESUS. At this point attach the array to form data for sending to php where further processing is done
		}
		fd="ref="+ref+"&supp="+supp+"&sbt="+sbt+"&tax="+tax+"&tot="+tot+"&term="+term+"&itmtbl="+itm_det+"";
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				var data=xhr.responseText;
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				moreInfo(infoId, opt);
			}
		}
		xhr.send(fd);
		break;
		case "SalesOrder":
		//variable declarations
		var xhr;
		var fd;
		var url="include/method.php?upEntry=1&id="+infoId+"&opt="+opt+"";
		var ref=document.getElementById("ref").innerHTML;
		var supp=document.getElementById("cust_name").value;
		var sbt=document.getElementById("po_subt").childNodes.item(0).data;
		var tax=document.getElementById("po_tax").childNodes.item(0).data;
		var tot=document.getElementById("po_tot").childNodes.item(0).data;
		var term=document.getElementById("comm").value;
		//getting the item values from their dynamic table
		var itm_det=new Array();//array to hold the values from each row
		var itmtbl=document.getElementById("tbody");
		var itm_rows=itmtbl.rows.length;//number of rows in the item table
		for(var i=0; i<itm_rows; i++){//for every row
			for(var j=0; j<6; j++){//for every cell except the last one that holds the delete buttons (red x's)
				var _tr=itmtbl.rows[i];//current row
				var _td=_tr.cells[j];//column we want
				var _txtnode=_td.childNodes.item(0);//access to the cell data holder
				var _val=_txtnode.data;//get data of cell
				if(j==2){
					var _val=parseFloat(_txtnode.data);//slash units from quantity
				}
				itm_det.push(_val);//insert each value into array
			}
			itm_det.push('/');//row separator character. THANK YOU JESUS. At this point attach the array to form data for sending to php where further processing is done
		}
		fd="ref="+ref+"&supp="+supp+"&sbt="+sbt+"&tax="+tax+"&tot="+tot+"&term="+term+"&itmtbl="+itm_det+"";
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				var data=xhr.responseText;
				var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
				document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				moreInfo(infoId, opt);
			}
		}
		xhr.send(fd);
		break;
		case "Product":
		//variable declarations
		var xhr;
		var url="include/method.php?upEntry=1&id="+infoId+"&opt="+opt+"";
		var fd=new FormData(document.forms.namedItem("edit_entry_form"));
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.onload=function(){
			if(xhr.status==200){
				var data=xhr.responseText;
				//var buttons="<button class='cpanel_button' onclick='suppForm()'>Create</button>"
				//document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				moreInfo(infoId, opt);
			}
		}
		xhr.send(fd);
		break;
		case "User":
		//variable declarations
		var xhr;
		var url="include/method.php?upEntry=1&id="+infoId+"&opt="+opt+"";
		var fd=new FormData(document.forms.namedItem("edit_entry_form"));
		//if browser supports XHR Object
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		//if IE
		else{
			xhr=new ActiveXObject("Microsoft:XMLHTTP");
		}
		xhr.open("POST", url);
		xhr.onload=function(){
			if(xhr.status==200){
				var data=xhr.responseText;
				//var buttons="<button class='cpanel_button' onclick='suppForm()'>Create</button>"
				//document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
				//document.getElementById("cpanel_inner_main_main").innerHTML=data;
				moreInfo(infoId, opt);
			}
		}
		xhr.send(fd);
		break;
	}
}

//popes confirmation box
function conf(infoId, opt){
	var conf_box="<div id='conf_box'>"+
		"<div id='conf_box_inner'>"+
			"<div id='conf_msg'>"+
				"Delete "+opt+"?"+
			"</div>"+
			"<div id='conf_adv'>"+
				"Taking action will permanently erase the details from the system."+
			"</div>"+
			"<div id='conf_desc'>"+
				"<button class='cpanel_button' title='"+opt+"' id='"+infoId+"' onclick='delEntry(this.id, this.title);'>Delete</button>"+
				"<button class='cpanel_button' title='"+opt+"'  onclick='cancel(this.title);'>Cancel</button>"+
			"</div>"+
		"</div>"+
	"</div>";
	document.getElementById("cpanel_inner_main_main").innerHTML+=conf_box;
}

//delete supplier
function delEntry(infoId, opt){
	var xhr;
	var url="include/method.php?delEntry=1&id="+infoId+"&opt="+opt+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";			
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			fetchEntry(opt);
		}
	}
	xhr.send(null);
}

//add item form
function itmForm(opt){// u dnt hav to call itmForm() with an edit? parameter even if u r doin an edit. because u r putting new values this time
	var dialog_box_overlay=$("dialog_box_overlay");
		dialog_box_overlay.style.display="block";
	var xhr;
	var url="include/method.php?itmForm=1&opt="+opt+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){			
			var data=xhr.responseText;
			document.getElementById("cpanel_inner_main").innerHTML+=data;//this form gets called properly only once. subsequently it lacks the buttons and is not functional
			//could the problem with the done button: display none property? it means that the form exists but is hidden! and so the id's conflict!
			//this renders it totally mulfunctional. first test whether it exists (and is just hidden) before fetching via ajax. then reveal it, or fetch it!
			//alternatively, remove form (delete from document) when done is clicked (or when hidden)! to avoid the conflict.
			//this is better but also brings some bugs into the system after the done button is clicked .eg u cannot delete the items that were added before the current time
			//responsive data entry
			//variable to hold item name
			var buttons="<button class='cpanel_button' title='"+opt+"' id='collins' onclick='addItem(this.title, this.name, 0)'>Add</button>"+//name att set later
			"<button class='cpanel_button' title='"+opt+"' onclick='done();'>Done</button>"+
			"<span id='itm_max_qty'></span>";
			var itm_desc=document.getElementById("itm_desc").innerHTML=buttons;
			document.getElementById("qty").addEventListener("keyup", function(){//update fileds as they type
				var itm_avail_qty=parseFloat($("itm_avail_qty").innerHTML);
				var qty=parseFloat(document.getElementById("qty").value);//quantity field value parsed as a floating point number
				var upr=parseFloat(document.getElementById("upr").value);//unit price value parsed as a floating point number
				//var stot=document.getElementById("stot").value=((Math.round(qty*upr*100))/100);///subtotal value rounded to 2dp
				//var tax=document.getElementById("tax").value=((Math.round(stot*0.18*100))/100);///tax amount VAT (18.00%) rounded to 2dp
				//a better approach
				var stot=document.getElementById("stot").value=(qty*upr).toFixed(2);///subtotal value rounded to 2dp
				var urlopt=document.URL;
				urlopt=urlopt.split("=");
				urlopt=urlopt[1];
				////////////////
				if(urlopt=="SalesOrder"){
					if(qty>itm_avail_qty || isNaN(qty) || qty==0){//isNaN() does not validate if the value starts with a number
						$("collins").style.display="none";
						$("qty").style.color="#F00";
						$("itm_msg").style.background="#F00";
						$("itm_max_qty").style.color="#F00";
					}
					else{
						$("collins").style.display="inline";
						$("qty").style.color="#000";
						$("itm_msg").style.background="#09F";
						$("itm_max_qty").style.color="#0C0";
					}
				}
				if(urlopt=="PurchaseOrder"){
					if(isNaN(qty) || qty==0){//isNaN() does not validate if the value starts with a number
						$("collins").style.display="none";
						$("qty").style.color="#F00";
						$("itm_msg").style.background="#F00";
						$("itm_max_qty").style.color="#F00";
					}
					else{
						$("collins").style.display="inline";
						$("qty").style.color="#000";
						$("itm_msg").style.background="#09F";
						$("itm_max_qty").style.color="#0C0";
					}
				}
				if(opt=="SalesOrder" || opt=="PurchaseOrder"){
					var tax=document.getElementById("tax").value=(stot*0).toFixed(2);///tax amount VAT (18.00%) rounded to 2dp
				}
				else{
					var tax=document.getElementById("tax").value=(stot*0.18).toFixed(2);///tax amount VAT (18.00%) rounded to 2dp
				}
			}, false);
			///////////////////////////////
			if(window.addEventListener){//use these eventListeners, because inline ones don't work correctly in some browsers
				$("itm").addEventListener("focus", function(e){
					getItems('Product');
					e.preventDefault();
				}, false);
			}
			else{
				$("itm").onfocus=function (){
					getItems('Product');
				};
			}
			if(window.addEventListener){//use these eventListeners, because inline ones don't work correctly in some browsers
				$("itm").addEventListener("keyup", function(e){
					searchAddItm('Product');
					e.preventDefault();
				}, false);
			}
			else{
				$("itm").onkeyup=function (){
					searchAddItm('Product');
				};
			}
			if(window.addEventListener){//use these eventListeners, because inline ones don't work correctly in some browsers
				$("itm").addEventListener("blur", function(e){
					handleBlur();
					e.preventDefault();
				}, false);
			}
			else{
				$("itm").onblur=function (){
					handleBlur();
				};
			}
			//////////////////////////////////////
		}
	}
	xhr.send(null);
}

//done adding item
function done(){
	//document.getElementById("itm_form").setAttribute("style", "display:none;");
	//delete object from document to avoid id conflict when another is called by clicking the item button again!
	var itm_fm=document.getElementById("itm_form");
	itm_fm.parentNode.removeChild(itm_fm);
	$("dialog_box_overlay").style.display="none";
	//have you realised that fetching again affects the row removal. if i click again, only those items added curently can be removed. those added earlier cannot!
}

//add item
function addItem(opt, itm, edit){//item name is sent as an argument
	var tbl=document.getElementById("itm_tbl");//item table
	var tblbody=document.getElementById("tbody");//item table body
	var itm_tot=document.getElementById("itm_tbl_totals");//totals table
	var itm_tot_body=document.getElementById("itm_tbl_totals_tbody");//totals table body
	var po_subt=document.getElementById("po_subt");//subtotals field
	var po_tax=document.getElementById("po_tax");//tax totals field
	var po_tot=document.getElementById("po_tot");//order totals field
	var row=document.createElement("tr");
	for(var j=0; j<7; j++){
		if(edit==0){
			var cur_itm=$("itm").value;
			var cell=document.createElement("td");//cell
			var qty=document.getElementById("qty").value;//quantity field value
			var upr=document.getElementById("upr").value;//unit price value
			var stot=document.getElementById("stot").value;//subtotal value parsed as floating point numbers
			var tax=document.getElementById("tax").value;//tax amount VAT (18.00%) parsed as floating point numbers
			var desc=document.getElementById("desc").value;//description
		}
		else{
			var cur_itm=itm;
			var cell=document.createElement("td");//cell
			//all these are hidded containers within the body////u can use ajax instead of hiding them. a matter of choice
			var qty=document.getElementById("h_qty").innerHTML;//quantity field value
			var upr=document.getElementById("h_upr").innerHTML;//unit price value
			var stot=document.getElementById("h_stot").innerHTML;//subtotal value parsed as floating point numbers
			var tax=document.getElementById("h_tax").innerHTML;//tax amount VAT (18.00%) parsed as floating point numbers
			var desc=document.getElementById("h_desc").innerHTML;//description
			if(desc==""){////lack of a description causes the system to err, so we give it a space character
				desc=" ";
			}
		}
		if(j==0){
			var celltext=document.createTextNode(cur_itm);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		if(j==1){
			var celltext=document.createTextNode(desc);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		if(j==2){
			var celltext=document.createTextNode(qty);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		if(j==3){
			var celltext=document.createTextNode(upr);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		if(j==4){
			var celltext=document.createTextNode(tax);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		if(j==5){
			var celltext=document.createTextNode(stot);
			cell.appendChild(celltext);
			row.appendChild(cell);
		}
		if(j==6){
			var celltext=document.createTextNode("X");
			var r_del=document.createElement("span");
			r_del.setAttribute("class", "row_del");
			r_del.setAttribute("title", "Remove");
			r_del.addEventListener("click", function(){
				tblbody.removeChild(row);
				getTotals(tblbody, 4, po_tax, 0);//call to calculate tax totals
				getTotals(tblbody, 5, po_subt, 0);//call to calculate untaxed amount
				getTotals(itm_tot_body, 1, po_tot, 1);//call to calculate taxed amount (one row is reduced to avoid (repeating) last row which holds our value)
			}, false);
			r_del.appendChild(celltext);
			cell.appendChild(r_del);
			row.appendChild(cell);
		}
	}
	tblbody.appendChild(row);
	getTotals(tblbody, 4, po_tax, 0);//call to calculate tax totals
	getTotals(tblbody, 5, po_subt, 0);//call to calculate untaxed amount
	getTotals(itm_tot_body, 1, po_tot, 1);//call to calculate taxed amount (one row is reduced to avoid (repeating) last row which holds our value)
}

//the order totals for all the items//////////////////////////////////////////////////
function getTotals(tblbody, col, dest, red){
	var num_rows=tblbody.rows.length;//number of rows in table
	num_rows-=red;//number of rows to reduce (row to stop at while counting from up)
	//var tax_col=4;//position of column we want
	var tt=0;//initialise total value
	if(num_rows<1){//taking care of the situation when all the items have been removed! lol!
		tt=0;
		dest.innerHTML=tt.toFixed(2);
	}
	else{
		for(var i=0; i<num_rows; i++){
			var this_tr=tblbody.rows[i];//current row
			var this_td=this_tr.cells[col];//column we want
			var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
			var cel_val=parseFloat(this_txtnode.data);//get data of cell and encode it as a floating point number
			tt+=cel_val;//store total into variable tt and add it to required location
			if(!isNaN(tt)){
				dest.innerHTML=tt.toFixed(2);
			}
		}
	}
}
/////////////////////////////////////////////////////////////

function getOitm(infoId, opt) {
	var xhr;
	var url="include/method.php?getOitm=1&opt="+opt+"&id="+infoId+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
		//document.getElementById("cpanel_inner_main_main").innerHTML="";
		//var data=xhr.responseText;
		//document.getElementById("cpanel_inner_main_main").innerHTML=data
		var data=JSON.parse(xhr.responseText);
		/////////ADD THE ITEMS TO THE PO////////////////
		for(var i in data){
			var itm=data[i].itm;//this one is sent as an argument with the addItem() function
			document.getElementById("h_qty").innerHTML=data[i].qty;//quantity field value
			document.getElementById("h_upr").innerHTML=data[i].upr;//unit price value
			document.getElementById("h_stot").innerHTML=data[i].isbt;//subtotal value parsed as floating point numbers
			document.getElementById("h_tax").innerHTML=data[i].vat;//tax amount VAT (18.00%) parsed as floating point numbers
			document.getElementById("h_desc").innerHTML=data[i].des;//description
			document.getElementById("h_id").innerHTML=data[i].iid;//item identity
			addItem(opt, itm, 1);//add item for as many rows as exist
		}
		//////////////////////
		}
	}
	xhr.send(null);
}

function plAcc(infoId, opt) {
	var xhr;
	var url="include/method.php?plAcc=1&opt="+opt+"&id="+infoId+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			//document.getElementById("cpanel_inner_main_main").innerHTML="";
			//var data=xhr.responseText;
			//document.getElementById("cpanel_inner_main_main").innerHTML=data
			var data=JSON.parse(xhr.responseText);
			for(var i in data){//create rows for other transactions
				//alert(i);
				var then=data[i].period;//get day of week it was when that record was made. we are interested in monday - start of a new week
				var id=data[i].id;
				var next=data[i].next;//alert(next);
				var last="rec"+((data[i].num_rec)-1);//alert(last);
				var row=document.createElement("tr");
				for(var j=0; j<6; j++){
					var cell=document.createElement("td");
					if(j==0){
						var celltext=document.createTextNode(data[i].date);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==1){
						var celltext=document.createTextNode(data[i].par);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==2){
						var celltext=document.createTextNode(data[i].vt);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==3){
						var celltext=document.createTextNode(data[i].vr);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==4){
						var celltext=document.createTextNode(data[i].dr);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==5){
						var celltext=document.createTextNode(data[i].cr);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
				}
				document.getElementById("ple_body").appendChild(row);
				//////CHECK WHETHER RECORD IS THE LAST///////////////
				if(i==last){//then close off the account
					////////
					var close_bal=document.createElement("tr");
					close_bal.setAttribute("class", "close_bal");
					for(var j=0; j<6; j++){
						var cell=document.createElement("td");
						if(j==0){
							var celltext=document.createTextNode(data[i].date);
							cell.appendChild(celltext);
							close_bal.appendChild(cell);
						}
						if(j==1){
							var celltext=document.createTextNode("Closing Balance");
							cell.appendChild(celltext);
							close_bal.appendChild(cell);
						}
						if(j==2){
							var celltext=document.createTextNode("");
							cell.appendChild(celltext);
							close_bal.appendChild(cell);
						}
						if(j==3){
							var celltext=document.createTextNode("");
							cell.appendChild(celltext);
							close_bal.appendChild(cell);
						}
						if((data[i].acc_bal)<0){//considering negative balances
							if(j==4){
								var celltext=document.createTextNode("");
								cell.appendChild(celltext);
								close_bal.appendChild(cell);
							}
							if(j==5){
								var celltext=document.createTextNode((data[i].acc_bal)*-1);
								cell.appendChild(celltext);
								close_bal.appendChild(cell);
							}
						}
						else{//normal balances
							if(j==4){
								var celltext=document.createTextNode(data[i].acc_bal);
								cell.appendChild(celltext);
								close_bal.appendChild(cell);
							}
							if(j==5){
								var celltext=document.createTextNode("");
								cell.appendChild(celltext);
								close_bal.appendChild(cell);
							}
						}
					}
					document.getElementById("ple_body").appendChild(close_bal);//closing balance row
					////////
					/////////
					var close_tot=document.createElement("tr");
					var col_tot;
					///closing total calculation
					//bug detected. if a supplier's acc is view, the total is doubled and made available for every other supplier! 
					var num_rows=ple_body.rows.length;
					var cr_tot=0;//initialise total value
					for(var r=0; r<num_rows; r++){
						var this_tr=ple_body.rows[r];//current row
						
						var el_td_rw=this_tr.cells[1];//eliminate row with this column value
						var el_td_rw_txtnode=el_td_rw.childNodes.item(0);//access to the cell data holder
						var el_td_rw_val=el_td_rw_txtnode.data;
						
						var this_td=this_tr.cells[5];//column we want
						var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
						var cel_val=this_txtnode.data;
						if(cel_val!=""){//take care of empty cells
							var cel_val=parseFloat(cel_val);//without parseFloat(), or parseInt() the values are just concatenated because they are strings
							cr_tot+=cel_val;
							if(el_td_rw_val=="Closing Totals"){
								cr_tot=0;
							}
							if(el_td_rw_val=="Closing Balance"){
								cr_tot-=cel_val;
							}
						}
					}
					var dr_tot=0;//initialise total value
					for(var r=0; r<num_rows; r++){
						var this_tr=ple_body.rows[r];//current row
						
						var el_td_rw=this_tr.cells[1];//eliminate row with this column value
						var el_td_rw_txtnode=el_td_rw.childNodes.item(0);//access to the cell data holder
						var el_td_rw_val=el_td_rw_txtnode.data;
						
						var this_td=this_tr.cells[4];//column we want
						var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
						var cel_val=this_txtnode.data;
						if(cel_val!=""){//take care of empty cells
							var cel_val=parseFloat(cel_val);//without parseFloat(), or parseInt() the values are just concatenated because they are strings
							dr_tot+=cel_val;
							if(el_td_rw_val=="Closing Totals"){
								dr_tot=0;
							}
							if(el_td_rw_val=="Closing Balance"){
								dr_tot-=cel_val;
							}
						}
					}
					if(cr_tot>dr_tot){
						col_tot=cr_tot;
					}
					else{
						col_tot=dr_tot;
					}
					///////////////////
					close_tot.setAttribute("class", "close_tot");
					for(var j=0; j<6; j++){
						var cell=document.createElement("td");
						if(j==0){
							var celltext=document.createTextNode(data[i].date);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==1){
							var celltext=document.createTextNode("Closing Totals");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==2){
							var celltext=document.createTextNode("");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==3){
							var celltext=document.createTextNode("");
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==4){
							cell.setAttribute("class", "cls_tot");
							var celltext=document.createTextNode(col_tot);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
						if(j==5){
							cell.setAttribute("class", "cls_tot");
							var celltext=document.createTextNode(col_tot);
							cell.appendChild(celltext);
							close_tot.appendChild(cell);
						}
					}
					document.getElementById("ple_body").appendChild(close_tot);//closing totals
					////////
				}
				else{
					/////////////////////////////
					if(then==1){//close period and open a new one if the next record doesn't belong to the period(this is every 1st day of the month)
						/////////
						if((data[next].period)!=1){
							var close_bal=document.createElement("tr");
							close_bal.setAttribute("class", "close_bal");
							for(var j=0; j<6; j++){
								var cell=document.createElement("td");
								if(j==0){
									var celltext=document.createTextNode(data[i].date);
									cell.appendChild(celltext);
									close_bal.appendChild(cell);
								}
								if(j==1){
									var celltext=document.createTextNode("Closing Balance");
									cell.appendChild(celltext);
									close_bal.appendChild(cell);
								}
								if(j==2){
									var celltext=document.createTextNode("");
									cell.appendChild(celltext);
									close_bal.appendChild(cell);
								}
								if(j==3){
									var celltext=document.createTextNode("");
									cell.appendChild(celltext);
									close_bal.appendChild(cell);
								}
								if((data[i].acc_bal)<0){
									if(j==4){
										var celltext=document.createTextNode("");
										cell.appendChild(celltext);
										close_bal.appendChild(cell);
									}
									if(j==5){
										var celltext=document.createTextNode((data[i].acc_bal)*-1);
										cell.appendChild(celltext);
										close_bal.appendChild(cell);
									}
								}
								else{
									if(j==4){
										var celltext=document.createTextNode(data[i].acc_bal);
										cell.appendChild(celltext);
										close_bal.appendChild(cell);
									}
									if(j==5){
										var celltext=document.createTextNode("");
										cell.appendChild(celltext);
										close_bal.appendChild(cell);
									}
								}
							}
							document.getElementById("ple_body").appendChild(close_bal);//closing balance row
							////////
							/////////
							var close_tot=document.createElement("tr");
							var col_tot;
							///closing total calculation
							//bug detected. if a supplier's acc is view, the total is doubled and made available for every other supplier! 
							var num_rows=ple_body.rows.length;
							var cr_tot=0;//initialise total value
							for(var r=0; r<num_rows; r++){
								var this_tr=ple_body.rows[r];//current row
								
								var el_td_rw=this_tr.cells[1];//eliminate row with this column value
								var el_td_rw_txtnode=el_td_rw.childNodes.item(0);//access to the cell data holder
								var el_td_rw_val=el_td_rw_txtnode.data;
								
								var this_td=this_tr.cells[5];//column we want
								var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
								var cel_val=this_txtnode.data;
								if(cel_val!=""){//take care of empty cells
									var cel_val=parseFloat(cel_val);//without parseFloat(), or parseInt() the values are just concatenated because they are strings
									cr_tot+=cel_val;
									if(el_td_rw_val=="Closing Totals"){
										cr_tot=0;
									}
									if(el_td_rw_val=="Closing Balance"){
										cr_tot-=cel_val;
									}
								}
							}
							var dr_tot=0;//initialise total value
							for(var r=0; r<num_rows; r++){
								var this_tr=ple_body.rows[r];//current row
								
								var el_td_rw=this_tr.cells[1];//eliminate row with this column value
								var el_td_rw_txtnode=el_td_rw.childNodes.item(0);//access to the cell data holder
								var el_td_rw_val=el_td_rw_txtnode.data;
								
								var this_td=this_tr.cells[4];//column we want
								var this_txtnode=this_td.childNodes.item(0);//access to the cell data holder
								var cel_val=this_txtnode.data;
								if(cel_val!=""){//take care of empty cells
									var cel_val=parseFloat(cel_val);//without parseFloat(), or parseInt() the values are just concatenated because they are strings
									dr_tot+=cel_val;
									if(el_td_rw_val=="Closing Totals"){
										dr_tot=0;
									}
									if(el_td_rw_val=="Closing Balance"){
										dr_tot-=cel_val;
									}
								}
							}
							if(cr_tot>dr_tot){
								col_tot=cr_tot;
							}
							else{
								col_tot=dr_tot;
							}
							///////////////////
							close_tot.setAttribute("class", "close_tot");
							for(var j=0; j<6; j++){
								var cell=document.createElement("td");
								if(j==0){
									var celltext=document.createTextNode(data[i].date);
									cell.appendChild(celltext);
									close_tot.appendChild(cell);
								}
								if(j==1){
									var celltext=document.createTextNode("Closing Totals");
									cell.appendChild(celltext);
									close_tot.appendChild(cell);
								}
								if(j==2){
									var celltext=document.createTextNode("");
									cell.appendChild(celltext);
									close_tot.appendChild(cell);
								}
								if(j==3){
									var celltext=document.createTextNode("");
									cell.appendChild(celltext);
									close_tot.appendChild(cell);
								}
								if(j==4){
									cell.setAttribute("class", "cls_tot");
									var celltext=document.createTextNode(col_tot);
									cell.appendChild(celltext);
									close_tot.appendChild(cell);
								}
								if(j==5){
									cell.setAttribute("class", "cls_tot");
									var celltext=document.createTextNode(col_tot);
									cell.appendChild(celltext);
									close_tot.appendChild(cell);
								}
							}
							document.getElementById("ple_body").appendChild(close_tot);//closing totals
							////////
							/////////
							var open_bal=document.createElement("tr");
							open_bal.setAttribute("class", "open_bal");
							for(var j=0; j<6; j++){
								var cell=document.createElement("td");
								if(j==0){
									var celltext=document.createTextNode(data[i].date);
									cell.appendChild(celltext);
									open_bal.appendChild(cell);
								}
								if(j==1){
									var celltext=document.createTextNode("Opening Balance");
									cell.appendChild(celltext);
									open_bal.appendChild(cell);
								}
								if(j==2){
									var celltext=document.createTextNode("");
									cell.appendChild(celltext);
									open_bal.appendChild(cell);
								}
								if(j==3){
									var celltext=document.createTextNode("");
									cell.appendChild(celltext);
									open_bal.appendChild(cell);
								}
								if((data[i].acc_bal)<0){
									if(j==4){
										var celltext=document.createTextNode((data[i].acc_bal)*-1);
										cell.appendChild(celltext);
										open_bal.appendChild(cell);
									}
									if(j==5){
										var celltext=document.createTextNode("");
										cell.appendChild(celltext);
										open_bal.appendChild(cell);
									}
								}
								else{
									if(j==4){
										var celltext=document.createTextNode("");
										cell.appendChild(celltext);
										open_bal.appendChild(cell);
									}
									if(j==5){
										var celltext=document.createTextNode(data[i].acc_bal);
										cell.appendChild(celltext);
										open_bal.appendChild(cell);
									}
								}
							}
							document.getElementById("ple_body").appendChild(open_bal);//opening balance row
							////////
						}
					}
				}///THANK YOU JESUS
			}
		}
	}
	xhr.send(null);
}

function ins_itm(opt, itm_id, inv_id, sta){
	var xhr;
	var url="include/method.php?ins_itm=1&opt="+opt+"&id="+itm_id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);		
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			//document.getElementById("cpanel_inner_main_main").innerHTML="";
			//var data=xhr.responseText;
			//document.getElementById("cpanel_inner_main_main").innerHTML=data
			var data=JSON.parse(xhr.responseText);
			var qty=data.qty;
			var upr=data.upr;
			var vat=data.vat;
			var sbt=data.sbt;
			
			document.getElementById("qty_av").value=qty;
			document.getElementById("upr").value=upr;
			document.getElementById("tax").value=vat;
			document.getElementById("stot").value=sbt;
			
			var upr=parseFloat(document.getElementById("upr").value);//unit price value parsed as a floating point number
			document.getElementById("qty_ret").addEventListener("keyup", function(){//update fileds as they type
				var qty_ret=parseFloat(document.getElementById("qty_ret").value);//unit price value parsed as a floating point number
				var qty_ret_fld_len=document.getElementById("qty_ret").value.length;
				if(qty_ret<=(document.getElementById("qty_av").value) && !isNaN(qty_ret)){

					var stot=document.getElementById("stot").value=(qty_ret*upr).toFixed(2);///subtotal value rounded to 2dp
					var tax=document.getElementById("tax").value=(stot*0.18).toFixed(2);///tax amount VAT (18.00%) rounded to 2dp
					var new_inv_bal=(parseFloat(stot)+parseFloat(tax));//the current balance is further reduced by this amount
					
					var buttons="<button class='cpanel_button' title='"+opt+"' id='"+itm_id+"' name='"+inv_id+"' value='"+new_inv_bal+"'"+
									"onclick='retItm(this.title, this.id, this.name, this.value)'>Return</button>"+
					"<button class='cpanel_button' title='"+opt+"' id='"+inv_id+"' id='"+sta+"' onclick='clr(this.title, this.id, this.name);'>Clear</button>";
					var itm_desc=document.getElementById("itm_desc").innerHTML=buttons;
					
					document.getElementById("qty_av").setAttribute("style", "border:1px solid #09F;");
					document.getElementById("qty_ret").removeAttribute("maxlength");
				}
				else{
					document.getElementById("qty_av").setAttribute("style", "border:1px solid #F06;");
					qty_ret_fld_len=qty_ret_fld_len-1;//length of quantity to pay field
					document.getElementById("qty_ret").setAttribute("maxlength", ""+qty_ret_fld_len+"");
					document.getElementById("qty_ret").value=document.getElementById("qty_av").value;
					var itm_desc=document.getElementById("itm_desc").innerHTML="";
				}
			}, false);
		}
	}
	xhr.send(null);
}

function searchEntry(opt){
	//variable declarations
	var xhr;
	var fd;
	var term=document.getElementById("qk_search").value;
	var url="include/method.php?searchEntry=1&opt="+opt+"";
	fd="term="+term+"";
	//if browser supports XHR Object
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	//if IE
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			data=JSON.parse(data);
			document.getElementById("cpanel_inner_main_main").innerHTML="";
			//document.getElementById("cpanel_inner_main_main").innerHTML=data;
			switch(opt){
				case "Product":
				var url=document.URL;//is this supposed to be here?
				url=url.split("=");
				url=url[0];
				var tbl=document.createElement("table");
				var tblhead=document.createElement("thead");
				var tblbody=document.createElement("tbody");
				tbl.setAttribute("class", "wide");
				//create column labels
				for(var k=0; k<4; k++){
					var col_label=document.createElement("th");
					if(k==0){
						var celltext=document.createTextNode("Item Name");
						col_label.appendChild(celltext);
						tblhead.appendChild(col_label);
					}
					if(k==1){
						var celltext=document.createTextNode("Quantity");
						col_label.appendChild(celltext);
						tblhead.appendChild(col_label);
					}
					if(k==2){
						var celltext=document.createTextNode("Unit");
						col_label.appendChild(celltext);
						tblhead.appendChild(col_label);
					}
					if(k==3){
						var celltext=document.createTextNode("Unit Price (UGX)");
						col_label.appendChild(celltext);
						tblhead.appendChild(col_label);
					}
				}
				for(var i in data){//create rows
					var id=data[i].id;
					var cat=data[i].cat;
					var row=document.createElement("tr");
					//get a way of making the rows clickable to redirect to the specific item's 'more details' option
					//var row_link=document.createElement("a");
					//row_link.setAttribute("href", ""+url+"="+cat+"");
					//row_link.setAttribute("onclick", "document.location=this.href;");
					/*just fetch the info from itm table instead*/
					row.setAttribute("id", ""+id+"");
					row.setAttribute("title", ""+opt+"");
					row.setAttribute("onclick", "moreInfo(this.id, this.title);");
					//create cells
					for(var j=0; j<4; j++){
						var cell=document.createElement("td");
						if(j==0){
							var celltext=document.createTextNode(data[i].name);
							cell.appendChild(celltext);
							row.appendChild(cell);
						}
						if(j==1){
							var qty=document.createTextNode(data[i].qty);
							cell.appendChild(qty);
							row.appendChild(cell);
						}
						if(j==2){
							var celltext=document.createTextNode(data[i].units);
							cell.appendChild(celltext);
							row.appendChild(cell);
						}
						if(j==3){
							var celltext=document.createTextNode(data[i].price);
							cell.appendChild(celltext);
							row.appendChild(cell);
						}
					}
					tblbody.appendChild(row);
				}
				tbl.appendChild(tblhead);
				tbl.appendChild(tblbody);
				document.getElementById("cpanel_inner_main_main").appendChild(tbl);
				break;
			}
		}
	}
xhr.send(fd);
}

function searchAddItm(opt){
	//variable declarations
	var xhr;
	var fd;
	var term=document.getElementById("itm").value;
	var url="include/method.php?searchEntry=1&opt="+opt+"";
	fd="term="+term+"";
	//if browser supports XHR Object
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	//if IE
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			data=JSON.parse(data);
			var r_set=$("r_set");
			r_set.innerHTML="";
			for(var i in data){
				var r_li=_("li");
				r_li.innerHTML=data[i].name;
				r_li.setAttribute("id", data[i].name);
				r_li.setAttribute("value", data[i].price);
				r_li.setAttribute("title", data[i].id);
				r_li.addEventListener("click", function(e){itm.value=this.id; upr.value=this.value; chQty(this.title, opt); e.preventDefault();}, false);
				r_set.appendChild(r_li);
			}
		}
	}
xhr.send(fd);
}

function getItems(opt){
	var xhr;
	var fd;
	var url="include/method.php?fetchEntry=1&opt="+opt+"";//we use the fetch entru function from php
	//if browser supports XHR Object
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	//if IE
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var itm=$("itm");
			var upr=$("upr");
			var r_set=$("r_set");
			r_set.innerHTML="";
			r_set.style.display="block";
			var data=xhr.responseText;
			data=JSON.parse(data);
			for(var i in data){
				var r_li=document.createElement("li");
				r_li.innerHTML=data[i].name;
				r_li.setAttribute("id", data[i].name);
				r_li.setAttribute("value", data[i].price);
				r_li.setAttribute("title", data[i].id);
				r_li.addEventListener("click", function(e){itm.value=this.id; upr.value=this.value; chQty(this.title, opt); e.preventDefault();}, false);
				r_set.appendChild(r_li);
			}
		}
	}
xhr.send(null);
}

function handleBlur(){
	var r_set=document.getElementById("r_set");
	//r_set.style.display="none";/////we have to make sure it disappears but still takes the selected option - find a way
	r_set.addEventListener("click", function(e){
	r_set.style.display="none";
	var qty=parseFloat(document.getElementById("qty").value=0.00);//quantity field value parsed as a floating point number
	var upr=parseFloat(document.getElementById("upr").value);
	document.getElementById("stot").value=(qty*upr).toFixed(2);///subtotal value rounded to 2dp
	e.preventDefault;},
	false);
}

function $(x){
	return document.getElementById(x);
}

function _(x){
	return document.createElement(x);
}

function getKey(e){
	var key=e.keyCode;
	if(window.msg_dialog && key==27){//pressing escape key
		//it is very important to call this method after checking if it's object exists
		msg_dialog.done();
	}
	//find a way of the user not escaping this when initial content is loading
	if($("itm_form") && key==27){//pressing escape key
		//it is very important to call this method after checking if it's object exists
		done();
	}
}

function chQty(itm_id, opt){
	var xhr;
	var fd;
	var url="include/method.php?chQty=1&opt="+opt+"&id="+itm_id+"";//we use the fetch entru function from php
	//if browser supports XHR Object
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	//if IE
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			data=JSON.parse(data);
			$("itm_max_qty").innerHTML="Available Quantity: <span id='itm_avail_qty'>"+data.qty+"</span>";
			var itm_avail_qty=parseFloat($("itm_avail_qty").innerHTML);
			var qty=parseFloat($("qty").value);
			//////////////////
			var urlopt=document.URL;
			urlopt=urlopt.split("=");
			urlopt=urlopt[1];
			////////////////
			if(urlopt!="PurchaseOrder"){
				if(itm_avail_qty==0){
					$("collins").style.display="none";
					$("qty").style.color="#F00";
					$("itm_msg").style.background="#F00";
					$("itm_max_qty").style.color="#F00";
				}
				else{
					$("collins").style.display="inline";
					$("qty").style.color="#000";
					$("itm_msg").style.background="#09F";
					$("itm_max_qty").style.color="#0C0";
				}	
			}
			if(qty==0){
				$("collins").style.display="none";
			}
			else{
				$("collins").style.display="inline";
			}
		}
	}
	xhr.send(null);
}

function DialogBox(){
	this.tit; this.frm; this.sbj; this.bod; this.fot;
	this.render=function(){
		var win_width=window.innerWidth || document.body.clientWidth;
		var win_height=window.innerHeight || document.body.clientHeight;
		var dialog_box_width=(win_width*0.3); //measurements are in %
		///////////////////////////////////////////////////////////////
		var dialog_box_overlay=$("dialog_box_overlay");
		dialog_box_overlay.style.display="block";
		///////////////////////////////////////////////////////////////
		var dialog_box=$("dialog_box");
		dialog_box.style.left=""+(0.5*(win_width-dialog_box_width))+"px"; //horizontally centre the div
		dialog_box.style.top=""+(0.1*win_height)+"px";
		dialog_box.style.width=""+dialog_box_width+"px";
		dialog_box.style.display="block";
		///////////////////////////////////////////////////////////////
		$("dialog_box_head").appendChild(this.tit);
		$("dialog_box_body").appendChild(this.frm);
		$("dialog_box_body").appendChild(this.sbj);
		$("dialog_box_body").appendChild(this.bod);
		$("dialog_box_foot").appendChild(this.fot);
		sbj.innerHTML=$("po_tot").innerHTML;
		//reset the following fields
		send_msg_but.style.display="none";
		frm.innerHTML=frm_placeholder;
		msg_area.innerHTML="0.00";
		//to place the button rightly into parent container
		//using the previous spacer element causes it to be taken away from the banner
		//appendChild removes node from owner, in case it exists, and gives it to new one
		//so we create a new one
		var spacer=_("div");
		spacer.setAttribute("id", "dialog_foot_spacer");
		$("dialog_box_foot").appendChild(spacer);
	}
	this.done=function(){
		$("dialog_box").style.display="none";
		$("dialog_box_overlay").style.display="none";
		//no need to remove child node (the send button)from footer simply because
		//appendChild first removes the child from previous parent and gives it to the current, which is the same parent.
	}
}

function Button(){
	//with these elements, their attributes are actually set at instanciation, not here, otherwise they don't work
	return _("span");
}

function TextArea(){
	//just create them and set properties at instanciation
	return _("div");
}

function Title(){
	return _("div");
}

function Head(){
	return _("div");
}

function Esc(){
	return _("div");
}

function compSale(){
	window.print();//first print and then save
	//variable declarations
	var xhr;
	var fd;
	var opt="SalesOrder";
	var url="include/method.php?saveEntry=1&opt="+opt+"";
	var ref=document.getElementById("ref").innerHTML;
	var cust=document.getElementById("cust_name").value;
	var sbt=document.getElementById("po_subt").childNodes.item(0).data;
	var tax=document.getElementById("po_tax").childNodes.item(0).data;
	var tot=document.getElementById("po_tot").childNodes.item(0).data;
	var term=document.getElementById("comm").value;
	//getting the item values from their dynamic table
	var itm_det=new Array();//array to hold the values from each row
	var itmtbl=document.getElementById("tbody");
	var itm_rows=itmtbl.rows.length;//number of rows in the item table
	for(var i=0; i<itm_rows; i++){//for every row
		for(var j=0; j<6; j++){//for every cell except the last one that holds the delete buttons (red x's)
			var _tr=itmtbl.rows[i];//current row
			var _td=_tr.cells[j];//column we want
			var _txtnode=_td.childNodes.item(0);//access to the cell data holder
			var _val=_txtnode.data;//get data of cell
			if(j==2){
				var _val=parseFloat(_txtnode.data);//slash units from quantity
			}
			itm_det.push(_val);//insert each value into array
		}
		itm_det.push('/');//row separator character. THANK YOU JESUS. At this point attach the array to form data for sending to php where further processing is done
	}
	fd="ref="+ref+"&supp="+cust+"&sbt="+sbt+"&tax="+tax+"&tot="+tot+"&term="+term+"&itmtbl="+itm_det+"";
	//if browser supports XHR Object
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	//if IE
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			var buttons="<button class='cpanel_button' title='"+opt+"' onclick='getForm(this.title)'>Create</button>";
			document.getElementById("cpanel_inner_main_options_options").innerHTML=buttons;
			//document.getElementById("cpanel_inner_main_main").innerHTML=data;
			fetchEntry(opt);
		}
	}
	xhr.send(fd);
}