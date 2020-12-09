---
layout: post
title: aws > kinesis components
categories: [aws]
---
## usecase
The concern is documenting main components of kinesis

<!-- TOC -->

- [1. Stream](#1-stream)
- [2. Shard](#2-shard)
- [3. Writing](#3-writing)
- [4. Storage](#4-storage)
- [5. Reading](#5-reading)

<!-- /TOC -->

### 1. Stream  

![immutable_log]({{ site.url }}/assets/img001716.png)

* there is a immutable unified log — the only allowed operation is **APPEND**
    * no insert or removal 
    * the amount of data is so high that just a touch could distabilize the whole stream
    * **FRAGILE**
    * seems like apt for **FUNCTIONAL PROGRAMMING**
* each record has a **sequence number**

### 2. Shard
* the unit of data sequencing within the stream
* each shard has its own log

 ![shards_scale_stream]({{ site.url }}/assets/img001718.png)

* 1 shard can **ingest** 
    * up to 1MB/sec
    * up to 1000 records/sec
* max size of data payload before base64-encoding is 1 MB

### 3. Writing 
* how does it know where to write
* record has
    * key
    * data
* stream has a key range associated with it
* every shard has a key range associated w/ it
* records with same key will certainly end up in the same shard

![key_to_shard_keyrange]({{ site.url }}/assets/img001720.png)

### 4. Storage 
* 24 hours, usually
* There is a retention defined

### 5. Reading
* reading is not removing
* log can be read by multiple consumers 
* 1 consumer can read from 1 or more shards simultaneously 

![key_to_shard_keyrange]({{ site.url }}/assets/img001721.png)
