---
layout: post
title: web > filter with fiddler
categories: [web]
---
## usecase
The concern is documenting how to filter requests to a particular host/URL from **fiddler**. 
Context: learning the tracking tool Snowplowanalytics, understanding the quantities of requests it is sending from an exemplary blog with a single user (personal sandbox). Also comparing with load balancers numbers validating my understanding of the solution. 

![fiddler]({{ site.url }}/assets/img001749.jpg)

<!-- TOC -->

- [1. Assume](#1-assume)
- [2. Instructions](#2-instructions)
- [3. Speculation](#3-speculation)

<!-- /TOC -->

### 1. Assume
* fiddler classic is set up and running
* note: there's new fiddler everywhere
* [Download Fiddler Classic](https://www.telerik.com/download/fiddler)

### 2. Instructions
* capture all traffic w/ `F12`
* make an exemplary request from the app you want to filter
* pause with `F12`
* inspect a sample request (the one you want to filter) with `SHIFT+ENTER`
* select host → press `CTRL+SHIFT+C` to copy value only
* activate filter
* activate _Show only if URL contains_
* pass _EXACT: $hostNamedCopiedAbove_
* start capturing with `F12` → traffic is filtered

![filter_traffic_fiddle]({{ site.url }}/assets/img001736.png)

### 3. Speculation
* fiddler is designed and optimized for the application layer HTTP(S) protocol and in this sense belongs to the same family as ALBs (Application Load Balancer) also specifically designed only for a single networking protocol ignoring all the rest (file transfer, e-mail, DNS and telnet, all essential parts of the internet before HTTP)
