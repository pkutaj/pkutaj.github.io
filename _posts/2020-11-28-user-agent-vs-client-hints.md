---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the more useful way of detecting device-specific capabilities from HTTP headers known as **client hints** that is replacing **user agent header**

> In 2020, Google announced that they would be phasing out support for the User-Agent header in their Google Chrome browser. They stated that other major web browser vendors were supportive of the move, but that they did not know when other vendors would follow suit.[15] Google stated that a new feature called Client Hints would replace the functionality of the User-Agent string.

— from [Deprecation of User\-Agent header](https://en.wikipedia.org/wiki/User_agent#Deprecation_of_User-Agent_header)

<!-- TOC -->

- [1. intro](#1-intro)
- [2. example of headers](#2-example-of-headers)
- [3. server must request this](#3-server-must-request-this)
- [5. use extension for demonstration](#5-use-extension-for-demonstration)
- [6. sources](#6-sources)

<!-- /TOC -->

### 1. intro
* the RFC from 2016 is still an experimental feature
* however this should allow to negotiate content in a much dynamical and precise manner then user agent strings used today

### 2. example of headers

![client_hint_header]({{ site.url }}/assets/img002317.png)

### 3. server must request this
* add extention that does the work of the server

### 5. use extension for demonstration
* [Client-Hints - Chrome Web Store](https://chrome.google.com/webstore/detail/client-hints/gdghpgmkfaedgngmnahnaaegpacanlef)

### 6. sources
* [Improving user privacy and developer experience with User-Agent Client Hints](https://web.dev/user-agent-client-hints/)
* [Client-Hints - Chrome Web Store](https://chrome.google.com/webstore/detail/client-hints/gdghpgmkfaedgngmnahnaaegpacanlef)
* [draft-grigorik-http-client-hints-03 - HTTP Client Hints](https://tools.ietf.org/html/draft-grigorik-http-client-hints-03)
* [Client hints - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Client_hints)
