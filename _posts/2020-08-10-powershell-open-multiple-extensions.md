---
layout: post
title: powershell > open multiple extensions with dir
categories: [powershell]
---
## usecase
The concern is documenting a command that opens files in my kata folder such that
* I pass the extension (js, py, ps1)
* The command opens all of the files of that extension 
* The commands opens also a markdown file

## contents
<!-- TOC -->

- [1. code](#1-code)
- [2. comments](#2-comments)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. code

```powershell
function open-kata { 
    param(
    [Parameter(Mandatory = $true)]
    [string]$docType)
    $kataFolder = "C:\Users\Admin\Documents\workspace\work.log\kb\kata"
    dir $kataFolder\* -Include *.md,*.$docType | ii
}
```

### 2. comments
* From <https://stackoverflow.com/a/18626464/11082684>

>-Filter only accepts a single string. 
>-Include accepts multiple values, but qualifies the -Path argument. 
> The trick is to append \* to the end of the path, and then use -Include to select multiple extensions. 

### 3. sources
* [How to properly -filter multiple strings in a PowerShell copy script - Stack Overflow](https://stackoverflow.com/questions/18616581/how-to-properly-filter-multiple-strings-in-a-powershell-copy-script)
