---
layout: page
title: Bear Pride Luxembourg
subtitle: 18-20 Oct.
---

This year, the Luxembourg Bear Pride will be on October 18th - 20th in Luxembourg City. We are still looking to secure the several venues but we can give you already the schedule.

<a href="https://www.facebook.com/events/357291828163605/" class="ui facebook button"><i class="facebook icon"></i> Entire weekend event</a> <a href="https://tickets.bears.lu/e/23/bear-pride-luxembourg-2019?ref=site" class="ui disabled brown button"><i class="ticket alternate  icon"></i> Entire weekend pass (with discount)</a>

## Schedule

<div class="ui three column grid">
<div class="column">
<h3>Friday 18th</h3>
    {% for event in site.data.events.vendredi %}
    <div class="ui raised fluid card">
        <div class="content">
            <div class="header">{{event.title}}</div>
            <div class="meta">{{event.time}} {% if event.place %}<a href="{{event.place_url}}" title="{{event.place}}"><i class="small building icon"></i> {{event.place}}</a> {% endif %} {% if event.price %}<i class="euro icon"></i>{{event.price}}{% endif %}</div>
            <div class="description">{{event.description | markdownify}}</div>
        </div>
        {% if event.facebook or  event.ticket_url or event.rsvp_url %}
        <div class="extra content">
            <div class="ui two buttons">
                {% if event.facebook %}
                <a href="{{event.facebook}}" class="ui  button"><i class="facebook blue icon"></i> Event</a>
                {% else %}
                <a href="#" class="ui disabled button"><i class="facebook blue icon"></i> Event</a>
                {% endif %}
                {% if event.ticket_url %}
                <a href="{{event.ticket_url}}" class="ui button"><i class="ticket alternate red icon"></i> Tickets</a>
                {% elsif event.rsvp_url %}
                <a href="{{event.rsvp_url}}" class="ui button">RSVP</a>
                {% else %}
                <a href="#" class="ui disabled button"><i class="ticket alternate red icon"></i> No presales</a>
                {% endif %}
            </div>
        </div>
        {% endif %}
    </div>
    {% endfor %}
</div>
<div class="column">
    <h3>Saturday 19th</h3>
    {% for event in site.data.events.samedi %}
    <div class="ui raised fluid card">
        <div class="content">
            <div class="header">{{event.title}}</div>
            <div class="meta">{{event.time}} {% if event.place %}<a href="{{event.place_url}}" title="{{event.place}}"><i class="small building icon"></i> {{event.place}}</a> {% endif %} {% if event.price %}<i class="euro icon"></i>{{event.price}}{% endif %}</div>
            <div class="description">{{event.description | markdownify}}</div>
        </div>
        {% if event.facebook or  event.ticket_url or event.rsvp_url %}
        <div class="extra content">
            <div class="ui two buttons">
                {% if event.facebook %}
                <a href="{{event.facebook}}" class="ui  button"><i class="facebook blue icon"></i> Event</a>
                {% else %}
                <a href="#" class="ui disabled button"><i class="facebook blue icon"></i> Event</a>
                {% endif %}
                {% if event.ticket_url %}
                <a href="{{event.ticket_url}}" class="ui button"><i class="ticket alternate red icon"></i> Tickets</a>
                {% elsif event.rsvp_url %}
                <a href="{{event.rsvp_url}}" class="ui button">RSVP</a>
                {% else %}
                <a href="#" class="ui disabled button"><i class="ticket alternate red icon"></i> No presales</a>
                {% endif %}
            </div>
        </div>
        {% endif %}
    </div>
    {% endfor %}

</div>
<div class="column">
    <h3>Sunday 20th</h3>
    {% for event in site.data.events.dimanche %}
    <div class="ui raised fluid card">
        <div class="content">
            <div class="header">{{event.title}}</div>
            <div class="meta">{{event.time}} {% if event.place %}<a href="{{event.place_url}}" title="{{event.place}}"><i class="small building icon"></i> {{event.place}}</a> {% endif %} {% if event.price %}<i class="euro icon"></i>{{event.price}}{% endif %}</div>
            <div class="description">{{event.description | markdownify}}</div>
        </div>
        {% if event.facebook or  event.ticket_url or event.rsvp_url %}
        <div class="extra content">
            <div class="ui two buttons">
                {% if event.facebook %}
                <a href="{{event.facebook}}" class="ui  button"><i class="facebook blue icon"></i> Event</a>
                {% else %}
                <a href="#" class="ui disabled button"><i class="facebook blue icon"></i> Event</a>
                {% endif %}
                {% if event.ticket_url %}
                <a href="{{event.ticket_url}}" class="ui button"><i class="ticket alternate red icon"></i> Tickets</a>
                {% elsif event.rsvp_url %}
                <a href="{{event.rsvp_url}}" class="ui button">RSVP</a>
                {% else %}
                <a href="#" class="ui disabled button"><i class="ticket alternate red icon"></i> No presales</a>
                {% endif %}
            </div>
        </div>
        {% endif %}
    </div>
    {% endfor %}
    <div class="ui message">
    <div class="header">Saunas</div>
    <p>Some of our partners will organise events on this Sunday during the bear pride. Stay tuned for more infos.</p>
    </div>

</div>
</div>

## Mr Bear Election

<div class="ui message info">The application are closed. Discover the contestant soon here. </div>

<!-- Want to be the next Mr Bear Luxembourg ?

<a href="https://forms.gle/qgskYjs1WU13GUid8" class="ui disabled brown button">Fill the application form online</a> -->

## Sponsoring

<div class="ui message">
We are always looking for sponsors and offering a wide range of compensation. You can checkout the <a href="https://docs.google.com/document/d/e/2PACX-1vQJip54iVy5ryeDAR_27EH07-7hl0aUwIReRTd1Er0H7XNZhpztbgDvcnUJ3OLxNnvq-OxXTm6JtjRf/pub" title="Sponsoring documentation">Sponsoring documentation</a> to know everything about the metrics of the events, the differents sponsoring opportunities ...
</div>

### Gold Sponsors

They are kindly sponsor the entire weekend.

<div class="ui medium rounded images">
{% for sponsor in site.data.sponsors.gold %}
            <a href="{{sponsor.url}}" title="{{sponsor.title}}"><img src="{{sponsor.image}}" alt="{{sponsor.name}}" class="ui image"></a>
{% endfor %}
</div>

### Silver sponsors

They are offering prizes for the Mr. Bear Luxembourg candidates.

<div class="ui tiny images">
{% for sponsor in site.data.sponsors.silver %}
            <a href="{{sponsor.url}}" title="{{sponsor.title}}"><img src="{{sponsor.image}}" alt="{{sponsor.name}}" class="ui image"></a>
{% endfor %}
</div>

#### Communication sponsors

They are helping us to raise awarness about our events.

<div class="ui mini images">
{% for sponsor in site.data.sponsors.media %}
            <a href="{{sponsor.url}}" title="{{sponsor.title}}"><img src="{{sponsor.image}}" alt="{{sponsor.name}}" class="ui image"></a>
{% endfor %}

</div>
<small>[Sponsoring T&C](https://docs.google.com/document/d/e/2PACX-1vRiHgdxO-wmB5S4NaAdCm4oLEZPC95LRDyx2kJgEE3jtC9QR11ku3sn3SXS03O47ErFz2byoaw7F3ky/pub)</small>

## Where to find ...

So, for the new ones as the bears who already know our lovely capital city, here's a map where we gather the venues of the evens, bars & restaurants we love, cool shops, nice art & culture venues and some usefull grocery shops and hotels in the city.

Don't miss our special partnership with Melia Luxembourg Hotel!

<i class="info circle blue icon"></i>click on the drawer symbol (1st icon on the title bar of the map) to show the menu with the categories.

<iframe src="https://www.google.com/maps/d/u/1/embed?mid=1Y5-12S01_kVDaGj8hVwH4rOFlIORfDgS" width="760" height="480" style="border:none"></iframe>
