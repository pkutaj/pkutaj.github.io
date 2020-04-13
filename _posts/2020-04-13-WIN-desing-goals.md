---
layout: post
title: windows > windows design goals
categories: [windows]
---
## the case	of the design goals
the question is, what are windows design goals, set in the 1990s, relevant today

## toc
<!-- TOC -->

- [GOAL-1 separate address space per process](#goal-1-separate-address-space-per-process)
- [GOAL-2 protected kernel](#goal-2-protected-kernel)
- [GOAL-3 preemptive multi-threading and multi-tasking](#goal-3-preemptive-multi-threading-and-multi-tasking)
- [GOAL-4 internalization support Unicode and UTF-16](#goal-4-internalization-support-unicode-and-utf-16)
- [GOAL-5 security throughout the system](#goal-5-security-throughout-the-system)
- [GOAL-6 integrated networking](#goal-6-integrated-networking)
- [GOAL-7 powerfull file system](#goal-7-powerfull-file-system)
- [GOAL-8 run most 16-bit Windows and DOS apps](#goal-8-run-most-16-bit-windows-and-dos-apps)
- [GOAL-9 portable](#goal-9-portable)
- [GOAL-10 both client/server](#goal-10-both-clientserver)

<!-- /TOC -->

## findings
### GOAL-1 separate address space per process
* each process sees a **FLAT LINEAR ADDRESS SPACE**
* another process cannot corrupt address space of another process
* if there is a pointer pointing to nowhere, only within that process address space
    * your process can crash, but others are unaffected

### GOAL-2 protected kernel
* user-mode code cannot crash the kernel
* a process can crash, but kernel stays intact
* the only way to crash the kernel is to generate an unhandled exception in kernel mode
    * sometimes with device drivers

### GOAL-3 preemptive multi-threading and multi-tasking
* several threads can run in parallel, each getting some time slice
* in the system that has multiple processors, several processes can really run simultaneously and not just by time-sharing
* preemptive means that OS can stop a thread and give CPU to another thread upon some condition (there is a concept of **COOPERATIVE MULTITHREADING** where a thread needs to cooperate, to relinquish its time slice and agree to go to sleep while the other thread gets the CPU)

### GOAL-4 internalization support Unicode and UTF-16
* every character is composed of 2-bytes

### GOAL-5 security throughout the system
* every object can be protected

### GOAL-6 integrated networking
* networking throughout the system

### GOAL-7 powerfull file system
* NTFS
* compression and encryption implemented

### GOAL-8 run most 16-bit Windows and DOS apps
* on 32 bit systems
* 64-bit systems can't run 16-bit code, period (good by Atomic Bomberman)
* NT Virtual Dos machine (ntvdm.exe)
* even run POSIX and OS/2 applications
    * Unix code can be run in Windows
* Microsoft did not expect win32 to become very popular, but it is

### GOAL-9 portable
* across processors and platforms

### GOAL-10 both client/server
* both windows client version and windows server version