---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the ways to find who is behind a particular change with git — not file history, but (as I call it) the line history. 

<!-- TOC -->

- [1. git log -S](#1-git-log--s)
    - [1.1. example](#11-example)
- [2. git blame](#2-git-blame)
    - [2.1. example](#21-example)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. git log -S
* one way of going about that
* you need a string or a piece of code 
* you search the entire repo

```
git log -S "_STRING_" --pretty=format:"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset" --name-status --date=short
```

#### 1.1. example

```
git log -S "nomad" --pretty=format:"%C(auto)%h%d%Creset %C(cyan)(%ci)%Creset %C(green)%cn <%ce>%Creset" --name-status --date=short
```

![colored_output]({{ site.url }}/assets/img002219.png)

### 2. git blame
* get the exact location within the file (exact line, or range or whole file if short)
* search within a single file
* you need a line number + filename
* run `git blame` with L parameter to see who has modified that line exactly

![find_author]({{ site.url }}/assets/img002220.png)

```
git blame -e -L _LINE_N_START_, _LINE_N_END_ _FILENAME_ 
```

#### 2.1. example

```
git blame -e -L 9,9 C:\Users\Admin\Documents\workspace\work.log\kb\powershell\pub-wlog.ps1
```

![find_author]({{ site.url }}/assets/img002222.png)

### 3. sources
* [git blame — Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-blame)
