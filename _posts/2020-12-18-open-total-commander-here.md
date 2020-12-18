---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the need to quickly open total commander from powershell to keep the flow of working within the particular repository - for example to utilize it's mass rename tool, etc. 

<!-- TOC -->

- [1. SOP](#1-sop)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. SOP
* put the following function in powershell profile

```powershell
function start-totalCommanderhere {
    $here = (Get-Location).path
    kill -n TOTALCMD64 -ErrorAction Ignore
    start "c:\totalcmd\TOTALCMD64.EXE" $here
}
set-alias tc start-totalCommanderhere
```

* jumping to total commander with `tc` if I need it 

### 2. sources
* [Command-line: open path in active panel? - Total Commander](https://ghisler.ch/board/viewtopic.php?t=35169)
