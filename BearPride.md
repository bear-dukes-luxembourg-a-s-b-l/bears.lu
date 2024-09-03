---
layout: page
title: Bear Pride Luxembourg 2023
subtitle: 5-6-7-8th Oct.

---
{{site.bearpride.homepage_panel.description | markdownify }}

{% if site.bearpride.facebook_main_event %}
<a href="{{site.bearpride.facebook_main_event}}" class="ui facebook button"><i class="facebook icon"></i> Entire weekend event</a>
{% endif %}

{% if site.bearpride.combo_ticket_url %}
<a href="{{site.bearpride.combo_ticket_url}}" class="ui brown button"><i class="ticket alternate  icon"></i> Entire weekend pass (with discount)</a>
{% endif %}


## 🗓️ Schedule

<div class="ui stackable three column grid">
<div class="column">
<!-- <h3>Thursday 5th</h3>
{% for event in site.data.events.jeudi %}
{% include _event-details.html %}
{% endfor %} -->

<h3>Friday 6th</h3>
{% for event in site.data.events.vendredi %}
{% include _event-details.html %}
{% endfor %}
</div>

<div class="column">
<h3>Saturday 7th</h3>
{% for event in site.data.events.samedi %}
{% include _event-details.html %}
{% endfor %}
</div>

<div class="column">
<h3>Sunday 8th</h3>
{% for event in site.data.events.dimanche %}
{% include _event-details.html %}
{% endfor %}

{% if site.bearpride.hotel_cta.display %}
<div class="ui floating message">
  <div class="header"><i class="icon hotel"></i> Need an hotel?</div>
  {{ site.bearpride.hotel_cta.content | markdownify}}
  <p>Use <a href="{{site.bearpride.hotel_cta.url}}">this form</a> to make your booking and they'll get back to you ASAP.</p>
</div>
{% endif %}

</div>
</div>

{% capture application_content %}
## 🐻👑 CALLING ALL BEARS! The search for Mr. Bear Luxembourg 2024 has officially begun

Could you be the next ambassador for our bear community in Luxembourg and beyond? Do you embody the spirit of camaraderie, diversity, and pride that we stand for?

Requirements:

1. Work, live, or study in Luxembourg 🏠
2. Be 18 years of age or older 🎂
3. Identify as a man (trans men are welcome) 🌈

As Mr. Bear Luxembourg, you will be representing us at various national and European events, wearing the coveted Mr. Bear sash, and receiving fantastic prizes from our partners. Not to mention, you'll have an unforgettable experience at our 3-day Bear Pride event this October, where you'll be invited to participate in all the exciting activities!
This is more than just a title, it's a chance to represent your community, make a difference, and create lifelong memories!

So, don't delay! Start your journey today and apply to become the face of Bear Dukes Luxembourg.
{% endcapture %}

{% include _bearpride_applications.html content=application_content %}

{%- if site.bearpride.candidate_list -%}

## Mr Bear Election Candidates

<div class="ui stackable three columns grid">
  {%- for candidate in site.data.candidates -%}
  <div class="column">
    <div class="ui fluid card">
    {%- if candidate.photos.size > 1 -%}
      <div class="ui slide masked reveal image">
        {%- for photo in candidate.photos limit:4 -%}
        <img src="{{ photo | prepend: site.url }}?nf_resize=smartcrop&w=480&h=603" alt="" class="{% if forloop.first %}visible content{% else %}hidden content{% endif %}">
      {%- endfor -%}
      </div>
    {%- else -%}
      <div class="image">
        <img src="{{candidate.photos.first | prepend: site.url}}?nf_resize=smartcrop&w=480&h=603" alt="" class="visible content">
      </div>
    {%- endif -%}
      <div class="content">
        <div class="header">{{candidate.name}}</div>
        <div class="meta">{{candidate.age}} years old</div>
        <div class="description">{{candidate.about | markdownify}}</div>
        <div class="ui horizontal divider">Why me?</div>
        <div class="description">{{candidate.motivation | markdownify }}</div>
      </div>
      <div class="extra content">
      {%- for link in candidate.links -%}
        {%- if link[1] != "" -%}
        <a href="{{link[1]}}" title="Checkout their {{link[0]}}"><i class="{{link[0]}} icon"></i></a>
        {%- endif -%}
      {%- endfor -%}
      </div>
    </div>
  </div>
  {%- endfor -%}
</div>


<div class="ui message info">
<div class="header">How to vote?</div>
<p>We don't have online voting because it's too easy to cheat. Every bear contest who tried to put one in place experimented it. So we just don't.<br>
Instead, you have to come and meet, in real life, face to face, the candidates. We think it's more interesting than just a like race over the internet. When you arrive at the party, you'll get a voting toket (a coin) which you'll be able to use to vote for your favorite candidate when the voting will be open. You'll have only one, no more, <strong>even if you lose it</strong>.</p>
</div>
{%- endif -%}

## 🎖️ Sponsoring

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

## 📍 Where to find ...

So, for the new ones as the bears who already know our lovely capital city, here's a map where we gather the venues of the evens, bars & restaurants we love, cool shops, nice art & culture venues and some usefull grocery shops and hotels in the city.

Don't miss our special partnership with Melia Luxembourg Hotel!

<i class="info circle blue icon"></i>click on the drawer symbol (1st icon on the title bar of the map) to show the menu with the categories.

<iframe src="https://www.google.com/maps/d/u/1/embed?mid=1Y5-12S01_kVDaGj8hVwH4rOFlIORfDgS" width="760" height="480" style="border:none"></iframe>
