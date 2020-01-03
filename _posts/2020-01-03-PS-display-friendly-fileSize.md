---
layout: post
title: PS > friendly filesizes
---

## the case	
the puzzle is how do display friendly filesizes when `dir`-ing a folder

## solution
Use calculated properties with `select-object`. See [Display friendly file sizes in PowerShell](https://martin77s.wordpress.com/2017/05/20/display-friendly-file-sizes-in-powershell/) for script that actually recognizes a proper size as well as displays only 2 decimal places. 

```powershell
dir | select name, @{N='SizeKB'; E={$_.Length/1kb}} -first 5 | sort SizeKB -Descending 

Name                      SizeKB
----                      ------
add_path_to_env.md   1.896484375
add_path_to_env.ps1 0.8798828125
files               0.0009765625
img                 0.0009765625
script              0.0009765625
```

### getting a harddrive's used/free spaces in friendly format 

```powershell
gdr c | select -Property @{N= 'Used'; E={$_.Used/1gb}}, @{N='Free'; E={$_.Free/1GB}}

            Used             Free
            ----             ----
348,789585113525 127,611778259277

```  

### with formatted numbers 

```powershell
dir | select name, @{N='SizeKB'; E={'{0:N2}' -f ($_.Length/1kb)}} -first 5 

Name                    SizeKB
----                    ------
10. Summary.mp4         983.96
0. Introduction.mp4     673.01
1. Creating a Class.mp4 16,114.99
1. Creating a Class.srt 13.70
0. Introduction.srt     0.85
```

### sources
* [Calculated Property](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-powershell-1.0/ff730948(v=technet.10)?redirectedfrom=MSDN)
* [Display friendly file sizes in PowerShell - Loose Scripts Sink Ships](https://martin77s.wordpress.com/2017/05/20/display-friendly-file-sizes-in-powershell/)
* [Formatting Numbers](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-powershell-1.0/ee692795%28v%3dtechnet.10%29)