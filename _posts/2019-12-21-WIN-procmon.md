---
layout: post
title: WIN > The Magic of the Process Monitor Tool

---
> when something breaks in windows, run process monitor

**― David Solomon, Windows Internals book series**

>He said that most men were in their lives like the carpenter whose work went so slowly for the dullness of his tools that he had not time to sharpen them.”

**― Cormac McCarthy, The Crossing**

<!-- TOC -->

- [in a nutshell](#in-a-nutshell)
    - [profiling](#profiling)
    - [hang processes](#hang-processes)
    - [registry tracing](#registry-tracing)
        - [example:  identify the key when setting default printer](#example--identify-the-key-when-setting-default-printer)
    - [process tree](#process-tree)

<!-- /TOC -->
### in a nutshell
* process monitor (aka procmon) is 2nd most downloaded sysinternal tool
* the essence to good usage is a combination of
    * knowledge of the tool
    * understanding of what the tool shows you
* because there is **so much noise** in the dump ➔ lots of quality-filtering needed
    1. filter dialog
    2. quick filtering
    * default filter does not show everything 
        * events from system process are excluded (kernel activity su ch device drivers)
        * process profiling events that are generated every second
        * low-level operations
        * system pagefile
        * changes for NTFS and MFT internal file systems
* there are highlights and bookmarks, with bookmarks being persistent in PML file
* rule no.1: **don't leave it running**
    * overnight, the size of the pagefile will force you to reboot
    * the pagefile will fill eventually
    * you need to filter heavily
* `ctrl-e` starts and stops the capture
* `ctrl-x` clears the trace
* `ctrl-l` opens a filter menu
* often the information is missed because the column is not made visible

AIM                                                       | TOOL
----------------------------------------------------------|-------------------------------------
for finding hogging processes, try                        | **tools > process activity summary**
for finding what files are accessed the most              | **tools > file summary**
for finding what registry keys are accessed the most      | **tools > registry summary**
for getting the stack summary inside of the code itself   | **tools > stack summary**
for network summary getting the amount of transfered data | **tools > network summary**
for the display of places accessed by multiple parties    | **tools > cross reference summary**
for counting occurences inside of a certain columns       | **tools > count occurences**

#### profiling
* has to be **enabled** in **options > profiling events > generate profiling events**
* a very simple profiler that will give you a general idea how CPU utilization is distributed in your system
* The profiling events have an execution stack, exactly like any other event in Process Monitor, and you can gain a quick impression **where CPU time** is spent and which call stacks are responsible for it.

#### hang processes
* locate the hung process 
* note how much of the CPU time is consumes
    * **usually identify the problem thread by the amount of CPU time it is using** 
* Process. Just an environment where threads execute code. Think of it like a container.
* Thread(s). A process must have at least one thread. Threads are responsible for executing code.
* Stack. The stack is composed of
    * the module (e.g. a dll or sys) 
    * and a function. 
        * If you have symbols configured, you can see the function name. 
* Each line in the stack is known as a frame. 
* Together, the module name and function can be referred to as a subroutine.
* Threads and stacks are read from bottom to top

#### registry tracing
* start with filter activated to Operation is `RegSetValue`
* combine with the target feature to find what you look for
    * target works perfectly with specific process
    * tarhet sets PID ➔ needs to be refreshed as PID as PID changes with the new instance

![filter-registry-tracing]({{ site.url }}/assets/img000370.png)

##### example:  identify the key when setting default printer
* `ctrl-e` ➔ start capture
* `ctrl-l` ➔ filter to Operation is `RegSetValue`
* repeat steps 3 times
* `ctrl-w` ➔ stop capture
* `ctrl-f` ➔ to the name of the default printer
* right-click on the match ➔ include 
* validate by matching the count of matches to 3 repetitions
* `ctrl-j` ➔ jump to the registry value
* validate 

#### process tree
* `ctrl-t`
* what was the OS looking like
* similar to process explorer live
* like remotely looking
* shows relationship of processes
* shows status indicators
* shows lifetime of the processees
* very good for catching short-lived, badly behaving processes
* use for quick-filter as well 
    * e.g. Add process and childen to include filter
