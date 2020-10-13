---
layout: post
title:
categories: []
---
## usecase
The concern is documenting creating a grafana dashboard for aws kinesis with a dropdown to select from either a prod or qa environment to filter a group of proper streams (the stack contains 3)

<!-- TOC -->

- [1. steps](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps
* create a variable `env` 
* select custom type
* here I want
    * `prod` 
    * `qa`  
    * both (to visualize prod OR qa)
* how to make both work ? 
* as per [CloudWatch Search Expression Syntax - Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/search-expression-syntax.html)
* use logical operator `OR`
* syntax example 🠋

```
SEARCH(' {AWS/NetworkELB, LoadBalancer}, "ConsumedLCUs" OR flow ', 'Maximum', 120) 
```

![variable_setup]({{ site.url }}/assets/img002032.png)

* the custom expression itself

![variable_setup]({{ site.url }}/assets/img002033.png)

### 2. sources
* as per [CloudWatch Search Expression Syntax - Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/search-expression-syntax.html)
