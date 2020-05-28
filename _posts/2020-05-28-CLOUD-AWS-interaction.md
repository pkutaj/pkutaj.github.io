---
layout: post
title: cloud > AWS > 3 types of interaction (console, cli, sdk)
categories: [cloud]
---
## overview
The concern this document is to 3 types of the interaction with the AWS cloud:
    * console
    * cli
    * sdk

## toc
<!-- TOC -->

- [(1) console](#1-console)
- [(2) cli](#2-cli)
    - [(2.1) cli setup](#21-cli-setup)
- [(3) sdk](#3-sdk)

<!-- /TOC -->

## findings
* most of the services/actionc can be performed in any of these

### (1) console
* web ui / mobile app
* aim: testing the service
* note: not all services are dependend upon a specific region, such as **ROUTE 53**

![DNS_service_Route_53_is_a_global_region]({{ site.url }}/assets/2020-05-18_01.gif)

### (2) cli
* console from shell
* aim: repeated tasks 

#### (2.1) cli setup
- [x] [Install the AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* get **ACCESS KEYS** from security
* note: **ROOT USER SHOULD NOT** be interacting via CLI, it is dangerous
* go to user 🠊 my security credentials 🠊 access keys 🠊 create new access key 🠊 download `.csv`

```
aws --version
aws-cli/2.0.14 Python/3.7.7 Windows/10 botocore/2.0.0dev18
```

* run `aws configure`
    * you can select **text** - **table** or **json**

```
PS C:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts> aws configure
AWS Access Key ID [None]: get from security creds
AWS Secret Access Key [None]: get from security creds
Default region name [None]: eu-central-1
Default output format [None]: text
```

### (3) sdk
* programmatic access
* aim: repeated tasks; automation of tasks **WITHIN** custom applications

![sdk_9_languages]({{ site.url }}/assets/img000942.png)