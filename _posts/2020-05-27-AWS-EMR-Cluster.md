---
layout: post
title: cloud > AWS > EMR architecture and clusters
categories: []
---
## overview
The concern is to document the AWS Elastic MapReduce as an essential AWS BigData service used as a data processor. 

## toc
<!-- TOC -->

- [(1) definitions](#1-definitions)
- [(2) architecture](#2-architecture)
- [(3) clusters](#3-clusters)
- [(4) algorithm](#4-algorithm)
- [(5)](#5)
- [(6)](#6)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) definitions
* AMR is a managed cluster platform running big data frameworks, usually Hadoop and Spark usually for processing of data for analytics/BI and moving the data between various targets
* there are several layers of EMR architecture
* yarn as resource manager — yarn, created by Facebook, was introduced by Hadoop 2.0 to manage cluster resources for multiple data-processing framweorks


### (2) architecture
![EMR_architecture]({{ site.url }}/assets/img001022.png)

### (3) clusters
>Cluster differs from Cloud and Grid in that a cluster is a group of computers connected by a local area network (LAN), whereas cloud and grid are more wide scale and can be geographically distributed. Another way to put it is to say that a cluster is tightly coupled, whereas a Grid or a cloud is loosely coupled. Also, clusters are made up of machines with similar hardware, whereas clouds and grids are made up of machines with possibly very different hardware configurations.

— <https://stackoverflow.com/a/9753568>

* A _cluster_ is a **COLLECTION OF EC2** instances
* A _node_ is an **INSTANCE IN THE CLUSTER**
* each node has a **ROLE WITHIN THE CLUSTER** known as _node type_
* each _node type_ has different software component installed
    1. _master node_
    2. _core node_
    3. _task node_

![cluster_5_nodes_1master_4core]({{ site.url }}/assets/img001021.png)

### (4) algorithm
* EMR is based on divide and conquer approach for large data volumes
* as outlined, that translates to creating a cluster with lots of servers
* a node within the cluster gets a subset of data to work on
* nodes work in parallel to produce fast output
* got more data? add more servers to the cluster 🠊 the architecture can scale 
* they are working at the same time 🠊 the elapsed time should stay constant
* since different number of servers is needed in different times 🠊 the elasticity of the cloud is especially appropriate here

### (5)
### (6)
### sources