---
layout: post
title: Windows > COM > COM Surrogate, application pooling and recycling
---
## the case	of particular preferences of DCOM component
the question is, what is a COM surrogate (`dllhost.exe`) and how does some of the preferences (pooling & recycling) within component services impact it when it comes to applications using this framework 

## toc
<!-- TOC -->

- [dllhost.exe is a COM surrogate?](#dllhostexe-is-a-com-surrogate)
- [pooling and recycling](#pooling-and-recycling)
- [on multiple processes running](#on-multiple-processes-running)
- [additional stats](#additional-stats)
- [COM+ Object Pooling](#com-object-pooling)
- [COM+ Application Recycling](#com-application-recycling)
- [COM+ System Application](#com-system-application)
- [sources](#sources)

<!-- /TOC -->

## findings
### dllhost.exe is a COM surrogate? 
* `dllhost.exe` is running a COM surrogate and is described as a _sacrificial process for a COM object running outside of the process that requested it_
* it's where unreliable COM objects are put if they are not considered trustworthy
* e.g. if you are using a DLL from file explorer and that COM objects crashed, it may take down the explorer (requesting application) with itself
* the surrogate instantiates a COM object **outside** of the original process that requested it
* if the COM object crashed, it will take down only the surrogate       
* in DCOM settings there is quite a lot of parameters you can play with
* [User Interface: Component Services - Microsoft Docs](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc742476(v=ws.11))

### pooling and recycling

![pooling_and_recycling_window]({{ site.url }}/assets/img000525.png)

* in pooling and recycling you can learn that
    * In **Pool Size**, type the maximum number of **application server processes that can run concurrently**. 
    * The default number is 1, in which case the COM+ Application Pooling service is disabled.
    * **Lifetime Limit**: The maximum number of minutes a process can run before it is recycled. The valid range is 0 minutes through 30,240 minutes.
    * The maximum amount of process memory usage in kilobytes (KB) before the process is recycled. If the process's memory usage exceeds the specified number for longer than one minute, the process is recycled. The valid range is 0 KB through 1,048,576 KB. The default value is 0 KB
    * The number of minutes to wait for the release of all external references to objects in the process before is the process is forcibly shut down. The valid range is 1 minute through 1440 minutes. The default value is 15 minutes. This value is used only when it is already determined that a process will be recycled based on the other criteria.
    *  The maximum number of calls that the application objects can accept before the process is recycled. The valid range is 0 calls through 1,048,576 calls.
    * The maximum number of application object activations to accept before the process is recycled. The valid range is 0 activations through 1,048,576 activations.
* basically you are telling it how many processes can be run at the same time and setting thresholds for process recycling

###  on multiple processes running
* if under heavy performance pressure, you can run multiple instances of the process and this can be mapped between the `dcomcnfg` and `taskmgr` 

![multiple_processes_of_dcom_app_running]({{ site.url }}/assets/img000521.png)

* in parenthesis, there are process ids that can be mapped with task manager

![task_manager_multiple_dllhosts_running]({{ site.url }}/assets/img000522.png)

* here you can also see basic machine resources being consumed by each instance such as memory usage (activate **details** view)
 
![select_details_check_number_of_connected_to_the_appInstance]({{ site.url }}/assets/img000523.png)

###  additional stats
* Expand process node ➔ Select **Details** on the toolbar
* Each user is connected o one of the available `dllhost` instance and remains connected for that user session
* the number of connected user sessions is **indicated** by the **Objects** value
* it is not exact, because object references are not cleaned up by garbage collection util sometime after they are released
* therefore, it is usually higher than the actual number of connected sessions

###  COM+ Object Pooling
* each executed transaction need access to a dedicated dopy of the segment object
* `dllhost` executes multiple simultaneous transactions
* `dllhost` needs to have a pool of segment object instances
* transaction arrives ➔ available instance is assigned to the transaction === instance of segment object is **activated**
* end of the transaction ➔ the segment object is returned to the pool, where it lays available for the next transaction
* you define how many segment objects are available
* this many simultaneous transactions can be executed simultaneously
	* this can be set up in properties, to set a min and max number of objects in the pool
* this is on the level of **component** not on the level of **application**, we're drilling down here
* note: segment objects are very large and consume a significant amount of memory
* having more objects than needed means dllhost consumes more memory than necessary
* the **minimum pool size** means that this amount of objects will always be ready and there will be no delay when a transaction arrives
* if there are no available segment objects in the pool when a transaction arrives then a new segment object will automatically b created to process this transaction
* if **maximum pool size** is larger, that means that new segment objects can be created and the transaction is not queued, however, it still takes time to create and simultaneously process them

![exemplary_configuration_of_object_pooling]({{ site.url }}/assets/img000524.png)

###  COM+ Application Recycling
* the memory usage of an application grows slightly over time as a memory that is allocated internally is cached for future use
* also, small memory/resource leaks (i.e. resources not being freed when finished with) can build up over time resulting in increased memory usage over time
* the simplest way to limit the memory usage is to "stop" the system periodically
* this shuts down all DLHost processes and releases all resources — you can do this manually and thus recycle the application
* but you need a **quiet point** to do this (via a scheduled task, for example)
* you can restart the application without needing to actually disconnect users — in COM+ architecture this is called **Application Recycling**
* process:
	1. `dllhost` reaches a pre-determined limit (time/memory)
	2. `dllhost` enters a **recycling state**
		* recycling state means no new connections are accepted
		* recycling state is still serving existing users
	3. simultaneously, a fresh `dllhost` is started to service any new user connections
	4. when the number of users connected to the `dllhost` in a recycling state reached 0, the `dllhost` is shut down, releasing resources
* properties to control recycling are available on the **pooling and recycling** tab on the COM+ **Application** properties dialog

###   COM+ System Application
* you could just kill `dllhost` and be done with it, but you are killing also the COM+ System Application
* if you kill `dllhost` you kill [comsysapp] which is a service and com+ system application (https://docs.microsoft.com/en-us/windows-server/security/windows-services/security-guidelines-for-disabling-system-services-in-windows-server#com-system-application)
* you are taking down an element of the operating system with you

### sources
* [What Is “COM Surrogate” (dllhost.exe) and Why Is It Running on My PC?](https://www.howtogeek.com/326462/what-is-com-surrogate-dllhost.exe-and-why-is-it-running-on-my-pc/)
* [What does the COM Surrogate do and why does it always stop working? The Old New Thing](https://devblogs.microsoft.com/oldnewthing/?p=19173)