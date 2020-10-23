---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the `dive` script which starts the 15-minute micro-box for deep work.

<!-- TOC -->

- [1. idea: simply start-job && start-sleep](#1-idea-simply-start-job--start-sleep)
- [2. script](#2-script)
    - [2.1. RUBBERDUCK](#21-rubberduck)
    - [2.2. CODE](#22-code)
- [requirememnts](#requirememnts)

<!-- /TOC -->

### 1. idea: simply start-job && start-sleep
* I just need to postpone the execution of the script by 15 minutes (900 seconds)
* But you have to use the **BACKGROUND JOB** — because otherwise you would freeze the console!
* that makes all easier and the complexities of the job scheduling and compatibility with Windows POSH is not necessary

### 2. script
#### 2.1. RUBBERDUCK
* the `dive` concept inspired by Cal Newport's deep work metaphor

STEP# | CODE                                                                                                            | COMMENT
------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------
01    | kill -Name msedge -ErrorAction Ignore                                                                           | close msedge where I write summaries
02    | vlc --intf dummy c:\Users\Admin\Music\rain.mp3                                                                  | start with the noise (rain sound) used exclusively for the session — without interface
03    | start "C:\Users\Admin\AppData\Local\TogglDesktop\TogglDesktop.exe"                                              | open the tracker
04    | Start-Job -ScriptBlock {..                                                                                      | start background job..
05    | ..sleep 900;                                                                                                    | ..in 15 minutes
06    | ..kill -Name vlc -ErrorAction Ignore                                                                            | ..close the noise if still plays
07    | ..$url = "file:///C:/Users/Admin/tools/The%20Most%20Dangerous%20Writing%20App.html#/write?limit=1&type=minutes" | the writing app I use to write summaries
08    | ..start msedge $url                                                                                             | open msedge browser to write the summary
09    | ..ii "C:\Users\Admin\Documents\workspace\SNOW\SNOW-logs\ordo.md"                                                | open `ordo.md` to mark another victory (order kept)
10    | cls                                                                                                             | clean screen

#### 2.2. CODE
```powershell
function start-dive {                       
    kill -Name msedge -ErrorAction Ignore           #01
    vlc --intf dummy c:\Users\Admin\Music\rain.mp3  #02
    start "C:\Users\Admin\AppData\Local\TogglDesktop\TogglDesktop.exe" #03
    Start-Job -ScriptBlock {                        #04
        sleep 900;                                  #05
        kill -Name vlc -ErrorAction Ignore          #06
        $url = "file:///C:/Users/Admin/tools/The%20Most%20Dangerous%20Writing%20App.html#/write?limit=1&type=minutes" #07
        start msedge $url                           #08
        ii "C:\Users\Admin\Documents\workspace\SNOW\SNOW-logs\ordo.md"  #09
    }
    cls                                             #10
}
```

### requirememnts
* [VLC media player - Wikipedia](https://en.wikipedia.org/wiki/VLC_media_player)
* [The Most Dangerous Writing App - Wikipedia](https://en.wikipedia.org/wiki/The_Most_Dangerous_Writing_App)
