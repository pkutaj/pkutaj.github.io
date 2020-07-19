---
layout: post
title: web > cookies, state-awareness for the http protocol
categories: [web]
---
## abstract
The concern is documenting scott allen's take on cookies in the context of the nature of the HTTP protocol. 

## video
## contents
<!-- TOC -->

- [1. stateless protocol](#1-stateless-protocol)
- [2. sidestep: on cache](#2-sidestep-on-cache)
- [3. stateful needs](#3-stateful-needs)
- [4. embed state in resources](#4-embed-state-in-resources)
- [5. server-side state-tracking](#5-server-side-state-tracking)
- [6. session storage](#6-session-storage)
- [7. cookies](#7-cookies)

<!-- /TOC -->

### 1. stateless protocol
* http is designed as **stateless protocol**
* there are transactions, known as **request-response transactions**
* stateless means that each transaction is **independent** from any previous or future transaction
* nothing in the protocol requires the server to **retain state**
* every message is **self-descriptive** and requires all the information that is required to process that message
    * see [Introducing self-describing JSONs](https://snowplowanalytics.com/blog/2014/05/15/introducing-self-describing-jsons/) for an inspired take on the data transfer

![ram_cpu_vanNeumann_bottleneck]({{ site.url }}/assets/img001283.png)


### 2. sidestep: on cache
* From French cache (as used by French Canadian trappers to mean "hiding place for stores"), from the verb cacher
* cache is the most popular way around the van neumann bottleneck — cache is a very small amount memory on the CPU itself — getting the data at the same speed it is operating. 
    * also every CPU core has its own cache memory → there is no contention on what core is getting the date from the RAM 
    * the amount of memory is small due to price
    * cache stores the memory 
    * the greater the cache hit the better the performance
    * the greater the cache misses the lower the performance
    * cache is split
        * instruction → easier to fill
        * data cache

### 3. stateful needs
* most of the applications built atop of the HTTP are stateful
* example: banking app needs to know that user has logged in before resources can be accessed
* app needs to know about the user before-hand
* there are independent transactions, but the app needs to know **where the user is**

### 4. embed state in resources
* state required can travel back on the
* usually hidden input field
* .APS is using this
* state is in HTTP message
* it is highly scalable
* but complicates application programming

### 5. server-side state-tracking
* required for the state that is to be around for a long time
* email-address can be mapped to the username and this binding can be persistent
* for server-side storage there is access to user-session

### 6. session storage
* there is a solution called _Session storage_
* request must go to the same server → some load balancers are saving this
* but how can a user track a user to implement _Session State_
* in the early days of the internet - IP addresses were tracked
* today: you can have IP unstable or behind the same one
* there are more reliable techniques that rely on **cookies**

### 7. cookies
* defined by rfc6265 called **HTTP State Management Mechanism**
* describes how website **gives a cookie** 
* it uses **HTTP HEADER**
* browser then sends the same cookie to every other request sent to the site
* now, a website can track user when then make a request 
* website can put any information into a cookie, mostly just a unique identifier (GUID)
* assuming browser is configured to accept cookies, it accepts the _set cookie_ instruction 
* it sends it along with any subsequent request that it makes to the domain 
* server looks for appropriate info
* used for identification, not  authentication purposes