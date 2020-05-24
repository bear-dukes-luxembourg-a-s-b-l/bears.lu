---
layout: page
title: News
subtitle: All the news we posted so far.
pagination:
  enabled: true
  collection: posts
menu:
  header:
    identifier: news
    weight: 1

---
<div class="ui divided items">
{% for post in paginator.posts %}
  <div class="item">
    <a class="ui small image" href="{{post.url}}" title="Read more of {{post.title}}"><img src="{{post.image | append: '?nf_resize=smartcrop&w=300&h=300'}}" alt=""></a>
    <div class="content">
      <a class="header" href="{{post.url}}"> {{post.title}}</a>
      <div class="meta"><small>{{post.date | date:"%B %d, %Y"}} in {{post.categories | array_to_sentence_string}}</small></div>
      <div class="description">{{post.excerpt | strip_html }}</div>
      <div class="extra">
          <a href="{{post.url}}" title="Read more of {{post.title}}" class="ui right floated tiny button">Read More...</a>
      </div>
    </div>
  </div>
{% endfor %}
</div>
{% if paginator.total_pages > 1 %}

<ul>
  {% if paginator.previous_page %}
  <li>
    <a href="{{ paginator.previous_page_path | prepend: site.baseurl }}">Newer</a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li>
    <a href="{{ paginator.next_page_path | prepend: site.baseurl }}">Older</a>
  </li>
  {% endif %}
</ul>
{% endif %}