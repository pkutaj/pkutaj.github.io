---
layout: post
title: new kb article
categories: [powershell]
---
## abstract
The concern is documenting the script I am using for creating a new document for my knowledge base from the template. 

## video
## contents
<!-- TOC -->

- [1. use-case](#1-use-case)
- [2. script](#2-script)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. use-case
* I have 2 KBs
    * slog
    * kb
* I need to run the command in shell, pass the 3 values
    * kb-type
    * doc-name
    * doc-type
* And have it created in proper path with a template I use
* A nice thing to have would also be to populate title and category within the template

### 2. script

```powershell
<# the concern is to have a utility that automates the template creation #>
function New-Kba {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)][string]$kbType,
        [Parameter(Mandatory = $true)][string]$name,
        [Parameter(Mandatory = $true)][string]$cat
    )
    
    begin {
        $t = "C:\Users\Admin\Documents\workspace\docs\templates\puzzleTemplate.md"
        $today = Get-Date -Format "yyyy-MM-dd"
    }
    process {
        switch ($kbType) {
            "kb" { 
                $kb = "C:\Users\Admin\Documents\workspace\work.log\kb" 
                $destination = "$kb\$cat\$today-$cat-$name.md"
                
            }
            "slog" {
                $kb = "C:\Users\Admin\Documents\workspace\SNOW\SNOW-logs\_posts" 
                $destination = "$kb\$today-$cat-$name.md"
                if (Test-Path "$kb\*" -Include "*$cat-$name.md") {
                    Write-Host "[~~~ doc exists ~~~]" -ForegroundColor Cyan
                    ii "$kb\*$cat-$name.md"
                    return;
                }
            } 
        }
        Write-Host "[~~~ new doc ~~~]" -ForegroundColor Cyan
        copy $t -Destination $destination -PassThru | ii
    }
    end {
        
    }
}
```

### 3. sources
