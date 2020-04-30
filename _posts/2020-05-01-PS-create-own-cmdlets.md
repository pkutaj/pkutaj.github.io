---
layout: post
title: powershell > create custom cmdlets
categories: [programming]
---
## the case	of your own cmdlet
the question is, how can you write a function that acts as a cmdlet and have it readily available in your sessions

## toc
<!-- TOC -->

- [STEP-1 advanced function with [cmdletbinding()]](#step-1-advanced-function-with-cmdletbinding)
- [STEP-2 import-module](#step-2-import-module)
- [STEP-3 $profile](#step-3-profile)
- [sources](#sources)

<!-- /TOC -->

## findings
### STEP-1 advanced function with [cmdletbinding()]
* Create an advanced function
* See [2020-04-30-PS-advanced-functions]({% post_url 2020-04-30-PS-advanced-functions %})

### STEP-2 import-module
* Use `Import-Module` to load the advanced function into memory

### STEP-3 $profile
* Powershell profile is loaded each time a given session is initialized
* Put the `Import-Module` there to load your script

```powershell
# CUSTOM CMDLETS
Import-Module "C:\Users\Admin\tools\get-timestamp-filename.ps1"
```

### sources