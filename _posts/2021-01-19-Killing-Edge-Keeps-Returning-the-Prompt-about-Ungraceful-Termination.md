---
layout: post
title: Killing Edge Keeps Returning the Prompt about Ungraceful Termination
categories: [powershell]
---
## usecase
The concern is documenting the to remove the "Microsoft Edge Closed Unexpectedly" prompt in case I kill it from the shell with `Stop-Process` cmdlet.

![when_killed_prompts_for_pages_restore]({{ site.url }}/assets/img002459.jpg)


<!-- TOC -->

- [1. steps](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps 
* instead of 

```
kill -n msedge
```

* kill with

```
gps msedge | % {$_.CloseMainWindow() | Out-Null} | kill -Force
```

### 2. sources
[Powershell to close a running program gracefully without use's interact](https://social.technet.microsoft.com/Forums/lync/en-US/4c8fad53-d7ad-4e9a-9569-454d9c793bd3/powershell-to-close-a-running-program-gracefully-without-uses-interact?forum=w7itprogeneral)
* [Suppressing the "Microsoft Edge Closed Unexpectedly" Prompt - Microsoft Tech Community](https://techcommunity.microsoft.com/t5/enterprise/suppressing-the-quot-microsoft-edge-closed-unexpectedly-quot/m-p/1454385)
