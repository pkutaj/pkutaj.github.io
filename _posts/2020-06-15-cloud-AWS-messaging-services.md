---
layout: post
title: cloud > AWS > messaging services
categories: [cloud]
---
### abstract
The concern is documenting AWS messaging services

## contents
<!-- TOC -->

- [abstract](#abstract)
- [video](#video)
- [(1) SNS](#1-sns)
    - [(1.1) SNS example](#11-sns-example)
- [(2) SQS](#2-sqs)
- [(3) SNS+SQS use case](#3-snssqs-use-case)

<!-- /TOC -->

### video
### (1) SNS
* Simple notification services
* Fully managed pub/sub messaging services
    * publish & subscribe
* ✔️ enables you to create **decoupled apps**
* organized according to **topic**
    * publish messages about say _new orders_ and then subscribe to messages about _new orders_ only
* ✔️ OOTB integration with other AWS services
* provides end user notifications accross 
    * SMS
    * email
    * push-to-app

#### (1.1) SNS example
* SNS Topic: User Signup
* pushing further to subscribers
    * 1. Lambda Function
    * 2. SQS Queue
    * 3. Email
* it is also working like Snapchat — not subscribed 

### (2) SQS
* fully managed message queue service
* enables building decoupled and **fault tolerant** aoos 
* supports up to 256 KB dta payload
* allws messages to be stored up to 14 days
* 2 queue types
    * standard queue
    * FIFO queue (in order)

### (3) SNS+SQS use case
* SNS topic can send messages to various places
    * 1. Fulfillment Queue
        * Oder Fulfillment Sevice
        * Dropping into DWH
    * 2. Analytics Queue
        * Reporting
        * If broken, history is taken 🠊 this is **fault tolerant**

![SNS_plus_SQS_architecture]({{ site.url }}/assets/img001147.png)