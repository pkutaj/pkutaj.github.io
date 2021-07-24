## usecase
The aim of this playbook🏁 is to use VSCode + PowerShell to create hyperlinks fast in order to keep docs sharp.

<!-- TOC -->

- [1. demo](#1-demo)
- [2. steps](#2-steps)
- [3. code](#3-code)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. demo

```
▶ l -clis C:\Users\Admin\Documents\workspace\work.log\kb\powershell\2021-07-24-Linking-With-Absolute-Filepath.md

clipping ~~~>
* [GH: 2021-07-24-Linking-With-Absolute-Filepath.md][#1]
[#1]: https://github.com/pkutaj/slog/blob/master/_posts/2021-07-24-Linking-With-Absolute-Filepath.md
* [local: 2021-07-24-Linking-With-Absolute-Filepath.md][#2]
[#2]: .\2021-07-24-Linking-With-Absolute-Filepath.md
```

### 2. steps
1. In VsCode run _Copy Path of Active File_
2. Go To Terminal and run 

```
l -clis OR -clik <Path>
```

* I have 2 switches for 2 repos and also a logic built into the linking
    - the `clis` repo is a flat one, single folder
    - the `clik` repo is a tree, but only 1-level deep

* I copy 2 types of links into a clipboard that I go on to paste into docs
    - GH one (absolute one, for sharing and backup)
    - Local one (relative one, for personal work)

### 3. code

```powershell
# in $profile; aliased as l with "Set-Alias l get-Locations"s
function get-Locations ([string]$filename, [switch]$clis, [switch]$clik) {
    if($clis) {
        $filename = Split-Path $filename -Leaf
        $githubURL = "https://github.com/pkutaj/slog/blob/master/_posts/$filename"
        $link = ".\$filename"
    }
    if($clik) {
        $cat = Split-Path -Leaf (Split-Path $filename -Parent)
        $filename = Split-Path $filename -Leaf
        $githubURL = "https://github.com/pkutaj/kb/blob/master/$cat/$filename"
        $link = ".\$filename"
    }

    $locations = @"
* [GH: $filename][#1]
[#1]: $githubURL
* [local: $filename][#2]
[#2]: $link
"@
    $locations | clip
    Write-Host "clipping ~~~>" -ForegroundColor DarkCyan 
    return $locations
}
```

### 4. sources
* [Why Your Company's Documentation Sucks - World of BS](https://www.worldofbs.com/why-documentation-sucks/)
