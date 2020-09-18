---
layout: post
title: aws > what burstable means
categories: []
---
## usecase
The concern is documenting the concept of **BURSTABLE** — since that is the major attribute of the `t3` instances I've been interacting with

![burstable_instances]({{ site.url }}/assets/img001855.png)


<!-- TOC -->

- [1. define](#1-define)
- [from aws docs](#from-aws-docs)
- [from ec2instances.info](#from-ec2instancesinfo)

<!-- /TOC -->

### 1. define
* this is a **bonus feature** of ec2 instances
* only **some of the instances** are burstable
* initially, each ec2 instance has a level of maximum capability
* with burstable instances, when you not utilize the full capability it becomes **BANKED FOR YOU**
* in case of excess workload in the future —> run against those banked credits
* result: getting more compute power than you are paying for in case of spikes

### from aws docs
* burstable (performance) is counterposed with fixed performance

> Amazon EC2 allows you to choose between Fixed Performance Instances (e.g. M5, C5, and R5) and Burstable Performance Instances (e.g. T3). Burstable Performance Instances provide a baseline level of CPU performance with the ability to burst above the baseline.

### from ec2instances.info
* the best info on aws ec2instances is [Amazon EC2 Instance Comparison](https://www.ec2instances.info/?selected=t3.large)

![check_image_from_ec2istances]({{ site.url }}/assets/img001858.png)
