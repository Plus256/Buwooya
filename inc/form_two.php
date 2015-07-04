<form method="post" id="form_two">
    <div class="apply_form_title">
        <div style="padding:10px;">Step 2 of 3</div>
        <div style="padding:10px;">Trip</div>
    </div>
    <div class="apply_form_inputs">

        <div id="ug_ky" class="form_inputs_subsection">
          <div id="ug_ky_title" class="form_inputs_subsection_title">Welcome to Africa!</div>
          <div id="ug_ky_body">
            Uganda and Kenya are third-world countries and do not have all the food and amenities you may be used to!<br />
            You should be prepared to live and eat as the nationals do when called upon.
          </div>
          <div class="spacer"></div>
        </div>

        <div id="trip_period" class="form_inputs_subsection">
          <div id="trip_period_title" class="form_inputs_subsection_title">Period</div>
          <div id="trip_period_body">
            <div><input type="text" placeholder="From" name="" /></div>
            <div><input type="text" placeholder="To" name="" /></div>
          </div>
          <div class="spacer"></div>
        </div>

        <div id="trip_cost" class="form_inputs_subsection">
          <div id="trip_cost_title" class="form_inputs_subsection_title">Cost</div>
          <div id="trip_cost_body">
            The cost of your trip depends on the length of stay in the country, plus a one-time administration fee of $200.
            <p>Please also note that checks made to Buwooya Childcare Ministries are ultimately donations; therefore we cannot refund money for these trips if you might cance</p>
            We can set aside your donation if you want to postpone your trip to another time.
          </div>
          <div class="spacer"></div>
        </div>

        <div id="trip_interest" class="form_inputs_subsection">
          <div id="trip_interest_title" class="form_inputs_subsection_title">Skills, Experiences, Interests</div>
          <div id="trip_interest_body" style="margin-bottom:10px;">
            <?php
            require_once("cnf.php");
              $q=mysqli_query($conn, "select * from interest order by id asc");
              //$count=0;//am using this to put every 3 items on a separate line
              while($r=mysqli_fetch_assoc($q)){
                //$count++;
                ?>
                <input type="checkbox" id="<?php echo "skill_".$r['id']."" ?>" /><label for="<?php echo "skill_".$r['id']."" ?>" class="radio_label"><?php echo $r['name'] ?></label><br />
                <?php
                //if(($count%3)==0){echo "<br />";}
              }
            ?>
          <div class="spacer"></div>
          </div>
          <div class="spacer"></div>
        </div>

        <div id="trip_refree" class="form_inputs_subsection">
          <div id="trip_refree_title" class="form_inputs_subsection_title">Refrees</div>
          <div id="trip_refree_body">
            <div id="trip_refree_instr" style="margin-bottom:10px;">
              All three are required, one of whom is your church leader.<br />The other two should have known you for at least one year, peers and family excluded.
            </div>
            <div id="refree_list">

              <div class="refree_list_entry">
                <div class="refree_list_entry_title">Church Leader</div>
                <div><input type="text" placeholder="Full Name" name="" /></div>
                <div><input type="text" placeholder="Email Address" name="" /></div>
                <div><input type="text" placeholder="Phone Number" name="" /></div>
                <div class="spacer"></div>
              </div>

              <div class="refree_list_entry">
                <div class="refree_list_entry_title">First Other</div>
                <div><input type="text" placeholder="Full Name" name="" /></div>
                <div><input type="text" placeholder="Email Address" name="" /></div>
                <div><input type="text" placeholder="Phone Number" name="" /></div>
                <div class="spacer"></div>
              </div>

              <div class="refree_list_entry">
                <div class="refree_list_entry_title">Second Other</div>
                <div><input type="text" placeholder="Full Name" name="" /></div>
                <div><input type="text" placeholder="Email Address" name="" /></div>
                <div><input type="text" placeholder="Phone Number" name="" /></div>
                <div class="spacer"></div>
              </div>

              <div class="spacer"></div>
            </div>
          </div>
          <div class="spacer"></div>
        </div>

        <div class="spacer"></div>
    </div>
    <div class="form_feedback">form_feedback</div>
    <div class="term_note">
        Continuing implies you agree with our <a href="#">Statement of Faith</a>, Terms and Conditions.
    </div>
    <div class="back_or_cancel_but_cont">
        <a href="#" class="back_but" onclick="getForm('one'); return false;">&lt;</a>
        <a href="#" class="cancel_but">Cancel</a>
    </div>
    <div id="apply_submit_but_cont"><input type="button" value="SAVE & CONTINUE" class="apply_submit_but" onclick="getForm('three');" /></div>
</form>
