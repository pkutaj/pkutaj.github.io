---
layout: post
title: NTW > fiddler
last_modified_at: 2019-12-16
---
## the case	
the question is, how to make use of the fiddler tool — the go to for HTTP traffic monitoring / analysis

## toc
<!-- TOC -->

- [General Fiddler](#general-fiddler)
- [Why](#why)
- [How](#how)

<!-- /TOC -->

### General Fiddler
* fiddler is from microsoft
* appears in 2003
* eric lawrence was looking for a tool o watch for http traffic
* written in c#

### Why
* troublesthoot problems
    * start-up fiddler, make a request, look through fiddler why things may not be behaving correctly
* performance evaluation
    * how big and files are the filew
* **fiddle** with requests and responses
    * changes before request and responses are sent and see what happens
    * benefit is the security testing
* visualize page requests (timeline)
    * good overall feeling of how the page is performing
* periodic site review
    * is there anything in the request trace that is unexpected

### How
* proxy
    * attaches as a proxy to the browser
    * all traffic is routed to the localhost's fidler port (8888)