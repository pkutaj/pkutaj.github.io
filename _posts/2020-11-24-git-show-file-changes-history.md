---
layout: post
title: git > show file changes and history
categories: [git]
---
## abstract
The concern is documenting reading through the history of changes of a file using git. 

## video
## contents
<!-- TOC -->

- [1. use-case](#1-use-case)
- [2. pull & log -p](#2-pull--log--p)
- [3. file history: who & commit message](#3-file-history-who--commit-message)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. use-case
* I repeatedly pull changes from repos and need to quickly check what has happened to config files 
* My colleagues troubleshoot data pipelines and, learning from them, I need to see what they have done to the files in question

### 2. pull & log -p
* this is not git diff
* run `git pull` → fetch & merge potential merges
* run `git log -p` <filename> → see what has been changed

![see_the_change_fast]({{ site.url }}/assets/img001448.png)

### 3. file history: who & commit message


> git log --pretty=format:"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset %s" --name-status --date=short --all --full-history -- _FILENAME_


![show_file_history]({{ site.url }}/assets/img002285.png)

### 4. sources
* <https://stackoverflow.com/a/22412252/11082684>
