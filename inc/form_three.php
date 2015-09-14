<form method="post" id="form_three">
    <div class="apply_form_timeline">
      <a href="#" class="apply_form_timeline_step" onclick="getForm('one'); return false;">Personal</a>
      <a href="#" class="apply_form_timeline_step" onclick="getForm('two'); return false;">Trip</a>
      <a href="#" class="apply_form_timeline_step" style="background:#A6CE39; color:#FFF;" onclick="return false;">Background</a>
      <a href="#" class="apply_form_timeline_step" onclick="return false;">Review</a>
      <div class="spacer"></div>
    </div>
    <div class="apply_form_inputs">

      <div id="family_background" class="form_inputs_subsection">
        <div id="family_background_title" class="form_inputs_subsection_title">Family</div>
        <div id="family_background_body">
          <div><textarea placeholder="Tell us about your Family" name="about_family"></textarea></div>
          <div><textarea placeholder="What was their reaction to your application?" name="family_reaction"></textarea></div>
          <div class="spacer"></div>
        </div>
        <div class="spacer"></div>
      </div>

      <div id="church_background" class="form_inputs_subsection">
        <div id="church_background_title" class="form_inputs_subsection_title">Church</div>
        <div id="church_background_body">
          <div><input type="text" placeholder="Name" name="" /></div>
          <div><input type="text" placeholder="Street Address" name="" /></div>
          <div><textarea placeholder="What was their reaction to your application?" name="church_reaction"></textarea></div>
          <div class="spacer"></div>
        </div>
        <div class="spacer"></div>
      </div>

      <div id="personal_background" class="form_inputs_subsection">
        <div id="personal_background_title" class="form_inputs_subsection_title">Yourself!</div>
        <div id="personal_background_body">
          <div><textarea placeholder="Tell us about you and your Christian Walk." name="about_you"></textarea></div>
          <div><textarea placeholder="How did you hear about Buwooya?" name="how_you_heard"></textarea></div>
          <div><textarea placeholder="Do you have experience in Youth, Children, or relevant Christian work?" name="previous_experience"></textarea></div>
          <div><textarea placeholder="Why are you interested in this trip?" name="why_interest"></textarea></div>
          <div class="spacer"></div>
        </div>
        <div class="spacer"></div>
      </div>

      <div id="qn_background" class="form_inputs_subsection">
        <div id="qn_background_title" class="form_inputs_subsection_title">Any Questions?</div>
        <div id="qn_background_body">
          <div><textarea placeholder="Do you have anything you'd like to know before coming?" name="any_qn"></textarea></div>
          <div class="spacer"></div>
        </div>
        <div class="spacer"></div>
      </div>

      <div id="medical_criminal" class="form_inputs_subsection">
        We may request a Medical and/or Criminal Report before approving your application!
      </div>

        <div class="spacer"></div>
    </div>
    <div class="form_feedback">form_feedback</div>
    <div class="term_note">
        Continuing implies you agree with our <a href="#">Statement of Faith</a>, Terms and Conditions.
    </div>
    <div class="back_or_cancel_but_cont">
      <a href="#" class="cancel_but">Cancel</a>
    </div>
    <div id="apply_submit_but_cont"><input type="button" value="SAVE & REVIEW" class="apply_submit_but" onclick="getForm('review');" /></div>
</form>
