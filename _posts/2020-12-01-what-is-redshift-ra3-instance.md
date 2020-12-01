---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the new type of Redshift instance standing alongside the classical `dc2` and `ds2` introduced in re:invent 2019 event — this instance type is REDSHIFT RA3. 

I am documenting this in the context of migration from `dc2.large` to `ra3.large`

![cluster_node_types]({{ site.url }}/assets/img002301.png)

<!-- TOC -->

- [1. new features](#1-new-features)
    - [1.1. managed storage](#11-managed-storage)
- [2. migration](#2-migration)
    - [2.1. s-3 snapshot](#21-s-3-snapshot)
    - [2.2. classic resize](#22-classic-resize)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. new features
* the essence is in the separation of scaling for:
    * compute
    * storage
* before, we kept adding cluster **nodes** with allocated storage 
    * example: `160 GB` for `dc2.large`; so adding 1 node is adding `160 GB`
    * ... but that is limited to 32 nodes in a cluster, i.e. `5120 GB` was as high as you could go with `dc.large`
    * and we have customers rather doing manually UNLOADing repeatedly than upscaling to anything else
* after: you should not care about the storage sizes
    * The data can be retrieved from **S3** (!!!) on-demand 
    * Then, Redshift tracks data “temperature” (reminds me of what I learnt about SAP HANA back in the day)
    * AND keeps “hot” data local on the cluster node where the DB is running instead of in S3 bucket for performance reaslins
* RA3 splits compute and storage and it means that we will pay for computing and for S3 storage (per GB).

#### 1.1. managed storage
* The data can be retrieved from S3 on-demand 
* Redshift tracks **data temperature** and keeps **HOT** data local — not in S3
* from there it seems that
    * for computing, you scale redshift cluster
    * for storage, you scale S3
    
### 2. migration
#### 2.1. s-3 snapshot
* in my experience, we just need to briefly pause the ETL loads to switch out the old Redshift cluster endpoing for the new one 
* in that time things go into read only mode but that shouldn’t be too long - maybe an hour or so

#### 2.2. classic resize
* long time available only for read-migration

> <https://github.com/pkutaj/kb/blob/master/AWS/2020-10-19-beware-the-classic-and-elastic-resize-of-aws-redshift-are-fundamentally-different-operations.md>

### 3. sources
* <https://medium.com/rock-your-data/meet-a-new-generation-of-redshift-data-platform-ra3-e65544920866>
* [Amazon Redshift clusters - Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-ra3-node-types)
* [Amazon Redshift at re:Invent 2019 — AWS Big Data Blog](https://aws.amazon.com/blogs/big-data/amazon-redshift-at-reinvent-2019/)
* [Amazon Redshift Update – Next-Generation Compute Instances and Managed, Analytics-Optimized Storage — AWS News Blog](https://aws.amazon.com/blogs/aws/amazon-redshift-update-next-generation-compute-instances-and-managed-analytics-optimized-storage/)
