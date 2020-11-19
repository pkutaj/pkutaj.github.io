---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the concept of a hosted zone — encountered within the context of dealing with the new Safari webkit's feature called CNAME Cloaking Mitigation. These are notes from a Pluralsight course available at

> https://www.pluralsight.com/courses/aws-networking-deep-dive-route-53-dns

<!-- TOC -->

- [1. rules](#1-rules)
- [3. SOA](#3-soa)
- [2. create a public hosted zone](#2-create-a-public-hosted-zone)
- [4. create a reusable delegation set](#4-create-a-reusable-delegation-set)
- [5. activating the use of domains for domain registered outside of AWS](#5-activating-the-use-of-domains-for-domain-registered-outside-of-aws)

<!-- /TOC -->

### 1. rules
* you must use the name servers that AWS assigns
* you can't use the ones used up until now
* zone is stored only on 4 servers that AWS gives you
* you receive 4 route53 name servers

### 3. SOA
* lists one of the name servers — primary name server for the zone

### 2. create a public hosted zone
* you receive 4 route53 name servers
* you store zone on those servers
* initially you have
    * NS record — server names hosting the domain info
    * SOA record — who is in charge

![resource_record_set_NS_records]({{ site.url }}/assets/img002235.png)

### 4. create a reusable delegation set
* you must manually associate this with zone itself
* nothing else - no hosted zone

### 5. activating the use of domains for domain registered outside of AWS

![required_to_switch_NS_records]({{ site.url }}/assets/img002236.png)
