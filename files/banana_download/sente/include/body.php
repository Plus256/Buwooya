<?php
require_once("include/method.php");
?>
<div id="body">
	<div class="wrapper">
    <?php

	//logged in
	if(!empty($_SESSION['logged'])){
		$user=$_SESSION['logged'];
		//main menu
		?>
        <div id="main_menu">
        	<ul id="menu">
                <li class="first"><a href="<?php echo $_SERVER['PHP_SELF'] ?>">Dashboard</a></li>
                <li id="SalesOrder"><a href="<?php echo $_SERVER['PHP_SELF'] ?>?option=SalesOrder">Sales</a></li>
                <?php //Analytics help give you interesting and useful insights into your business
				if($_SESSION['level']==1){//only admins can access this module
				?>
                <li id="Product"><a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Product">Products</a></li>
                <li id="PurchaseOrder"><a href="<?php echo $_SERVER['PHP_SELF'] ?>?option=PurchaseOrder">Purchases</a></li>
                <li id="Analytics"><a href="<?php echo $_SERVER['PHP_SELF'] ?>?option=Analytics">Analytics</a></li>
                <li id="User"><a href="<?php echo $_SERVER['PHP_SELF'] ?>?option=User">Users</a></li>
                <?php
				}
				?>
            </ul>
            <ul id="details">
            	<li><a href="logout.php">Log Out</a></li>
            	<li><?php echo ucwords($_SESSION['logged']) ?></li>
            </ul>
        	<div class="spacer"></div>
        </div>
        <?php

		//option chosen
		if(isset($_GET['option'])){
			//section below main menu. has controls for the chosen module/option
			?>
            <div id="cpanel_inner">
            	<!--holds the navigation links-->
                <div id="cpanel_inner_left" class="cpanel_inner_child">
                    <div id="cpanel_inner_left_logo">
                    </div>
                    <div id="cpanel_inner_left_option">
                    </div>
                    <div id="cpanel_inner_left_name">
	                    <div><?php echo $notice; ?></div>
                    	<div><a href="http://www.plus256.com" target="_NEW"><?php echo $network; ?></a></div>
                        <div><?php echo $slogan; ?></div>
                    </div>
                    <div id="cpanel_inner_left_links">
                    </div>
                </div>
                <!--end of the navigation links-->
                <!--main middle section-->
                <div id="cpanel_inner_main" class="cpanel_inner_child">
                	<div id="cpanel_inner_main_options">
                    	<!--holds the buttons-->
                    	<div id="cpanel_inner_main_options_options">
                    	</div>
                        <!--holds the search area-->
                        <div id="cpanel_inner_main_options_search">
                    	</div>
                    </div>
                    <div id="cpanel_inner_main_main">
                    </div>
                </div>
                <!--end of main middle section-->
                <div class="spacer"></div>
            </div>
            <?php
		}
		//no option chosen, dashboard
		else{
		?>
        <div id="cpanel">	
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=SalesOrder" class="cpanel_left_item">
                <div>
                    <div class="icon" id="order_icon"></div><div class="icon_label">Sales</div>
                </div>
            </a>
            
            <?php
            if($_SESSION['level']==1){//only admins can access this module
            ?>

            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Product" class="cpanel_left_item">
                <div>
                    <div class="icon" id="products_icon"></div><div class="icon_label">Products</div>
                </div>
            </a>
            
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=PurchaseOrder" class="cpanel_left_item">
                <div>
                    <div class="icon" id="purchaseorder_icon"></div><div class="icon_label">Purchases</div>
                </div>
            </a>
            
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Analytics" class="cpanel_left_item">
                <div>
                    <div class="icon" id="analysis_icon"></div><div class="icon_label">Analytics</div>
                </div>
            </a>
            
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=User" class="cpanel_left_item">
                <div>
                    <div class="icon" id="user_icon"></div><div class="icon_label">Users</div>
                </div>
            </a>

            <?php
            }
            ?>
            <div class="spacer"></div>
        </div>
        <?php
		}
		?>
        <div id="clr">
        </div>
        <?php
	}

	//login attempt
	elseif(isset($_POST['log'])){
		$uname=mysql_real_escape_string($_POST['uname']);
		$pwd=mysql_real_escape_string($_POST['pwd']);
		$hash=hash('sha256', $pwd);
		$q=mysql_query("select * from user where uname='$uname'");
		if(mysql_num_rows($q)<1){
			$err="Verify Credentials";
			header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
		}
		else{
			$q=mysql_query("select * from user where hash='$hash' and uname='$uname'");
			if(mysql_num_rows($q)>0){
				$r=mysql_fetch_assoc($q);
				$_SESSION['logged']=$r['name'];
				$_SESSION['level']=$r['level'];
				header('Location: '.$_SERVER['PHP_SELF'].'');
			}
			else{
				$err="Wrong Password";
				header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
			}
		}

	}
	//no login attempt
	else{

		?>
        <div id="home_info" class="home">
        	<div id="home_info_wrapper">
                <div id="tagline">
                    <?php echo $tagline; ?>
                </div>
                <div id="notice">
                    <?php echo $notice; ?>
                </div>
                <div id="logo">
                    <img src="<?php echo $profile; ?>" />
                </div>
                <div id="name">
                    <?php echo $plus256; ?>&trade;
                </div>
                <div id="slogan">
                    <?php echo $slogan; ?>
                </div>
                 <div id="contact">
                  	<div id="location" class="contact"><?php echo $location; ?></div>
                    <div id="tel" class="contact"><?php echo $tel; ?></div>
                    <div id="mail" class="contact"><?php echo $mail; ?></div>
                </div>
                <div id="description">
                    <?php echo $description; ?>
                </div>
                <div class="spacer"></div>
            </div>
		</div>
        <div id="sign_in" class="home">
        <?php

		$q=mysql_query("select * from user");

		//first time account setup
		if(mysql_num_rows($q)<1){
			echo "<div>";
				echo "Let's set up your account first!";
			echo "</div>";
			?>
            <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
					<?php
					if(isset($_GET['err'])){
						echo "<div id=\"err\">";
							echo $_GET['err'];
						echo "</div>";
					}
					?>
                    <div>
                    <?php
					if(isset($_POST['s_up'])){
						$name=mysql_real_escape_string($_POST['name']);
						$uname=mysql_real_escape_string($_POST['uname']);
						$pwd=mysql_real_escape_string($_POST['pwd']);
						$cpwd=mysql_real_escape_string($_POST['cpwd']);
						if(empty($name) || empty($uname) || empty($pwd) || empty($cpwd)){
							$err="All fields are required";
							header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
						}

						else{
							if($pwd!=$cpwd){
							$err="Passwords do not match";
							header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
							}
							else{
								$hash=hash('sha256', $pwd);
								$q=mysql_query("insert into pic (src) values ('logo.png')");
								mysql_query("select last_insert_id() into @pic");
								$q=mysql_query("insert into user (name, uname, pic, hash, level) values ('$name', '$uname', @pic, '$hash', 1)");
								if($q){
									$_SESSION['logged']=$name;
									$_SESSION['level']=1;
									$succ="Account set up successfully";
									header('Location: '.$_SERVER['PHP_SELF'].'?succ='.$succ.'');
								}else{echo mysql_error();}
							}
						}
					}
					?>
                    </div>
					<div>
					<input type="text" placeholder="Enter your Name" name="name" />
					</div>
                    <div>
					<input type="text" placeholder="Username for Login" name="uname" />
					</div>
					<div>
					<input type="password" placeholder="Password" name="pwd" />
					</div>
                    <div>
					<input type="password" placeholder="Confirm Password" name="cpwd" />
					</div>
					<div>
					<input type="submit" value="Sign Up" name="s_up" />
					</div>
					</form>
            <?php
		}

		//an account exists
		else{

			?>
			<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
			<?php
				if(isset($_GET['err'])){
					echo "<div id=\"err\">";
						echo $_GET['err'];
					echo "</div>";
				}
				if(isset($_GET['succ'])){
					echo "<div id=\"succ\">";
						echo $_GET['succ'];
					echo "</div>";
				}
			?>
			<div>
			<input type="text" placeholder="Username" name="uname" class="login_inputs" />
			</div>
			<div>
			<input type="password" placeholder="Password" name="pwd" class="login_inputs" />
			</div>
			<div>
			<input type="submit" value="Log In" name="log" />
			</div>
			</form>
		</div>
            <?php
		}
	}
	?>
    </div>
    <div class="spacer"></div>
</div>