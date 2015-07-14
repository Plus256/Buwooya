<?php
?>
<select name="from_year" id="from_year">
  <option value="0" selected="selected">-- Year --</option>
  <?php
  $this_year=date('Y');//we're calculating minimum year - applicant must be between 13 and 100
  $min_year=$this_year;
  $max_year=$this_year+10;
  $i=$min_year;
    while($i<=$max_year){//for loop doesn't initialize at high values! shocked!
      ?>
      <option value="<?php echo "".$i."" ?>"><?php echo $i ?></option>
      <?php
      $i++;
    }
  ?>
  </select>
  <!--end of year-->
  <select name="from_month" id="from_month">
  <option value="0" selected="selected">-- Month --</option>
  <!--we're adding months dynamically this time-->
  </select>
  <!--end of month-->
  <select name="from_month_day" id="from_month_day">
  <option value="0" selected="selected">-- Day --</option>
  <!--we shall append days when month is selected-->
  </select>
  <!--end of month day-->
<?php
?>
