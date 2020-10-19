---
layout: post
title:
categories: []
---
## usecase
* The concern is documenting the 2 fundamentally different ways to resize AWS Redshift. 
    * the point being made is that the names (classic and elastic) are not suggesting the amount of diff
    * yes, elastic is new, but it is for different usecased, has different timescale and pricing

<!-- TOC -->

- [1. Classic](#1-classic)
- [2. Elastic](#2-elastic)
- [3. why would you want elastic resize](#3-why-would-you-want-elastic-resize)

<!-- /TOC -->

### 1. Classic
* usecase: you need to add just a partial amount of space, a one or two nodes to the existing cluster
* data is copied to a **BRAND NEW CLUSTER **
* the source cluster is **READ-ONLY**
* Classic resize takes **2 HOURS–2 DAYS** or longer, depending on the data’s size

### 2. Elastic
* same cluster
* during the operation, the cluster is read-only
* takes **10-15 MINUTES**
* really different logic, the name may be misleading
* Before deciding whether elastic resize is appropriate consider constraints
    * The new node configuration must have enough storage for existing data. 
    * Even when you add nodes, your new configuration might not have enough storage 
    * Why ? Because of the way that data is redistributed.
* You can resize only by a factor of 2, up or down, for `dc*large or ds*xlarge` node types. 
    * For example, you can resize a **FOUR-NODE** cluster up to **EIGHT NODES** or down to two nodes. 
    * This limitation exists to avoid data skew between nodes caused by an uneven distribution of slices.
* For `dc*8xlarge or ds*8xlarge` node types
    * you can resize up to two times the original node count, or down to one-half the original node count. 
    * For example, you can resize a 16-node cluster to any size up to 32 nodes, or any size down to 8 nodes. This limitation exists to avoid data skew between nodes caused by an uneven distribution of slices.

### 3. why would you want elastic resize
* you need one /combination of those
    * fast/immediate change (both up & downscale)
    * temporary change
    * available service (no downtime)
    * lots of compute power
    * lots of storage
* usecase: you need a deep copy of really large tables

* [Scale your Amazon Redshift clusters up and down in minutes to get the performance you need, when you need it | AWS Big Data Blog](https://aws.amazon.com/blogs/big-data/scale-your-amazon-redshift-clusters-up-and-down-in-minutes-to-get-the-performance-you-need-when-you-need-it/)
* [Saving AWS Redshift costs with elastic resize](https://www.sqlshack.com/saving-aws-redshift-costs-with-elastic-resize/)
* [Overview of managing clusters in Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-operations.html#elastic-resize)
