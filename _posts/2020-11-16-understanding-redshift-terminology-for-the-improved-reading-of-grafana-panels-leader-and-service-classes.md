---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the terminology used in the grafana panels such as 

![grafana_redshift_wlmqueue]({{ site.url }}/assets/img002242.png)

<!-- TOC -->

- [1. notes](#1-notes)
- [2. leader](#2-leader)
- [3. service class ID](#3-service-class-id)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. notes
* I know WLM === `workload management`, an interface for setting and configuring job/query priorities 

### 2. leader
* the basic division of roles in Redshift is
    * **leader** node
    * **compute** nodes
* similar to other services (e.g. master and data nodes in ElasticSearch)
* its functions:
    1. **coordinates** the compute notes
    2. **handles external communication** → applications interact directly only with the leader
    3. develops **execution plans**
        * mainly series of steps necessary to obtain results for **complex queries**
    4. compiles code
    5. distributes the compiled code to the copute nodes
    6. allocates a portion of the data to each compute node
* note that SQL statements are distributed by compute node only when a query references tables stored on a compute node
* all other queries run exclusively on the leader node
* some functions can run only on the leader and the query will fail if references tables reside on the compute nodes
    7. leader aggregates intermediary results returned by the compute

### 3. service class ID
> Amazon Redshift WLM creates query queues at runtime according to service classes, which define the configuration parameters for various types of queues

* a **SERVICE CLASS** is a range within which a type of queue. 
* each queue has a numerical ID and based on the range it falls into, it is a certain type of the queue

ID      | Service class
--------|---------------------------------------------------------------------
1–4     | Reserved for system use.
5       | Used by the superuser queue.
6–13    | Used by manual WLM queues that are defined in the WLM configuration.
14      | Used by short query acceleration.
15      | Reserved for maintenance activities run by Amazon Redshift.
100–107 | Used by automatic WLM queue when `auto_wlm` is true.

### 4. sources
* [Redshift Query Queues: The Complete Guide](https://blog.panoply.io/the-redshift-query-queues-challenges-and-some-tips)
