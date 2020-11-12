---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the creation of an aliased function in powershell that utilizes the powers of nomad cli to receive the allocation logs with a simple command `n $jobId` — we have a 1:1 mapping of jobs to allocations in my environment. 

<!-- TOC -->

- [1. requirements](#1-requirements)
- [2. job hierarchy](#2-job-hierarchy)
- [3. what is an alloc ?](#3-what-is-an-alloc-)
- [4. get job status](#4-get-job-status)
- [5. powershell implementation get logs from the job id](#5-powershell-implementation-get-logs-from-the-job-id)
- [6. issues with out-file](#6-issues-with-out-file)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. requirements
* ✅ nomad authentication
* ✅ nomad CLI up and running

### 2. job hierarchy
* hierarchy: job → task group → allocation → task

### 3. what is an alloc ?

> An Allocation is a mapping 
> between a 1) TASK GROUP in a JOB and 2) a CLIENT NODE
> A single job may have hundreds or thousands of task groups, 
> meaning an equivalent number of allocations must exist to map the work to client machines. 
> Allocations are created by the Nomad servers as part of scheduling decisions made during an evaluation.

— from [The Architecture pf Nomad](https://www.nomadproject.io/docs/internals/architecture)

### 4. get job status
* issue here with windowd
* the GUID is randomly generated

```
▶ nomad job status 8947d8c2-32d6-4e0e-a308-0e0c3539f6af
ID            = 8947d8c2-32d6-4e0e-a308-0e0c3539f6af
Name          = foo/bar
Submit Date   = 2020-10-29T14:35:38Z
Type          = batch
Priority      = 50
Datacenters   = foo.bar
Namespace     = default
Status        = dead
Periodic      = false
Parameterized = false

Summary
Task Group        Queued  Starting  Running  Failed  Complete  Lost
deployment-group  0       0         0        0       1         0

Allocations
ID        Node ID   Task Group        Version  Desired  Status    Created    Modified
8947d8c2  1cdd3e02  deployment-group  0        run      complete  4m56s ago  3m2s ago
```

### 5. powershell implementation get logs from the job id

* in the `$profile` of powershell

```powershell
function get-nomadLogs ($jobId) { $nomadLogs = nomad alloc logs -job $jobId | oh -Paging }
Set-Alias n get-nomadLogs
```

* call with jobID → this gets you logs in the terminal

```
n 8947d8c2-32d6-4e0e-a308-0e0c3539f6af
```

* result

![result_all_good_readable]({{ site.url }}/assets/img002203.png)

### 6. issues with out-file
* it is possible to use `out-host` but not possible to use `out-file` properly
* don't know why
* the output is full of tofu characters
* I've tried different fonts (Google Noto, too) but no success there

![weird_characters_in_nomad_output]({{ site.url }}/assets/img002202.png)

### 7. sources
* [Commands: alloc logs](https://www.nomadproject.io/docs/commands/alloc/logs)
