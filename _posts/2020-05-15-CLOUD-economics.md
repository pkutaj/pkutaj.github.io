---
layout: post
title: cloud > economics of the cloud
categories: []
---

| **THE CASE OF THE CLOUD ECONOMICS**                     |
|---------------------------------------------------------|
| What are the claimed econonomic benefits of the cloud ? |

## toc
<!-- TOC -->

- [(1) Terminology](#1-terminology)
    - [(1.1) CAPEX](#11-capex)
    - [(1.2) OPEX](#12-opex)
- [(2.) DC vs CLOUD](#2-dc-vs-cloud)
    - [(2.1) Scenarios in DC](#21-scenarios-in-dc)
    - [(2.2) Scenarios in the CLOUD](#22-scenarios-in-the-cloud)
    - [(2.3) Comparison](#23-comparison)
- [(3) AWS Costg](#3-aws-costg)
    - [(3.1) AWS cost explorer](#31-aws-cost-explorer)
    - [(3.2) AWS Budgets](#32-aws-budgets)
    - [(3.3) Planning1: AWS TCO Calculator](#33-planning1-aws-tco-calculator)
    - [(3.4) Planning2: AWS Simple monthly calculator](#34-planning2-aws-simple-monthly-calculator)
    - [(3.5) Resource Tags](#35-resource-tags)
    - [(3.6) AWS organization](#36-aws-organization)
    - [sources](#sources)

<!-- /TOC -->

## findings
### (1) Terminology
#### (1.1) CAPEX
* large, initial, one-time expences

#### (1.2) OPEX
* regular day to day expences of the business
* ongoing costs
 
### (2.) DC vs CLOUD
#### (2.1) Scenarios in DC
* note you have a large unused capacity or you have demand over capacity 

![unused_capacity_initially]({{ site.url }}/assets/img000896.png)

 * how to pay for traditional DC 

![capex_opex_expenditures_for_DC]({{ site.url }}/assets/img000898.png)


#### (2.2) Scenarios in the CLOUD

![cloud_demand_elastic]({{ site.url }}/assets/img000899.png)

* costs for cloud: there is **NO CAPEX IN THE CLOUD**

![no_capex_in_the_cloud]({{ site.url }}/assets/img000900.png)

#### (2.3) Comparison

![comparison_DC_vs_CLOUD]({{ site.url }}/assets/img000901.png)

### (3) AWS Costg
#### (3.1) AWS cost explorer
* see <https://console.aws.amazon.com/cost-management/home>
* UI for cost management by
    1. service
    2. cost tag
* also predictions based on the current usage for planning and forecast
* gives recommendations for cost optimization
* accesible via API

#### (3.2) AWS Budgets
* already used 

#### (3.3) Planning1: AWS TCO Calculator
* located at [TCO Calculator](http://awstcocalculator.com/)
* **TCO** is total cost of ownership
* determine what could be saved by leveraging cloud infrastructure

#### (3.4) Planning2: AWS Simple monthly calculator
* calculate the cost of running a custom configuration of AWS infra
* [Amazon Web Services Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)
* has been replaced by [AWS Pricing Calculator](https://calculator.aws/#/)

#### (3.5) Resource Tags
* this can organize costs
* metadata assignd to a specific AWS resource
* e.g. `webserver + department + environment + project` 
* the naming convention is open
* cost allocation report includes costs grouped by active tags

#### (3.6) AWS organization
* allows orgs to manage multiple accounts under a single master account
* use **CONSOLIDATED BILLING** for all accounts
* you can get **1 structured bill**
* configure org to centralize logging and security standards

#### sources
* [TCO Calculator](http://awstcocalculator.com/)
* [Amazon Web Services Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)
* [AWS Pricing Calculator](https://calculator.aws/#/)
* [AWS cost explorer](https://console.aws.amazon.com/cost-management/home)