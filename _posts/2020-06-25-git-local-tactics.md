---
layout: post
title: git > local tactics
categories: [git]
---
## abstract
The concern is documenting working locally with git

## video
## contents
<!-- TOC -->

- [1. add](#1-add)
    - [1.1. stage deleted only](#11-stage-deleted-only)
- [2. rm](#2-rm)
- [3. diff](#3-diff)
- [4. status](#4-status)
    - [4.1. status -s](#41-status--s)

<!-- /TOC -->

### 1. add 
* `git add -A` 🠊  stages all changes
* `git add .` 🠊 stages new files and modifications, without deletions
* `git add -u` 🠊  stages modifications and deletions, without new files

— from <https://stackoverflow.com/a/572660>

#### 1.1. stage deleted only
* in windows
* use `ls-files` as a filter with `--deleted` flag and pipe into `% {git add $_}`

```
git ls-files --deleted | % {git add $_}
~\Documents\workspace\SNOW\SNOW-logs\_posts  master ≢ +0 ~0 -14 | +25 ~11 -0 !
```

### 2. rm
* `git rm` is used to remove file from the staging area — the opposite of `git add`
* <https://stackoverflow.com/a/2047477>

```
git rm file1.txt
git commit -m "remove file1.txt"
```

### 3. diff
* shows a difference between the repo and the working directory
* can be summarized with `--stat`
* [can be localized to a folder](https://riptutorial.com/git/example/4340/show-differences-for-a-specific-file-or-directory) with path specification

### 4. status
* summarizes the all possible changes between areas
* can be localized with path modification — this is however recursive
* localized
```
git status .
```
* general
```
git status
```

#### 4.1. status -s
* short status

![git_status_s]({{ site.url }}/assets/img001252.png)
