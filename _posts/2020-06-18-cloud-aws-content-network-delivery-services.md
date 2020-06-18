---
layout: post
title: cloud > AWS > network delivery services
categories: [cloud]
---
## overview
The concern is to document the concept of **virtual private network** (VPC) and **network delivery services**

![delivery]({{ site.url }}/assets/img001170.jpg)

— [Man Pushing Hand Truck Beside Building · Free Stock Photo](https://www.pexels.com/photo/man-pushing-hand-truck-beside-building-2047397/)

## toc
<!-- TOC -->

- [(1) definition](#1-definition)
- [(2) 4x configuration](#2-4x-configuration)
- [(3) subnetting: both private and public](#3-subnetting-both-private-and-public)
- [(4) AWS Direct Connect](#4-aws-direct-connect)
- [(5) Route 53](#5-route-53)
- [(6) elastic load balancing](#6-elastic-load-balancing)
- [(7) scaling](#7-scaling)
    - [(7.1) vertical; scale-up](#71-vertical-scale-up)
    - [(7.2) horizontal; scale-out](#72-horizontal-scale-out)
- [(8) cloudfront](#8-cloudfront)
- [(9) API gateway](#9-api-gateway)

<!-- /TOC -->

## findings
### (1) definition
* virtual private cloud is a **logically isolated** section of the AWS where it is possible to launch resources in a virtual network that user defines
* 🠊 _Your slices of the cloud_ 🠈
* ✔️ enables virtual networks
* ✔️ supports IPv4
* ✔️ supports IPv6

### (2) 4x configuration
1. IP address range
2. route tables
3. subnets
4. gateways

### (3) subnetting: both private and public
* can utilize NAT for private subnets
* enables connection to a DC
* can connect to other VPCs
* can privately connect to other AWS services

### (4) AWS Direct Connect
* cloud service solution making it easy to establish a **DEDICATED NETWORK CONNECTION** from your DC to the AWS
* scenario: application data is in DC, the application is in AWS, the connection is direct, not sending data through the internet

### (5) Route 53
* one of the 2 services leveraging **EDGE LOCATION**
* ✔️  global
* ✔️  DNS
* any changes made applied globally
* ✔️  HA (highly available)
* global resource routing 
* DNS changes are not instantaneous — changes need to propagate
* For an elegant overview see [DNS in One Picture](https://roadmap.sh/guides/dns-in-one-picture)

### (6) elastic load balancing
* elasticity is the ability to grow and contract instantly as requested/based on usage
* navigating users to the correct infrastructure
* it distributes traffic across multiple targets
* integrates with 
    * ✔️  ec2
    * ✔️  ecs
    * ✔️  lambda
* supports 1+ AZ's in a region
* 3 types
    * **ALB**; application load balancers
    * **NLB**; network load balancers
    * **ELB**; classic load balancers

### (7) scaling
* you can leverage **AUTOSCALING GROUP** + **LOAD BALANCERS** to make this work

#### (7.1) vertical; scale-up
* you **SCALE-UP** your **INSTANCE TYPE** to a larger instance type with **ADDITIONAL RESOURCES**
* an reboot is needed; discreet

#### (7.2) horizontal; scale-out
* you **SCALE-OUT** and **ADD ADDITIONAL INSTANCES** to handle the demand of an application
* continuous

### (8) cloudfront
* leveraging AWS **EDGE LOCATIONS**
* **CDN** — content delivery network
    * enables users to get content from server closest to them
    * supports static and dynamic content
    * utilizes AWS edge locations
* ✔️  advanced security features
    * AWS shield for DDos
    * AWS WAF
* the benefit that your content can be distributed globally within a matter of minutes

### (9) API gateway
* fully managed API management service
* web services that other apps can call
* integrates with multiple AWS services
* provides monitoring and metrics on API calls
* supports both VPC and on-prem private apps