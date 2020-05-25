---
layout: post
title: powershell > restart session w/out exiting
categories: [powershell]
---
## overview
The concern this document is to show how to change the profile settings (like alias pointer) and just reload the profile without having to re-open the window


## toc
<!-- TOC -->

- [(1) re-dotsource](#1-re-dotsource)
- [(2) invoke-command](#2-invoke-command)

<!-- /TOC -->

## findings
### (1) re-dotsource
* just run `. $profile` and you'r done

### (2) invoke-command
* you can also add the following function to `$profile` and reload more properly (for powershell core)

```powershell
Invoke-Command { & "pwsh"} -NoNewScope
```