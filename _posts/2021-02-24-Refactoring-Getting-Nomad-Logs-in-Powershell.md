## usecase
* The aim of this explanation💡 is refactoring the following mess which got accumulated with wanting more and more from checking the status of a Nomad job from PowerShell terminal. 

```powershell
function get-nomadLogs ($jobId, $featureFlag) { 
    
    $nomadLogs = ($featureFlag -ne "e") ? 
        (nomad alloc logs -job $jobId) : 
        (nomad alloc logs -stderr -job $jobId)
    
    if ($featureFlag -eq "l") { oh -InputObject $nomadLogs }

    if (nomad status $jobID | sls -Pattern "(?=.*\d)failed") {
        write-host "Job Failed - see webUI - stderr below" -ForegroundColor DarkRed
        Pause
        $nomadLogs = nomad alloc logs -stderr -job $jobId
        oh -InputObject $nomadLogs
    } elseif (nomad status $jobID | sls status.*dead) {
        if ($featureFlag -eq "p") { oh -InputObject $nomadLogs -Paging }
        else { oh -InputObject $nomadLogs }
    } else { nomad status $jobID | sls status.*=.* }
    
}
```

<!-- TOC -->

- [1. Refactored Code](#1-refactored-code)

<!-- /TOC -->

### 1. Refactored Code

```powershell
function get-nomadLogs ([string]$jobId, [string]$featureFlag) { 

    function get-stderr ($jobId) {
        $nomadLogs = nomad alloc logs -stderr -job $jobId   
        if (nomad status $jobID | Select-String status.*dead) {
            Out-Host -InputObject $nomadLogs
        }
    }

    function get-logs($jobId) {
        Out-Host -InputObject $nomadLogs
    }
    
    function get-logsPaged($jobId) {
        Out-Host -InputObject $nomadLogs -Paging
    }

    function get-logsIntoFile($jobId) {
        $slogFolder = "C:\Users\Admin\Documents\workspace\SNOW\SNOW-logs\_posts"
        $logFile = "$slogFolder\$jobId.log"
        Out-File -InputObject $nomadLogs -FilePath $logFile
        Invoke-Item $logFile
    }

    function get-logsIfDead($jobId) {
        #todo: regex to remove ascii escape chars
        if (nomad status $jobID | Select-String -Pattern "(?=.*\d)failed") {
            Write-Host "Job Failed! Check webUI && stderr below" -ForegroundColor DarkRed
            Pause
            get-stderr -jobId $jobId
        }
        elseif (nomad status $jobID | Select-String -Pattern "status.*dead") {
            Out-Host -InputObject $nomadLogs
        }
        else { 
            nomad status $jobID | Select-String -Pattern "status.*=.*"
        }
    }

    $nomadLogs = nomad alloc logs -job $jobId
    
    switch ($featureFlag) {
        "e" { get-stderr -jobId $jobId }
        "l" { get-logs -jobId $jobId }
        "p" { get-logsPaged -jobId $jobId }
        "f" { get-logsIntoFile -jobId $jobId }
        Default {
            get-logsIfDead -jobId $jobId
        }
    }   

<#
.SYNOPSIS
Function helping to get proper log output from HashiCorp Nomad CLI

.DESCRIPTION
Note that 4 possible flags are used
Default is none — will show logs only if a job is dead; will show stderr if the job has failed
"l" for getting logs no matter what the status is
"p" for getting logs no matter what the status is + in paging form for readability
"e" for getting the output of stderr no matter what the status is
"f" for getting the output into the file (note ASCII escape characters, sorry)
#>

}
```
