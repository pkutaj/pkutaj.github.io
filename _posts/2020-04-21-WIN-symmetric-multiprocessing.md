---
layout: post
title: windows > symmetric multiprocessing
categories: [windows]
---
## the case	of symmetric multiprocessing
the question is the essential treatment of multiple CPUs in Windows

## toc
<!-- TOC -->

- [(1) rule: core identity](#1-rule-core-identity)
- [(2) rule: no role distribution](#2-rule-no-role-distribution)
- [(3) basic architecture supports up to 32/64 CPUs](#3-basic-architecture-supports-up-to-3264-cpus)
- [(4) rule: CPU amount is licence-bound](#4-rule-cpu-amount-is-licence-bound)
- [DEMO](#demo)

<!-- /TOC -->

## findings
* windows support multiple processors, of course
* it does it in a way known as **SMP** — **SYMMETRIC MULTIPROCESSING**

### (1) rule: core identity
* All CPUs are the same and share main memory and have equal access to peripheral devices (no master/slave)

### (2) rule: no role distribution
* not that 1 CPU would run kernel and another would run user-mode
* CPUs are equal in the access to memory

### (3) basic architecture supports up to 32/64 CPUs
* basic architecture
    * 32 processors on a 32-bit system
    * 64 processors on a 64-bit system
* this was managed using a **BITMASK** with the size of the **MACHINE WORD**
* with win7 64 bit & 2008 R2 support up to 256 cores
* new concept of **PROCESSOR GROUP**
    * can contain up to 4 processors
* the multicore era has arrived 
    * instead of increasing frequencies which is now difficult to achieve due to physical constraints
    * you have more cores
    * for applications to run faster, it is necessary to **PARALYZE**

### (4) rule: CPU amount is licence-bound
* multiple cores do not count towards this limit
* this is about **SOCKETS**
* you can have 8 cores with 1 socket


### DEMO
* change the view in **Task Manager ➔ Performance ➔** right-click **the graph ➔ Change graph to ➔ Logical processors**
* you can run 8 threads simultaneously

![cpu_utilization_per_logical_processor]({{ site.url }}/assets/2020-04-16-CPU-utilization-per-logical-processor.gif)

* see **PROCEXP** to get more info
    * visualize hyperthreading by separating utilization visually per physical core

![htt_visualized]({{ site.url }}/assets/img000743.png)