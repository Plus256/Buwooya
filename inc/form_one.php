<form method="post" id="form_one">
    <div class="apply_form_timeline">
        <a href="#" class="apply_form_timeline_step" style="background:#A6CE39; color:#FFF;" onclick="return false;">Personal</a>
        <a href="#" class="apply_form_timeline_step" onclick="return false;">Trip</a>
        <a href="#" class="apply_form_timeline_step" onclick="return false;">Background</a>
        <a href="#" class="apply_form_timeline_step" onclick="return false;">Review</a>
        <div class="spacer"></div>
    </div>
    <div class="apply_form_inputs">
        <div><input type="text" placeholder="First Name" name="" /></div>
        <div><input type="text" placeholder="Last Name" name="" /></div>
        <!--start of sex-->
        <div style="margin-bottom:10px">
            <div style="margin-bottom:10px">Sex</div>
            <div>
                <input type="radio" id="sex_female" value="0" name="sex" /><label for="sex_female" class="radio_label">Female</label>
                <input type="radio" id="sex_male" value="1" name="sex" /><label for="sex_male" class="radio_label">Male</label>
            </div>
            <div class="spacer"></div>
        </div>
        <!--end of sex-->
        <!--start of birhtday-->
        <div style="margin-bottom:10px">
          <div style="margin-bottom:10px">Birthday</div>
          <div>
            <?php require_once("birth_calendar.php"); ?>
          </div>
          <div class="spacer"></div>
        </div>
        <!--start of marital-->
        <div style="margin-bottom:10px">
            <div style="margin-bottom:10px">Marital Status</div>
            <div>
              <input type="radio" id="marital_single" value="0" name="marital" /><label for="marital_single" class="radio_label">Single</label>
              <input type="radio" id="marital_married" value="1" name="marital" /><label for="marital_married" class="radio_label">Married</label>
              <input type="radio" id="marital_divorced" value="2" name="marital" /><label for="marital_divorced" class="radio_label">Divorced</label>
              <input type="radio" id="marital_widowed" value="3" name="marital" /><label for="marital_widowed" class="radio_label">Widowed</label>
            </div>
            <div class="spacer"></div>
        </div>
        <!--end of marital-->
        <div><input type="text" placeholder="Email Address" name="" /></div>
        <div><input type="text" placeholder="Phone Number" name="" /></div>

        <div style="margin-bottom:10px" id="country_section"><!--we are here! catch up from here after some graphic design in the morning-->
          <div style="margin-bottom:10px">Country</div>
          <div>
              <select name="country">
                <option value="0" selected="selected">-- Country of Residence --</option>
                <?php
                require_once("cnf.php");
                  $q=mysqli_query($conn, "select id, name from country order by name asc");
                  while($r=mysqli_fetch_assoc($q)){
                    ?>
                    <option value="<?php echo "".$r['id']."" ?>"><?php echo $r['name'] ?></option>
                    <?php
                  }
                ?>
              </select>
              <!--end of month-->
          </div>
          <div class="spacer"></div>
        </div>

        <div><input type="text" placeholder="Street Address" name="" /></div>
        <div><input type="text" placeholder="City/State" name="" /></div>
        <div><input type="text" placeholder="Zip/Postal Code" name="" /></div>
        <div class="spacer"></div>
    </div>
    <div class="form_feedback">form_feedback</div>
    <div class="term_note">
        Continuing implies you agree with our <a href="#">Statement of Faith</a>, Terms and Conditions.
    </div>
    <div class="back_or_cancel_but_cont">
        <a href="#" class="cancel_but">Cancel</a>
        <div class="spacer"></div>
    </div>
    <div id="apply_submit_but_cont"><input type="button" value="SAVE & CONTINUE" class="apply_submit_but" onclick="getForm('two');" /></div>
</form>
