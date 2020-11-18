---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the interesting error I received with Opsgenie

![status_431]({{ site.url }}/assets/img002207.png)

<!-- TOC -->

- [1. on status 431](#1-on-status-431)
- [2. limits](#2-limits)
- [3. fix](#3-fix)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. on status 431 
> 431 can be used when the total size of request headers is too large, or when a single header field is too large.

*  Servers will often produce this status if:
    1. The Referer URL is too long
    2. There are too many Cookies sent in the request

### 2. limits
* HTTP spec **does not define a limit** of how large an HTTP header can be
* so what does ? **webservers** do

WEBSERVER       | LIMIT (KB)
----------------|---------------------------------
Apache 2.0, 2.2 | 8K
nginx           | 4K - 8K
IIS             | varies by version, 8K - 16K
Tomcat          | varies by version, 8K - 48K (?!)

### 3. fix
* used [Cookie Editor](https://www.hotcleaner.com/cookie-editor/) to fix this
* selected all cookies of the affected domains and deleted those


### 4. sources
* [431 Request Header Fields Too Large — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431)
