---
layout: post
title: powershell > the case of work with regex matches
categories: [powershell]
---
## abstract
The concern is documenting binding the regex hit into the system `$Matches` hash table

## video
## contents
<!-- TOC -->

- [1. extraction in a built-in binding $matches!](#1-extraction-in-a-built-in-binding-matches)
- [2. extract $matches from text files](#2-extract-matches-from-text-files)
- [3. sources](#3-sources)

<!-- /TOC -->


### 1. extraction in a built-in binding $matches!   
* PowerShell stores matches from the `-match` operator in the `$matches[]` hash table.
* Example:
```powershell
 # 2.3.4 | TEST the path and create the new folder if the year changes
    If ($filePrefix.Node.InnerText -match $regexFilePath) {
        $filePath = $matches[0]
        If (-Not (test-path $filePath)) {
            New-Item -ItemType Directory -Path $filePath 
        }
    }
```

### 2. extract $matches from text files
* note the combination of `Get-Content` with the `-raw` flag 
* use the following template

```powershell
$r = "\.\.\/assets\/img......\.png"
$file = "C:\Users\Admin\Documents\workspace\work.log\kb\git\2020-05-23-GIT-DAG.md"
$text = gc $file  -raw
$text -match $r
Write-Host $Matches[0]
```

### 3. sources
* [PowerShell - Regex put match result into a variable](https://stackoverflow.com/a/27510151/11082684)
