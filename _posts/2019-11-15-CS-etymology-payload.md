---
layout: post
title: EXTRACT > Programming > The payload concept 
---
## the case	
The question is, what are we talking about when talk about payload in networking and programming.

## toc
<!-- TOC -->



<!-- /TOC -->

## findings
The etymology and meaning of the payload concept
* part of the transmitted data
    * the actual intended message
    * covered in headers and metadata
* etymology is from transportation ➔ that is the part of the load that _pays_ for the transportation
* usual context is messaging protocols — below, `hello, world!` is the payload
```json
{
    "data": {
        "message": "Hello, world!"
    }
}
```
* deeper, in networking, payload is encapsulated in a frame composed of framing bits and a frame check sequence (ethernet frame, etc.) 