---
layout: post
title: windows > processes and threads
categories: [windows]
---
## the case	
the question is, what is the relationship and difference between processes and threads in windows

## toc
<!-- TOC -->

- [process: manager & container](#process-manager--container)
- [thread: executor](#thread-executor)
    - [elements of the thread](#elements-of-the-thread)

<!-- /TOC -->

## findings
### process: manager & container
* Processes are the heart of Windows
* Processes, however, do not execute anything (execution is what threads do)
* Processes are containers containing threads, managing the allocating resources to them

### thread: executor
* kernel schedules thread to execute

#### elements of the thread
1. the state of CPU registers
2. access mode 
    * user mode
    * kernel mode
3. 2 stacks
    * residing in user space
    * residing in kernel space
4. TLS (thread local storage) - storing information within the thread
    * mostly for IO operations
5. optional security token
6. by default, WIN OS assumes thread is a worker thread (CPU usage and some I/O maybe)
    * if thread creates UI elements (windows) ➔ message queue is created
7. priority 
    * number 1-31, used in thread scheduling
8. state
    * running ➔ executing code, doing work
    * ready ➔ wants to run, can't run, all the cores are doing work for other threads
    * waiting ➔ thread does not want to run, is waiting for something (I/O, kernel object) ➔ no cycles are consumed