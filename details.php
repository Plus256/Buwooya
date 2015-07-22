<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<div id="program_details">
    <div class="wrapper">
      <div id="details_title" class="text_title">
        PROGRAM DETAILS
        <div style="font-size:50%; color:#A1A1A1">or</div>
        <a href="apply.php">Apply Now</a>
      </div>
      <div id="details_body">
        <!--program details and fees loaded here via JS-->
        <script type="text/javascript">
            getDetails();
        </script>
      </div>
      <div class="spacer"></div>
    </div>
</div>
<?php
require_once("inc/fot.php");
?>
