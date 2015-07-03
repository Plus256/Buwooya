window.onload=initAll;
//////declare variables here so they are usable by all functions. however, initialising them here is a bad idea because document elements have not loaded
var this_car;
var auto_scroll_car;
var carousel_container;
var car_items;
var car_control;
/////////
var msg_dialog=new DialogBox();
var msg_hed=new Head();
var msg_tit=new Title();
var msg_esc=new Esc();
var msg_area=new TextArea();
var send_msg_but=new Button();
var buffer=new Buffer();
////////////////////////////////////////////////////////////////////
var even_top_position=0;
var odd_top_position=0;
////////////////////////////////////////////////////////////////////
msg_tit.innerHTML="New Message";
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
var frm=_("input");
frm.setAttribute("type", "text");
frm.setAttribute("class", "msg_dialog_text_input");
frm.setAttribute("id", "frm");
////simulating placeholder
var frm_placeholder="Your Email Address";//this automatically validates - no further validation required on submition
frm.value=frm_placeholder;
///
if(window.addEventListener){
	frm.addEventListener("focus", function(e){
		if(frm.value==frm_placeholder){
			frm.value="";
		}
		frm.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	frm.onfocus=function (){
		if(frm.value==frm_placeholder){
			frm.value="";
		}
		frm.style.color="#036";
	};
}
///
if(window.addEventListener){
	frm.addEventListener("blur", function(e){
		if(frm.value==""){
			frm.value=frm_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	frm.onblur=function (){
		if(frm.value==""){
			frm.value=frm_placeholder;
		}
	};
}
////////////////////////////////////////////////////////////////////
var sbj=_("input");
sbj.setAttribute("type", "text");
sbj.setAttribute("class", "msg_dialog_text_input");
sbj.setAttribute("id", "sbj");
////simulating placeholder
var sbj_placeholder="Subject";//helps us set a default subject value
sbj.value=sbj_placeholder;
if(window.addEventListener){
	sbj.addEventListener("focus", function(e){
		if(sbj.value==sbj_placeholder){
			sbj.value="";
		}
		sbj.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	sbj.onfocus=function (){
		if(sbj.value==sbj_placeholder){
			sbj.value="";
		}
		sbj.style.color="#036";
	};
}
///
if(window.addEventListener){
	sbj.addEventListener("blur", function(e){
		if(sbj.value==""){
			sbj.value=sbj_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	sbj.onblur=function (){
		if(sbj.value==""){
			sbj.value=sbj_placeholder;
		}
	};
}
////////////////////////////////////////////////////////////////////
msg_dialog.tit=msg_hed;
msg_dialog.frm=frm;
msg_dialog.sbj=sbj;
msg_dialog.bod=msg_area;
msg_dialog.fot=send_msg_but;
////////////////////////////////////////////////////////////////////
buffer.render=function(){
	var win_width=window.innerWidth || document.body.clientWidth;
	var win_height=window.innerHeight || document.body.clientHeight;
	if(document.body.clientWidth<=640){
		var buffer_width=(win_width-20);
	}
	else{
		var buffer_width=(win_width*0.3); //measurements are in %
	}
	buffer.setAttribute("id", "buffer");
	/////dynamic buffer statements
	var statements=new Array("Fetching Content", "Buwooya Childcare", "Patience Please");
	var thisStatement=0;
	buffer.innerHTML=statements[thisStatement];//initial value
	setInterval(function (){//i just noticed there are two loops running simultaneously - with some time space between, why?
		thisStatement++;
		if(thisStatement==statements.length){
			thisStatement=0;
		}
		buffer.innerHTML=statements[thisStatement];
	}, 5000);
	///////
	buffer.style.left=""+(0.5*(win_width-buffer_width))+"px"; //horizontally centre the div
	buffer.style.top=""+(0.25*win_height)+"px";
	buffer.style.width=""+buffer_width+"px";
	document.body.appendChild(buffer);
	buffer.style.background="rgb(255, 204, 0)";
	if(navigator.userAgent.indexOf("MSIE")<0){//if not IE
		buffer.style.background="rgba(255, 204, 0, 0.75)";
	}
	buffer.style.display="block";
}
buffer.done=function(){
	buffer.style.display="none";
}
////////////////////////////////////////////////////////////////////
send_msg_but.innerHTML="Send";
send_msg_but.setAttribute("class", "but");
send_msg_but.setAttribute("id", "send_msg_but");
if(window.addEventListener){
	send_msg_but.addEventListener("click", function(e){
		sendMsg();
		buffer.render();
		e.preventDefault();
	}, false);
}
else{
	send_msg_but.onclick=function (){buffer.render(); sendMsg();};
}
////////////////////////////////////////////////////////////////////
msg_area.setAttribute("id", "msg_area");
msg_area.setAttribute("contentEditable", "true");
//imitating placeholder attribute
var msg_placeholder="Write Message Here...";
msg_area.innerHTML=msg_placeholder;
if(window.addEventListener){
	msg_area.addEventListener("focus", function(e){
		if(this.innerHTML==msg_placeholder){
			this.innerHTML="";
		}
		this.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	msg_area.onfocus=function (){
		if(this.innerHTML==msg_placeholder){
			this.innerHTML="";
		}
		this.style.color="#036";
	};
}
///
if(window.addEventListener){
	msg_area.addEventListener("blur", function(e){
		if(this.innerHTML=="" || this.innerHTML=="<br>"){//when field contains data and it is removed with ctrl+a, a <br> is left, so field is not empty
			this.innerHTML=msg_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	msg_area.onblur=function (){
		if(this.innerHTML=="" || this.innerHTML=="<br>"){
			this.innerHTML=msg_placeholder;
		}
	};
}
////////////////////////////////////////////////////////////////////
function initAll(){
	/*///initialise variables (give the variable values when the document has loaded) 
	carousel_container=$("carousel_container");
	car_control=document.getElementsByClassName("car_control");
	/////
	getCar("def");
	//////
	car_items=document.getElementsByClassName("car_item");
	this_car=car_items.length; //at this point car_items.length is zero! why????
	auto_scroll_car=window.setInterval(autoScrollCar, 5000);//the delay is due to other container items that are not slides!
	*///////
}

function $(x){
	return document.getElementById(x);
}

function _(x){
	return document.createElement(x);
}

function getCar(nav_link){
	//show active section
	buffer.render();
	var xhr;
	var url="json/"+nav_link+".json";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		//creating the buffer div here creates 3 instances of the same object because the state changes from 0 (initial) to 1, 2 then 3
		if(xhr.readyState==4 && xhr.status==200){
			buffer.done();
			carousel_container.innerHTML="";
			var data=xhr.responseText;//u don't have to define data as an array like so, var data=new Array - both approaches work, however
				data=JSON.parse(data);//be sure to clear cache after changing JSON file
			/////add spacer to container
			var car_prev=_("span");
			car_prev.setAttribute("class", "car_control");
			car_prev.setAttribute("id", "car_prev");
			car_prev.innerHTML="&lt;";
			/**/
			var car_next=_("span");
			car_next.setAttribute("class", "car_control");
			car_next.setAttribute("id", "car_next");
			car_next.innerHTML="&gt;";
			/////
			var carousel_container_spacer=_("div");
			carousel_container_spacer.setAttribute("class", "spacer");
			/*000000000000000000000000000000000000000000000*/
			for(var i=0; i<data.length; i++){
				var car_item=_("div");
				car_item.setAttribute("class", "car_item");
				//////////////////////////////////////////////////////////////////
				var car_left=_("div");
					car_left.setAttribute("id", "car_left");
				var car_right=_("div");
					car_right.setAttribute("id", "car_right");
				///////////////////////////////////////////////////////////////////
				var img_data=_("img");
					img_data.src=data[i].img;
				//////////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////////
				var caption=_("div");
					caption.setAttribute("id", "caption");
				//////////////////////////////////////////////////////////////////
				var title=_("div");
					title.setAttribute("id", "caption_header");
					title.innerHTML=data[i].title;
				/////////////////////////////////////////////////////////////////
				var story=_("div");
					story.setAttribute("id", "caption_body");
					story.innerHTML=data[i].story;
				////////////////////////////////////////////////////////////////
				var hlink=_("div");
					hlink.setAttribute("id", "caption_footer");
					var a=_("a");
					a.href=data[i].href;
					a.innerHTML=data[i].htext;
					hlink.appendChild(a);
				///////////////////////////////////////////////////////////////
				caption.appendChild(title);
				caption.appendChild(story);
				caption.appendChild(hlink);
				////////////////////////////
				car_left.appendChild(img_data);
				car_right.appendChild(caption);
				/********/
				var car_item_next_container=_("div");
				car_item_next_container.setAttribute("class", "car_item_next_container");
				/************/
				car_right.appendChild(car_item_next_container);
				/***********************************************/
				//Thank Jesus for this Algorithm
				//Showing pictures of the next slide items
				var this_next=i+1;
				for(j=0; j<3; j++){
					if(this_next==data.length){
						this_next=0;
					}
					var car_item_next=_("div");
					car_item_next.setAttribute("class", "car_item_next");
					var img_data_next=_("img");
					img_data_next.src=data[this_next].img;
					car_item_next.appendChild(img_data_next);
					car_item_next_container.appendChild(car_item_next);
					this_next++;
				}
				/***********************************************/
				/////////////////////////////////////////////////////////////////
				car_item.appendChild(car_left);
				car_item.appendChild(car_right);
				/////////////////////////////////////////////////////////////////
				carousel_container.appendChild(car_item);
			}
			/*000000000000000000000000000000000000000000000*/
			carousel_container.appendChild(car_prev);
			carousel_container.appendChild(car_next);
			carousel_container.appendChild(carousel_container_spacer);
		}
	}
	xhr.send(null);
}

function autoScrollCar(){
	//at this point car_items.length is correct! ???
	this_car--;
	carousel_container.insertBefore(carousel_container.firstChild, car_items[this_car]);
	if(this_car==0){
		this_car=car_items.length;
	}
}

function pauseCar(){
	//clearInterval(auto_scroll_car);
}

function resumeCar(){
	//autoScrollCar();
}

function getSpo(){
	var xhr;
	var url="json/spo.json";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		//creating the buffer div here creates 3 instances of the same object because the state changes from 0 (initial) to 1, 2 then 3
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;//u don't have to define data as an array like so, var data=new Array - both approaches work, however
				data=JSON.parse(data);//be sure to clear cache after changing JSON file
			for(var i=0; i<1; i++){
				var partner_details=_("div");
					partner_details.setAttribute("class", "partner_details");
				//////////////////////////////////////////////////////////////////
				var partner_logo=_("div");
					partner_logo.setAttribute("class", "partner_logo");
					partner_logo.innerHTML="<img src='"+data[i].logo+"' />";
				///////////partner_logo////////////////////////////////////////////////////
				var partner_summary=_("div");
					partner_summary.setAttribute("class", "partner_summary");
					//////////////////////////
				var partner_name=_("div");
					partner_name.setAttribute("class", "partner_name");
					partner_name.innerHTML=data[i].name;
				////////////////////////////////////////////////////////////////
				var partner_description=_("div");
					partner_description.setAttribute("class", "partner_description");
					partner_description.innerHTML=data[i].desc;
				////////////////////////////////////////////////////////////////
				var partner_more=_("div");
					partner_more.setAttribute("class", "partner_more");
					partner_more.innerHTML="<a href='http://"+data[i].more+"' target='_NEW'>"+data[i].more+"</a>";
				///////////////////////////////////////////////////////////////
				partner_summary.appendChild(partner_name);
				partner_summary.appendChild(partner_description);
				partner_summary.appendChild(partner_more);
				////////////////////////
				partner_details.appendChild(partner_logo);
				partner_details.appendChild(partner_summary);
				$("sponsor_partner").appendChild(partner_details);
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
		if(document.body.clientWidth<=640){
			var dialog_box_width=(win_width-20);
		}
		else{
			dialog_box_width=(win_width*0.5); //measurements are in %
		}
		///////////////////////////////////////////////////////////////
		var dialog_box_overlay=$("dialog_box_overlay");
		dialog_box_overlay.style.display="block";
		///////////////////////////////////////////////////////////////
		var dialog_box=$("dialog_box");
		if(document.body.clientWidth<=640){
			dialog_box.style.left=""+(10)+"px"; //horizontally centre the div
		}
		else{
			dialog_box.style.left=""+(0.5*(win_width-dialog_box_width))+"px"; //horizontally centre the div
		}
		dialog_box.style.top=""+(0.1*win_height)+"px";
		dialog_box.style.display="block";
		dialog_box.style.width=""+dialog_box_width+"px";
		///////////////////////////////////////////////////////////////
		$("dialog_box_head").appendChild(this.tit);
		$("dialog_box_body").appendChild(this.frm);
		$("dialog_box_body").appendChild(this.sbj);
		$("dialog_box_body").appendChild(this.bod);
		$("dialog_box_foot").appendChild(this.fot);
		var spacer=_("div");
		spacer.setAttribute("id", "dialog_foot_spacer");
		$("dialog_box_foot").appendChild(spacer);
	}
	this.done=function(){
		$("dialog_box").style.display="none";
		$("dialog_box_overlay").style.display="none";
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

function getKey(e){
	var key=e.keyCode;
	//find a way of the user not escaping this when initial content is loading
	if(window.msg_dialog && key==27){//pressing escape key
		//it is very important to call this method after checking if it's object exists
		msg_dialog.done();
	}
	if(window.buffer && key==27){//if it exists
		buffer.done();//find a way of the user not escaping this when initial content is loading
	}
}

function sendMsg(){
	var xhr;
	var url="inc/fun.php?send_msg";
	var frm=$("frm").value;
	var sbj=$("sbj").value;
	var msg=$("msg_area").innerHTML;
	var fd="frm="+frm+"&sbj="+sbj+"&msg="+msg+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			buffer.done();
			var data=xhr.responseText;
			data=JSON.parse(data);
			var ret=data.ret;
			if(ret=="0"){//problem with email address
				$("frm").value=frm_placeholder;//remove any junk and reset field
				$("frm").style.color="#F00";
			}
			if(ret=="1"){//problem with message area
				msg_area.innerHTML=msg_placeholder;
				msg_area.style.color="#F00";
			}
			if(ret=="2"){//message sent successfully
				buffer.render();
				buffer.innerHTML="Message Sent Successfully";
				buffer.style.background="rgb(140, 198, 63)";
				if(navigator.userAgent.indexOf("MSIE")<0){
					buffer.style.background="rgba(140, 198, 63, 0.75)";
				}
				//then fade out dialog box and buffer after about 1 seconds
				setTimeout(function (){msg_dialog.done();buffer.done();}, 1000);
			}
			if(ret=="3"){//something went wrong - message not sent
				buffer.render();
				buffer.innerHTML="Something Went Wrong";
				setTimeout(function (){msg_dialog.done();buffer.done();}, 1000);
			}
		}
	}
	xhr.send(fd);
}

function Buffer(){
	return _("div");
}