---
layout: post
title: aws > meet athena
categories: [aws]
---
## abstract
The concern is documenting the service of AWS Athena

![athena]({{ site.url }}/assets/img001281.jpg)

## video
## contents
<!-- TOC -->

- [1. def](#1-def)
- [2. three steps of Athena](#2-three-steps-of-athena)
- [3. benefits](#3-benefits)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. def
* _interactive query service_
* SSMS for AWS
* Interact with S3 data
* Using Athena, objects in S3 can be queried with SQL
* You can ad-hoc queries against S3 data
* Important: ❌ CRUD ❌
* Importand: **READ ONLY **

### 2. three steps of Athena
1. upload data → S3
    * csv
    * tsv
    * json
    * cloudtrail 
    * apache weblogs
    * avro
    * parquet & ORC
2. define schema for the data
3. write sql
    * web console
    * 3rd party tool using **JDBC** such as SQL workbenchs

### 3. benefits
* convenience and ease of use
    * transforming your data can be tedious — your tools cannot query JSON easily 
* no infra setup needed

### 4. sources 
*[Debugging bad rows in Athena [tutorial] - For data modelers & consumers - Discourse – Snowplow](https://discourse.snowplowanalytics.com/t/debugging-bad-rows-in-athena-tutorial/948)