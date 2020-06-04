---
layout: post
title: AWS > S3, buckets & hosting a static web
categories: [cloud]
---
## overview
The concern is to document the intro to the AWS S3 service, basically with a demo of a short static web site of a host using the service. 

## toc
<!-- TOC -->

- [(1) on buckets](#1-on-buckets)
- [(2) 4x storage classes](#2-4x-storage-classes)
    - [(2.1) standard](#21-standard)
    - [(2.2) intelligent-tiering](#22-intelligent-tiering)
    - [(2.3) standard-IA (infrequent access)](#23-standard-ia-infrequent-access)
    - [(2.4) one zone-IA (infrequent access)](#24-one-zone-ia-infrequent-access)
- [(3) on storing accross multiple AZ](#3-on-storing-accross-multiple-az)
- [(4) lifecycle policies](#4-lifecycle-policies)
- [(5) transfer acceleration](#5-transfer-acceleration)
- [(6) DEMO: hosting a static website](#6-demo-hosting-a-static-website)
    - [(6.1) STEP-1 create a bucket](#61-step-1-create-a-bucket)
    - [(6.2) STEP-2 enable static website hosting](#62-step-2-enable-static-website-hosting)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) on buckets
* S3 = simple storage service
* the unit of file storage/organization is called a **BUCKET**

![bucket_as_s3_unit]({{ site.url }}/assets/img001083.png)

* each bucket has a **SET OF SETTINGS** 
* settings apply to that particular bucket 
* ✔️ enables URL access for files
* ✔️ offers configurable rules for data lifecycle
* ✔️ can serve as a static web host — something I used to miss working with Google Drive

### (2) 4x storage classes
* **NOTE:** these all are **NON-ARCHIVAL CLASSES** (about archiving, later)

#### (2.1) standard
* default class for freqwuently accessed data

#### (2.2) intelligent-tiering
* moving your data to the correct class **BASED ON USAGE**
* moves between _frequent_ and _infrequent_ access
* performance **s3 intelligent tiering** = **s3 standard**

#### (2.3) standard-IA (infrequent access)
* get lower cost for utilizing this class
* standard resiliency because the data is accessible across multiple AZs

#### (2.4) one zone-IA (infrequent access)
* stored only in 1 AZ

### (3) on storing accross multiple AZ
- [x] durable data
- [x] accessible data

### (4) lifecycle policies
* criteria for a bucket enabling data to **transition**/**expire** 
* transition can move on another storage class based on **time**
    * not usage, that is possible only with intelligent tiering
* expiration can delete objects based on age
* policies can factor in version o specific objects in a backet

### (5) transfer acceleration
* optimized uploading of data using AWS edge locations
* enabled per bucket
* part of the **CLOUDFRONT**

### (6) DEMO: hosting a static website
#### (6.1) STEP-1 create a bucket 
1. create a bucket
    * select the option that you want to enable the option to make the file public
2. upload a file
3. go to permissions 🠊 make a file public
4. optional: enable encryption
5. open the public URL

#### (6.2) STEP-2 enable static website hosting
* go to bucket 🠊 properties 🠊 static website hosting

![enable_static_website_hosting]({{ site.url }}/assets/img001085.png)

![enable_static_website_hosting]({{ site.url }}/assets/img001086.png)

* go and set permissions on `index.html` file (you'll get 403 Forbidden HTTP status, i.e. access denied)
* create a random **hello world** `index.html` locally and upload it to the bucket

![local_index.html]({{ site.url }}/assets/img001087.png)

### sources
* [Herd of Hen · Free Stock Photo](https://www.pexels.com/photo/herd-of-hen-840111/)