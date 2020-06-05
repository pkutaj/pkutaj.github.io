---
layout: post
title: web > the concept of microservice
categories: [web]
---
## overview
The concern this document is to provide a conceptualization of microservice

## toc
<!-- TOC -->

- [(1) architectural style](#1-architectural-style)
- [(2) why microservices](#2-why-microservices)
- [(3) communicating between microservices](#3-communicating-between-microservices)
- [(4) async communication](#4-async-communication)

<!-- /TOC -->

## findings
### (1) architectural style
* microservices are an architectural style
* autonomous + independently deployable services ...
* ...collaborate with the aim to form an application
* the name suggests services should indeed be small, but there is no official size limit

![reference_application]({{ site.url }}/assets/img000957.png)

### (2) why microservices
* often contrasted with **MONOLITH**
* monolith is an application with a single codebase, running on a single host server and persists data into a single database with a consistent technology
    * all the code is in one place
    * only 1 thing to develop
    * only 1 think to update and maintain
* the problem is for one of scale — it works well for a small projects
    * many devs
    * many users
    * big data
    * difficult to maintain
    * technical debt
    * entangled and highly coupled modules
    * difficult to deploy, which is risky and needs downtime

### (3) communicating between microservices
* microservices publish messages on a **SHARED EVENT BUS** and subscribe to message from that **BUS**

![shared_bus_for_microservices]({{ site.url }}/assets/img000955.png)

* this promotes async communication between microservices
* if calls are coming from the client, the pattern can be used calling **API GATEWAY** 

![microservices_communication_with_frontend]({{ site.url }}/assets/img000956.png)

### (4) async communication
* usually a messaging queue/event bus is used for this function

![messaging_queues]({{ site.url }}/assets/img000958.png)