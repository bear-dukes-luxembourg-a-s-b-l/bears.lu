# bears.lu

Luxembourgish Bears website

![Liberpay](http://img.shields.io/liberapay/goal/Bear_Dukes_Luxembourg.svg?logo=liberapay)
![GitHub](https://img.shields.io/github/license/bear-dukes-luxembourg-a-s-b-l/bears.lu)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fbears.lu)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/bear-dukes-luxembourg-a-s-b-l/bears.lu)

## Edit info about misters on the mister bear page

Locate the `_data/mrbears.yaml` file and do the edits according the following schema

```yaml
- year: 0000  # the title year (usually election year + 1)
  name: John  # the name
  description: >-
    Description goes here, you can add
    multiple
    lines
    without any breaking point in the rendering
  image: /assets/img/uploads/xxxxx.png  # the picture you want to use for the mister
  social:  # a collection of socialmedianame: url
    facebook: https://www.facebook.com/xxx
    instagram: https://instagram.com/xxxx
    twitter: https://twitter.com/xxxx
```

## Bear Pride

For activating the bear pride you have to change the `pride` value to `true` into the `_config.yml` file

### Candidates

To edit the candidate list, locate the `_data/candidates.yaml` file and do the edits according the following schema

```yaml
- name: xxx  # the last name
  firstname: yyy  # the firstname
  dob: 26/06/1980  # birthdate
  social:  # url of a social profile
  about: >-
    Description goes here, you can add
    multiple
    lines
    without any breaking point in the rendering
  photos:  # a collection of file url
      - /uploads/xxx
      - /uploads/xxx
```

### Sponsors

To edit the sponsor list, locate the `_data/sponsors.yaml` file and do the edits according the following schema
Beware of putting the sponsor into the right section regarding his sponsorship level

```yaml
- name: XXX  # the name of the sponsors
  title: lorem ipsum dolor sit amet  # the sponsor headline
  url: http://xxxx  # the sponsor website / fb page / whatever
  image: /uploads/xxx.png  # the sponsor logo
```

### Event list

To edit the event list, locate the `_data/events.yaml` file and do the edits according the following schema
Beware of putting the sponsor into the right section regarding the date

```yaml
- title: Welcome Drink  # the title
  time: 6pm  # the starting time 
  place: Bar rouge  # the venue name
  place_url: "https://goo.gl/maps/DHDNxchegTpxjKCcA"  # the venue URL, usually a Google Map link
  price:  # in EUR, the price of the event
  description: >
    Description goes here, you can add
    multiple
    lines
    without any breaking point in the rendering
  facebook:  # facebook event url
  ticket_url:  # online ticketing url
  rsvp_url:  # usually a typeform url to get details of the people who RSVP to an event we are not collecting the money for but with a limited capacity
```

## Sponsor

We are looking to cover those recurrent fees: 

-   Domain name from [gandi.net](gandi.net) ± 40€ / years (.lu isn't cheap)
-   [Canva.com](canva.com) subscribtion for our artwork ±20€ / month (regarding the exchange rate + fees since it's billed in USD)

If the cost can't be covered, [@clawfire](github.com/clawfire) will pay for it since he always did but there's like 0 garantees he'll keep doing it on the long run.
If you want to sponsor us for that, you can use librapay by clicking the `donate` button right below

[![](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/Bear_Dukes_Luxembourg/donate)
