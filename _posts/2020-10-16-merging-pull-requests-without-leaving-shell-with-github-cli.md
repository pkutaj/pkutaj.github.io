---
layout: post
title: 
categories:
---
## usecase
The concern is documenting how the github CLI's feature for creating pull requests from command line has modified the feature-branching workflow by introducing a way how to push the work into the repo with the simultaneous creation of a pull request.

<!-- TOC -->

- [1. work → stage → commit](#1-work-→-stage-→-commit)
- [2. create PR](#2-create-pr)
- [3. verify PR](#3-verify-pr)
    - [3.1. list](#31-list)
    - [3.2. view](#32-view)
    - [3.3. diff](#33-diff)
- [4. merge PR](#4-merge-pr)
- [5. git pull](#5-git-pull)
- [6. sources](#6-sources)

<!-- /TOC -->

### 1. work → stage → commit
* checkout a branch

```
 git checkout -b test
```

* do the work (create a test file here)
* add to the index && commit to the repo

```
git add . && git commit -m "test github cli"
```

### 2. create PR
* **do not push the branch with git**
* run 

```
gh pr create
```

* select the repo you want to push the branch to

![create_pr_with_branch_push]({{ site.url }}/assets/img001864.png)

* the github cli will use proper git command to push the feature branch and create the PR as well !

![gh_pr_create]({{ site.url }}/assets/img001865.png)

### 3. verify PR

#### 3.1. list
* lists all current pull requests

```
gh pr list
```

![gh_pr_list]({{ site.url }}/assets/img001862.png)

#### 3.2. view
* gives you the name + status + #of commits + body + browser URL

```
gh pr view
```

![gh_pr_view]({{ site.url }}/assets/img001863.png)

#### 3.3. diff
* outputs all the changes done in the pull requests

```
gh pr diff
```

![gh_pr_diff]({{ site.url }}/assets/img001866.png)

### 4. merge PR
* merge the PR and delete the feature branch if so intended

```
gh pr merge
```

![gh_pr_merge]({{ site.url }}/assets/img001868.png)

### 5. git pull
* do not forget to pull the changes again, if continuing in further work
* this prevents merge conflicts

```
git pull
```

### 6. sources
* [Manual of GitHub CLI](https://cli.github.com/manual/)
