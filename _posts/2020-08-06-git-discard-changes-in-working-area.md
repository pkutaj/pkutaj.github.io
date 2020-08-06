---
layout: post
title: git > discard local changes (no return!) with reset --hard
categories: [git]
---
## abstract
The concern is documenting removing all the changes done in the working area of the git repo. 
Beware: this is about resetting **uncommitted changes**, there no return — you just burn it for good. So be **sure** you know what you're doing. 

## video
## contents
<!-- TOC -->

- [1. condition: no commit no reset](#1-condition-no-commit-no-reset)
- [2. use-cases](#2-use-cases)
- [3. command](#3-command)

<!-- /TOC -->

### 1. condition: no commit no reset
* you can reset changes to what has been committed
* so you can reset
    * removal
    * modification
* if you, however, create a new file and do not commit it, `git reset --hard` does nothing with it
* the same for branches -> you cannot reset the creation of a branch

### 2. use-cases
* clone/pull → mess up a file → immediately want to return to the state of the pull
* clone/pull/commit → delete a file by mistake in a working area → restore it right away

### 3. command

```
git reset --hard
```
