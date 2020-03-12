---
layout: post
title: History > NODE > Ryan Dahl (NODE author) on the reconceptualization of web servers in the early 2000s
---
## the case	
the question is, what were the web servers thought of traditionally (say, web 1.0) and what has changed with the arrival of Mongrel and, of course, Node.Js.

( Presented by the creator of Node — Ryan Dahl. 

## toc
<!-- TOC -->

- [on the traditional notion of web servers](#on-the-traditional-notion-of-web-servers)
- [sources](#sources)

<!-- /TOC -->

## findings
### on the traditional notion of web servers
* more complicated than just a library to set u
* mongrel changed the scene and reconceptualized
* before, in the LAMP stack for example; 
* web server was thought as a directory service with a document root
* you put files there — `cgi`, `php`, etc. 
* each file has a special extension and apache went to look inside the file system and figure what should be done
* all the files were files on the website so this is extremely tied to the file system
* mongrel is diffent, mongrel is a library
* new: webserver is a way to response to request — there is nothing else involved, you can serve files, but that **is not essential**

### sources
* <https://youtu.be/SAc0vQCC6UQ?t=456>