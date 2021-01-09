---
layout: post
title: Enjoying Switches in Personal Powershell
categories: [powershell]
---
## usecase
The concern is documenting my recent enjoyment of switching for personal use when I just run

```
shp com.acme-prod1 c
```

... from anywhere and this pulls the recent updates from the `acme` repo + immediatelly opens a config file I want to check

<!-- TOC -->

- [1. backstory](#1-backstory)
- [2. CODE](#2-code)

<!-- /TOC -->

### 1. backstory
* I was listening to programmers saying "don't do switching" 
* But I realized this is advice starts to pay off at certain level of complexity
* In my personal use of powershell, I use lots's of procedures where I pass a letter of alphabet that is suggestive of the name of the feature I want to use and it does it
* take for example this `go-ToRepo` function living in my $profile
* and I am using all of them and it (I believe) reads well (sorry for the cmdlet aliases)


### 2. CODE
```powershell
# the concern is pulling recent updates from a repo + doing a required action as per the feature flag
function go-toRepo ($repoString, $featureFlag) {
    $repostring = $repoString -replace "-.*", ""
    $configFile = ".\jobs\config.yml.tmpl"
    $redShiftFile = ".\jobs\enriched_redshift.json.tmpl"
    $scheduleFolder = ".\schedules"
    $repoFolder = "C:\Users\Admin\repos\"
    if (Test-Path "$repoFolder\*$repoString*\") {
        pushd "$repoFolder\*$repoString*\"
        git pull 
        switch ($featureFlag) {
            "b" { gc $configFile | sls "buckets:" -Context 15; Break }
            "c" { ii $configFile; Break }
            "r" { ii $redshiftFile; Break }
            "s" { dir $scheduleFolder | gc; Break }
        }        
    }
    else { Write-Host "was not cloned yet" -ForegroundColor cyan }
}
# within $profile
Set-Alias shp go-toRepo
```
