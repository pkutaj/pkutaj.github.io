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

- [(1) intro](#1-intro)
- [(2) ec2](#2-ec2)
    - [(2.1) use cases](#21-use-cases)
    - [(2.2) instance types](#22-instance-types)
    - [(2.3) root device type](#23-root-device-type)
    - [(2.4) AMI: amazon machine image](#24-ami-amazon-machine-image)
    - [(2.5) purchase options: on-demand, reserved, spot](#25-purchase-options-on-demand-reserved-spot)
    - [(2.6) reserved instances](#26-reserved-instances)
    - [(2.7) spot instances](#27-spot-instances)

<!-- /TOC -->

## findings
### (1) intro
* compute service enables to leverage cloud-based machines for computing workloads
* this could be any task from serving web content, running a DB, calculating statistics, etc. 

### (2) ec2
* ec2 means _elastic compute cloud_
* foundational core service
* resizable compute capacity in the cloud

#### (2.1) use cases
* webapp hosing
* batch processing
* web services endpoint
* desktop in the cloud

#### (2.2) instance types
* defines
    * CPU
    * memory
    * storage
* **DOWNTIME** is needed for changing

CATEGORIES      | COMMENT
----------------|--------------------------------
general-purpose | most usual
optimized       | for compute, storage, optimized
accelerated     | special like ML
![ec2_logo]({{ site.url }}/assets/img001071.png)
* pricing depends on instance types
* features depend on instance types

#### (2.3) root device type
* 2 essential types
* **INSTANCE STORE**
    * **ephemeral storage** that is physically attached to the host the virtual machine is running on
* **ELASTIC BLOCK STORE**
    * **persistent storage** separate from the host the virtual server is running on
* when ec2 launched, there was only instance store, now go-to root device type is EBS data, which is persistence and won't be dumped after the instance is shut down

#### (2.4) AMI: amazon machine image
* template for instance config
* there is a large list of templates that can be used
* can be shared across accounts
* there is a marketplace for commercial AMIs from commercial vendors

#### (2.5) purchase options: on-demand, reserved, spot
* pricing changes over time and from region to region
* but is significant in relative terms

![instance_types]({{ site.url }}/assets/img000959.png)

* **On-Demand** is paying by seconds

![purchase_options]({{ site.url }}/assets/img000961.png)

#### (2.6) reserved instances

* **Reserved** reserving an instance for a longer time in an instance
    * all upfront reserved instance 🠊 pay for the entire server for e.g. 3 years
    * partial upfront 🠊 part of the 3 years is paid upfront and get a reduction of the monthly cost
    * no upfront 🠊 reduced monthly cost 

![reserved_pricing]({{ site.url }}/assets/img000960.png)

![reserved_pricing_example]({{ site.url }}/assets/img000962.png)

#### (2.7) spot instances
* **Spot** uses unused EC2 capacity in the region
* can provide up to ()% discount over on-demand pricing
* there is a market price for instance types per availability zone called the Spot price
* when you request instances if your bid is higher than Spot price 🠊 they will **LAUNCH**
* more complicated than reserved instances, but cheaper

![spot_instances_pricing]({{ site.url }}/assets/img000963.png)