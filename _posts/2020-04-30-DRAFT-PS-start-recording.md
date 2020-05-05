---
layout: post
title: powershell > Start Recorder
categories: []
---
## the case	of the recorder
the question is, how to start recording fast, either from running a simple cmdlet or, maybe even better by calling it with from `ALT+R` interface (RUN Program in Windows)

## toc
<!-- TOC -->

- [Share-X + ffmpeg.exe](#share-x--ffmpegexe)
- [INITIAL CODE](#initial-code)
- [QUOTES](#quotes)
- [git as version control](#git-as-version-control)
- [dot sourcing](#dot-sourcing)
- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

## findings
### Share-X + ffmpeg.exe
* **PREREQ:** both shareX and ffmpeg and try if the recording is actually working
* offers a possibility to create a configuration and export this via a command line switch

![screen_recording_options]({{ site.url }}/assets/img000830.png)

### INITIAL CODE
* the following is working, but there always be just `output.mp4` in the download folder where I have to and manually rename file
* that is why there is a clue of `$filePath` that could be passed into the function — just how

```powershell
function Start-Recording {
    [CmdletBinding()]
    param (
        [string]$filePath
    )
    
    $argumentList = '-rtbufsize 150M -f dshow -framerate 30 -i video="screen-capture-recorder" -c:v libx264 -r 30 -preset ultrafast -tune zerolatency -crf 28 -pix_fmt yuv420p -movflags +faststart -y "c:\Users\Admin\Downloads\output.mp4"'

        Start-Process c:\Users\Admin\Documents\ShareX\Tools\ffmpeg.exe -ArgumentList $argumentList
}

Start-Recording
```

### QUOTES
* the path needs to be double-quoted
* in Powershell, you need to pass the variables in double quotes, and you can't have double quotes in double quotes, they have to be swapped with single quotes
* try **TEMPLATE LITERAL** (JS) aka **HERE STRINGS** 🠊 not working at the moment
* how to pass a variable inside double quotes
* <https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_operators?view=powershell-7#format-operator--f>


### git as version control
* collaboration is another, yet undiscovered territory
* for now just commit each **DONE** step
* see [2020-02-08-GIT-undo]({% post_url 2020-02-08-GIT-undo %})

### dot sourcing
* tried to use `import-module` but why to contaminate the environment with modules that are for a single use-only
* see [Source - PowerShell - SS64.com](https://ss64.com/ps/source.html)
* so bad when it comes to syntax that I was tempted to use `import-module` 

### CODE
> rubberduck 

```powershell
function Start-Recording {
    [CmdletBinding()]
    param (
        [string]$filePath
    )
    . "c:\Users\Admin\tools\Get-TimestampedFilename.ps1"
    $filePath = Get-TimestampedFilename -description "screencast" -extension "mp4"
    echo $filePath;
    
    $argumentList = '-rtbufsize 150M -f dshow -framerate 30 -i video="screen-capture-recorder" -c:v libx264 -r 30 -preset ultrafast -tune zerolatency -crf 28 -pix_fmt yuv420p -movflags +faststart -y "{0}"' -f $filePath

        Start-Process c:\Users\Admin\Documents\ShareX\Tools\ffmpeg.exe -ArgumentList $argumentList
}

Start-Recording
```


### sources
* [Source - PowerShell - SS64.com](https://ss64.com/ps/source.html)