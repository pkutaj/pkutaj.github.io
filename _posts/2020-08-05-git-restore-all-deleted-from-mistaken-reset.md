---
layout: post
title: git > undo the undo! on "git reset --hard" going wrong
categories: [git]
---
## abstract
The concern is documenting how to restore files if deleted by git reset by mistake

>scenario: first, mistakenly staged and commited everything in the working area
>then, tried to remove it from the repo and from the index with git reset --hard HEAD~1
>this, however has removed everything from the working area, too 
>I need my files back! 

## video
## contents
<!-- TOC -->

- [1. how it all starts](#1-how-it-all-starts)
- [2. get sha with reflog](#2-get-sha-with-reflog)
- [3. undo with HEAD@{} notation](#3-undo-with-head-notation)

<!-- /TOC -->

### 1. how it all starts
* innocent, I follow some advice to undo commit and stage but keep the file
* git reset hard, right ? 

```
git reset --hard HEAD^
```

* now lots of files are seemingly gone from the working area, too!

### 2. get sha with reflog
* run `git reflog` to get the `<sha>` of the commit you want to return to life 
    * with all files that were in that commit

![git_reflog_with_curly_notation]({{ site.url }}/assets/img001493.png)

### 3. undo with HEAD@{} notation
* first impulse is to checkout a recovery branch with the <sha> and merge 
  * I have already modified some file in the master, so, welcome the first sparkle of merge hell
* all you need to do is

```
git reset --hard "HEAD@{1}"
```

* note the quotes around HEAD put there because powershell interpretes cannot otherwise process the command properly
* this is how you move throught the nodes of the DAG
