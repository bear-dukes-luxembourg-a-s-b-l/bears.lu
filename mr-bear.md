---
layout: page
title: Mr Bear
subtitle: All the Mr Bears in luxembourg
image: "/assets/img/uploads/Funny-5.jpg"
menu:
  header:
    title: Mister Bear
    identifier: mrbear
    weight: 3

---
Since 2015, Mister bears are elected in Luxembourg.  
The first and secont elections were held by [Rosa Lëtzebuerg](http://rosa-letzebuerg.lu/) alongside the [Gaymat](http://gaymat.lu) (the former name of our Pride).  
Bear Dukes Luxembourg a.s.b.l. was created after by former misters to be able to handle the election and continue the tradition. We moved slighly the date of the election and aligned it with the Bear Pride Luxembourg we had started in 2016. Also, in year Y we are electing Mr. Bear Luxembourg Y+1, which is more understandable to integrate ourself in the international agenda.

There's no online pre-vote / vote, because it's too easy to cheat or too complicated for us to put in place something really hard to cheat. So it's all in-place, during the election evening where people can vote.  
In 2018 we introduced a jury, counting for half of the points of the election. Jury members are former misters (bear, leather, rubber, fetish...) or sash-holders from other countries, and people involved in the scene (party host, other countries representatives ...).  
In 2019 we switched to a men-only election too, to avoid having too much people coming in just to support a friend but not representatives of the community.

<div class="ui three stackable cards">
{% for mister in  site.data.mrbears reversed %}
  <div class="card">
    <div class="image">
      <a class="ui brown right ribbon label">{{mister.year}}</a>
      <img src="{{mister.image}}" alt="{{mister.name}}">
    </div>
    <div class="content">
      <div class="header">{{mister.name}}</div>
      <div class="description">{{mister.description | markdownify}}</div>
    </div>
    <div class="extra content">
    {% for social in mister.social %}
      <a href="{{social[1]}}" title="Meet {{mister.name}} on {{social[0]}}"><i class="{{social[0]}} icon"></i></a>
    {% endfor %}
    </div>
  </div>
{% endfor %}
</div>