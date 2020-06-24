---
layout: post
title: cloud > AWS > 6x management and governance
categories: [cloud]
---
### abstract
The concern is documenting 6 essential management and governance type of services. 

![government_full_moon]({{ site.url }}/assets/img001167.png)

— [Full Moon on Capitol Hill Washington](https://www.pexels.com/photo/architecture-bright-building-capitol-355959/)

## contents
<!-- TOC -->

- [abstract](#abstract)
- [video](#video)
- [(1) CloudTrail](#1-cloudtrail)
- [(2) CloudFormation](#2-cloudformation)
- [(3) CloudWatch](#3-cloudwatch)
- [(4) Config](#4-config)
- [(5) Systems Manager](#5-systems-manager)
- [(6) Control Tower](#6-control-tower)

<!-- /TOC -->

### video
### (1) CloudTrail
* log, monitor, retain **account activity** related to actions across your AWS infra
* inserts audit train in an S3 bucket or into CloudWatch Logs
* logs per region where they occurred
* meets may compliance requirements for infra auditing
    * it may be a compliance requirement
* **should** be enabled for every AWS account
* ✔️ can consolidate into organization trail
* can be used for
    * **forensic analysis**
    * operational analysis
    * troubleshooting

### (2) CloudFormation
* managed service for provisioning infra based on templates
* no additional charge for this — only pay for services launched
* ✔️**infra-as-code**
* example: custom apps with
    * 2x s3 buckets
    * 5x EC2s
    * 2x SQSs
    * 3x lambda functions
* 🠊 how to create this ? 
    * 1. in a console, manually 🠊 complicated
    * 2. cloudformation 🠊 
* templates can be written in 
    * 1. YAML
    * 2. JSON
* ... every team member can use templates to launch infrastructure (or scale it)
* + handles management of dependencies between resources
* ✔️ drift detection to find changes in your infrastructure (similar to cloudTrail)

### (3) CloudWatch
* metrics, logs, alarms for **computational activity**
* monitoring and management service with several facets
    * log collection, metrics and events from most AWS services
* enables **alarms based on metric**
* ✔️ visualization capabilities for metrics

### (4) Config
* continuous evaluation of your infra against a set of rules
* compare that against the benchmark 
* provides config-history
* includes conformance packs for compliance standards including PCI-DSS (compliance for accepting payment info)
* can work with AWS Organizations for both cross-region and cross-account setup
* provides remediation steps for infra not meeting criteria

### (5) Systems Manager
* operational data and automation across infra
* unified UI to access operational data from multiple AWS services 
* ✔️ automation interface
* multiple tools for infra management
    * automate tasks for common maintenance actions
    * gives a secure way to access servers using only AWS credentials
    * stores commonly used params securely for operational use

### (6) Control Tower
* connected to AWS organizations, allowing companies to manage multiple accounts under a single master 
    * consolidates billing
    * centralizes logging
* control tower is a service to create a multi-account environment that centralizes users across all AWS accounts
* control tower enables user-creation via templates
* integrates Guardrails for accounts