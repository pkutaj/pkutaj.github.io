---
layout: post
title: powershell > the case of mass rename with regex
categories: [powershell]
---
## the case	
the puzzle is, how to rename a bunch of file with a certain criteria. In my case, i have the following structure (snippet) and I need to remove all the digits from the name

```plaintext
├───FOO
│       loremIpsum02_NEECA_Northern_Europe.xlsx
│       loremIpsum03_NEECA_Czech_Republic.xlsx
│       loremIpsum04_NEECA_Hungary.xlsx
│       loremIpsum05_NEECA_Poland.xlsx
│       loremIpsum06_NEECA_Romania.xlsx
│       loremIpsum07_NEECA_Bulgaria_Greece.xlsx
│       loremIpsum08_NEECA_Georgia.xlsx
│       loremIpsum09_NEECA_Kazakhstan.xlsx
│       loremIpsum10_NEECA_Russia.xlsx
│       loremIpsum29_NEECA_All.xlsx
│
├───BAR
│       loremIpsum17_AEM_Turkey.xlsx
│       loremIpsum18_AEM_Egypt.xlsx
│       loremIpsum19_AEM_Morocco_Mauretania.xlsx
│       loremIpsum20_AEM_Africa 1.xlsx
│       loremIpsum21_AEM_Africa 2.xlsx
│       loremIpsum22_AEM_Africa 3.xlsx
│       loremIpsum31_AEM_All.xlsx
```

<!-- TOC -->

- [1. solution](#1-solution)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. solution
```powershell
get-childitem -recurse | Rename-Item -NewName {$_.Name -replace '\d{2}', ''}
```

* pipe `get-childitem` (list content) with the `recurse` parameter (include content of all subfolders) with the `rename-item` cmdlet
* no `loop structure` necessary here (such as `foreach-object`)
* the value of **NewName** is a **script block** that runs before the value is submitted to the **NewName** parameter
* in the **script block**, the `$_` automatic variable represents each file object as it comes to the command throught the pipeline
* here, you use the `-replace` switch and **regex literal** to replace the 2 digits with an empty string
* of course, `'\d{2}` can be replaced with any **regex literal** according to the current need

```plaintext
├───FOO
│       loremIpsum_NEECA_Northern_Europe.xlsx
│       loremIpsum_NEECA_Czech_Republic.xlsx
│       loremIpsum_NEECA_Hungary.xlsx
│       loremIpsum_NEECA_Poland.xlsx
│       loremIpsum_NEECA_Romania.xlsx
│       loremIpsum_NEECA_Bulgaria_Greece.xlsx
│       loremIpsum_NEECA_Georgia.xlsx
│       loremIpsum_NEECA_Kazakhstan.xlsx
│       loremIpsum_NEECA_Russia.xlsx
│       loremIpsum_NEECA_All.xlsx
│
├───BAR
│       loremIpsum_AEM_Turkey.xlsx
│       loremIpsum_AEM_Egypt.xlsx
│       loremIpsum_AEM_Morocco_Mauretania.xlsx
│       loremIpsum_AEM_Africa 1.xlsx
│       loremIpsum_AEM_Africa 2.xlsx
│       loremIpsum_AEM_Africa 3.xlsx
│       loremIpsum_AEM_All.xlsx
```

### 2. sources
* [ms | example 4](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/rename-item?view=powershell-6)
* [stackoverflow](https://stackoverflow.com/a/5577314/11082684)

