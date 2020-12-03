---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the need to just open editor with the scope of the current folder - it makes search much faster and I need to contraint the git sidebar only to the single repo. 

<!-- TOC -->

- [1. CODE](#1-code)

<!-- /TOC -->

### 1. CODE
* changes the path in terminal
* kills all instances of editor
* refreshes the context to the given path
this is used solely for very much used path like knowledge base

```powershell
# C:\Users\Admin\Documents\PowerShell\Microsoft.PowerShell_profile.ps1

function open-vsc-here {
    kill -n code -ErrorAction Ignore
    code .
}
Function open-blog { 
    $wlogPath = "C:\Users\$env:USERNAME\Documents\workspace\work.log\kb\" 
    Push-Location -Path $wlogPath
    vsc
}
Set-Alias vsc open-vsc-here
Set-Alias kb open-blog
```
