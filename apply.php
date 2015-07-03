<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<div id="application_form">
    <div class="wrapper">
        <div id="application_title" class="text_title">
            VOLUNTEER APPLICATION
            <div style="font-size:50%; color:#A1A1A1">or</div>
            <a href="details.php">Program Details</a>
        </div>
        <div id="application_body">
            <!--form sections loaded here via JS-->
            <script type="text/javascript">
                getForm("one");
            </script>
        </div>
        <div class="spacer"></div>
    </div>
</div>
<?php
require_once("inc/fot.php");
?>