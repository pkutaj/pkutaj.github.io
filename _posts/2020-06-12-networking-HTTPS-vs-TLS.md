---
layout: post
title: Networking > TCP, TLS and HTTPS 
categories: [networking]
---
## the case	
* the question is what is the relationship/difference between TCP, TLS, HTTPS

## toc
<!-- TOC -->

- [TLS](#tls)
- [HTTPS](#https)
- [sources](#sources)

<!-- /TOC -->

## findings
### TLS
* below if from <https://stackoverflow.com/a/52043501/11082684>
* TLS is a **protocol** sitting on top of TCP typically (other variants can also use UDP)
* it provides — on top of TCP features — some new features about 
    * endpoints authentication  
    * transport confidentiality  
    * integrity 
* In a way, you can understand it as being **sandwiched** between 
    * TCP and ...
    * the higher-level application protocol, like HTTP 
* Saying otherwise you **can use many others protocols on top of tls**
    * you have all email related ones (SMTP, IMAP, POP, etc )
    * you can have FTP on top of it (while probably not a good idea nowadays)
    * XMPP for realtime communications, etc 
* In short, any protocol using TCP could use TLS with some adaptation 

### HTTPS
* Thus, **http is one case among others**  🠊 HTTP is between an HTTP client and an HTTP server (i.e. webserver) for short 
* A browser is an HTTP client. One of many ones. When you use curl or wget you are also an HTTP client.  
* So if any HTTP client access an https:// link it will first do the **TLS handshake**, after the TCP connection and before starting to do anything really related to the HTTP protocol
* You have specialized libraries dealing with TLS so that not all program need to recode everything about this again since it is also complicated 

![TLS_between_transportTCPUDP_and_applicationHTTPandOTHERS]({{ site.url }}/assets/img000500.png)

### sources
* <https://stackoverflow.com/a/52043501/11082684>