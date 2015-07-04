<?php
?>
<select name="to_year" id="to_year">
  <option value="0" selected="selected">-- Year --</option>
  <?php
  $this_year=date('Y');//we're calculating minimum year - applicant must be between 13 and 100
  $min_year=$this_year-13;
  $max_year=$this_year-100;
  $i=$max_year;
    while($i<=$min_year){//for loop doesn't initialize at high values! shocked!
      ?>
      <option value="<?php echo "".$i."" ?>"><?php echo $i ?></option>
      <?php
      $i++;
    }
  ?>
  </select>
  <!--end of year-->
  <select name="to_month" id="to_month">
  <option value="0" selected="selected">-- Month --</option>
  <?php
  require_once("cnf.php");
    $q=mysqli_query($conn, "select id, name from month order by id asc");
    while($r=mysqli_fetch_assoc($q)){
      ?>
      <option value="<?php echo "".$r['id']."" ?>"><?php echo $r['name'] ?></option>
      <?php
    }
  ?>
  </select>
  <!--end of month-->
  <select name="to_month_day" id="to_month_day">
  <option value="0" selected="selected">-- Day --</option>
  <!--we shall append days when month is selected-->
  </select>
  <!--end of month day-->
<?php
?>
