---
layout: post
title: windows > processes and threads
categories: [windows]
---
## the case	
the question is, what is the relationship and difference between processes and threads in windows

## toc
<!-- TOC -->

- [definition: manager & container](#definition-manager--container)
- [x ownership](#x-ownership)
- [creation](#creation)
- [termination](#termination)
- [STEPS for creation](#steps-for-creation)
    - [(1) CREATOR: open image file](#1-creator-open-image-file)
    - [(2) CREATOR: create kernel executive process object](#2-creator-create-kernel-executive-process-object)
    - [(3) CREATOR: create initial thread](#3-creator-create-initial-thread)
    - [(4) KERNEL: notify CSRSS that the new process and thread has been created](#4-kernel-notify-csrss-that-the-new-process-and-thread-has-been-created)
    - [(5) MAIN THREAD: complete initialization in the context of the new process](#5-main-thread-complete-initialization-in-the-context-of-the-new-process)
    - [(6) PARTICULAR THREAD: main function start executing with a thread](#6-particular-thread-main-function-start-executing-with-a-thread)
- [process parenthood](#process-parenthood)
- [sources](#sources)

<!-- /TOC -->

## findings
### definition: manager & container
* management and containment objects
* containers containing **THREADS**, managing the allocation resources to them
* the heart of Windows
* don't **RUN**. Threads **RUN**

### 5 x ownership
1. **PRIVATE VIRTUAL ADDRESS** space up to
    * 32-bit 2-3GB
    * 64-bit 8TB or more
2. **WORKING SET**: physical memory owned by process
3. private **HANDLE** to kernel objects
    * on process-by-process basis
    * handle is per-process unique
4. **ACCESS TOKEN**
    * security context
5. **PRIORITY CLASS** from Win32
    * value providing the basis of thread priorities in that process
    * but why priorities since it is not running 🠊 it does not; but the property of priority class belongs to the process and it affects all the threads running

### creation
* `CreateProcess`
* `CreateProcessAsUser`

### termination
* after process is exited, nothing is leaked
    * all private memory is freed
    * handles are closed
    * it does not matter how the process terminates — all the resources are freed

1. all threads terminate
    * kernel does not keep process alive if all threads terminate
    * does not matter if they terminate by force or politely
2. main thread exits
    * main thread is the first thread called by process
    * this is not done by kernel, but by C runtime
3. one of the threads calls `ExitProcess` (Win32) function at any time
    * polite exit
4. use `TerminateProcess` function called externally
    * has to be called from one of the threads
    * can be called by anyone if handle can be obtained

### STEPS for creation
#### (1) CREATOR: open image file

#### (2) CREATOR: create kernel executive process object
* undocumented structures
* device drivers writers don't need these objects
* windows is not exposing its internal structure here

#### (3) CREATOR: create initial thread
* create kernel Executive Thread object
* thread can create additional threads, the initial thread has to be created

#### (4) KERNEL: notify CSRSS that the new process and thread has been created
* win32 subsystem provides management and helpers to work with user mode processes
* it needs to be notified
* LPC message is sent from the kernel to csrss processgps

#### (5) MAIN THREAD: complete initialization in the context of the new process
* process has a bunch of required dlls and initialize
* `DllMain` function called by the main thread with **DLL_PROCESS_ATTACH** reason

#### (6) PARTICULAR THREAD: main function start executing with a thread
* the process is on its way

### process parenthood
* start `code.exe` with `WIN+2` from the task bar shortcut and the process has a parent which is `explorer.exe` in the process tree
* the following works only in **POWERSHELL CORE**

![process_creator_parenthood]({{ site.url }}/assets/img000790.png)

* in regular powershell 
    * of course all w3wp are started by a single parent process

```
 Get-CimInstance -Class Win32_Process 
 -Filter "Name = 'w3wp.exe'" | 
 select ParentProcessId

ParentProcessId
----------------
3052                                                                              
3052                                                                              
```

### sources
* * [Powershell how to get the ParentProcessID by the ProcessID - Stack Overflow](https://stackoverflow.com/questions/33911332/powershell-how-to-get-the-parentprocessid-by-the-processid)
