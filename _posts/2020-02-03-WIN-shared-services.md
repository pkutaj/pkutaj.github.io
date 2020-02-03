---
layout: post
title: WIN > servicehost, shared services and virtual service accounts
---
## the case	
the question is, how can services in windows be ran as separate processes in case that's needed, wanted or beneficial for error solution

## toc
<!-- TOC -->

- [service control manager (SCM) database](#service-control-manager-scm-database)
    - [difference between CurrentControlSet and ControlSet001 / ControlSet002](#difference-between-currentcontrolset-and-controlset001--controlset002)
- [shared service processes](#shared-service-processes)
- [sources](#sources)

<!-- /TOC -->

## svchost
* Its executable image, `%SystemRoot%\System32\Svchost.exe` or `%SystemRoot%\SysWOW64\Svchost.exe` (for 32-bit services running on 64-bit systems) runs in multiple instances, each hosting one or more services.
* Services running in `SvcHost` are implemented as dynamically-linked libraries (`DLLs`). 
* Each service's registry key must have a value named `ServiceDll` under the Parameters subkey, pointing to the respective service's DLL file. 
* Their `ImagePath` definition is of the form `%SystemRoot%\System32\svchost.exe -k` (**service group**; e.g. NetworkService). 
* If there is a service running within a service group, use **Process Explorer** to get the list of services

### service control manager (SCM) database
* Services sharing the same SvcHost process specify the same parameter, having a single entry in the SCM's database. 
* The Service Control Manager runs services.exe. 
* Services are defined in the Registry under `HKLM\SYSTEM\CurrentControlSet\Services`. 
* The `Type` value of the service's entry specifies if it is loaded in its own process or in a process that hosts multiple services.
* The first time that a SvcHost process is launched with a specific parameter, it looks for a value of the same name under the `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Svchost` key, which it interprets as a list of service names. Then it notifies the SCM of all the services that it hosts. SCM doesn't launch a second SvcHost process for any of those received services: instead, it simply sends a "start" command to the respective SvcHost process containing the name of the service that should be launched within its context, and whose respective DLL SvcHost loads.

![one_among_many_in_the_service_group]({{ site.url }}/assets/img000421.png)

![tapi_own_service_group]({{ site.url }}/assets/img000422.png)

* **ImagePath** defines if the process has its own instance or it is a shared service process, ran with an virtual service account 
* **NetworkService** is a virtual service account used for processes that make use of the network on various ports or have no enforced network restrictions

#### difference between CurrentControlSet and ControlSet001 / ControlSet002
* you only need to update the CurrentControlSet key...
* ControlSet001 and ControlSet002 are alternating backups of ( CurrentControlSet, you don't need to update them.
* Edit: As K noted, CurrentControlSet is an alternating symbolic link to either ControlSet001 or ControlSet002. The other key is kept as a backup for the Load Last Known Good Configuration boot option.

### shared service processes
> Running every service in its own process instead of having services share a process whenever possible wastes system resources. However, sharing processes means that if any of the services in the process has a bug that causes the process to exit, all the services in that process terminate. 
— From Windows Internals 5th edition, Chapter 4.2.8 **Shared Service Processes**


### sources
* Windows Internals
* Wikipedia
* [What are Control Sets? What is CurrentControlSet?](https://web.archive.org/web/20150217152952/http://support.microsoft.com/kb/100010)