---
layout: post
title:
categories: []
---
## usecase
The concern is documenting cookies, essential to understand for the modern BI. 

<!-- TOC -->

- [1. origins](#1-origins)
- [2. http & state](#2-http--state)
- [3. cookies](#3-cookies)
- [4. browser storage type](#4-browser-storage-type)
- [5. cookie usage](#5-cookie-usage)
- [6. writing cookies](#6-writing-cookies)
- [7. seven attribues to a cookie](#7-seven-attribues-to-a-cookie)
- [8. reading](#8-reading)
- [9. saving app data in a cookie ?](#9-saving-app-data-in-a-cookie-)
- [10. inspect cookies from a new websession using powershell](#10-inspect-cookies-from-a-new-websession-using-powershell)
- [11. get all saved cookies](#11-get-all-saved-cookies)
- [12. first-vs-third party](#12-first-vs-third-party)
- [13. sources](#13-sources)

<!-- /TOC -->

### 1. origins
* cookies were created in Netscape by [Lou Montulli ](http://www.internethistorypodcast.com/2014/03/chapter-1-supplemental-1-an-interview-with-lou-montulli/)
* the term goes back to Unix and C (same authors, same origins) meaning a piece of data passed between programs not essential for their functionality
* used often as a ticket

### 2. http & state
* http is designed as **stateless protocol**
* there are transactions, known as **request-response transactions**
* stateless means that each transaction is **independent** from any previous or future transaction
* nothing in the protocol requires the server to **retain state**
* every message is **self-descriptive** and requires all the information that is required to process that message
    * see [Introducing self-describing JSONs](https://snowplowanalytics.com/blog/2014/05/15/introducing-self-describing-jsons/) for an inspired take on the data transfer
* most of the applications built atop of the HTTP are stateful
* example: banking app needs to know that user has logged in before resources can be accessed
* app needs to know about the user before-hand
* there are independent http transactions, but the app needs to know **where the user is**

### 3. cookies
* defined by rfc6265 called **HTTP State Management Mechanism**
* describes how website **gives a cookie** 
* it uses **HTTP HEADER**
* browser then sends the same cookie to every other request sent to the site
* now, a website can track user when then make a request 
* website can put any information into a cookie, mostly just a unique identifier (GUID)
* assuming browser is configured to accept cookies, it accepts the _set cookie_ instruction 
* it sends it along with any subsequent request that it makes to the domain 
* server looks for appropriate info
* used for identification, not authentication purposes

### 4. browser storage type
* unique **BROWSER STORAGE** option. 
* only storage (there are many types) that is also **SHARED WITH THE SERVER** 
* how? they are **SENT AS PART OF EVERY REQUEST**. 
* it creates a shared state between the client and the server 
    * also between multiple applications in different subdomains. 
* This is not possible by other storage options 
* One caveat: cookies are sent with every request, which means that we have to keep our cookies small to maintain a decent request size.

### 5. cookie usage
* The most common use for cookies is authentication
* Just like the localStorage, cookies can store only strings
* cookies are **CONCATENATED** into one semicolon-separated string 
* and they are **SENT IN THE COOKIE HEADER** of the request. 
* You can set many attributes for every cookie, such as:
    * expiration
    * allowed domains
    * allowed pages
    * and many more.

### 6. writing cookies
* with JavaScript  straightforward 
* to save a new cookie, `set document.cookie` — check out the save function in the example above. 

### 7. seven attribues to a cookie

```
1. Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
2. Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
3. Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
4. Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
5. Set-Cookie: <cookie-name>=<cookie-value>; Secure
6. Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

7. Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
7. Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
7. Set-Cookie: <cookie-name>=<cookie-value>; SameSite=None
```

—  From [Set-Cookie - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

### 8. reading
* A cookie string looks like this:

`key1=value1;key2=value2;key3=value3`

* split the string by semicolon. 
* Now, we have an array of cookies in the form of `key1=value1`
* find the right element in the array
* In the  split by the equal sign and get the last element in the new array
* A bit tedious, but once you implement the `getCookie` function (or copy it from my example :P) you can forget it.

### 9. saving app data in a cookie ?
* can be a bad idea 
* drastically increases the request size 
* reduces performance.
* if cookies — keep them small.

### 10. inspect cookies from a new websession using powershell 
* [Script Getting Cookies using PowerShell](https://gallery.technet.microsoft.com/scriptcenter/Getting-Cookies-using-3c373c7e)

```powershell
function get-cookies ($url) {
    $webrequest = Invoke-WebRequest -Uri $url -SessionVariable websession 
    $cookies = $websession.Cookies.GetCookies($url) 
 
    foreach ($cookie in $cookies) { 
        Write-Host "$($cookie.name) = $($cookie.value)" 
    }
}
```

### 11. get all saved cookies
> so cookies are stored locally. they used to be stored in text files, but that is no longer the case, the cookie file in chrome is no longer human-readable. what you can do with powershell is to pass the url into something like the parameter and then return that immediatelly to get the cookies you would like for the host. but you would not be able to get them all - you need an extension to achieve that
* see [Cookie Editor - Official Home Page](https://www.hotcleaner.com/cookie-editor/)

### 12. first-vs-third party
* technically, no difference
* same pieces of info; same functionality
* where is the diff ?
    * how are they created
    * how are they used

FIRST-PARTY                     | THIRD-PARTY
--------------------------------|--------------------------------------------------------
created by the host domain      | created/stored by domains other than directly visited
state-storage and auth          | tracking, online-ads
only accessible via host domain | accessible on any website that loads the 3rd party code


### 13. sources
* <https://css-tricks.com/a-primer-on-the-different-types-of-browser-storage/>
* [Script Getting Cookies using PowerShell](https://gallery.technet.microsoft.com/scriptcenter/Getting-Cookies-using-3c373c7e)
* [Network_userid and domain_userid - For data modelers & consumers - Discourse – Snowplow](https://discourse.snowplowanalytics.com/t/network-userid-and-domain-userid/1171)
* [Set-Cookie - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
* [First-Party & Third-Party Cookies: What’s the Difference? - Clearcode Blog](https://clearcode.cc/blog/difference-between-first-party-third-party-cookies/)
* [Magic cookie - Wikipedia](https://en.wikipedia.org/wiki/Magic_cookie)
