function getDetails(detail_cat){
  $("details_body").style.textAlign="center";
	$("details_body").innerHTML="...Loading Details";
	var xhr;
	var url="inc/"+detail_cat+"_details.php";//dynamic file names
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
      $("details_body").style.textAlign="left";
			$("details_body").innerHTML=data;
		}
	}
	xhr.send(null);
}
