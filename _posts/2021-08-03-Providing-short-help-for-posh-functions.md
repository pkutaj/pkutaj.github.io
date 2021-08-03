## usecase
The aim of this playbook🏁 is show the use of Powershell's commend-based help

to provide a list of feature flags / switches possible to pass into the function to specify the functionality with the help of comment based help. The help can be obtained by running

```
get-help <module_name>
```

<!-- TOC -->

- [1. steps](#1-steps)
- [2. example-code](#2-example-code)
- [3. notes](#3-notes)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. steps
* go to the bottom of the function
* in vscode, press `ctrl+space` → open a list of suggestions
* select `comment-help` 
* keep only `SYNOPSIS` and `DESCRIPTION`
* add purpose to SYNOPSIS
* add switches do DESCRIPTION

```powershell
 function new-kron {
    param (
        [switch]$merge,
        [int]$span = 1
    )
 
 <# CODE HERE #>

 <#
    .SYNOPSIS
        A script that creates an markdown entry of the dialy journal
    .DESCRIPTION
        Switches:
        -merge    | merges all markdown files into a monthly .pdf file for potential print-out
        -span <n> | looks for images from <n>-days ago; default is 1
 #>
 }
```

### 2. example-code

```powershell
function get-nomadLogs ($jobId, $featureFlag) { 
    $nomadLogs = nomad alloc logs -job $jobId 
    if ($featureFlag -eq "l") { oh -InputObject $nomadLogs }
    if (nomad status $jobID | sls status.*dead) {
        if ($featureFlag -eq "p") { oh -InputObject $nomadLogs -Paging }
        else { oh -InputObject $nomadLogs }
    }
    else { nomad status $jobID | sls status.*=.* }

    <#
    .SYNOPSIS
    Function helping to get proper log output from HashiCorp Nomad CLI. 

    .DESCRIPTION
    Default flag is none — will show logs if job is dead; will show stderr if the job has failed

    The flag parameter accepts:
    "l" for getting logs no matter what the status is
    "p" for getting logs no matter what the status is + in paging form for readibility
    #>
}

```

### 3. notes
* this is formally called **documentation comments** 
* as opposed to my usage, it is recommended to put it  **inside & at the top** of the function
* there are 15 **help keywords** that precede the description
    - see [Comment-based help keywords](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comment_based_help?view=powershell-7.1#comment-based-help-keywords) for the full listing

### 4. sources
* [Documentation and Comments · PowerShell Practice and Style](https://poshcode.gitbooks.io/powershell-practice-and-style/content/Style-Guide/Documentation-and-Comments.html?q=)
* [about_Comment_Based_Help - PowerShell @ Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comment_based_help?view=powershell-7.1)
