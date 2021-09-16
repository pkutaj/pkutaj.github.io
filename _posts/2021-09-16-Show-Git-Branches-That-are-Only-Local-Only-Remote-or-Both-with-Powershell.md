## usecase
The aim of this page📝is to write a Powershell function that quickly shows which branches are local-only, remote-only or both local and remote. 

![]({{ site.url }}/assets/img003104.jpg)

<!-- TOC -->

- [1. notes](#1-notes)

<!-- /TOC -->

### 1. notes

```powershell
function match-branch ([switch]$local_only, [switch]$remote_only, [switch]$both) {
    $localBranches = ((git branch -l) -replace "\*", "") -replace " ", ""
    $remoteBranches = (((git branch -r) -replace "\*", "") -replace " ", "") -replace "origin/", ""
    $branch_comparison = Compare-Object -ReferenceObject $localBranches -DifferenceObject $remoteBranches -IncludeEqual
        | Select-Object @{Label = "branch"; Expression = { $_.InputObject } },
                        @{Label = ”both”; Expression = { $_.SideIndicator -eq "==" } },
                        @{Label = ”remote_only”; Expression = { $_.SideIndicator -eq "=>" } }, 
                        @{Label = ”local_only”; Expression = { $_.SideIndicator -eq "<=" } }
    if ($local_only) { $branch_comparison | Where-Object -Property "local_only" -EQ "true" | Select-Object branch } 
    elseif ($remote_only) {$branch_comparison | Where-Object -Property "remote_only" -EQ "true" | Select-Object branch} 
    elseif ($both) { $branch_comparison | Where-Object -Property "both" -EQ "true" | Select-Object branch }
    else {$branch_comparison}
<#
.SYNOPSIS
    Function displaying which git branches are local-only, remote-only and both local and remote
    Called without a switch returns a table
    To filter the table, use switches -local_only; -remote_only; -both 
#>
}
```
