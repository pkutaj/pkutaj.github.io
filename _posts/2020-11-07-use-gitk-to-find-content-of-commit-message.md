---
layout: post
title:
categories: []
---
## usecase
The concern is documenting currently the fastest way to look for the commit and its content based on the search of commit message — using gitk

<!-- TOC -->

- [1. remrem](#1-remrem)
- [2. steps](#2-steps)
- [3. footnotes](#3-footnotes)
- [4. gitk-vs-git gui](#4-gitk-vs-git-gui)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. remrem
> content of the commit message is what interests me here, mainly when there is a naming convention to commiting (some logic, well convention I would say) and I need to find the latest change done — this is all done within IaC when changing the config of EMR cluster or SQL job runner,...

### 2. steps
* navigate to the repository
* enter `gitk`
* put the search string into the proper field and browse

![gitk_search_engine]({{ site.url }}/assets/img002186.png)

### 3. footnotes
* `gitk` is written in (newly discovered) [Tcl/Tk](https://www.tcl.tk/)

### 4. gitk-vs-git gui
* not much xp, but seems that
    * `gitk` is analytical
    * `git gui` is more transactional; it _focuses on refining individual commits, single file annotation and does not show project history_ ([Atlasian][Attlasian])

### 5. sources
* [Gitk described by Atlassian docs](https://www.atlassian.com/git/tutorials/gitk)
* [Git - gitk Documentation](https://git-scm.com/docs/gitk)

[Attlasian]:https://www.atlassian.com/git/tutorials/gitk 
