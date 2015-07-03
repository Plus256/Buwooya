function getForm(form_cat){
	$("application_body").style.textAlign="center";
	$("application_body").innerHTML="...Loading Form";
	var xhr;
	var url="inc/form_"+form_cat+".php";
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
			$("application_body").style.textAlign="left";
			$("application_body").innerHTML=data;
			if($("birthday_month")){
				$("birthday_month").addEventListener("change", getMonthDays, false);
			}
		}
	}
	xhr.send(null);
}

function getMonthDays(){
	var month_index=this.selectedIndex;//get the selected index and use that - PRAISE JESUS.
	if(month_index!==0){
		var month=this.children[month_index].value;//i only have to point to the selected index and the app is done.
		var xhr;
		var url="inc/fun.php?this_month="+month+"&get_month_days";
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
				//get the returned number of days and create an options list which we shall append to the days list
				var i=1;
				while(i<=data){
					var option=_("option");
					option.setAttribute("value", i);
					option.innerHTML=i;
					$("birthday_month_day").appendChild(option);
					i++;
				}
			}
		}
		xhr.send(null);
	}
	else{
		//default option
		$("birthday_month_day").innerHTML="<option value='0' selected='selected'>-- Day --</option>";
	}
}
