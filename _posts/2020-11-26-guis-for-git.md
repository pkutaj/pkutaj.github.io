---
layout: post
title:
categories: []
---
## usecase
The concern is documenting a simple trick I have found when commiting similar messages to git. 

<!-- TOC -->

- [1. git needs GUI](#1-git-needs-gui)
- [2. SOP](#2-sop)
    - [2.1. repo history](#21-repo-history)
    - [2.2. file history](#22-file-history)
    - [2.3. inbox0](#23-inbox0)

<!-- /TOC -->

### 1. git needs GUI
* somewhere I read that someone (Linus Torvalds?) mentioned that not everything needs a gui — but git does
* well stop — many GUIs need a CLI — and thanks for github cli that lets me create and merge pull requests within seconds without leaving terminal
* but sometimes I need to quickly run through the changes made to the file and VSCode's timeline is just perfect for that

### 2. SOP
#### 2.1. repo history
* clone
* open `gitk`

#### 2.2. file history
* open editor there w/ `start code .`
    * I have an alias `c` for that 
* open file 
* open side-bar and go to the timeline
* click on the change and enjoy the side-by-side delta

#### 2.3. inbox0
* I manage my KBs with git and it helps run through new additions and changes with the Source Control sidebar in vscode
* you can commit here easily as well
