---
layout: post
title: git > on renaming files
categories: [git]
---
### 1. abstract
The aim is documenting renaming in git. The case is the renaming of files in the context of blogging for various reasons — a major change sometimes is followed by the bump of the timestamp necessary for Jekyll. I have used prefixes within filenames for semantic/versioning reasons, etc.

## TOC
<!-- TOC -->

- [1. abstract](#1-abstract)
- [2. commit rename automatically](#2-commit-rename-automatically)
    - [2.1. benefits](#21-benefits)
- [3. r100 status — and similar ones](#3-r100-status--and-similar-ones)
- [4. sources](#4-sources)

<!-- /TOC -->


### 2. commit rename automatically
* rename file
* stage the renamed file and nothing else
* commit with `commit -a <commit message>` flag or (commit `commit --all -m <commit message>`)

> Tell the command to automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected.

— [Git - git-commit Documentation](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--a)

* the score will be displayed even if the file has been modified between the last commit

```
▶ git log --pretty=format:"%h%x09%an%x09%ad%x09%s" --name-status --date=short
91695bb pavol kutaj     2020-07-08      staleness
R078    _posts/2020-06-02-staleness.md  _posts/2020-07-08-staleness.md
```
* example

```
~\Documents\workspace\work.log\pkutaj\_posts  master ↑1 +16 ~0 -1 ! ⚡                                                             2 minutes ago
▶ git add 2020-07-09-git-rename-and-commit.md
~\Documents\workspace\work.log\pkutaj\_posts  master ↑1 +1 ~0 -0 | +15 ~0 -1 ! ⚡                                                  2 minutes ago
▶ git commit -a -m "rename example"
[master 78102c8] rename example
 1 file changed, 0 insertions(+), 0 deletions(-)
 rename _posts/{2020-07-08-git-rename-and-commit.md => 2020-07-09-git-rename-and-commit.md} (100%)
~\Documents\workspace\work.log\pkutaj\_posts  master ↑2 +15 ~0 -0 ! ⚡                                                             0 seconds ago
▶ git log --pretty=format:"%h%x09%an%x09%ad%x09%s" --name-status --date=short
78102c8 pavol kutaj     2020-07-08      rename example                                                                                            R100    _posts/2020-07-08-git-rename-and-commit.md      _posts/2020-07-09-git-rename-and-commit.md
```

#### 2.1. benefits
* the workflow below is **faster** than having to 
    1. stage an addition of new an with `git add <old_name>`
    2. stage a removal of old file with `git add <new_name>`
* the workflow belog is **faster** than having to
    1. stage a rename/move of a new name with `git mv <new_name>`
    2. stage an addition of new content of the file with `git add <new name>`
    
### 3. r100 status — and similar ones
* found the following in the git log and wonder what **R100** denotes

```
6a193a9 Nikola Maksimovic       2020-06-22      adding financial report to playbook
M       jobs/datamodeling/sql-runner/playbooks/02-ecosia-playbook.yml.tmpl
R100    jobs/datamodeling/sql-runner/sql/financial_report/financial-report_aggr.sql     jobs/datamodeling/sql-runner/sql/20_blog/05_financial_report.sql
M       jobs/datamodeling/sql-runner/sql/fin_permissions/permission_looker.sql
```

> The documentation for git status under "Changed Tracked Entries" appears to explain what R100 means: <X><score> The rename or copy score (denoting the percentage of similarity between the source and target of the move or copy). For example "R100" or "C75". So, putting this together with what you cited above, the files you are seeing with R100 status mean that they were moved, and that Git found a 100% match between that file and some other previously named file.

— from <https://stackoverflow.com/a/53057010>

### 4. sources
* [git diff --name-status : What does R100 mean? - Stack Overflow](https://stackoverflow.com/questions/53056942/git-diff-name-status-what-does-r100-mean)