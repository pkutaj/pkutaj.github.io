---
layout: post
title: AWS > cloud basic concepts
categories: [cloud]
---

| **THE CASE OF THE CLOUDY LANGUAGE**                      |
|----------------------------------------------------------|
| **question**                                             |
| what the essential terms of the dictionary of AWS cloud? |
| **thesis**                                               |
| viz TOC                                                  |

## toc
<!-- TOC -->

- [(1) account setup](#1-account-setup)
- [(2) traditional data centers (on-premise)](#2-traditional-data-centers-on-premise)
- [(3) cloud benefits](#3-cloud-benefits)
- [(4) terminology](#4-terminology)
    - [(4.1) elasticity](#41-elasticity)
    - [(4.2) reliability](#42-reliability)
    - [(4.3) agility](#43-agility)
- [(5) types](#5-types)
    - [(5.1) maximum control: IAAS](#51-maximum-control-iaas)
    - [(5.2) minimum maintenance: SAAS](#52-minimum-maintenance-saas)
    - [(5.3) middle: PAAS](#53-middle-paas)
- [(6) deployment models](#6-deployment-models)
    - [(6.1) public](#61-public)
    - [(6.2) on-prem](#62-on-prem)
    - [(6.3) hybrid](#63-hybrid)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) account setup
* use a free tier
* first, visit the **BILLING SERVICE**
* create a budget **ALERT** to make sure you don't get charged

![budget_setup]({{ site.url }}/assets/img000887.png)

### (2) traditional data centers (on-premise)
* is an organization is building a global service they need: the idea is that this traditional data centers take **large up-front investments**
* **long time** to build the data center itself
* they need to provision servers
    * web servers
    * file servers
    * DB server 
* they expand into other regions 🠊 new data center needs to repeat the process
* forecasting demand is difficult so the large up-front investment is risky
* it is slow 
* maintenance is expensive

### (3) cloud benefits
- [x] trade capital expense for variable expense
    * you pay only for the time you use the server
- [x] benefit from massive economies of scale
    * AWS buys at scale, is getting better prices and manages at scale
    * these cost savings gets to consumers
- [x] stop guessing capacity — elasticity
- [x] increate speed and agility
    * testing and providing the minimal viable product is cheaper
- [x] stop spending maintaining data centers
- [x] go global in minutes without the need to build new DCs

### (4) terminology
#### (4.1) elasticity
* ability to acquire resources as you need them and release them you no longer need that — automatically

#### (4.2) reliability
* solutions’ ability to provide functionality for users when it is needed
* maximized for fall-overs in outages

#### (4.3) agility
* lowe the cost of trying new ideas or business processes
* reduces the time required to maintain infra — focus on business value
* reduces risk around security and compliance — there is **SHARED RESPONSIBILITY MODEL**
* provides access to emerging technologies

### (5) types
* there is a spectrum between **MAXIMUM CONTROL** VS **MINIMUM MAINTENANCE**

#### (5.1) maximum control: IAAS
* **Infrastructure as a service**

- [x] run servers in the cloud similar to running servers in own DC
- [x] change OS
- [x] configure as you want
- [x] maintain those servers

#### (5.2) minimum maintenance: SAAS
* **Software as a Service**

- [x] no worries about configuring servers

#### (5.3) middle: PAAS
* **Platform as a Service**

- [x] service is configured for us
- [x] examle: wordpress with WP Engine on AWS
- [x] example: elastic beanstalk

### (6) deployment models
#### (6.1) public
- [x] AWS
- [x] GCP
- [x] Azure

#### (6.2) on-prem
* ownDC 
* with VMWare for managing your infrastructure 

#### (6.3) hybrid
* both public and on-prem (O365)

### sources
* <https://www.pluralsight.com/courses/aws-certified-cloud-practitioner>