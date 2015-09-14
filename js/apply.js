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
				$("birthday_year").addEventListener("change", getBirthdayMonthDays, false);//in case they select month first
				$("birthday_month").addEventListener("change", getBirthdayMonthDays, false);
			}
			if($("from_month")){
				$("from_year").addEventListener("change", function(){getFromMonthDays(); getFromMonths();}, false);//in case they select month first
				$("from_month").addEventListener("change", getFromMonthDays, false);
			}
			if($("to_month")){
				$("to_year").addEventListener("change", getToMonthDays, false);//in case they select month first
				$("to_month").addEventListener("change", getToMonthDays, false);
			}
		}
	}
	xhr.send(null);
}

function getBirthdayMonthDays(){
	var year_index=$("birthday_year").selectedIndex;
	var year=$("birthday_year").children[year_index].innerHTML;
	var month_index=$("birthday_month").selectedIndex;//get the selected index and use that - PRAISE JESUS.
	if(month_index!==0 && year_index!==0){
		var month=$("birthday_month").children[month_index].value;//i only have to point to the selected index and the app is done.
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
				//first clear available days to default
				$("birthday_month_day").innerHTML="<option value='0' selected='selected'>-- Day --</option>";
				//then insert new days
				var i=1;
				/*FEBRUARY AND LEAP YEARS*/
				if(month_index==2 && (year%4)==0){//we shall write a leapyear function later
					while(i<data){//stop at the 28th day
						var option=_("option");
						option.setAttribute("value", i);
						option.innerHTML=i;
						$("birthday_month_day").appendChild(option);
						i++;
					}
				}
				else{//non leap months and years
					while(i<=data){
						var option=_("option");
						option.setAttribute("value", i);
						option.innerHTML=i;
						$("birthday_month_day").appendChild(option);
						i++;
					}
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

function getFromMonths(){
	var year_index=$("from_year").selectedIndex;
	if(year_index!==0){
		var year=$("from_year").children[year_index].innerHTML;
		var xhr;
		var url="inc/fun.php?this_year="+year+"&get_months";
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
				data=JSON.parse(data);
				$("from_month").innerHTML="<option value='0' selected='selected'>-- Month --</option>";
				for(var i in data){
					var option=_("option");
					option.setAttribute("value", data[i].id);
					option.innerHTML=data[i].name;
					$("from_month").appendChild(option);
				}
			}
		}
		xhr.send(null);
	}
	else{
		//default option
		$("from_month").innerHTML="<option value='0' selected='selected'>-- Month --</option>";
	}
}

function getFromMonthDays(){
	var year_index=$("from_year").selectedIndex;
	var year=$("from_year").children[year_index].innerHTML;
	var month_index=$("from_month").selectedIndex;//get the selected index and use that - PRAISE JESUS.
	if(month_index!==0 && year_index!==0){
		var month=$("from_month").children[month_index].value;//i only have to point to the selected index and the app is done.
		var xhr;
		var url="inc/fun.php?this_month="+month+"&get_from_month_days";
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
				data=JSON.parse(data);//OUR JSON OBJECT CONTAINS THE CURRENT SERVER DATE!
				$("from_month_day").innerHTML="<option value='0' selected='selected'>-- Day --</option>";
				var cur_year=data.year;
				var cur_month=data.month;
				var month_days=data.days;
				var cur_today=data.today;
				if(year==cur_year && month==cur_month){
					var j=cur_today;
					while(j<=month_days){
						var option=_("option");
						option.setAttribute("value", j);
						option.innerHTML=j;
						$("from_month_day").appendChild(option);
						j++;
					}
				}
				else{
					var i=1;
					while(i<=month_days){
					var option=_("option");
					option.setAttribute("value", i);
					option.innerHTML=i;
					$("from_month_day").appendChild(option);
					i++;
				}
			}
			}
		}
		xhr.send(null);
	}
	else{
		//default option
		$("from_month_day").innerHTML="<option value='0' selected='selected'>-- Day --</option>";
	}
}

function getToMonthDays(){
	var year_index=$("to_year").selectedIndex;
	var year=$("to_year").children[year_index].innerHTML;
	var month_index=$("to_month").selectedIndex;//get the selected index and use that - PRAISE JESUS.
	if(month_index!==0 && year_index!==0){
		var month=$("to_month").children[month_index].value;//i only have to point to the selected index and the app is done.
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
				//first clear available days to default
				$("to_month_day").innerHTML="<option value='0' selected='selected'>-- Day --</option>";
				//then insert new days
				var i=1;
				/*FEBRUARY AND LEAP YEARS*/
				if(month_index==2 && (year%4)==0){//we shall write a leapyear function later
					while(i<data){//stop at the 28th day
						var option=_("option");
						option.setAttribute("value", i);
						option.innerHTML=i;
						$("to_month_day").appendChild(option);
						i++;
					}
				}
				else{//non leap months and years
					while(i<=data){
						var option=_("option");
						option.setAttribute("value", i);
						option.innerHTML=i;
						$("to_month_day").appendChild(option);
						i++;
					}
				}
			}
		}
		xhr.send(null);
	}
	else{
		//default option
		$("to_month_day").innerHTML="<option value='0' selected='selected'>-- Day --</option>";
	}
}
