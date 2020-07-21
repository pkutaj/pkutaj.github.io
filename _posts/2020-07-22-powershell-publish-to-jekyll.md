---
layout: post
title: powershell > publish to jekyll
categories: [powershell]
---
## abstract
The concern is documenting a script that I use for publishing content I keep in a local KB into the Jekyll. 
I use this setup because I am using VSCode also for the knowledge capture/lookup, while Jekyll (wlog for work log) is a public face of my undertakings. 

## video
## contents
<!-- TOC -->

- [1. use-case](#1-use-case)
- [2. script](#2-script)

<!-- /TOC -->

### 1. use-case
* the following is an advanced function I use as a cmdlet (I even alias it to `p`) that I feed the filepath of my document with
* it does the following
    * copies the specified file into the blog folder
    * looks up all the image references and replaces `..` with `{{ site.url }}` reference for the images to be properly linked
    * copies the files from the local assets folder into the Jekyll assets folder
    * publishes the KB document with git, taking the filename as a commit message
* I am publishing this file with `p ./2020-07-21-powershell-publish-to-jekyll.md`

![pub-wlog_example]({{ site.url }}/assets/img001380.png)

### 2. script

```powershell
function pub-git {
    param(
        [string]$wlogPath, 
        [string]$docName)
    git add $wlogPath
    git add "..\assets"
    git commit -m "$docName"
    git push
    write-host "~~~ the result of the git push ~~~" -foregroundcolor cyan
    git log --pretty=format:"%h%x09%an%x09%ad%x09%s" --name-status --date=short -1 
    write-host "~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~" -foregroundcolor cyan
}
function pub-wlog {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [string]$docPath
    )
    
    begin {
        $docName = Split-Path $docPath -Leaf
        $wlogFolder = "c:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts\"    
        $wlogPath = "$wlogFolder\$docName"
        $wlogAssets = "c:\Users\Admin\Documents\workspace\work.log\pkutaj\assets\"
        $replace = "{{ site.url }}/assets/"
        $replaceWith = "{{ site.url }}/assets/"
        $text = gc $docPath -raw
        $r = "\.\.\/assets\/img......\.png"
    }
    
    process {
        $text -match $r
        $Matches.values | % { Copy-Item $_ $wlogAssets -Force -Verbose }
        (Get-Content $docPath).replace($replace, $replaceWith) | Set-Content $wlogPath
        pushd $wlogFolder
        pub-git -wlogPath $wlogPath -docName $docName
    }
    
    end {
        Pause
        Invoke-Item $wlogPath
        
    }
}
```
