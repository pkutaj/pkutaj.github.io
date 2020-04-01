---
layout: post
title: History > 2000, REST defined by Roy Fielding
categories: [history]
---
## the case
* write a short history of REST

## solution/status
* Roy Fielding gave the disorganized internet world the gift of a common language through which their software could communicate.

<!-- TOC -->

- [pre-1999: The SOAP years](#pre-1999-the-soap-years)
- [(2000) The Dissertation](#2000-the-dissertation)
- [The 4 pillars of REST: U.S.CLIS.CACHE](#the-4-pillars-of-rest-uscliscache)
- [REST and Web 2.0 (and AWS)](#rest-and-web-20-and-aws)
- [sources](#sources)

<!-- /TOC -->

## terminology
* Simple Object Access Protocol
    * SOAP
* Remote Procedure Call
    * RPC
* Web  2.0

## findings
### pre-1999: The SOAP years
* 1999 pre-rest era
    * if you wanted to communicate online between applications/pages you had to use Simple Object Access Protocol
    1. hand-write an XML document with an RPC call in the body
    2. specify the endpoint and POST their SOAP enveloped to that specified endpoint

> SOAP was notorious for being complex to build, complex to use, and near-impossible to debug. And the alternative, CORBA, was even worse. The problem was that there was no standard for how APIs should be designed and used. Back then, APIs were not designed to be accessible, they were only designed to be flexible.

-- From <https://blog.readme.io/the-history-of-rest-apis/> 

![SOAP_example]({{ site.url }}/assets/2020-01-12-5.png)

### (2000) The Dissertation
* ROY FIELDING: The Dissertation 2000
    * Architectural Styles and the Design of Network-based Software Architectures
* Goal: create a standard so that any server could talk to any other server in the world
* Roy Fielding was with the web from the beginning (authored HTTP and URL) and his dissertation in the midst of the dot-com bubble burst revolutionized the way we use the web today, as shown in <https://www.crummy.com/writing/speaking/2013-RESTFest/>

### The 4 pillars of REST: U.S.CLIS.CACHE
* REST has 4 principles U-S-CLIS-CACHE
* U for Uniform Interface: 
    * always HTTP verbs 
    * always URI as resources 
    * always HTTP response with a status and a body
* Stateless
    * each request is self-descriptive and self-contained for the server to process it
* Client-Server
    * clear boundaries between roles of requestor and responder
* Cachable
    * unless denoted, a client can cache any representation
    * statelessness makes this possible
* REST is anti-SOAP
* REST is resource-based

### REST and Web 2.0 (and AWS) 
* Ebay, Amazon and Flickr were the first to start offering these standard APIs to their systems in the early 2000s
    * And... AWS is built on this initiative in South Africa

### sources
* <https://blog.readme.io/the-history-of-rest-apis/>
* <https://www.crummy.com/writing/speaking/2013-RESTFest/>