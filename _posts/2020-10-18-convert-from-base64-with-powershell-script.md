---
layout: post
title:
categories: []
---
## usecase
The concern is documenting

<!-- TOC -->

- [1. steps](#1-steps)
- [2. demo](#2-demo)
- [3. script](#3-script)

<!-- /TOC -->

### 1. steps
* capture the encoded string in fiddler
* pass that into the command `decode-base64 -data <$string>`
* get the result as encoded json
* this is what `echo $string | jq '.'` is doing in bash

### 2. demo

* decoding `aGVsbG8gd29ybGQ=` into `hello world`

![demo]({{ site.url }}/assets/img002060.gif)

### 3. script

```powershell
function decode-base64 {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]    
        [string]$data
    )

    begin {
        $intro = @"
  _____     
 / _T_ \   presents..
/ / E \ \  ..BASE64 STRING DECODER
\ \_I_/ /  ....just pass the string with the cmdlet / function call
 \__N__/   ....results in clipboard & file
"@
        Write-Host $intro -ForegroundColor cyan
        $outputFile = "$env:USERPROFILE\documents\decoded.json"
    }
    process {
        $convertedData = [Convert]::FromBase64String($data)
        $stringData = [System.Text.Encoding]::UTF8.GetString($convertedData)
    }
    
    end {
        Write-Host "~~~~~~~~~~~~~~~~~~~~~~~~~~~" -ForegroundColor cyan
        Write-Host "decoded string:" -ForegroundColor cyan
        Write-Host "~~~~~~~~~~~~~~~~~~~~~~~~~~~" -ForegroundColor cyan
        Write-Host $stringData 
        Write-Host "~~~~~~~~~~~~~~~~~~~~~~~~~~~" -ForegroundColor cyan
        Write-Host "copied to clipboard & to $outputFile"
        Write-Host "~~~~~~~~~~~~~~~~~~~~~~~~~~~" -ForegroundColor cyan
        $stringData | Out-File $outputFile  -Force 
        $stringData | clip
        Pause
        ii $outputFile
    }
}
```
