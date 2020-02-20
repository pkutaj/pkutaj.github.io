---
layout: post
title: PS > PROCMON > Zooming down to milliseconds
---

## the case	
* the question is, what is the easiest way of mapping the exact moment of user action to the capture done in process monitor. During the capture
    * make a screen_capture
    * screen-capture what the affected application is doing
    * screen-capture the timestamps on [Current Millis ‐ Milliseconds since Unix Epoch](https://currentmillis.com/)
    * run procmon (screen-capture not required here)

* the ideal looks as follows
![capture_with_currentmillis]({{ site.url }}/assets/2020-02-20-procmon.gif)

* then, when watching the capture, mark the currentmillis with the timestamp of procmon
* to do this, convert the current millis into your local time, the procmon dump does this automatically in case you have customers that are elsewhere

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
* write a function where you pass the UNIX epoch timestamp and you receive a format that can be mapped to events in procmon with if not millisecond to at least decimals

CODE                                                                     | COMMENT
-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------
1. `function getMillis`                                                  | function name
2. `param ($unixTimeStamp)`                                              | get a single parameter captured with `www.currentmillis.com`
3. `$epochStart = Get-Date 01.01.1970`                                   | constant start of the Unix Epoch
4. `$epochStart + ([System.TimeSpan]::frommilliseconds($unixTimeStamp))` | add captured Unix Time to the start of the Unix Epoch to get the actual timestamp in UTC
5. `ToLocalTime()`                                                       | convert UTC timestamp to your local timestamp
6. `ToString("HH:mm:ss.ffffff")`                                         | format the local timestamp to the timestamp with milliseconds
7. `$millisStamp | clip`                                                 | copy it to the clipboard
8. `write-host $millisStamp`                                             | print it

```powershell
<# 
 # the concern of this script is to return the time in format yyyy-mm-dd hh:mm:ss:fff when provided a unix timestamp
 #>

<# FUNCTION DEFINITINO #>

function getMillis {
    param (
        $unixTimeStamp
    )
    $epochStart = Get-Date 01.01.1970 
    $millisStamp = ($epochStart + ([System.TimeSpan]::frommilliseconds($unixTimeStamp))).ToLocalTime().ToString("HH:mm:ss.ffffff")
    $millisStamp | clip
    write-host $millisStamp +  copied to the clipboard -foreground cyan
    
}

<# CALL #>
getMillis 1582019437368

<# RESULT #>
# 10:50:37.368000 + copied to the clipboard
```

### sources
* [source_code]({{ site.url }}/assets/2020-02-20-KATA-PS-get-millis.ps1)
* [Current Millis ‐ Milliseconds since Unix Epoch](https://currentmillis.com/)
* [Powershell: Convert UNIX Timestamp to DateTimeMichls Tech Blog](https://michlstechblog.info/blog/powershell-convert-unix-timestamp-to-datetime/)
* [How do I filter procmon results on time-of-day? - Stack Overflow](https://stackoverflow.com/questions/45466402/how-do-i-filter-procmon-results-on-time-of-day)