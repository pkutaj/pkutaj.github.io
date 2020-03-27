---
layout: post
title: Windows > Procmon Tactics
categories: [windows]
---
## the case	
the question is, what are the commonly used tactic when using procmon to troubleshoot, mostly hangs and crashes but also other issues

## toc
<!-- TOC -->

- [TACTIC-1 The Duration Check](#tactic-1-the-duration-check)
- [TACTIC-2 The Rule of 3](#tactic-2-the-rule-of-3)
- [TACTIC-3 Count Results!](#tactic-3-count-results)
- [TACTIC-4 The stack trace](#tactic-4-the-stack-trace)
- [TACTIC-5 Before/After](#tactic-5-beforeafter)
- [TACTIC-6 circular KISS](#tactic-6-circular-kiss)
- [TACTIC-7 the millisecond](#tactic-7-the-millisecond)
- [TACTIC-8 the second](#tactic-8-the-second)
- [TACTIC-9 the good, the bad and the rubberduck](#tactic-9-the-good-the-bad-and-the-rubberduck)

<!-- /TOC -->

## findings
* in general, check how many events you have captured and how much are you initially showing

![showing_737317_of_753876]({{ site.url }}/assets/img000445.png)

### TACTIC-1 The Duration Check
* Add duration column
* Highlight duration > 1 second OR filter duration > 1 second

### TACTIC-2 The Rule of 3
* `ctrl-e` ➔ start capture
* `ctrl-l` ➔ filter to Operation is `RegSetValue`
* repeat steps 3 times
* `ctrl-w` ➔ stop capture
* `ctrl-f` ➔ to the name of the default printer
* right-click on the match ➔ include 
* validate by matching the count of matches to 3 repetitions
* `ctrl-j` ➔ jump to the registry value
* validate 

### TACTIC-3 Count Results!
* And check mostly NOT FOUND or PATH NOT FOUND
* Google for keys that are NOT FOUND

### TACTIC-4 The stack trace
* open process activity summary
* see if there is an outlier
* can find the main service here, that is which service is being used even though just a common service group (ImagePath) is being used 
* I have it here `Computer\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\TapiSrv`
    * Property: `ImagePath`

### TACTIC-5 Before/After
* detect a change in the environment
* create a capture in the working / defect environment 
* comparative analysis with the pattern recognition tools

### TACTIC-6 circular KISS
* keep it small and simple
* logs with >100MB take too long for pattern recognition
* so you start from the filtering to the problematic application and then keep removing filters

### TACTIC-7 the millisecond
* before the capture, go to [Current Millis ‐ Milliseconds since Unix Epoch](https://currentmillis.com/) and have that open on the side
* record the capture with a screen recorder such as [ShareX](https://getsharex.com/)
* locate the exact moment when you perform a testing step
* convert the unix miliseccond to the day-time millisecond with passing the value into the following function

```powershell
function getMillis {
    param (
        $unixTimeStamp
    )
    $epochStart = Get-Date 01.01.1970 
    $millisStamp = ($epochStart + ([System.TimeSpan]::frommilliseconds($unixTimeStamp))).ToLocalTime().ToString("HH:mm:ss.ffffff")
    $millisStamp | clip
    write-host $millisStamp copied to the clipboard -ForegroundColor Cyan
    
}
```

* use VLC player and scroll with **next frame** with hotkey `e` 
    * [How to Go Frame by Frame in VLC](https://www.vlchelp.com/frame-stepping/)

### TACTIC-8 the second
* if you know when the action happened, filter everything 
    * 1 second before
    * 1 second after
1. use **The millisecond** approach to map the action to the ms

![1_second_perspective]({{ site.url }}/assets/img000519.png)

### TACTIC-9 the good, the bad and the rubberduck
* use millisecond tactic to get the screencast + MS info
* this is a bit time-intensive, the benefit is in the proper understanding of processes

1. capture broken set 
2. capture working set
3. rubberduck both
4. find the differences

