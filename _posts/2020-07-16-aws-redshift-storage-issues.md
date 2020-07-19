---
layout: post
title: aws > redshift storage
categories: [alert]
---
## abstract
The concern is documenting issues with storage sizes on aws redshift

## video
## contents
<!-- TOC -->

- [1. explanatio and 2 ways of upscaling](#1-explanatio-and-2-ways-of-upscaling)
- [2. nodes](#2-nodes)

<!-- /TOC -->

### 1. explanatio and 2 ways of upscaling
* you upscale vertically, usually
* Redshift is a **distributed** columnar data warehouse solution. 
* Unlike traditional databases — Redshift is **designed** to scale out by _adding nodes_ to the cluster. 
* _Adding nodes_ adds 
    * storage 
    * computing power
* When storing data in Redshift, you should choose a **distribution key** (column or set of columns) that will evenly distribute your data across different nodes. 
* As a general principle, you should use the same set of columns for your distribution key across all your tables. 
* Note that Tables configured to use a distribution style of all will get replicated across all nodes; limit using dist style all to dimension tables only.
* There are different **types of nodes** that you can choose from depending on your requirement. 
* DC1 are compute optimized nodes; they have smaller but faster SSD drives. 
* DS1 nodes will provide you with significantly higher disk space per node.
* When you add nodes to your Redshift cluster, Redshift will re-distribute your data across all nodes as specified in the distribution style for each of your tables.

— <https://stackoverflow.com/a/41557003/11082684>

### 2. nodes
* Dense Storage offers magnetic hard drives (HHD) 
* Dense Compute comes with SSD storage
* DC is faster, but comes with less storage space compared to DS.
* Also, DS nodes are more expensive than DC ones
* Redshift (also EMR) services run on EC2 infrastructure; however, **Redshift instance families** (ds1, dc1, ds2, dc2) aren’t available as standalone EC2 instances - only as Redshift nodes - and are subject to Redshift restrictions regarding Reserved purchases.