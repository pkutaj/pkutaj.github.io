---
layout: post
title: devops > terraform 4D-4C-5P
categories: [devops]
---
## usecase
The concern is documenting 4 dimensiont, 4 components and 5 parts of config-file-sections of terraform

<!-- TOC -->

- [1. 4 dimensions of automated infra-deploy](#1-4-dimensions-of-automated-infra-deploy)
    - [1.1. deployment - provision resources](#11-deployment---provision-resources)
    - [1.2. maintenance - plan updates](#12-maintenance---plan-updates)
    - [1.3. source control](#13-source-control)
    - [1.4. templating](#14-templating)
- [2. 4 components of terraform](#2-4-components-of-terraform)
    - [2.1. executable](#21-executable)
    - [2.2. config-files](#22-config-files)
    - [2.3. plugins](#23-plugins)
    - [2.4. state-file](#24-state-file)
- [3. 5 essential parts of config files](#3-5-essential-parts-of-config-files)
    - [3.1. variables](#31-variables)
    - [3.2. providers — environment](#32-providers--environment)
    - [3.3. data — sources](#33-data--sources)
    - [3.4. resources — input](#34-resources--input)
    - [3.5. output — output](#35-output--output)
- [sources](#sources)

<!-- /TOC -->

### 1. 4 dimensions of automated infra-deploy

![4_dimensions_of_terraform]({{ site.url }}/assets/img001804.png)

#### 1.1. deployment - provision resources
#### 1.2. maintenance - plan updates
#### 1.3. source control
#### 1.4. templating

### 2. 4 components of terraform 

![4_components_of_terraform]({{ site.url }}/assets/img001805.png)

#### 2.1. executable
* single executable written in GO

#### 2.2. config-files
* `.tf`
* executable sees these in a folder
* the executable **STITCHES CONFIG TOGETHER** on the basis of these files
* in my environment, we are providing the data for the config file with [the distribuded K/V store of Consul](https://github.com/pkutaj/kb/blob/master/cloud/2020-07-13-cloud-consul-intro.md#3-distributed-keyvalue-store)

#### 2.3. plugins
* example: `AWS provider`
* terraform is a single executable
* it uses a set of plugin s to interact with **PROVIDERS**
* if teffarowm wants to communicate with that **PROVIDER** it uses plugin

#### 2.4. state-file
* a long machine-creatd `.tfstate` file using the `.json` format which is the **TRUTH** 
* current state of the config within it
* updating environment is compares the wish with the state and makes necessary 

### 3. 5 essential parts of config files

#### 3.1. variables
* create necessary abstractions for storing data
* usually the top of the file
* also stored locally in `.tfvar` files

![variables_in_tf]({{ site.url }}/assets/img001806.png)

#### 3.2. providers — environment
* deploy ENVIRONMENT
* you pass the variables 
* connect to AWS by defining a provider
* AWS is a provider, a platform you are building your 
* provider properties are in docs

![define_provider]({{ site.url }}/assets/img001807.png)

#### 3.3. data — sources
* query the cloud for the datasource that may be used later as a deploy INPUT
* you pull a **DATA SOURCE** — querying an informatino about that provider
* if getting all amazon linux ami

![define_data_as_most_recent_linux_AMI]({{ site.url }}/assets/img001808.png)

#### 3.4. resources — input
* deployment INPUT
* you create a resource or deploy a resource
* we're going to be creating a server
* this is what is needed to be created
* resource takes several parameters to be created or passed as a variable or as a data source

![resouce1_VPC]({{ site.url }}/assets/img001809.png)

![resouce2_securityGroup]({{ site.url }}/assets/img001810.png)

![resource3_instance_nginx]({{ site.url }}/assets/img001812.png)

#### 3.5. output — output
* deployment OUTPUT 

![single_output_public_dns]({{ site.url }}/assets/img001813.png)

### sources
* [Terraform - Getting Started @ Pluralsight](https://app.pluralsight.com/library/courses/terraform-getting-started/table-of-contents)
