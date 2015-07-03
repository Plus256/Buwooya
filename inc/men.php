<div id="menu">
    <div class="wrapper">
    	<ul>
        <li class="mobile_items">
        	<div class="menu_icon"></div><div class="menu_icon"></div><div class="menu_icon"></div>
            <ul>
                <li onClick="getCar('def');" class="mobile_navigation" id="home_menu_item">Home</li>
                <li onClick="getCar('rom');" class="mobile_navigation">Speakers</li>
                <li onClick="getCar('act');" class="mobile_navigation">Partners</li>
                <li onClick="getCar('abt');" class="mobile_navigation">Activities</li>
                <li onClick="msg_dialog.render()" class="mobile_navigation">Contact</li>
            </ul>
        </li>
        <li class="mobile_items" id="short_name"><?php echo $short_name; ?></li>
        <li class="mobile_items" id="tel"><?php echo $tel; ?></li>
        <li onClick="getCar('def');" class="menu_items" id="home_menu_item">Home</li>
        <li onClick="getCar('rom');" class="menu_items">Speakers</li>
        <li onClick="getCar('act');" class="menu_items">Partners</li>
        <li onClick="getCar('abt');" class="menu_items">Activities</li>
        <li onClick="msg_dialog.render()" id="contact_menu_item" class="contact_items">Contact</li>
        <li id="mob_number" class="contact_items"></li>
        </ul>
        <div class="spacer"></div>
    </div>
</div>