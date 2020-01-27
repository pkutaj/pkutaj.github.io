---
layout: post
title:
last_modified_at: 
---
## the case	
the question is, 

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
### elements of the thread
* the state of CPU registers
* access mode (user mode or kernel mode) that thread has
* 2 stacks
    * residing in user space
    * resiging in kernel space
* TLS (thread local storage) - storing information within the thread
    * mostly for IO operations
* optional security token
* by default, WIN OS assumes thread is a worker thread (CPU usage and some I/O maybe)
    * if thread creates UI elements (windows) ➔ message queue is created
* priority 
    * number 1-31, used in thread scheduling
* state
    * running ➔ executing code, doing work
    * ready ➔ wants to run, can't run, all the cores are doing work for other threads
    * waiting ➔ thread does not want to run, is waiting for something (I/O, kernel object) ➔ no cycles are consumed 

## terminology
*
 
## sources