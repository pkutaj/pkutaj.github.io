v---
layout: post
title: cloud > AWS services > 3x compute (ec2, beanstalk, lambda)
categories: [cloud]
---
## overview
The concern this document is to give an overview of the essential AWS computing service: the elastic compute cloud, aka **EC2**

![ec2_logo]({{ site.url }}/assets/img001071.png)

## toc
<!-- TOC -->

- [1. name](#1-name)
- [2. 3xfunction types](#2-3xfunction-types)
- [3. 2xroot-device type](#3-2xroot-device-type)
    - [3.1. instance-store](#31-instance-store)
    - [3.2. ebs-store](#32-ebs-store)
- [4. AMI: amazon machine image](#4-ami-amazon-machine-image)
- [5. purchase options: on-demand, reserved, spot](#5-purchase-options-on-demand-reserved-spot)
    - [5.1. reserved instances](#51-reserved-instances)
    - [5.2. spot instances](#52-spot-instances)

<!-- /TOC -->

## findings
### 1. name
* ec2 means _Elastic Compute Cloud_
* foundational core service
* resizable compute capacity in the cloud

### 2. 3xfunction types
* defines
    * CPU
    * memory
    * storage
* **DOWNTIME** is needed for changing

CATEGORIES            | COMMENT
----------------------|--------------------------------
1. general-purpose    | most usual
2. optimized          | for compute, storage, optimized
2.1 compute-optimized |
2.2 memory-optimized  |
2.3 storage-optimized |
3. accelerated        | special like ML

* pricing depends on instance types
* features depend on instance types

### 3. 2xroot-device type
* 2 essential types

#### 3.1. instance-store
* **ephemeral storage** that is physically attached to the host the virtual machine is running on

#### 3.2. ebs-store
* **persistent storage** separate from the host the virtual server is running on
* when ec2 launched, there was only instance store, 
* now go-to root device type is EBS data, which is persistence and won't be dumped after the instance is shut down

### 4. AMI: amazon machine image
* AMI **is not** instance type
* AMI is a (mostly?) template of OS/software config you can choose so that you don't have to install things manually on your instance type
* template for instance config

![AMI_with_IIS]({{ site.url }}/assets/img001857.png)

* there is a large list of templates that can be used
* can be shared across accounts
* there is a marketplace for commercial AMIs from commercial vendors

### 5. purchase options: on-demand, reserved, spot
* pricing changes over time and from region to region
* but is significant in relative terms

![instance_types]({{ site.url }}/assets/img000959.png)

* **On-Demand** is paying by seconds

![purchase_options]({{ site.url }}/assets/img000961.png)

#### 5.1. reserved instances

* **Reserved** reserving an instance for a longer time in an instance
    * all upfront reserved instance 🠊 pay for the entire server for e.g. 3 years
    * partial upfront 🠊 part of the 3 years is paid upfront and get a reduction of the monthly cost
    * no upfront 🠊 reduced monthly cost 

![reserved_pricing]({{ site.url }}/assets/img000960.png)

![reserved_pricing_example]({{ site.url }}/assets/img000962.png)

#### 5.2. spot instances
* **Spot** uses unused EC2 capacity in the region
* can provide up to ()% discount over on-demand pricing
* there is a market price for instance types per availability zone called the Spot price
* when you request instances if your bid is higher than Spot price 🠊 they will **LAUNCH**
* more complicated than reserved instances, but cheaper

![spot_instances_pricing]({{ site.url }}/assets/img000963.png)
