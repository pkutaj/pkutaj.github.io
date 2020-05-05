---
layout: post
title: powershell > timestamp function
categories: [powershell]
---


| **THE CASE OF THE TIMESTAMP**                                                                            |
|----------------------------------------------------------------------------------------------------------|
| **question**                                                                                             |
| what is the best global (ideally) function to create timestamps with some common-sense naming convention |
| **thesis**                                                                                               |
| concatenate with application + extension params and iterate WHILE not-existing is found                  |
| **anti-thesis**                                                                                          |
| validation sucks (you can pass dot and get a filename with `..`); 


![time_stamped]({{ site.url }}/assets/img000832.png)

## toc
<!-- TOC -->

- [CODE](#code)
- [sources](#sources)

<!-- /TOC -->

## findings
* so you use the usual pattern
    * `(Get-Date).Date.ToString("yyyy-MM-dd")` 
    * + `Test-Path` 🠊 if true: create; else increment
* datetime does not seem to be relevant

### CODE

STEP#       | CODE                                                                                      | COMMENT
------------|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------
**1-TITLE** |                                                                                           |
1.1         | `Get-TimeStampedFilenames`                                                                | note the PascalCased multi-noun
1.2         | `[CmdletBinding()]`                                                                       | method that makes the function transformable into a custom cmdlet + activates advanced function capabilities
**2-INIT**  |                                                                                           |
2.1         | `$today = (get-date).Date.ToString("yyyy-MM-dd");`                                        | canonical form of getting the date as per [ISO 8601](https://xkcd.com/1179/)
2.2         | `$downloadFolder = "$env:USERPROFILE\downloads"`                                          | could be made more dynamic, I use the downloads as temp folder
2.3         | `$destinationPath = -join (...`                                                           | form of multi-line string concatenation (first experiment)
**3-WORK**  |                                                                                           |
3.1         | `if (Test-Path $destinationPath)...`                                                      | check for the initial filename (check if there's a need to increment of we can keep it default with `0`)
3.2         | `..while (Test-Path $destinationPath) {`                                                  | ..keep incrementing until you create a filename that is not yet in the destination path (also a structure to be canonized)
3.3         | `....$i++;`                                                                               | ....increment the counter
3.4         | `....$destinationPath = $destinationPath -replace "\d{1,2}\.$extension", "$i.$extension"` | ....use regex to replace the the existing digit with the incremented counter
**4-END**   |                                                                                           |
4.1         | `return $destinationPath`                                                                 | I am well aware that returns are not recommended in pwsh but I don't yet know how to access objects in other functions without this

```powershell
<# 1 #>
function Get-TimestampedFilename {  #1.1
    [CmdletBinding()]               #1.2
    param (
        [string]$description,
        [string]$extension
    )
    <# 2 #>
    begin {
        $today = (get-date).Date.ToString("yyyy-MM-dd");    #2.1
        $i = 0;
        $downloadFolder = "$env:USERPROFILE\downloads"      #2.2
    }
    
    process {
        $destinationPath = -join (                          #2.3
            $downloadFolder, 
            "\",
            $today,
            "-",
            $description,
            "_",
            0,
            ".",
            $extension
        )
    <# 3 #>  
        if (Test-Path $destinationPath) {                   #3.1
    
            while (Test-Path $destinationPath) {            #3.2
                $i++;                                       #3.3
                $destinationPath = $destinationPath -replace "\d{1,2}\.$extension", "$i.$extension"     #3.4
            }
        }
    <# 4 #>    
        return $destinationPath                             #4.1

    }   
}

Get-TimeStampedFilenames -description "test" -extension "mp4"
```

### sources
* [Powershell: The many ways to use regex](https://powershellexplained.com/2017-07-31-Powershell-regex-regular-expression/)