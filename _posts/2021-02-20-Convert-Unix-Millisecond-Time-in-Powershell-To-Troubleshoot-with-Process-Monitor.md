## the case	
* the question is, what is the easiest way of mapping the exact moment of user action to the capture done in **process monitor**. During the capture
    - screen-capture what the affected application is doing
    - screen-capture the timestamps on [Current Millis ‐ Milliseconds since Unix Epoch](https://currentmillis.com/)
    - run procmon (screen-capture not required here)

* the ideal looks as follows

![capture_with_currentmillis]({{ site.url }}/assets/2020-02-20-procmon.gif)

* when watching the capture → map the currentmillis with the timestamp of procmon
* to do this, convert the currentmillis into your local time (see the script below)
* the procmon dump does this automatically in case you have customers that are elsewhere

## toc
<!-- TOC -->

- [1. CODE](#1-code)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. CODE
* write a function where you pass the UNIX epoch timestamp and you receive a format that can be mapped to events in procmon with if not millisecond to at least decimals

```powershell
<# 
 # the concern of this script is to return the time in format yyyy-mm-dd hh:mm:ss:fff when provided a unix timestamp
 #>

function getMillis {
    param (
        $unixTimeStamp
    )
    $epochStart = Get-Date 01.01.1970 
    $millisStamp = ($epochStart + ([System.TimeSpan]::frommilliseconds($unixTimeStamp))).ToLocalTime()
    $millisStampOutput = $millisStamp.ToString("yyyy-MM-dd HH:mm:ss.ffffff")
    $millisStampClipboard = $millisStamp.ToString("HH:mm:ss.ffffff") 
    Write-Host "~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    Write-Host "Datetime: $millisStampOutput" -ForegroundColor Cyan
    Write-Host "Clipping: $millisStampClipboard" -ForegroundColor Cyan
    Write-Host "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"    
    $millisStampClipboard = $millisStamp.ToString("HH:mm:ss.ffffff") | clip
}
```

* calling that

```
▶ getMillis 1582019437368
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Datetime: 2020-02-18 09:50:37.368000
Clipping: 09:50:37.368000
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### 2. sources
* [Current Millis ‐ Milliseconds since Unix Epoch](https://currentmillis.com/)
* [Powershell: Convert UNIX Timestamp to DateTimeMichls Tech Blog](https://michlstechblog.info/blog/powershell-convert-unix-timestamp-to-datetime/)
* [How do I filter procmon results on time-of-day? - Stack Overflow](https://stackoverflow.com/questions/45466402/how-do-i-filter-procmon-results-on-time-of-day)
