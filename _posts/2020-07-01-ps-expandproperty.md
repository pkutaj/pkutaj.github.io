---
layout: post
title: powershell > expandproperty
categories: [powershell]
---
## the case	of property expanded
the question is, and has been for some time, how to output the wrapped property

## toc
<!-- TOC -->

- [expandproperty flag](#expandproperty-flag)

<!-- /TOC -->

## findings
### expandproperty flag

* Before using `-expandproperty`

```
Get-ScheduledTask | Select Triggers -first 1 

Triggers
--------
{MSFT_TaskLogonTrigger, MSFT_TaskDailyTrigger}
```

* After using `-expandproperty`

```
Get-ScheduledTask | Select -ExpandProperty Triggers -first 1

Enabled            : True
EndBoundary        : 2027-05-02T08:00:00
ExecutionTimeLimit :
Id                 : TriggerUserLoggon
Repetition         : MSFT_TaskRepetitionPattern
StartBoundary      : 2013-08-01T12:05:00
Delay              : PT12M
UserId             :
PSComputerName     :

Enabled            : True
EndBoundary        : 2027-05-02T12:05:00
ExecutionTimeLimit :
Id                 : TriggerDaily
Repetition         : MSFT_TaskRepetitionPattern
StartBoundary      : 2013-01-01T08:00:00
DaysInterval       : 1
RandomDelay        :
PSComputerName     :
```