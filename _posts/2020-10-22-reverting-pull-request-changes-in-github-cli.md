---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the possibilities of actually reverting the PR from the terminal with github cli to emulate the feature as it is possible in the browser

![{{ site.url }}/assets/img002092.png]({{ site.url }}/assets/img002092.png)

<!-- TOC -->

- [1. list closed prs](#1-list-closed-prs)
- [2. git revert?](#2-git-revert)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. list closed prs
* list closed

```
gh pr list --s closed -L 1
```

* view one with the id

```
gi pr view 144
```

* copy the url and open with `start chrome $url`
* you have to use that feature as it 
    * creates a new branch with `revert` in the name
    * runs `git revert` properly
    * craetes yet another pull request
    * ... all with a single click
* then, just delete branch remotely, `git pull`, delete branch locally 
* done

### 2. git revert? 
* you could achieve the same with `git revert` but at the moment that is **too much work**
* git revert does not change history
* instead it: 
    * inverts the changes introduced by the selected commit
    * creates additional commit with the resulting inverse content
* if I pause a job by renaming a file, and I want to resume by reverting a commit, I don't want to delete (git reset) that
* I want to continue and the state before the inversion has its important place in the history

### 3. sources
* [Git Revert — Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert)
