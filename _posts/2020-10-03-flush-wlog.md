---
layout: post
title:
categories: []
---
## usecase
The concern is documenting flushing the [wlog](http://pavol.kutaj.com) with single command if I don't keep the chain

<!-- TOC -->

- [1. It's quite stupid, actually](#1-its-quite-stupid-actually)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. It's quite stupid, actually

* But I load this in my profile with `flush` alias and if don't publish daily, just flush it all

```powershell
function flush-wlog {
    [CmdletBinding()]
    param (
    )
    
    begin {
        $docFolder = "c:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts\"    
        $pngFolder = "c:\Users\Admin\Documents\workspace\work.log\pkutaj\assets\"
        $docCount = (dir $docFolder *.md).count
        $pngCount = (dir $pngFolder *.png).count
        Write-Host "~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~" -ForegroundColor cyan
        Write-Host "you are about to flush $docCount posts & $pngCount imgs. Ctrl-C to quit" -ForegroundColor cyan
        Write-Host "~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~" -ForegroundColor cyan
        Pause    
    }
    
    process {
        del "$docFolder/*.md" -verbose
        del "$pngFolder/*.png" -verbose
    }
    
    end {
        Write-Host Done -ForegroundColor cyan
    }
}
```

### 2. sources
