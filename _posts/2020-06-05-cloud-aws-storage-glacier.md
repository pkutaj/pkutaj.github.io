---
layout: post
title: cloud > AWS Glacier intro
categories: [cloud]
---
## overview
The concern is to document AWS Glacier's basic concepts and benefits.

![glacier_illustrative]({{ site.url }}/assets/img001093.png)

## toc
<!-- TOC -->

- [(1) archive](#1-archive)
- [(2) example](#2-example)
- [(3) how it works](#3-how-it-works)
- [(4) storage classes](#4-storage-classes)
    - [(4.1) glacier](#41-glacier)
    - [(4.2) glacier deep archive](#42-glacier-deep-archive)
- [(5) Access: no console, only cli and api](#5-access-no-console-only-cli-and-api)

<!-- /TOC -->

## findings
### (1) archive
* AWS glacier is data archive within S3 as a separate storage class

### (2) example
* holding up to payment info for 3 years with the ability to produce that data for audit/compliance
* but data is not going to be actively accessed 

### (3) how it works
* offer configurable retrieval times
* can send files directly or through a lifecycle 

### (4) storage classes
#### (4.1) glacier
* designed for archival data
* **90-day** minimal storage duration
* can be retrieved in either **minutes or hours**
* retrieval fee per GB
* 5x cheaper than S3 standard

#### (4.2) glacier deep archive
* **180-day** minimal storage duration
* access not in minutes, **only in hours**
* retrieval fee per GB
* over 23x cheaper than S3 Storage

### (5) Access: no console, only cli and api
* the glacier data can be accessed and uploaded **only programmatically**