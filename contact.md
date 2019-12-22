---
layout: page
title: Contact us
subtitle: Want to send us an email? Have an inquiry? Just fill the form below and we'll get back to you as soon as possible.
---

<form name="contact" method="POST" data-netlify="true" class="ui form" data-netlify-recaptcha="true">
  <div class="field">
    <label for="name">Your name <i class="asterisk small red icon"></i></label>
    <input type="text" name="name" placeholder="John Doe" required>
  </div>
  <div class="field">
    <label for="email">Your email <i class="asterisk small red icon"></i></label>
    <input type="email" name="email" placeholder="john@doe.net" required>
  </div>
  <div class="field">
    <label for="subjet">Subject <i class="asterisk small red icon"></i></label>
    <select name="subjet" class="ui selection dropdown">
      <option value="mrbear">Something related to the Bear Pride, Mr Bear Luxembourg ...</option>
      <option value="events">Something about the events in Luxembourg</option>
      <option value="non-profit">Something about the non-profit internal work</option>
      <option value="legal">I'm a lawyer or assimilated and I need to get in touch with the representant</option>
      <option value="others">Something else...</option>
    </select>
  </div>
  <div class="field">
    <label for="message">Your message <i class="asterisk small red icon"></i></label>
    <textarea name="message" placeholder="Type your message here" required></textarea>
  </div>
  <p>The <i class="asterisk small red icon"></i>indicate a mandatory fields.</p>
  <button class="ui right blue labeled icon button" type="submit">Send <i class="paper plane icon"></i></button>
</form>
