window.onload=initAll;
function initAll(){
	//window.innerWidth != document.body.clientWidth
	//window.innerWidth corresponds to css view port width
	//alert("window.innerWidth: "+window.innerWidth+" & document.body.clientWidth: "+document.body.clientWidth);
	if(document.getElementById("mobile_menu_icon")){
		document.getElementById("mobile_menu_icon").addEventListener("click", function(){
			document.getElementById("mobile_menu_container").style.display="block";
		}, false);
	}
	if(document.getElementById("menu_drawer_cancel")){
		document.getElementById("menu_drawer_cancel").addEventListener("click", function(){
			document.getElementById("mobile_menu_container").style.display="none";
		}, false);
	}
	var vw=window.innerWidth;
	var y;
	window.onscroll=function(){
		y=window.pageYOffset;
		//console.log(y);
		//desktop
		if(y>=50 && vw>=980){
			document.getElementById("banner").style.boxShadow="0 5px 5px rgba(0, 0, 0, 0.2)";
			document.getElementById("banner").style.background="rgba(255, 255, 255, 0.99)";
			document.getElementById("st0").style.fill="#221E20";
			document.getElementById("st1").style.fill="#4963AE";
			document.getElementById("st2").style.fill="#46156A";
			document.getElementById("st3").style.fill="#00853D";
			document.getElementById("st4").style.fill="#F58025";
			document.getElementById("st5").style.fill="#FF0000";
			document.getElementById("st6").style.fill="#46156A";
			document.getElementById("logo").addEventListener("mouseover", function(){
				document.getElementById("st0").style.fill="#FC0";
				document.getElementById("st1").style.fill="#FC0";
				document.getElementById("st2").style.fill="#FC0";
				document.getElementById("st3").style.fill="#FC0";
				document.getElementById("st4").style.fill="#FC0";
				document.getElementById("st5").style.fill="#FC0";
				document.getElementById("st6").style.fill="#FC0";
			}, false);
			document.getElementById("logo").addEventListener("mouseout", function(){
				document.getElementById("st0").style.fill="#221E20";
				document.getElementById("st1").style.fill="#4963AE";
				document.getElementById("st2").style.fill="#46156A";
				document.getElementById("st3").style.fill="#00853D";
				document.getElementById("st4").style.fill="#F58025";
				document.getElementById("st5").style.fill="#FF0000";
				document.getElementById("st6").style.fill="#46156A";
			}, false);
			var links=document.getElementById("banner").getElementsByTagName("a");
			for(var i=0; i<links.length; i++){
				links[i].style.color="#555";
				links[i].addEventListener("mouseover", function(){
					this.style.borderBottom="3px solid #555";
				});
				links[i].addEventListener("mouseout", function(){
					this.style.borderBottom="none";
				});
			}
		}
		//mobile
		else if(y>=50 && vw<=640){
			document.getElementById("banner").style.boxShadow="0 5px 5px rgba(0, 0, 0, 0.2)";
			document.getElementById("banner").style.background="rgba(255, 255, 255, 0.99)";
			document.getElementById("st0").style.fill="#221E20";
			document.getElementById("st1").style.fill="#4963AE";
			document.getElementById("st2").style.fill="#46156A";
			document.getElementById("st3").style.fill="#00853D";
			document.getElementById("st4").style.fill="#F58025";
			document.getElementById("st5").style.fill="#FF0000";
			document.getElementById("st6").style.fill="#46156A";
			document.getElementById("mobile_menu_icon").style.fill="#555";
			document.getElementById("mobile_menu_icon").addEventListener("mouseover", function(){
				this.style.fill="#FC0";
			}, false);
			document.getElementById("mobile_menu_icon").addEventListener("mouseout", function(){
				this.style.fill="#555";
			}, false);
			document.getElementById("logo").addEventListener("mouseover", function(){
				document.getElementById("st0").style.fill="#FC0";
				document.getElementById("st1").style.fill="#FC0";
				document.getElementById("st2").style.fill="#FC0";
				document.getElementById("st3").style.fill="#FC0";
				document.getElementById("st4").style.fill="#FC0";
				document.getElementById("st5").style.fill="#FC0";
				document.getElementById("st6").style.fill="#FC0";
			}, false);
			document.getElementById("logo").addEventListener("mouseout", function(){
				document.getElementById("st0").style.fill="#221E20";
				document.getElementById("st1").style.fill="#4963AE";
				document.getElementById("st2").style.fill="#46156A";
				document.getElementById("st3").style.fill="#00853D";
				document.getElementById("st4").style.fill="#F58025";
				document.getElementById("st5").style.fill="#FF0000";
				document.getElementById("st6").style.fill="#46156A";
			}, false);
			//alert("Add Background");
		}
		//tablet
		else if(y>=50 && vw>640 && vw<980){
			document.getElementById("banner").style.boxShadow="0 5px 5px rgba(0, 0, 0, 0.2)";
			document.getElementById("banner").style.background="rgba(255, 255, 255, 0.99)";
			document.getElementById("st0").style.fill="#221E20";
			document.getElementById("st1").style.fill="#4963AE";
			document.getElementById("st2").style.fill="#46156A";
			document.getElementById("st3").style.fill="#00853D";
			document.getElementById("st4").style.fill="#F58025";
			document.getElementById("st5").style.fill="#FF0000";
			document.getElementById("st6").style.fill="#46156A";
			document.getElementById("logo").addEventListener("mouseover", function(){
				document.getElementById("st0").style.fill="#FC0";
				document.getElementById("st1").style.fill="#FC0";
				document.getElementById("st2").style.fill="#FC0";
				document.getElementById("st3").style.fill="#FC0";
				document.getElementById("st4").style.fill="#FC0";
				document.getElementById("st5").style.fill="#FC0";
				document.getElementById("st6").style.fill="#FC0";
			}, false);
			document.getElementById("logo").addEventListener("mouseout", function(){
				document.getElementById("st0").style.fill="#221E20";
				document.getElementById("st1").style.fill="#4963AE";
				document.getElementById("st2").style.fill="#46156A";
				document.getElementById("st3").style.fill="#00853D";
				document.getElementById("st4").style.fill="#F58025";
				document.getElementById("st5").style.fill="#FF0000";
				document.getElementById("st6").style.fill="#46156A";
			}, false);
			var links=document.getElementById("banner").getElementsByTagName("a");
			for(var i=0; i<links.length; i++){
				links[i].style.color="#555";
				links[i].addEventListener("mouseover", function(){
					this.style.borderBottom="3px solid #555";
				});
				links[i].addEventListener("mouseout", function(){
					this.style.borderBottom="none";
				});
			}
			//alert("Add Background");
		}
		else{//less
			//alert("Remove Background");
			document.getElementById("banner").style.boxShadow="none";
			document.getElementById("banner").style.background="none";
			document.getElementById("st0").style.fill="#FFF";
			document.getElementById("st1").style.fill="#FFF";
			document.getElementById("st2").style.fill="#FFF";
			document.getElementById("st3").style.fill="#FFF";
			document.getElementById("st4").style.fill="#FFF";
			document.getElementById("st5").style.fill="#FFF";
			document.getElementById("st6").style.fill="#FFF";
			document.getElementById("mobile_menu_icon").style.fill="#FFF";
			document.getElementById("logo").addEventListener("mouseover", function(){
				document.getElementById("st0").style.fill="#FC0";
				document.getElementById("st1").style.fill="#FC0";
				document.getElementById("st2").style.fill="#FC0";
				document.getElementById("st3").style.fill="#FC0";
				document.getElementById("st4").style.fill="#FC0";
				document.getElementById("st5").style.fill="#FC0";
				document.getElementById("st6").style.fill="#FC0";
			}, false);
			document.getElementById("logo").addEventListener("mouseout", function(){
				document.getElementById("st0").style.fill="#FFF";
				document.getElementById("st1").style.fill="#FFF";
				document.getElementById("st2").style.fill="#FFF";
				document.getElementById("st3").style.fill="#FFF";
				document.getElementById("st4").style.fill="#FFF";
				document.getElementById("st5").style.fill="#FFF";
				document.getElementById("st6").style.fill="#FFF";
			}, false);
			document.getElementById("mobile_menu_icon").addEventListener("mouseover", function(){
				this.style.fill="#FC0";
			}, false);
			document.getElementById("mobile_menu_icon").addEventListener("mouseout", function(){
				this.style.fill="#FFF";
			}, false);
			if(vw>640){
				var links=document.getElementById("banner").getElementsByTagName("a");
				for(var i=0; i<links.length; i++){
					links[i].style.color="#FFF";
					links[i].addEventListener("mouseover", function(){
						this.style.borderBottom="3px solid #FFF";
					});
					links[i].addEventListener("mouseout", function(){
						this.style.borderBottom="none";
					});
				}
			}
		}
		///
	}
}

function $(x){
	return document.getElementById(x);
}

function _(x){
	return document.createElement(x);
}
