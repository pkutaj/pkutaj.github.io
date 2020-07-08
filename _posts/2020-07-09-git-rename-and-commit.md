---
layout: post
title: git > r100 ? 
categories: [git]
---
## TOC
<!-- TOC -->

- [1. abstract](#1-abstract)
- [2. r100 status ?](#2-r100-status-)
- [3. commit rename automatically](#3-commit-rename-automatically)
- [4.](#4)
- [5.](#5)
- [6.](#6)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. abstract
The aim is documenting renaming in git

### 2. r100 status ?
* found the following in the git log and wonder what **R100** denotes

```
6a193a9 Nikola Maksimovic       2020-06-22      adding financial report to playbook
M       jobs/datamodeling/sql-runner/playbooks/02-ecosia-playbook.yml.tmpl
R100    jobs/datamodeling/sql-runner/sql/financial_report/financial-report_aggr.sql     jobs/datamodeling/sql-runner/sql/20_blog/05_financial_report.sql
M       jobs/datamodeling/sql-runner/sql/fin_permissions/permission_looker.sql
```

> The documentation for git status under "Changed Tracked Entries" appears to explain what R100 means: <X><score> The rename or copy score (denoting the percentage of similarity between the source and target of the move or copy). For example "R100" or "C75". So, putting this together with what you cited above, the files you are seeing with R100 status mean that they were moved, and that Git found a 100% match between that file and some other previously named file.

— from <https://stackoverflow.com/a/53057010>

### 3. commit rename automatically
* rename file
* stage file
* commit with `-a` flag
* the score will be displayed even if the file has been modified between the last commit

```
▶ git log --pretty=format:"%h%x09%an%x09%ad%x09%s" --name-status --date=short
91695bb pavol kutaj     2020-07-08      staleness
R078    _posts/2020-06-02-staleness.md  _posts/2020-07-08-staleness.md
```


### 4.  
### 5.  
### 6.  
### 7. sources
* [git diff --name-status : What does R100 mean? - Stack Overflow](https://stackoverflow.com/questions/53056942/git-diff-name-status-what-does-r100-mean)