---
layout: post
title: find and replace tactics with powershell
categories: []
---
## usecase
The concern is documenting the powershell-powered way to fast create markdown documents that have an existing template, while I need to populate that template's `YAML` header with its title and category (it is used to fast create files for Jekyll)

<!-- TOC -->

- [1. set-content](#1-set-content)
- [2. get-content](#2-get-content)
- [3. without regex pieces of info](#3-without-regex-pieces-of-info)
- [4. with regex - enter $&](#4-with-regex---enter-)
    - [4.1. bound value](#41-bound-value)
    - [4.2. file-stored value](#42-file-stored-value)
- [5. CODE](#5-code)
- [6. sources](#6-sources)

<!-- /TOC -->

### 1. set-content
* creates a file
* changes the content
* saves the file

```
Set-Content text.md -Value "hello world"
```

### 2. get-content
* `set-content` is not reading — the steps for finding and replacing is therefore
    1. find with `gc` (`get-con)


### 3. without regex pieces of info
* look at this code replacing `..` with `{{ site.url }}`

```powershell
$oldFile = "c:\old.txt"
$oldFileContent = gc $oldFile -raw 
$newFile = "c:\new.txt"
$find = "{{ site.url }}/assets/"
$replace = "{{ site.url }}/assets/"

($oldFileContent).replace($find, $replace) |
Set-Content $newFile        
```

### 4. with regex - enter $&
* this means that if you want to add to a string, you don't neet to manually use named capture groups, bind that to a separate variable, etc. just use `"$& ..."`

#### 4.1. bound value

```
▶ $text
hello world
▶ $text -replace "hello", "$& $&"
hello hello world
```

#### 4.2. file-stored value
* note, this is not saving the file yet (you need `set-content`)

```
▶ gc .\text.md
hello world
▶ (gc .\text.md) -replace "hello", "$& $&"
hello hello world
```

### 5. CODE

```powershell
function New-Kba {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)][string]$name,
        [Parameter(Mandatory = $true)][string]$cat,
        [Parameter(Mandatory = $false)][string]$silent
    )
    
    begin {
        $today = Get-Date -Format "yyyy-MM-dd"
    }
    process = {
        $filename = $name -replace "\s", "-"
        $t = "C:\Users\Admin\Documents\workspace\docs\templates\puzzleTemplate.md"
        $kb = "C:\Users\Admin\Documents\workspace\work.log\kb" 
        $destination = "$kb\$cat\$today-$filename.md"
        copy $t -Destination $destination -PassThru 
        (Get-Content $destination) -replace "title:", "$& $name" | Set-Content $destination
        (Get-Content $destination) -replace "categories:", "$& [$cat]" | Set-Content $destination
    }
            
    end {
        Write-Host "[~~~ new doc ~~~]" -ForegroundColor Cyan
        if ($silent -ne "s") { ii $destination }
    }
}
```

### 6. sources
* [Set-Content (Microsoft.PowerShell.Management) - PowerShell - Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-content?view=powershell-7.1)
* [Set-Content: The PowerShell Way to Write to a File](https://adamtheautomator.com/powershell-write-file-set-content/)
* [Capturing Names with PowerShell and Regular Expressions - The Lonely Administrator](https://jdhitsolutions.com/blog/powershell/6791/capturing-names-with-powershell-and-regular-expressions/)
