---
layout: post
title: web > http messages > request and response pairs
categories: [web ]
---
## usecase
The concern is documenting the dynamics of HTTP request for resources, and response with resources — in the context of learning how to use curl properly to simulate requests sent from the browser (or telnet)

<!-- TOC -->

- [1. http transaction](#1-http-transaction)
- [2. http request](#2-http-request)
    - [2.1. start line](#21-start-line)
    - [headers](#headers)
        - [2.2. example1 (curl)](#22-example1-curl)
        - [2.3. example2 (captured in browser)](#23-example2-captured-in-browser)
    - [2.4. body](#24-body)
- [3. openSSL_to_telnet](#3-openssl_to_telnet)
- [4. HTTP response](#4-http-response)
    - [4.1. start line](#41-start-line)
    - [4.2. headers](#42-headers)
        - [4.2.1. example: curl <domain> --head](#421-example-curl-domain---head)
        - [4.2.2. example (captured by browser)](#422-example-captured-by-browser)
    - [4.3. body](#43-body)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. http transaction
* an HTTP transaction is composed of request-response pair

### 2. http request
* carefully formatted message sent by the client
* command in plain ASCII 

#### 2.1. start line
* starts with **START LINE** with 3 essential
    1. method
    2. URL
    3. version 

#### headers
![each_line_separate_header]({{ site.url }}/assets/img001591.png)

##### 2.2. example1 (curl)
* one or more **HEADERS**


* note that everything but the host header is optional 
* use `curl` to see headers in the shell: there is a start line and 3 headers and no body

```
▶ curl -v localhost:4001/
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 4001 (#0)
> GET / HTTP/1.1
> Host: localhost:4001
> User-Agent: curl/7.55.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Etag: 50000000c7268-1b70-5f3258db
```

##### 2.3. example2 (captured in browser)

KEY                       | VALUE
--------------------------|-----------------------------------------------------------------------------------------------------------------
Request ID                | 11967
Type                      | main_frame
Time                      | Tue Aug 11 2020 08:30:42 GMT+0000 (Greenwich Mean Time)
Method                    | GET https://github.com/pkutaj/kb/blob/master/assets/2020-08-10-2.gif
Accept                    | text/html,application/xhtml+xml,...
DNT                       | 1
Upgrade-Insecure-Requests | 1
User-Agent                | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537

#### 2.4. body
* **BODY** → usually absent with `GET`

### 3. openSSL_to_telnet 
* [openSSL_to_telnet](.\2020-08-11-openSSL_to_telnet.md)

### 4. HTTP response
* carefully formatted message sent by the server

#### 4.1. start line
* 3 elements
    1. version
    2. status
    3. reason

```
HTTP/1.1 200 OK
```

#### 4.2. headers

##### 4.2.1. example: curl <domain> --head

* the following prints only response headers 

curl localhost:4001 --head

```
~~ 1. S T A R T    L I N E ~~
HTTP/1.1 200 OK

~~ 2. H E A D E R S ~~
Etag: 50000000c7268-1b70-5f3258db
Content-Type: text/html; charset=utf-8
Content-Length: 7024
Last-Modified: Tue, 11 Aug 2020 08:37:47 GMT
Cache-Control: private, max-age=0, proxy-revalidate, no-store, no-cache, must-revalidate
Server: WEBrick/1.4.2 (Ruby/2.6.5/2019-10-01)
Date: Tue, 11 Aug 2020 11:32:50 GMT
Connection: Keep-Alive
```

##### 4.2.2. example (captured by browser)

KEY                              | VALUE
---------------------------------|------------------------------------------------------------------------------------------
Request ID                       | 13837
Type                             | xmlhttprequest
Time                             | Tue Aug 11 2020 08:49:59 GMT+0000 (Greenwich Mean Time)
Method                           | POST http://com-snowplowanalytics-dev1.mini.snplow.net/com.snowplowanalytics.snowplow/tp2
Status                           | 200 - OK
Access-Control-Allow-Credentials | true
Access-Control-Allow-Origin      | http://localhost:4001
Connection                       | keep-alive
Content-Length                   | 2
Content-Type                     | text/plain; charset=UTF-8
Date                             | Tue, 11 Aug 2020 08:46:30 GMT
P3p                              | policyref="/w3c/p3p.xml", CP="NOI DSP COR NID PSA OUR IND COM NAV STA"
Server                           | Caddy
Server                           | akka-http/10.1.10

#### 4.3. body
* the actual content of server response

### 5. sources
* [Emulating an HTTP/1.1 Request using Telnet < System — The Art of Web](https://www.the-art-of-web.com/system/telnet-http11/)
