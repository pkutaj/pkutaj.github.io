---
layout: post
title: PowerShell > Compare files
categories: [powershell]
---
## the case	
the question is, how to run a command from powershell that compare files with filehash, in detail (maybe there is one already)

## toc
<!-- TOC -->

- [shell](#shell)
- [SCRIPT !sprout!](#script-sprout)
- [sources](#sources)

<!-- /TOC -->

## findings
### shell
* quick and dirty

CODE                                                    | COMMENT
--------------------------------------------------------|------------------------------------------------
1. `$a = (Get-FileHash .\2020-04-06-compare-files.ps1)` | assign the object from Get-FileHash file1 to $a
2. `$b = (Get-FileHash .\2020-04-06-compare-files.ps1)` | assign the object from Get-FileHash file2 to $b
3. `$a.Hash -eq $b.Hash`                                | run equal to operator
4. `True`                                               | check results

```powershell
PS C:\temp> $a = (Get-FileHash .\2020-04-06-compare-files.ps1)  #1
PS C:\temp> $b = (Get-FileHash .\2020-04-06-compare-files.ps1)  #2
PS C:\temp> $a.Hash -eq $b.Hash                                 #3
True                                                            #4
PS C:\temp> $a

Algorithm       Hash                                                                   Pa
                                                                                       th
---------       ----                                                                   --
SHA256          3DA8DD98A37CD232143858DF6C92BE50A8D8496ABDCB30BA40A63C242781C615       C…

PS C:\temp> $b

Algorithm       Hash                                                                   Pa
                                                                                       th
---------       ----                                                                   --
SHA256          3DA8DD98A37CD232143858DF6C92BE50A8D8496ABDCB30BA40A63C242781C615       C…
```

### SCRIPT !sprout!
> not done; you need to pass a full filepath, which is not so trivial as it may seem
* put in the script folder later, but it seems we need a fullpath

```powershell
# Parameter help description
[Parameter(Mandatory = $true)]$file1,
[Parameter(Mandatory = $true)]$file1,

$file1hash = (Get-FileHash $file1).hash
$file2hash = (Get-FileHash $file2).hash
[bool]$different = $file2hash.CompareTo($file1hash)
if ($different) {
    Write-Host "Not the Same"
}
else { Write-Host "Same" }`
``` 

### sources
* [script_file]({{ site.url }}/assets/2020-04-06-compare-files.ps1)