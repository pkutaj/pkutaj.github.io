---
layout: post
title: windows > pseudo and system processes
categories: [windows]
---
## the case	of pseudo and system processes
* the question is, what is **RIGHT** when troubleshooting windows processes so that it can be investigated what is **WRONG**

## toc
<!-- TOC -->

- [pseudo-processes](#pseudo-processes)
- [system-processes](#system-processes)

<!-- /TOC -->

## findings
### pseudo-processes
1. **SYSTEM IDLE**
    * 1 thread per CPU
    * account for CPU idle time when Windows is not running any program code
    * no PID value

![thread_per_cpu]({{ site.url }}/assets/img000705.png)

2. **SYSTEM**
    * only kernel-mode process
    * `ntoskrnl.exe` and device driver code
    * activity here that something is taking place in the kernel, often a buggy driver

3. **INTERRUPTS** 
    * kernel mode time spent servicing interrupts and deferred procedure calls (DPC)
    * child process of system

4. **MEMORY COMPRESSION**
    * win10 is compressing pages
    * improving performance
    * saving SSD lifetime

![pseudo_system_processes]({{ site.url }}/assets/img000609.png)

### system-processes
1. wininit.exe
2. userinit.exe
3. services.exe
4. csrss.exe