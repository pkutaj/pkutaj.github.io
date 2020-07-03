---
layout: post
title: data > meet apache spark
categories: [data]
---
## overview
The concern is to document the function of apache spark.

![spark!]({{ site.url }}/assets/img001234.jpg)

## toc
<!-- TOC -->

- [(1) define](#1-define)
- [(2) difference with hadoop ?](#2-difference-with-hadoop-)

<!-- /TOC -->

## findings
### (1) define
* distributed processing framework and programming model
* it allows us to perform
    * machine learning
    * stream processing
    * graph analytics
* common for **PROCESSING BIG DATA WORKLOAD**

### (2) difference with hadoop ? 
* **OPTIMIZED DAG ENGINE** that catches active data **IN-MEMORY**
* this is essential, because it is boosting performance with large algorithms
* it natively supports
    * Scala
    * Python
    * Java
* it has libraries for 
    * SQL
    * stream processing