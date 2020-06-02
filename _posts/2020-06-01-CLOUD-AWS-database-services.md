---
layout: post
title: cloud > AWS > database services
categories: [cloud]
---
## overview
The concern is to document 6xDB in the AWS 

![6_AWS_db_services]({{ site.url }}/assets/img001042.png)

## toc
<!-- TOC -->

- [(1) services-to-models](#1-services-to-models)
- [(2) RDS & Aurora](#2-rds--aurora)
- [(3) dynamo DB](#3-dynamo-db)
    - [(3.1) use case: scale without excessive maintenance](#31-use-case-scale-without-excessive-maintenance)
    - [(3.2) use case: serverless](#32-use-case-serverless)
    - [(3.3) use case: implementation where low latency is key](#33-use-case-implementation-where-low-latency-is-key)
    - [(3.4) use case: data models without BLOB](#34-use-case-data-models-without-blob)
- [(4) elasticCache](#4-elasticcache)
- [(5) DMS: DB migration services](#5-dms-db-migration-services)
- [(6) redshift](#6-redshift)

<!-- /TOC -->

## findings
### (1) services-to-models

![services_mapped_to_cloud_computing_models]({{ site.url }}/assets/img001043.png)

### (2) RDS & Aurora
* used in PaaS

- [x] fully managed service for relational DB
- [x] provision
- [x] patching
- [x] backup
- [x] recovery
- [x] support deploy across multiple AZ
- [x] some platorms support read replicas

* RDS launches into a VPC
* 2 different volume types
    * 1. general purpose SSD
    * 2. provisioned IOPS SSD 

![6_supported_AWS_DB_platforms]({{ site.url }}/assets/img001044.png)

* **AURORA** IS A MySQL + PostgreSQL-compatible relational DB _built for the cloud_ 

### (3) dynamo DB

![dynamoDB_logo]({{ site.url }}/assets/img001070.png)

* used in **SaaS** 
* fully managed NoSQL DB service
* you simply use the DB, platform/infra does not need managing at all
- [x] key-value DB
- [x] document DB
* enables extremenly low latancy at virtually any scale
* historically, it is built with the scale that would support services like amazon.com
* support automated scaling based on configuration/usage
* offers in-mem cache with the DynamoDB accelerator (DAX)
* **SCALE** that other DBs can't offer

#### (3.1) use case: scale without excessive maintenance
#### (3.2) use case: serverless
#### (3.3) use case: implementation where low latency is key
#### (3.4) use case: data models without BLOB

### (4) elasticCache
* used in SaaS 
* elasticCache is fully managed in-mem data store supporting
    * Memcached
    * Redis
* eables scalind and replicas to meed application demand
* handles common use cases like
    * DB layer caching
    * session storage when working with webapps that supports session storage

### (5) DMS: DB migration services
* moing data into AWS from existing DBs
* once or continual
* supports many popular commercial / open source DB

### (6) redshift
* scalable DWH
* petabyte scale
* high performace disks
* column-store
* full encryption fupported
* isolation within CPN
* possibility to query exabytes of data