---
layout: post
title: Windows > ADPLUS
categories: [windows]
---

## the case	of digging into ADPLUS dumps
* the question is how to, if possible productivelly, use ADPLUS from the family of windows debug tools
* see the notes in [2019-11-19-WIN-debug-tools]({% post_url 2019-11-19-WIN-debug-tools %}) for other WIN debug tooling


## findings
* used for **postmortem debugging**
* a hang dump is crated by `adplus –hang –pn $processName –o`
* you need to use **NTSD** with `-z` extension to load up the dump file
* pay attention to the bittness, it should match the dump
* attach to specific process and creates dumps when conditions are met
* generates crash dumps automatically
* `.dmp` is conventional extension for crash dump file
* run `.ecxr` to get the stored exception information
* run `!analyze -v` to get analysis of the dump file
* symbols and modules should be loaded properly
    * run `.symfix` do refer to the default microsoft symbol path

![adplus_symbols_load]({{ site.url }}/assets/2020-02-24-symbols-loading.gif)

```
!analyze -v
*******************************************************************************
*                                                                             *
*                        Exception Analysis                                   *
*                                                                             *
*******************************************************************************

MethodDesc:   09f7f8dc
Method Name:  SCSFContrib.CompositeUI.WPF.ApplicationShellApplication`2[[System.__Canon, mscorlib],[System.__Canon, mscorlib]].Start()
Class:        06571fd0
MethodTable:  09f7f900
mdToken:      06000069
Module:       019251bc
IsJitted:     yes
...
PROCESSES_ANALYSIS: 1

SERVICE_ANALYSIS: 1

STACKHASH_ANALYSIS: 1

TIMELINE_ANALYSIS: 1
DUMP_CLASS: 2

DUMP_QUALIFIER: 400

CONTEXT:  (.ecxr)
eax=00000001 ebx=00000000 ecx=00000000 edx=00000000 esi=012ff080 edi=0689a5e0
eip=745424ec esp=012fef70 ebp=012fef88 iopl=0         nv up ei pl nz ac po nc
cs=0023  ss=002b  ds=002b  es=002b  fs=0053  gs=002b             efl=00000212
win32u!NtUserGetMessage+0xc:
745424ec c21000          ret     10h
Resetting default scope
```