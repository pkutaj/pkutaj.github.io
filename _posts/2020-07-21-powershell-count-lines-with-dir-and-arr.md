---
layout: post
title: powershell > count lines with dir and arr
categories: [powershell]
---
## abstract
The concern is documenting the usage of array object to count lines of files stored there

## contents
<!-- TOC -->

- [1. command](#1-command)
- [2. result](#2-result)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. command

```
dir $arr -Recurse -File  |  foreach{(GC $_) | Measure-Object -Line}
```
### 2. result
* this is an array 
```
action_point_1.json
entry_point_1.json
yoti_av_1.json
custom_key_value_1.json
failure_1.json
check_requested_1.json
entry_point_1.json
error_response_code_1.json
media_basic_1.json
task_requested_1.json
e_app\link_tid_uid_1.json
attribute_1.json
envelope_essentials_1.json
```

* this is the output → note the nested pipe that had to be done within the `foreach` loop in order to get this right and not aggregated 

```
dir $arr -file -rec | % {(GC $_) | Measure-Object -Line}

Lines Words Characters Property
----- ----- ---------- --------
   16
   16
   16
   16
   16
   16
   16
   16
   16
   16
   16
   16
   16
```

### 3. sources
* [Use a PowerShell Cmdlet to Count Files, Words, and Lines - Scripting Blog](https://devblogs.microsoft.com/scripting/use-a-powershell-cmdlet-to-count-files-words-and-lines/)
* [Find the number of lines in a project with powershell - Stack Overflow](https://stackoverflow.com/questions/561327/find-the-number-of-lines-in-a-project-with-powershell)
* [PowerShell Array Guide: How to Use and Create](https://www.varonis.com/blog/powershell-array/)
