---
layout: post
title:
categories: []
---
## usecase
The concern is documenting how aws fargate become the alternative compute service to the foundational aws ec2 and what it actually means for me with my current level of knowledge. 

<!-- TOC -->

- [1. fargate](#1-fargate)
- [2. relatives](#2-relatives)
- [3. new compute priitive](#3-new-compute-priitive)
- [4. before](#4-before)
- [5. after](#5-after)
- [6. components](#6-components)
- [7. differences](#7-differences)
- [8. usecases](#8-usecases)
- [9. sources](#9-sources)

<!-- /TOC -->

### 1. fargate 
* introduced at aws re-invent
* the concept of differenciated work
* aws is best to work containeres
    * i.e. docker
* don't have to install or operate own docker
* deploy containers with no ec2 istances to manage
* no worries about infrastructures
* pay for CPI time and memory time used

### 2. relatives
* amazon ECS
* amazon EKS

### 3. new compute priitive
* operate at task level
* don't worry about
    * patchint
    * provisioning
    * scaling

### 4. before
* EC2
* worry about provisioning and scaling the cluster of servers to meet the needs of apps
* + patch & update each server
* privison

### 5. after
* Fargate
* no patch, update, privision, scale
* both ECS and EKS (choose the orchestration solution you prefer)
* don't worry what instance you should run this on
* don't worry about the managing of container scheduling

### 6. components

![components](../assets/img002178.png)

* note that customer stars with the definition of a task - application
* task is a **grouping of containers that make up an application**
* use `start task API` and choose the task you want

### 7. differences
* all tasks run in customer VPC 
* fargate enforces the config specifies when it startes
* supports both 
    * ALB
    * NLB
    * not ELB

### 8. usecases
* long running services
* highly variable workloads
* monolithic app portability
* batch jobs and microservices
* there is not a way to translate this to
    * spot instances
    * reserved instances
* ec2 is better for windows-based AMIs

### 9. sources