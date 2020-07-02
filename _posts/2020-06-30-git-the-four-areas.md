---
layout: post
title: git > the 4 areas > working, staging, REPO, stash
categories: [git]
---
## abstract
The concern is documenting the concept 4 areas of git

![the_git4]({{ site.url }}/assets/img001226.png)

## contents
<!-- TOC -->

- [1. intro](#1-intro)
- [2. 2 golden questions of git](#2-2-golden-questions-of-git)
- [3. areas in detail](#3-areas-in-detail)
    - [3.1. working area](#31-working-area)
        - [3.1.1. status: clean](#311-status-clean)
    - [3.2. repo](#32-repo)
        - [3.2.1. git objects](#321-git-objects)
            - [3.2.1.1. immutable](#3211-immutable)
        - [3.2.2. commits](#322-commits)
        - [3.2.3. HEAD](#323-head)
    - [3.3. index](#33-index)
    - [3.4. stash](#34-stash)

<!-- /TOC -->

### 1. intro
* git stores info about the project in 4 areas 
    1. working area
    2. repository — contains history; when you commit 
    3. index — put files before the commit
    4. stash — temporary storage area, not as important

### 2. 2 golden questions of git
1. what's the trajectory ? 
    * i.e. from where to where, i.e. how does this command move data across the 4 areas ?
2. what about the repo 
    * repo is the most important area, so question this one specifically

![example_of_moving_the_data]({{ site.url }}/assets/img001231.png)

### 3. areas in detail
#### 3.1. working area
* the **project directory** in your file system
* where you work
* where you edit your files
* but git **does not care** about working area
* this is a very temporary place
* git usually do not changes anything there but **don't assume data is safe unless commited**

##### 3.1.1. status: clean
* in the situation below, the working area and the repo are alligned; everything was commited there is no diff

![posh-git-clean]({{ site.url }}/assets/img001227.png)

#### 3.2. repo
* repository is in the `./git` folder and mainly in `./git/objects`
##### 3.2.1. git objects
###### 3.2.1.1. immutable
* blobs
* trees
* commits 
* they are linked together in what represents the history of the project
* each commit is a snapshot 

##### 3.2.2. commits
* commit is pointing to its parent and indirectly to all commits in the past 

##### 3.2.3. HEAD
* there can only be 1 HEAD
* HEAD points to a current branch
* branch is pointing to the commit
* HEAD is indirectly pointing to the current commit
* there is always **one current commit**

#### 3.3. index
* aka **staging area**
* 3rd storage area
* unique to git
* in between working area and repo

#### 3.4. stash
* to be done