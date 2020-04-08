---
layout: post
title: PowerShell > Get-Winevent
categories: [powershell]
---
## the case	the log capture
the question is how to easily access and analyze windows event viewer from powershell

## toc
<!-- TOC -->

- [on get-winevent](#on-get-winevent)
- [FilterHashTable Key names and accepted types](#filterhashtable-key-names-and-accepted-types)
    - [pass an array into a powershell function and work with those params accordingly](#pass-an-array-into-a-powershell-function-and-work-with-those-params-accordingly)
        - [copy-item overwrites by default](#copy-item-overwrites-by-default)
- [parse evtx files with -PATH *.evtx](#parse-evtx-files-with--path-evtx)
    - [What works so far](#what-works-so-far)
    - [AND XML ?](#and-xml-)
    - [Parse XML in powershell ?](#parse-xml-in-powershell-)
    - [the aim: csv and excel/RBQL to make the analysis here](#the-aim-csv-and-excelrbql-to-make-the-analysis-here)
    - [log through all the files in the folder](#log-through-all-the-files-in-the-folder)
- [sources](#sources)

<!-- /TOC -->

## findings
### on get-winevent
* [How to check Event logs with PowerShell - Get-EventLog & Get-WinEvent](https://www.codetwo.com/admins-blog/how-to-check-event-logs-with-powershell-get-eventlog/)
* usually, first you want a specific log

```powershell
Get-WinEvent -ListLog * | ? {$_.RecordCount -gt 0} | sort RecordCount -Descending

LogMode   MaximumSizeInBytes RecordCount LogName
-------   ------------------ ----------- -------
Circular            20971520       34139 Security
Circular            20971520       32048 Application
Circular            20000000       28801 Microsoft-Windows-Store/Operational
Circular            20971520       26549 System
Circular             8388608       18799 Microsoft-Windows-SmbClient/Connectivity
Circular             4194304        9745 Microsoft-Windows-GroupPolicy/Operational
Circular             8388608        5751 Microsoft-Windows-SMBServer/Operational
Circular             5242880        5118 Microsoft-Windows-StateRepository/Operational
Circular             5242880        3396 Microsoft-Windows-AppXDeploymentServer/Operational
Circular             6291456        2892 Microsoft-Windows-Storage-Storport/Operational
Circular             1052672        2733 Microsoft-Windows-Wcmsvc/Operational
Circular             1052672        2545 Microsoft-Windows-Audio/PlaybackManager
Circular             1052672        2498 Microsoft-Windows-Winlogon/Operational
Circular             1052672        2486 Microsoft-Windows-NCSI/Operational
Circular             1052672        2346 Microsoft-Client-Licensing-Platform/Admin
```

* use the following to get more proper information

```powershell
Get-WinEvent -FilterHashtable @{logname=’application’; StartTime = (Get-Date).date; ProviderName = "Outlook"} | Tee-Object C:\temp.txt


   ProviderName: Outlook
TimeCreated                     Id LevelDisplayName Message
-----------                     -- ---------------- -------
3/1/2020 12:10:15 PM            38 Information      Reconciliation completed for the following store: C:\Users\Admin\AppData\Local\Microsoft\Outlook\pavol.kutaj.pivotal@outlook.com.ost. Stats…
3/1/2020 12:10:07 PM            30 Information      Starting reconciliation for the store C:\Users\Admin\AppData\Local\Microsoft\Outlook\pavol.kutaj.pivotal@outlook.com.ost for the following …
3/1/2020 12:09:04 PM            63 Information      The Exchange web service request GetAppManifests succeeded.
3/1/2020 12:09:04 PM            63 Information      Outlook detected a change notification for your apps and will attempt to update them.
3/1/2020 12:08:57 PM            63 Information      The Exchange web service request GetAppManifests succeeded.
3/1/2020 12:08:57 PM            32 Information      The store C:\Users\Admin\AppData\Local\Microsoft\Outlook\pavol.kutaj.pivotal@outlook.com.ost has detected a catalog checkpoint.
3/1/2020 12:08:55 PM            45 Information      Outlook loaded the following add-in(s):…
```

### FilterHashTable Key names and accepted types

Key name       | Value data type | Accepts wildcard characters?
---------------|-----------------|-----------------------------
`LogName`      | <String[]>      | Yes
`ProviderName` | <String[]>      | Yes
`Path`         | <String[]>      | No
`Keywords`     | <Long[]>        | No
`ID`           | <Int32[]>       | No
`Level`        | <Int32[]>       | No
`StartTime`    | <DateTime>      | No
`EndTime`      | <DataTime>      | No
`UserID`       | <SID>           | No
`Data`         | <String[]>      | No
`*`            | <String[]>      | No

* these parameters are not **member names** of the returned objects

Name          | Value
--------------|------
Verbose       | 5
Informational | 4
Warning       | 3
Error         | 2
Critical      | 1
LogAlways     | 0

#### pass an array into a powershell function and work with those params accordingly
* from <https://stackoverflow.com/a/9196650/11082684>
* So when you are using interpolation, by default it interpolates just the next variable in toto. 
* So when you do this:

```powershell
"$test[0]"
```

* It sees the $test as the next variable, it realizes that this is an array and that it has no good way to display an array
* so it decides it **can't interpolate** and just displays the string as a string. 
* The solution is to explicitly tell PowerShell where the bit to interpolate starts and where it stops:

```powershell
"$($test[0])"
```

* allegedly better is to use string formatting

```powershell
"this is {0}" -f $test[0]
```

##### copy-item overwrites by default
* [powershell - Copy-Item is overwriting by default - Stack Overflow](https://stackoverflow.com/questions/42931532/copy-item-is-overwriting-by-default/42932397)
* [How to Copy Individual Files and Rename Duplicates with Powershell | PDQ.com](https://www.pdq.com/blog/copy-individual-files-and-rename-duplicates/)


### parse evtx files with -PATH *.evtx
* [Use PowerShell to Parse Saved Event Logs for Errors | Scripting Blog](https://devblogs.microsoft.com/scripting/use-powershell-to-parse-saved-event-logs-for-errors/)

```
PS C:\Users\Admin\Documents\Zoom\2115213 - 2020-03-12 - Intermittent System Errors 5.9> Get-WinEvent -path '.\2020-03-12 Logs_24.evtx'

ProviderName: Group Policy Files

TimeCreated                     Id LevelDisplayName Message
-----------                     -- ---------------- -------
2/25/2020 11:43:38 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:43:38 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:43:38 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:24:15 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:24:15 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:24:15 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:24:15 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:24:15 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
2/25/2020 11:24:15 AM         4098 Warning          The user '' preference item in the 'GBL-User-Corp-Templates {8BC249B9-BD04-412D-9D3B-3B16ED6AC82E}' Group Policy Object did not apply because it failed with error code '0x80070003 The system cannot find the path specified.' This error was suppressed.
```

* **NOTE:** the use of **-path** and **-FilterHashTable** are **EXCLUSIVE**
    * you **CANNOT** 

```
PS C:\Users\Admin\Documents\Zoom\2115213 - 2020-03-12 - Intermittent System Errors 5.9> Get-WinEvent `
>> -path '.\2020-03-12 Logs_24.evtx' `
>> -FilterHashtable @{`
>>   level=2;`
>>   LogName="Application"
>> }
```
> Get-WinEvent: Parameter set cannot be resolved using the specified named parameters. One or more parameters issued cannot be used together or an insufficient number of parameters were provided.

* **-Path** is passed as a Named property into **-FilterHashTable**


#### What works so far
> HOW TO GET TO THE EVENT DATA

```
Get-WinEvent ` 
-Path '.\2020-03-12 Logs_24.evtx' | `
? {$_.ProviderName -eq "Lifecycle Engine Windows Access"} `
| Select Id, ProviderName, LogName, MachineName, TimeCreated, Message
```

#### AND XML ? 
* [PowerShell Get-WinEvent XML Madness: Getting details from event logs | Microsoft Docs](https://docs.microsoft.com/en-us/archive/blogs/ashleymcglone/powershell-get-winevent-xml-madness-getting-details-from-event-logs)

```
1. $Event = Get-WinEvent ` 
-Path '.\2020-03-12 Logs_24.evtx' | `
? {$_.ProviderName -eq "Lifecycle Engine Windows Access"} `
| Select Id, ProviderName, LogName, MachineName, TimeCreated, Message
2. $eventXML = [xml]$Event.ToXml()
3. $eventXML.Event.EventData.Data
```

```powershell
Get-WinEvent `
-Path '.\2020-03-12 Logs_24.evtx' | `
? {$_.ProviderName -eq "Lifecycle Engine Windows Access"} | select -first 1 | % {$_.ToXML()}
```

#### Parse XML in powershell ?
* [PowerShell Get-WinEvent XML Madness: Getting details from event logs - Microsoft Docs](https://docs.microsoft.com/en-us/archive/blogs/ashleymcglone/powershell-get-winevent-xml-madness-getting-details-from-event-logs)
* [Forensics: Automating Active Directory Account Lockout Search with PowerShell (an example of deep XML filtering of event logs across multiple servers in parallel)  - Microsoft Docs](https://docs.microsoft.com/en-us/archive/blogs/ashleymcglone/forensics-automating-active-directory-account-lockout-search-with-powershell-an-example-of-deep-xml-filtering-of-event-logs-across-multiple-servers-in-parallel)

#### the aim: csv and excel/RBQL to make the analysis here
* so you want to have all of these next to each other and the message as well, ideally
* the goal is to have this table into `csv`
* and to append another column to that table and that would be this string 

#### log through all the files in the folder

```powershell
Write-Host @"
* this script tries to convert all event logs from the current folder into a .csv file 
* technically, it first converts it to an .xml and creates a .csv from there
* that you can import to Excel/Sheets for further analysis / aggregation / filtering, etc.
* it may take some times, please exercise some patience
--------------------------------------------------------------------------------------------
"@
pause

$i = 0;
Get-ChildItem *.evtx | ForEach-Object {
   $i++;
   $todayDate = Get-Date -UFormat "%Y-%m-%d-%H%M%S"
   $filePath = $_.BaseName + "-$todayDate-$i.csv"

$Events = Get-WinEvent -path $_.FullName;

ForEach ($Event in $Events) {            
   # Convert the event to XML            
   $eventXML = [xml]$Event.ToXml()            
   Add-Member -InputObject $Event -MemberType NoteProperty -Force -Name  "detailed_error_message" -Value $eventXML.Event.EventData.Data            
}            
try {
   $Events | Export-Csv .\$filePath               
}
catch {
   write-host "something went wrong"
}
}
```

### sources
* [zipped_script]({{ site.url }}/assets/events-to-csv.zip)
* [Use PowerShell to Parse Saved Event Logs for Errors - Scripting Blog](https://devblogs.microsoft.com/scripting/use-powershell-to-parse-saved-event-logs-for-errors/)
* [Use FilterHashTable to Filter Event Log with PowerShell,Scripting Blog](https://devblogs.microsoft.com/scripting/use-filterhashtable-to-filter-event-log-with-powershell/)
* [How to check Event logs with PowerShell - Get-EventLog & Get-WinEvent](https://www.codetwo.com/admins-blog/how-to-check-event-logs-with-powershell-get-eventlog/)
* [powershell - Copy-Item is overwriting by default - Stack Overflow](https://stackoverflow.com/questions/42931532/copy-item-is-overwriting-by-default/42932397)
* [How to Copy Individual Files and Rename Duplicates with Powershell | PDQ.com](https://www.pdq.com/blog/copy-individual-files-and-rename-duplicates/)
* [PowerShell Get-WinEvent XML Madness: Getting details from event logs - Microsoft Docs](https://docs.microsoft.com/en-us/archive/blogs/ashleymcglone/powershell-get-winevent-xml-madness-getting-details-from-event-logs)
* [Forensics: Automating Active Directory Account Lockout Search with PowerShell (an example of deep XML filtering of event logs across multiple servers in parallel)  - Microsoft Docs](https://docs.microsoft.com/en-us/archive/blogs/ashleymcglone/forensics-automating-active-directory-account-lockout-search-with-powershell-an-example-of-deep-xml-filtering-of-event-logs-across-multiple-servers-in-parallel)

