---
layout: post
title: compare ec2 prices
categories: [aws]
---
## usecase
The concern is documenting the easiest way yet to compare ec2 prices with the help of the glorious [Amazon EC2 Instance Comparison](https://www.ec2instances.info/?compare_on=true&selected=t3.small)

<!-- TOC -->

- [1. just a query string](#1-just-a-query-string)
- [2. example](#2-example)
- [3. storage not included](#3-storage-not-included)
- [4. region](#4-region)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. just a query string
* https://www.ec2instances.info/?compare_on=true&selected=$1,$2
* where $1 is ec2 instance
* another is another ec2 instance
* you can select the price per hour, day, month, etc.

### 2. example

<https://www.ec2instances.info/?cost_duration=monthly&compare_on=true&selected=t3.medium,t3.small>

![compare_t3.small_t3.medium]({{ site.url }}/assets/img001875.png)

### 3. storage not included
* mind you that the EBS storage is not included in the price 
* 100GB EBS SSD storage is about 10USD/month in Sep-2020

### 4. region
* make sure you select a correct region, too
* this can be put into the query string as well

### 5. sources
* [Amazon EC2 Instance Comparison](https://www.ec2instances.info/)
