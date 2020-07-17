---
layout: post
title: aws > instance sizes
categories: [aws]
---
## abstract
The concern is documenting sizes of various ec2 types

## video
## contents
<!-- TOC -->

- [1. large](#1-large)
- [2. redshift example](#2-redshift-example)

<!-- /TOC -->

### 1. large
* rule of thumb: a "large" instance of any type has 2 vCPUs
* with each size larger (xlarge, 2xlarge, 4xlarge etc.) being a multiplier on the number of vCPUs (4, 8, 16 etc.) 
* the baseline RAM for that type is scales accordingly
* the cost of the next larger instance also roughly doubles the previous size’s cost.


### 2. redshift example
* I am working mostly with redshifts thus the example
![redshift_pricing](../assets/img001293.png)
