---
layout: post
title: cloud > aws > EBS vs EFS vs FSx
categories: [cloud]
---

### abstract
The concern is to document **EBS** — Elastic Block Storage and the difference with **EFS** — Elastic File Storage

![persistent_blocks]({{ site.url }}/assets/img001130.png)

## contents
<!-- TOC -->

- [abstract](#abstract)
- [(1) EBS vs EFS](#1-ebs-vs-efs)
- [(2) EBS](#2-ebs)
- [(3) EFS](#3-efs)
- [(4) Amazon FSx for Windows](#4-amazon-fsx-for-windows)
- [sources](#sources)

<!-- /TOC -->

### (1) EBS vs EFS
* EBS is a **persistent block storage** for use with EC2
    * EC2 comes with **transient** storage OOTB
* EFS is a file system for use with **LINUX-based workloads**

### (2) EBS 
* block storage designed to a **SINGLE EC2 instance**
* ✔️ enables redundancy within an AZ 🠊 durable
* ✔️ allows to take **snapshots** (backups)
* ✔️ supports encryption 
* ✔️ multiple volume types
    
TYPE                     | COMMENT
-------------------------|--------------------------------------
general purpose SSD      | general workloads
provisioned IOS SSD      | high performance for low latency apps
throughput optimized HDD | frequently accessed data
cold HDD                 | less frequently accessed workloads

### (3) EFS
* fully manages NFS (network file system)
* designed for Linux
* stores data across multiple AZs
* 2 standard classes
    * standard
    * infrequent access
* provides configurable lifecycle data rules

![EFS_networking_file_system]({{ site.url }}/assets/img001128.png)

### (4) Amazon FSx for Windows
* similar to EFS just for MS platform-
* native Windows features
    * AD support
    * SMB support
    * NTFS support

### sources
* [Gray Steel File Cabinet · Free Stock Photo](https://www.pexels.com/photo/file-cabinets-1370294/)