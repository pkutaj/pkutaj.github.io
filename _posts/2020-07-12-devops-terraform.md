---
layout: post
title: devops > the concept of IaC & terraform
categories: [devops]
---
## abstract
The concern is documenting the initial benefits of terraform. 

## contents
<!-- TOC -->

- [1. basic qualities](#1-basic-qualities)

<!-- /TOC -->

### 1. basic qualities
* provisioning infra through **SOFTWARE** (not manually) to achieve
    * **consistency** → no mistakes done via manual config often 
    * **predictability** → looks like config files say it should
* defined **in code** → `.json`, `.yaml`, `hashicorp config language` 
* stored **in source control** → usually github 
* terraform is the  **declarative** approach to deploy infra
    * there are **imperative** approaches
* terraform is **idempotent** 
    * i.e. it has the state awareness that if there is no change to the config, but there is another repetition of the request, the request will not be performed — it can see if it is properly synced
* terraform uses **push** (not pull) approach to deploy infra