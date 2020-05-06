---
layout: post
title: git > data loss via deleted branch + git reflog
categories: [git]
---

| **THE CASE OF THE DELETED BRANCH**                                                          |
|---------------------------------------------------------------------------------------------|
| **question**                                                                                |
| what happened with my files — seems like I managed to delete a branch ?                     |
| **thesis**                                                                                  |
| unknowingly, I created a branch, created new content there and then deleted it in VSCode UI |
| **anti-thesis**                                                                             |
| beware of VSCode GUI for git — you have lost data repeatedly                                |
| **link to demo/solution**                                                                   |
| <https://drive.google.com/file/d/1IsgI__zdXwCd0rTPcaq3AZ6jWqY48xAZ/view?usp=sharing>        |

* mysteriously, I created a branch with the name identical to the SHA of a commit via VSCode UI ?

![what_is_this_information]({{ site.url }}/assets/2020-05-05_01.jpg)

* note the reduced number of files after I switched the branch from **recovered** 🠊 **master**

![branch_switching_files_in_dir_change]({{ site.url }}/assets/2020-05-05-git-branch-switching.gif)

## toc
<!-- TOC -->

- [git reflog](#git-reflog)
- [STEP-1 find the SHA of the commit at the TIP of your deleted branch](#step-1-find-the-sha-of-the-commit-at-the-tip-of-your-deleted-branch)
- [STEP-2 restore the branch](#step-2-restore-the-branch)
- [explanation](#explanation)
    - [HEAD](#head)
    - [Branches](#branches)
        - [Create a Branch](#create-a-branch)
        - [Checkout a branch](#checkout-a-branch)
- [sources](#sources)

<!-- /TOC -->


### git reflog
* `reflog` stands for **REFERENCE LOGS**
* record when the **tips** of branches and other references were updated in the **LOCAL REPO**

### STEP-1 find the SHA of the commit at the TIP of your deleted branch
* the following command gives you HEADs of all the branches

```
git reflog
```

### STEP-2 restore the branch
* the name of the `<branch>` is **IRRELEVANT & CUSTOM**
* the `sha` is **CRUCIAL & FIXED** and it 
* 🠊 recreates the branch and all its content before it was deleted

```
git checkout -b <branch> <sha>
```

### explanation
#### HEAD
* reference variable that git keeps
* aim: it is a pointer, a reference to a **SPECIFIC COMMIT** in a repo
* this specific commit is **TIP** of the current branch
* this specific commit is **THE LAST STATE** of the current branc
* this specific commit is **THE PARENT OF THE NEXT COMMIT** 

#### Branches
* with a new branch, a new head is created
* when you do some changes and commit the changes, a new head is created
* and if you delete the test branch, **HEAD REFERENCE STILL PERSISTS** 🠊 thus you can recover the branch

##### Create a Branch

```
git checkout -B <branch>
```

##### Checkout a branch

```
git checkout <branch>
```



### sources
* [git ready » reflog, your safety net](http://gitready.com/intermediate/2009/02/09/reflog-your-safety-net.html)
* <https://medium.com/@zaran.56/how-to-recover-restore-deleted-git-branch-5a068c07bed2>
* [Git - Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
* [Git Branch ~ Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/using-branches)