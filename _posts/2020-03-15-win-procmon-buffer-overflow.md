---
layout: post
title: Windows > buffer overflow
categories: [windows]
---
## the case	
the question is, what is the buffer overflow result of operation when using procmon analysis

![buffer_overflow_procmon_result]({{ site.url }}/assets/img000441.png)

## findings
* This is not an error.
* What is happening is the program is requesting data the length of which it does not know. 
* It provides an initial buffer. 
* If it is too small, a Buffer Overflow is returned together with the size needed and the program can reissue the request with the correct size. Do not confuse with the use of the term buffer overflow to designate the erroneous overwriting of data which can lead to a security vulnerability.

### sources
* <https://superuser.com/a/491607/1083809>