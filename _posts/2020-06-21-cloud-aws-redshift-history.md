---
layout: post
title: cloud > AWS > redshift
categories: []
---
## abstract
The concern is documenting the origins of AWS Redshift (relational datawarehouse in the cloud)

![redshift_in_the_universe]({{ site.url }}/assets/img001195.png)

## video
## contents
<!-- TOC -->

- [1. etymology](#1-etymology)
- [2. DWH scales](#2-dwh-scales)
- [3. scale-out arrives](#3-scale-out-arrives)
- [4. relational survives](#4-relational-survives)
- [5. paraccel forks postgress](#5-paraccel-forks-postgress)
- [8. sources](#8-sources)

<!-- /TOC -->

### 1. etymology
* from physics 🠊 when light or radiation has its **wavelength increased**
* but also (wikipedia) the name means to shift away from Oracle, which is known as "Big Red" for its corporate colors

### 2. DWH scales
* in the course of the few decades we got from gigabytes into petabyte-scale
* GB 🠊 TB 🠊 PB

### 3. scale-out arrives
* the arrival of new bigdata products scaling the processing of data
* ✔️ hadoop
* ✔️ couchbase

### 4. relational survives
* there was a period announcing the demise of the relational model
* this has not occurred
* massively parallel relational DB such as Teradata continued to offer relational scale-out architecture as **expensive appliances**

### 5. paraccel forks postgress
* ParAccel develops a fork of **Postgres 8.0.2** scaling out on commodity hardware
    * Postgres is open-source and popular
    * scale-out like hadoop but is relational
* this gets the attention of AWS in 2012
* AWS licenses ParAccel technologies and develops Redshift as an MPP (massive parallel processing) DW running on cloud architecture
* this is **heavily modified Postgres** 🠊 but not everything Postgres can do is possible in Redshift

### 8. sources
* [Building your First Redshift Datawarehouse - Pluralsight](https://www.pluralsight.com/courses/amazon-redshift-data-warehouse)
* [Amazon Redshift - Wikipedia](https://en.wikipedia.org/wiki/Amazon_Redshift)