---
layout: post
title: git > remote tactics
categories: [git]
---
## overview
The concern is to document the operations used for working with the remote origin, i.e. the trajectory being from the remote repo to the local working area. 

## toc
<!-- TOC -->

- [1. clone](#1-clone)
- [2. log](#2-log)
    - [2.1. log --oneline](#21-log---oneline)
    - [2.2. log --oneline --graph](#22-log---oneline---graph)
- [3. shortlog](#3-shortlog)
    - [3.1. shortlog -sne](#31-shortlog--sne)
- [4. show](#4-show)
    - [4.1. show --HEAD~N](#41-show---headn)
    - [4.2. show --HEAD](#42-show---head)
    - [4.3. show <SHA>](#43-show-sha)
- [5. remote](#5-remote)
    - [5.1. remote --v](#51-remote---v)
    - [5.2. remote add origin <url>](#52-remote-add-origin-url)
- [6. git branch](#6-git-branch)
    - [6.1. git branch -r](#61-git-branch--r)
    - [6.2. git branch --set-upstream](#62-git-branch---set-upstream)
    - [6.3. git branch -a](#63-git-branch--a)
    - [6.4. git branch -d](#64-git-branch--d)
- [7. git fetch](#7-git-fetch)
    - [7.1. fetch -v](#71-fetch--v)
- [8. git merge](#8-git-merge)
- [9. pull](#9-pull)
- [10. (10) fetch 🠊 diff](#10-10-fetch-🠊-diff)
- [11. sources](#11-sources)

<!-- /TOC -->

## findings
### 1. clone
* the first step is to clone the content of the remote git repository

### 2. log
* you can get an overview of what is actually in the repository

#### 2.1. log --oneline
* with a oneliner

#### 2.2. log --oneline --graph
* with a visualization of the DAG (i.e. head, merges, branches and even a root if you go that deep)

### 3. shortlog
* authors and commit messages per author

```
▶ git shortlog
pavol kutaj (35):
      Create CNAME
      javascript > roman to int
      WIN > windbg
      assets
      cloud > aws > vpc and network delivery
```

#### 3.1. shortlog -sne
* aggregate log
* decreasing my number of commit
* add email address

```
▶ git shortlog -sne
   422  pkutaj <pkutaj@gmail.com>
    34  pavol kutaj <pkutaj@gmail.com>
     1  pavol kutaj <48290428+pkutaj@users.noreply.github.com>
```

### 4. show 
* **HEAD** is the last node (there has to be a last node because this is directed/acyclical graph, i.e. DAG)
* you can 

#### 4.1. show --HEAD~N
* shows a substractino of the commit 
* e.g. `git show HEAD~1` shows the content of the previous vommit

#### 4.2. show --HEAD
#### 4.3. show <SHA>
* choose a hash of the commit to get the output 

### 5. remote
* shows the remote (origin below, can be multiple)

```
git remote
origin
```

#### 5.1. remote --v
* verbose output of the git remote command

```
git remote -v
origin  https://github.com/pkutaj/pkutaj.github.io (fetch)
origin  https://github.com/pkutaj/pkutaj.github.io (push)
```

#### 5.2. remote add origin <url>
* add a remote repository 
* you can also have multiple remotes

### 6. git branch
* list branches in the repo
* without param — local

#### 6.1. git branch -r
* list all remote branches

```
PS C:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts> git branch -r
  origin/master
PS C:\Users\Admin\Documents\workspace\work.log\pkutaj\_posts> git branch
* master
```

#### 6.2. git branch --set-upstream
* the upstream tracking branch is the remote branch that the local branch is mirroring
* the local mirroring branch is known as _remote tracking branch_ 
* you set this up in a once-done command `git branch --set-upstream master origin/master` 
* afterwards, `git pull` will pull all changes done in the remote changes
* [How To Set Upstream Branch on Git – devconnected](https://devconnected.com/how-to-set-upstream-branch-on-git/)
 
#### 6.3. git branch -a
* list all branches, local and remote

#### 6.4. git branch -d 
* deletes a branch

### 7. git fetch
* pull down any changes made in the remote repository 
* you can run it as many times as you want
* for multiple remote, you can specify remote you want to fetch from

#### 7.1. fetch -v
* verbose version 

### 8. git merge
* you can merge changes fetched from with remote location to the remote branch with the local branch
* for the combination of the two commands, see `git pull` below

### 9. pull
* pull is the shortcut that is combining
* 1. git fetch
* 2. git merge origin/master
* you can either configure upstream-pulling branch or to pull by defining the name of the remote branch and the local branch you want to pull tol

### 10. (10) fetch 🠊 diff
* diff displays difference between local and remote branch

```
git diff master origin/master --stat --color
```

### 11. sources
* [How To Set Upstream Branch on Git – devconnected](https://devconnected.com/how-to-set-upstream-branch-on-git/)