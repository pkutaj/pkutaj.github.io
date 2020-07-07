---
layout: post
title: powershell > rename with replace
categories: [powershell]
---
## abstract
The concern is documenting the scenario of renaming all files that contain the string `DRAFT-` by simply its removal. 

![filenames_with_string]({{ site.url }}/assets/img001251.png)

## video
## contents
<!-- TOC -->

- [1. dir + rename + replace](#1-dir--rename--replace)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. dir + rename + replace
* the actual command

```
dir *draft* | % {ren $_.Fullname $_.Fullname.Replace("DRAFT-", "") -Verbose}
```

### 7. sources