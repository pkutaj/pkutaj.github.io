---
layout: post
title: enter detached head to peek into past
categories: [git]
---
## abstract
The concern is documenting an accidental discovery of the **DETACHED HEAD** state

![what_branch_is_this]({{ site.url }}/assets/img002136.png)

## contents
<!-- TOC -->

- [1. enter detached HEAD](#1-enter-detached-head)
- [2. rules](#2-rules)
- [3. usecase](#3-usecase)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. enter detached HEAD
* note that **HEAD** is the term from data structure terminology for graph-types like lists or DAGs 
    * it denotes the beginning point where the traverse can begin (**TAIL** being the end)
    * in git: **HEAD === active branch** — only 1 branch can be active, pointing to the latest commit
* in powershell, from the main folder of the git project get the name of the active branch

```
gc ./.git/HEAD
ref: refs/heads/master
```
* if you however checkout a particular commit with the its `<sha>` you'll enter a state of **DETACHED HEAT**

> The detached HEAD state is useful for revisiting old states, and sometimes for short-term work that you are not sure you will keep. Other than that you probably want to avoid it.
— https://stackoverflow.com/a/2467564/11082684

* if you checkout only `<sha>` you will create a **DETACHED HEAD**

```
git checkout <sha>
```

### 2. rules 
* you **can't merge** detached HEAD
* this is just a peek into the past, but it is very transient
* once you checkout back to master, the detached HEAD dissapears again

### 3. usecase
* in my markdown notes, sometimes I commit en-masse
* in some of those commits there are files mistakenly re-pasted, edited
* need to check the initial commit of the affected file
* this is the case for **DETACHED HEAD**

1. get the file history with

```
git log --pretty=format:\"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset %s\" --name-status --date=short --all --full-history -- foo.txt
```

![get_sha]({{ site.url }}/assets/img002134.png)

2. checkout a detached head

```
git checkout <sha>
```

3. open `foo.txt` to se if that is what you were looking for

### 4. sources
* https://stackoverflow.com/a/2467564/11082684
