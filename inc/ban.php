<header id="banner">
    <div class="wrapper">
        <div id="logo"><a href="./"><?php echo file_get_contents("gra/logo.svg"); ?></a></div>
    	<div id="short_name">
        	<?php //echo $short_name; ?>
        </div>
        <nav id="menu">
        	<ul>
              <li><a href="./volunteer">VOLUNTEER</a></li>
              <li><a href="./projects">PROJECTS</a></li>
              <li><a href="./donate">DONATE</a></li>
              <li><a href="./staff">ABOUT</a></li>
              <li><a href="./contact">CONTACT</a></li>
            </ul>
        </nav>
        <!--Begin Mobile Menu-->
        <nav id="mobile_menu">
            <div><?php echo file_get_contents("gra/ic_menu.svg"); ?></div>
            <div id="mobile_menu_container">
              <div id="menu_drawer_cancel"><?php echo file_get_contents("gra/ic_cancel.svg"); ?></div>
                <ul>
                  <li><a href="./volunteer">VOLUNTEER</a></li>
                  <li><a href="./projects">PROJECTS</a></li>
                  <li><a href="./donate">DONATE</a></li>
                  <li><a href="./staff">ABOUT</a></li>
                  <li><a href="./contact">CONTACT</a></li>
                </ul>
                <div class="spacer"></div>
            </div>
            <div class="spacer"></div>
        </nav>
        <!--End Mobile Menu-->
        <div class="spacer"></div>
    </div>
</header>
