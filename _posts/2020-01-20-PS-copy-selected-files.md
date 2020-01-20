---
layout: post
title: PS > DSSD pattern ➔ dir | sort | select | % {do}
---
## the case	
the question, in particular, was how to copy only those 5 items that were just downloaded, but there seems to be a pattern for further use. I named it `DSSD`, a symetrical acronym should be memorable 

## findings
* the insight is that you don't **start with the operation** you want to perform (here copy-item) and feed it with the required parameters as I would had intuitively guessed
* instead, **you end with the operation**
* you start with a proper filtering via `get-childitem` (aka `dir`) pipe the output via `sort` and `select` and finally pile each of the objects in the filtered and sorted set into `for-each-object` (aka `%`)
    * object-filtered with `dir` ➔ `dir *.txt`
    * sorted with `sort` + attribute ➔ `sort LastWriteTime -descending`
    * the limitation can be done for example with `select -first` ➔ `select -first 11`

```powershell
dir *.txt | sort LastWriteTime -Descending | select -first 11 | % {copy $_.Name c:\temp -verbose}
```

* outcome 
```
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Custom query ProductPriceBook (1).txt Destination: C:\temp\Custom query ProductPriceBook (1).txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Custom query ProductPriceBook.txt Destination: C:\temp\Custom query ProductPriceBook.txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\IRDataset TMS_Configuration.txt Destination: C:\temp\IRDataset TMS_Configuration.txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Insert TMS_Training_Prog_Product.txt Destination: C:\temp\Insert TMS_Training_Prog_Product.txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Unknown select TMS_Invoice_Batch_Wizard_CE.txt Destination: C:\temp\Unknown select TMS_Invoice_Batch_Wizard_CE.txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\IRDataset TMS_Global_Auto_No.txt Destination: C:\temp\IRDataset TMS_Global_Auto_No.txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Segment TMS_Role (1).txt Destination: C:\temp\Segment TMS_Role (1).txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\IRDataset TMS_Application 2 (1).txt Destination: C:\temp\IRDataset TMS_Application 2 (1).txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\IRDataset TMS_Application (1).txt Destination: C:\temp\IRDataset TMS_Application (1).txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Insert Journal_History (1).txt Destination: C:\temp\Insert Journal_History (1).txt".
VERBOSE: Performing the operation "Copy File" on target "Item: C:\Users\Admin\Downloads\Custom query TMS_Invoice_Header sum (1).txt Destination: C:\temp\Custom query TMS_Invoice_Header sum (1).txt".
```
## sources
* [Copying files based on last write time: help a PowerShell newbie](https://social.technet.microsoft.com/Forums/scriptcenter/en-US/cf81ddf2-7b74-4599-9e04-572469dfc65d/copying-files-based-on-last-write-time-help-a-powershell-newbie?forum=ITCG)
* [PS > The Tricks with dir (set-location)]({{ site.url }}/2019/11/12/POWERSHELL-dir.html)

