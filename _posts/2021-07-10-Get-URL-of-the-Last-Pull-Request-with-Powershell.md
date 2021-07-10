## usecase
* The aim of this playbook🏁 is to show obtaining the URL of the last pull request with
    * PowerShell 
    * GitHub CLI. 

<!-- TOC -->

- [1. steps](#1-steps)
- [2. CODE](#2-code)

<!-- /TOC -->

### 1. steps

* navigate to the repo
* run `get-lastPRurl`
* you get the URL clipped

### 2. CODE

```powershell
function get-lastPRurl {
    $prn = gh pr list --state all --limit 1 --json number | ConvertFrom-Json
    $prurl = gh pr view $prn.number --json url | ConvertFrom-Json
    $prurl.url | clip
    Write-Host $prurl.url clipped -Foregroundcolor DarkCyan
}
```
