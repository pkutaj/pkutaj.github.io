---
layout: post
title: cloud > AWS > computing > lambda
categories: [cloud]
---
## overview
The concern is to document the lambda service of AWS (one of the 3 computing services for the cloud practicioner exam)

## toc
<!-- TOC -->

- [(1) definition](#1-definition)
- [(2) benefits](#2-benefits)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) definition
* service to run code without provisioning and managing servers — paying only for the compute time consumed
* no infra needed
* pay as you consume
* can configure 
    *  128 MB
    * 3008 MB
- [x] integrates with many AWS services
- [x] enables **event driven workflow**
* primary service for **SERVERLESS** architecture

### (2) benefits
- [x] reduced maintenance requirements
- [x] enables fault tolerance without additional work
- [x] scales-on-demand
- [x] pricing based on usage
    * contrast with ec2 where paying is for the time of the uptime of the servce
    * here it is payed by usage only (only when the code is really needed and ran) 