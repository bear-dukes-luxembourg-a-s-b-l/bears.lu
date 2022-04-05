---
layout: page
title: Bear Pride Luxembourg 2022
subtitle: 14-15-16th Oct.
menu:
  header:
    identifier: bearpride
    weight: 3

---
We are happy to be able to restart all those community events. Drinks, Restaurants and even parties are allowed again.

<a href="https://www.facebook.com/events/3195090970815289/" class="ui facebook button"><i class="facebook icon"></i> Entire weekend event</a>
<!-- <a href="https://tickets.bears.lu/e/23/bear-pride-luxembourg-2019?ref=site" class="ui brown button"><i class="ticket alternate  icon"></i> Entire weekend pass (with discount)</a> -->

## Schedule

<div class="ui stackable three column grid">
<div class="column">
<h3>Friday 14th</h3>
{% for event in site.data.events.vendredi %}
{% include _event-details.html %}
{% endfor %}
<!--<div class="ui floating message">
<div class="header"><i class="icon hotel"></i> Need an hotel?</div>
<p>Our partner, <a href="http://melia.lu" title="See our partner">Melia Luxembourg</a>, offer you a <em>room for 2 without breakfast for 90€/night</em>. It's close to the city center, got their own tram station and is 10min from city center by public transportation.</p>
<p>Use the code <a href="https://airtable.com/shrhhsIN0QdxTbVw3">this form</a> to make your booking and they'll get back to you ASAP.</p>
</div>-->
</div>
<div class="column">
<h3>Saturday 15th</h3>
{% for event in site.data.events.samedi %}
{% include _event-details.html %}
{% endfor %}

</div>
<div class="column">
<h3>Sunday 16th</h3>
{% for event in site.data.events.dimanche %}
{% include _event-details.html %}
{% endfor %}
<!-- <div class="ui message">
<div class="header">Saunas</div>
<p><a href="http://zenhit.be" title="Gay Wellness Sauna in Luxembourg">Zenhit Sauna</a> organise a <a href="https://www.facebook.com/events/728419207585197/" title="See the event on facebook"><i class="icon facebook"></i>After Bear Sunday</a> after each <a href="http://woofmenonly.com" title="The men-only gay party for kinkster and bears">Woof men-only party</a> in Luxembourg. Only 5€ entry.</p>
</div> -->

</div>
</div>

{%- if site.data.candidates > 0 -%}

## Mr Bear Election Candidates

<div class="ui stackable four columns grid">
{%- for candidate in site.data.candidates -%}
<div class="column">
<div class="ui fluid card">
<div class="image">
<img src="{{candidate.photos\[1\]}}" alt="">
</div>
<div class="content">
<div class="header">{{candidate.firstname}}</div>
<div class="meta">{{candidate.dob | date: "%Y"}}</div>
<div class="description">{{candidate.about | markdownify}}</div>
</div>
</div>
</div>

{%- endfor -%}

</div>

<div class="ui message info">
<div class="header">How to vote?</div>
<p>We don't have online voting because it's too easy to cheat. Every bear contest who tried to put one in place experimented it. So we just don't.<br>
Instead, you have to come and meet, in real life, face to face, the candidates. We think it's more interesting than just a like race over the internet. When you arrive at the party, you'll get a voting toket (a coin) which you'll be able to use to vote for your favorite candidate when the voting will be open. You'll have only one, no more, even if you "lose" it.</p>
</div>
{%- endif -%}

<!-- <div class="ui message info">The application are closed. Discover the contestant soon here. </div>-->

## Want to be the next Mr Bear Luxembourg ?

<a href="https://tally.so/r/wbJ46w" class="ui brown button">Fill the application form online</a>

## Sponsoring

<div class="ui message">
We are always looking for sponsors and offering a wide range of compensation. You can checkout the <a href="https://docs.google.com/document/d/e/2PACX-1vQJip54iVy5ryeDAR_27EH07-7hl0aUwIReRTd1Er0H7XNZhpztbgDvcnUJ3OLxNnvq-OxXTm6JtjRf/pub" title="Sponsoring documentation">Sponsoring documentation</a> to know everything about the metrics of the events, the differents sponsoring opportunities ...
</div>

{%- if site.data.sponsors.gold.size > 0 -%}

### Gold Sponsors

They are kindly sponsor the entire weekend.

<div class="ui medium rounded images">
{% for sponsor in site.data.sponsors.gold %}
<a href="{{sponsor.url}}" title="{{sponsor.title}}"><img src="{{sponsor.image}}" alt="{{sponsor.name}}" class="ui image"></a>
{% endfor %}
</div>
{%- endif -%}
{%- if site.data.sponsors.silver.size > 0 -%}

### Silver sponsors

They are offering prizes for the Mr. Bear Luxembourg candidates.

<div class="ui tiny images">
{% for sponsor in site.data.sponsors.silver %}
<a href="{{sponsor.url}}" title="{{sponsor.title}}"><img src="{{sponsor.image}}" alt="{{sponsor.name}}" class="ui image"></a>
{% endfor %}
</div>
{%- endif -%}
{%- if site.data.sponsors.media.size > 0 -%}

#### Communication sponsors

They are helping us to raise awarness about our events.

<div class="ui mini images">
{% for sponsor in site.data.sponsors.media %}
<a href="{{sponsor.url}}" title="{{sponsor.title}}"><img src="{{sponsor.image}}" alt="{{sponsor.name}}" class="ui image"></a>
{% endfor %}

</div>
{%- endif -%}
<small>[Sponsoring T&C](https://docs.google.com/document/d/e/2PACX-1vRiHgdxO-wmB5S4NaAdCm4oLEZPC95LRDyx2kJgEE3jtC9QR11ku3sn3SXS03O47ErFz2byoaw7F3ky/pub)</small>

<!-- ## Where to find ...

So, for the new ones as the bears who already know our lovely capital city, here's a map where we gather the venues of the evens, bars & restaurants we love, cool shops, nice art & culture venues and some usefull grocery shops and hotels in the city.

Don't miss our special partnership with Melia Luxembourg Hotel!

<i class="info circle blue icon"></i>click on the drawer symbol (1st icon on the title bar of the map) to show the menu with the categories.

<iframe src="https://www.google.com/maps/d/u/1/embed?mid=1Y5-12S01_kVDaGj8hVwH4rOFlIORfDgS" width="760" height="480" style="border:none"></iframe> -->