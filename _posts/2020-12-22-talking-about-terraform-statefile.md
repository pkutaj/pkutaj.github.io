---
layout: post
title: devops > terraform state
categories: [devops]
---
## usecase
The concern is documenting terraform state, as one of the 4 major TF components (next to the executable, config_files and plugins)

<!-- TOC -->

- [1. what](#1-what)
- [2. contents](#2-contents)
- [3. locking](#3-locking)
- [4. location](#4-location)
    - [4.1. local-state](#41-local-state)
    - [4.2. remote-state](#42-remote-state)
- [5. statefile-per-workspace](#5-statefile-per-workspace)

<!-- /TOC -->

### 1. what
* **THE TRUTH**
* file
* `.json` format
* **DO NOT TOUCH EVER**
* tracking what's going on with the deployment

### 2. contents
1. resource mappings
    * data sources
    * resources created as part of the config
2. metadata
    * explain what statefile is, serial

![tf_statefile_format]({{ site.url }}/assets/img001834.png)

### 3. locking
* if there is a period of flux, it may lock and no changes are allowed

### 4. location
* multpiple places

#### 4.1. local-state
* by default, locally in the current working directory where TF is stored

#### 4.2. remote-state
* s3
* azure
* consul
* TF-cloud

### 5. statefile-per-workspace
* each workspace within TF has its own separate state-file
* switching workspace means switching state-files for config
