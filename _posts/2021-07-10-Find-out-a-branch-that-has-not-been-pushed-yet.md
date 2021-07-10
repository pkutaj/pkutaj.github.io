## usecase
The aim of this playbook🏁 is to find all branches that have not yet been pushed yet with git. 
This is for me the list of branches with work in progress. 

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)

<!-- /TOC -->

### 1. steps/notes
* not using `git branch --vv -a`
* this includes local-only branches that are both
  - new
  - deleted on remote (if you ran `git remote update origin --prune`)

```powershell
function match-branch {
    $localBranches = ((git branch -l) -replace "\*", "") -replace " ", ""
    $remoteBranches = (((git branch -r) -replace "\*", "") -replace " ", "") -replace "origin/", ""
    Compare-Object -ReferenceObject $localBranches -DifferenceObject $remoteBranches -IncludeEqual
    | Select-Object @{Label = "branch"; Expression = { $_.InputObject } },
    @{Label = ”both”; Expression = { $_.SideIndicator -eq "==" } },
    @{Label = ”remoteOnly”; Expression = { $_.SideIndicator -eq "=>" } }, 
    @{Label = ”localOnly”; Expression = { $_.SideIndicator -eq "<=" } }
}
```
