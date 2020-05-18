---
layout: post
title: cloud > AWS support resources
categories: [cloud]
---
## overview
the concern of this document is to give an overview of the official supply of AWS support toolage

## toc
<!-- TOC -->

- [(1) AWS support](#1-aws-support)
- [(2) AWS personal health dashboard](#2-aws-personal-health-dashboard)
- [(3) AWS trusted advisor](#3-aws-trusted-advisor)
- [(4) 4 differences in AWS plan tiers](#4-4-differences-in-aws-plan-tiers)
    - [(4.1) AWS basic support](#41-aws-basic-support)
    - [(4.2) AWS developer support](#42-aws-developer-support)
    - [(4.3) AWS business support](#43-aws-business-support)
    - [(4.4) AWS enterprise support](#44-aws-enterprise-support)
- [(5) Support response time](#5-support-response-time)

<!-- /TOC -->

## findings
### (1) AWS support
* enables to get support from AWS resources for workloads in the cloud
* automated answers and recommendations

### (2) AWS personal health dashboard
* alerts and remediation guidance when AWS is experiencing events that may impact you
* see [Personal Health Dashboard](https://phd.aws.amazon.com/phd/home#/dashboard/open-issues)
* possible to use event logs
* notifications can be set (and pushed to slack, for example) with **CLOUDWATCH**

![personal_health_dashboard]({{ site.url }}/assets/img000916.png)

### (3) AWS trusted advisor
* automated tool checking your usage against best practices
* you may eliminate the need to file a support request
* different checks done based on the plan tier
* core checks done also in the free tier

![AWS_trusted_advisor_areas]({{ site.url }}/assets/img000902.png)

* 5 categories for recommendations (only security and service limits for basic/dev tiers)
* available at [Trusted Advisor Management Console](https://console.aws.amazon.com/trustedadvisor/home?#/dashboard)


![trusted_advisor_dashboard]({{ site.url }}/assets/img000915.png)

### (4) 4 differences in AWS plan tiers
#### (4.1) AWS basic support
- [x] for all customers
- [x] access to trusted advisor
- [x] 24x7 access to customer service, documentation, forums, and whitepapers
- [x] engineers do not help with implementation questions
- [x] access to aws personal health dashboard

#### (4.2) AWS developer support
- [x] all features of Basic Support
- [x] Business hours email access to support engineers
- [x] limited to 1 primary contact
- [x] starts at $29/month tied to AWS usage

#### (4.3) AWS business support
- [x] includes all of Dev Support
- [x] Full set of trusted advisor check
- [x] 24/7 phone, email, and chat access to support engineers
- [x] unlimited contacts
- [x] 3rd party software support
- [x] starts at $100/month tied to AWS usage

#### (4.4) AWS enterprise support
- [x] all of Biz support
- [x] designated Account Manager
- [x] concierge support
- [x] start at $15.000/month

### (5) Support response time

![aws_response_times]({{ site.url }}/assets/img000903.png)

