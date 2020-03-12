---
layout: post
title: PowerShell > copy current path with single command
last_modified_at: 
---
## the case	
The puzzle is copying the present working directory into a clipboard. I use this to navigate fast when switching between the terminal and total commander. 

<!-- TOC -->

- [solution/code](#solutioncode)
- [demo](#demo)

<!-- /TOC -->

### solution/code
* open powershell profile by `ii $profile`
* create the following function

```powershell
Function copy-path { 
    (Get-Location).path | clip # this command does the actual work
    write-host "path copied"
}
```
* set alias in your profile to that function 

```powershell
Set-Alias cpwd copy-path
```

* reset powershell 
* in case manual work is prefered, type `(pwd).path|clip` 

### demo
![copy_pwd]({{ site.url }}/assets/2020-01-04-copy-present-working-directory.gif)