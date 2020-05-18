---
layout: post
title: cloud > AWS global infrastructure
categories: [cloud]
---

| **THE CASE OF THE AWS GLOBAL INFRA**                                    |
|-------------------------------------------------------------------------|
| **question**                                                            |
| what are the 3 elements of the AWS global infra                         |
| **thesis**                                                              |
| regions, consisting of availability zones and benefit of edge locations |

## toc
<!-- TOC -->

- [(1) regions](#1-regions)
- [(2) availability zones](#2-availability-zones)
    - [(2.1) on availability and HA](#21-on-availability-and-ha)
- [(3) naming](#3-naming)
- [(4) edge](#4-edge)

<!-- /TOC -->

## findings

### (1) regions
* each region is mapped to a geographic location
* each geographic location has a **CLUSTER OF DATA CENTERS** — not a simple DC
* up to 30 regions at the moment

![aws_regions]({{ site.url }}/assets/img000888.png)

### (2) availability zones
* smaller units **WITHIN REGIONS**
* availability zones consist of **ONE OR MORE DCs**
* at **MINIMUM** there are **TWO** availability zones within a region
* at **MINIMUM** there is **ONE DATA CENTER** within AZ
* AZ have redundant power, networking, and connectivity
* up to 70 AZ within regions

![regions_vs_az]({{ site.url }}/assets/img000889.png)

#### (2.1) on availability and HA
* availability is the **EXTENT OF FULFILMENT**
* high-availability (**HA**) that a singular failure won't lessen the application's ability to be fully operational

### (3) naming
* common to see `us-east-2a` as a **REGION IDENTIFIES**

AREA | SUB-AREA | NUMBER | AZ
-----|----------|--------|---
us   | east     | 2      | a

![region_identifiers]({{ site.url }}/assets/img000890.png)

### (4) edge
* used as nodes of **GLOBAL CONTEND DELIVERY NETWORK**
* edge locations differ to regions/AZs since they only support **2 CORE SERVICES**
    * Amazon CloudFront 🠊 CDN
    * Amazon Route 53 🠊 DNS
* currently here are **200 locations globally**
* AIM: allows AWS to server content from regions/locations/AZ closest to users

![edge_regions_az]({{ site.url }}/assets/img000891.png)