---
layout: post
title: mute instance of app using nircmd and powershell
categories: [powershell]
---
## usecase
The concern is documenting the use of nircmd when toggling the mute of the rain I ran in the background for work. I already have `rain.mp3` and vlc without UI with

```
vlc --intf dummy c:\Users\Admin\Music\rain.mp3
```

<!-- TOC -->

- [1. thoug](#1-thoug)
- [2. steps](#2-steps)
- [3. CODE](#3-code)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. thoug
* read the blog entry on `rollout.io` neetly describing the ongoing build -vs- buy debate in software development in general and a temptation to build things for yourself; I would say that this is the great case of buying (well it's free); actually opting for a great testet tool out there and wrap that in powershell — I just want to toggle turn off rain with `r`

### 2. steps 
* look for process with that cmdline
* get PID
* pass PID into powershell function
* toggle mute and unmute
* of course you can find another logic to identify the exact process you want, there is a lot of properties within the process object 

### 3. CODE

```powershell
function toggleRain {
    $commandLineProperty = '"C:\Program Files\VideoLAN\VLC\vlc.exe" --intf dummy c:\Users\Admin\Music\rain.mp3'
    $rainPid = (Get-Process vlc | Where-Object {$_.CommandLine -eq $commandLineProperty}).Id
    nircmd muteappvolume /$rainPid 2
}

Set-Alias r toggleRain
```

### 4. sources
* [NirCmd Command Reference - muteappvolume](https://nircmd.nirsoft.net/muteappvolume.html)
