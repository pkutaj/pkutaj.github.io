---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the need to get a fast overview of a cloned github repo with powershell — a quick profile into what filetypes are inside. 

<!-- TOC -->

- [1. pipe dir to group with attribute + select and sort](#1-pipe-dir-to-group-with-attribute--select-and-sort)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. pipe dir to group with attribute + select and sort
* uses powershell as a declarative / query language
* definitely insightful when codifying workflows
* my personal kb 🠋

```
dir -Recurse -File | group Extension | select count, name | sort count -Descending

Count Name
----- ----
  677 .png
  536 .md
  153 .js
   72 .gif
   30 .ps1
   19 .json
   13
   12 .jpg
   12 .map
    9 .html
    9 .clj
    8 .ts
    7 .pyc
    7 .py
    5 .bat
    4 .pdf
    3 .zip
    2 .TAG
    2 .gitignore
    2 .txt
    1 .cmd
    1 .lisp
    1 .css
    1 .ico
    1 .csv
    1 .npmignore
```

### 2. sources
* [Recursively looking for count of file extension using PowerShell - Stack Overflow](https://stackoverflow.com/questions/47754256/recursively-looking-for-count-of-file-extension-using-powershell)
