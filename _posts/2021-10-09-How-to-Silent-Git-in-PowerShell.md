## usecase
The aim of this page📝 is to note how to silent git in PowerShell. 
Context: I am moving my markdown files with a script from `backlog` to `wip` (work in progress) so-called `slog` (snowplow logs) folder.

```powershell
# $profile
# && works only in PowerShell core 
Function push-assets($assetFolder) {
    git add $assetFolder && git commit -m "assets" && git push              
    git add (git ls-files --deleted) && git commit -m "deleted" && git push        

}
Function move-to-backlog() {
    param (
        [Parameter(Position = 0)][string]$file, 
        [Parameter(Mandatory = $true, ParameterSetName = "backlog")][switch]$backlog, 
        [Parameter(Mandatory = $true, ParameterSetName = "wip")][switch]$wip, 
    
    )
    cd $env:SLOGFOLDER
    if ($backlog) { Move-Item -Path $file -Destination "$env:SLOGFOLDER\_backlog\" -Verbose }
    if ($wip) { Move-Item -Path $file -Destination "$env:SLOGFOLDER" -Verbose }
    push-assets "..\assets" *> $null
}
Set-Alias b move-to-backlog
```

* Calling `move-to-backlog` has only the output — nothing about git! 

```
b 2021-10-07-A-Kinesis-Shard-Count-Analysis.md -b
>>> VERBOSE: Performing the operation "Move File" on target "Item: C:\Users\Admin\2021-10-07-A-Shard-Count-Analysis.md Destination: C:\Users\Admin\_backlog\2021-10-07-A-Shard-Count-Analysis.md".
<!-- GIT EXECUTED - NO OUTPUT - SHELL CLEAN -->
```

<!-- TOC -->

- [1. *> $null](#1--null)
- [2. links](#2-links)

<!-- /TOC -->

### 1. *> $null
* git, like many CLIs (console / terminal programs), uses the `stderr` stream not just to report errors, but also for status information - basically, anything that's **not data**.
* there are 7 streams in Powershell

```
name    | number | description
--------|--------|-------------------------------------
STDIN   | 0      | Keyboard input
STDOUT  | 1      | Text output
STDERR  | 2      | Error text output
WARNING | 3      | Warning output
VERBOSE | 4      | Verbose output
DEBUG   | 5      | Debug output
INFO    | 6      | Information output (PowerShell 5.0+)
```

* To suppress output from all 6 output streams, use `*> $null`
* `*> $null` suppresses all output streams — while external programs only have 2 (stdout and stderr), applying *>$null to a PowerShell-native command silences all 6 output streams
    - `*` stands for all 6 streams
    - `>` is a redirect operator sending a specified stream to a file/variable
    - `$null` is null in PowerShell, you are not sending it anywhere
* Of course you could silent git just by running `*> $null` after a git command

```
<!-- PUSHING WITHOUT OUTPUT -->
~  master ↑6 +18 ~0 -0 
▶ git push *>$null
~  master ≣ +18 ~0 -0 
▶
```

### 2. links
* https://stackoverflow.com/questions/57538714/suppress-output-from-git-command-in-powershell
* [about Redirection - PowerShell — Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_redirection?view=powershell-7.1#powershell-redirection-operators)
* [Redirection - PowerShell - SS64.com](https://ss64.com/ps/syntax-redirection.html)
