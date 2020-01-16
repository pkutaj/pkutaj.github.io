---
layout: post
title: PS > watch folder, send email upon change
---

# case

Investigate, how it is possible to create a mail broadcasting service that let all the team members know when the new folder has been created or renamed in a specified directory. In PowerShell. Ideally, filter the name of that folder to a certain pattern to make sure mishaps and tests are ignored (establish a naming convention in the process).

<!-- TOC -->

- [scheduled task](#scheduled-task)
- [code](#code)
- [terminology](#terminology)
- [sources](#sources)

<!-- /TOC -->
### scheduled task

* the script below is running as a scheduled task on a windows server with -noexit parameter with a service account and SMTP relaying enables

```plaintext
C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe 
\-noexit -noprofile -file C:\\Watcher.ps1
```
![filewatcher]({{ site.url }}/assets/fileWatcher01.png)

### code

```powershell
function Watcher { 
param ( 
\[string\]$Path  
) 
$FileSystemWatcher = New-Object System.IO.FileSystemWatcher 
$FileSystemWatcher.Path = $Path
$FileSystemWatcher.Filter = "20\*"
$Action = { 
$Object = "<a href='{0}'>{0}</a> was created at {2}" -f $Event.SourceEventArgs.FullPath, 
$Event.SourceEventArgs.ChangeType, 
$Event.TimeGenerated 
$WriteHostParams = @{ 
ForegroundColor = 'Green'  
BackgroundColor = 'Black'  
Object = $Object  
} 
try { 
Send-MailMessage -From 'bioperations@example.com' -To 'hd@example.com' -Subject "HD: New Backlog Folder ready to be Loaded" -Body $Object -SmtpServer'DEUNonAuthSMTP.grouphc.net' -ErrorAction Stop -BodyAsHtml 
Write-Host @WriteHostParams 
} 
catch { write-host "send failed" -ForegroundColor Black -BackgroundColor White } } 
Register-ObjectEvent -InputObject $FileSystemWatcher Created -Action $Action  
Register-ObjectEvent -InputObject $FileSystemWatcher Renamed -Action $Action

  
function Loaded { 
param ( 
\[string\]$Path  
) 
$FileSystemWatcher = New-Object System.IO.FileSystemWatcher 
$FileSystemWatcher.Path = $Path  
$FileSystemWatcher.Filter = "20\*"  
$Action = { 
     
$Object = "<a href='{0}'>{0}</a> was created at {2}" -f $Event.SourceEventArgs.FullPath, 
$Event.SourceEventArgs.ChangeType, 
$Event.TimeGenerated 
$WriteHostParams = @{ 
ForegroundColor = 'Green'  
BackgroundColor = 'Black'  
Object = $Object  
} 
try { 
Send-MailMessage -From 'bioperations@example.com' -To 'hd@example.com' -Subject "HD: Files Loaded into SAP: Check Reports" -Body $Object -SmtpServer'SMTP.example.net' -ErrorAction Stop -BodyAsHtml 
Write-Host @WriteHostParams 
} 
catch { write-host "send failed" -ForegroundColor Black -BackgroundColor White } } 
Register-ObjectEvent -InputObject $FileSystemWatcher -EventName Created -Action $Action 
Register-ObjectEvent -InputObject $FileSystemWatcher -EventName Renamed -Action $Action  
}

Watcher -Path "\\\\example1\\backlog\\"
Watcher -Path "\\\\example2\\backlog\\"  
Watcher -Path "\\\\example3\\backlog\\"  
Loaded -Path "\\\\example1\\loaded\\""  
Loaded -Path "\\\\example2\\loaded\\""
Loaded -Path "\\\\example3\\loaded\\"
```

### terminology

* event
* filesystemwatcher
* get-eventsubscriber
* unregister-event
* email-relay
* service account
* task-scheduler
* try-catch

### sources

* [https://mcpmag.com/articles/2015/09/24/changes-to-a-folder-using-powershell.aspx](https://www.google.com/url?q=https://mcpmag.com/articles/2015/09/24/changes-to-a-folder-using-powershell.aspx&sa=D&ust=1566572421893000) 
* [https://stackoverflow.com/questions/45285917/unregister-all-custom-object-events](https://www.google.com/url?q=https://stackoverflow.com/questions/45285917/unregister-all-custom-object-events&sa=D&ust=1566572421894000) 
* [https://practical365.com/exchange-server/powershell-how-to-send-email/](https://www.google.com/url?q=https://practical365.com/exchange-server/powershell-how-to-send-email/&sa=D&ust=1566572421894000) 
* [https://ss64.com/ps/syntax-functions.html](https://www.google.com/url?q=https://ss64.com/ps/syntax-functions.html&sa=D&ust=1566572421895000) 
* [https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about\_quoting\_rules?view=powershell-6](https://www.google.com/url?q=https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view%3Dpowershell-6&sa=D&ust=1566572421895000) 
* [https://devblogs.microsoft.com/scripting/powertip-new-lines-with-powershell/](https://www.google.com/url?q=https://devblogs.microsoft.com/scripting/powertip-new-lines-with-powershell/&sa=D&ust=1566572421896000) 
* [https://stackoverflow.com/questions/28706312/adding-a-hyperlink-to-an-email-generated-through-powershell](https://www.google.com/url?q=https://stackoverflow.com/questions/28706312/adding-a-hyperlink-to-an-email-generated-through-powershell&sa=D&ust=1566572421896000) 
* [https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/using-filesystemwatcher-correctly-part-2](https://www.google.com/url?q=https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/using-filesystemwatcher-correctly-part-2&sa=D&ust=1566572421897000) 
