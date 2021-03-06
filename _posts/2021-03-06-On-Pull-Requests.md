1---
layout: post
title: git > pull request
categories: [pull request]
---
## the case of pulling
the question is, what pull request means, the difference of pushing and pulling and the overall common sense + some examples of pull requests

## toc
<!-- TOC -->

- [1. push vs pull](#1-push-vs-pull)
- [2. the rational of the pull request process](#2-the-rational-of-the-pull-request-process)
- [3. examples/usecases](#3-examplesusecases)
    - [3.1. code review](#31-code-review)
    - [3.2. discussion platform](#32-discussion-platform)
    - [3.3. restoration pointcd](#33-restoration-pointcd)
    - [3.4. empty pull request](#34-empty-pull-request)
- [4. sources](#4-sources)

<!-- /TOC -->

## findings

### 1. push vs pull
If you have a code change in your repository and want to move it to a target repository, then:

* **PUSH** is **YOU forcing the changes in the TARGET REPOSITORY** with  `git push`
* ➔ **push request** would be the **TARGET REPOSITORY requesting YOU** to push your changes already. 
* **PULL** is the **TARGET REPOSITORY grabbing changes made by YOU** with `git pull` from the other repo
* ➔ A **pull request** is **YOU requesting the TARGET REPOSITORY** to please check and grab my changes, I have finished the work.

### 2. the rationale of the pull request process
* this happens on projects where you are not the lone dev
* pull request is a point when someone is done with the change
* but is not directly merging that into `master/main` 
* pull request is also a request to **REVIEW** the change (two sets of eyes principle)
* only afterward it can be implemented and released
* pull request is a process of **RECONCILIATION** of changes you've made with changes made by others on the codebase

### 3. examples/usecases
#### 3.1. code review
* **code review is a major benefit of pull requests**

#### 3.2. discussion platform
* note: they are designed as a general way to talk about code
    - e.g. dev needs help with a feature
    - he files a PRkni 2021-03-05-ii 
    - interested parties are notified
    - interested parties are asked the question right next to the relevant commit

#### 3.3. restore point
* we use PRs as a mechanism that creates a restore point for configuration changes
* once the change needs to be restored, we just revert the PR with a click of a button
* all commits are reverted within that umbrella

#### 3.4. empty pull request
* You create an empty PR to which the work is added
* I have seen pull request been created **before** any work is done at all
* Seems to function as an axis, around which the work should be done
* When u open a pull request on GitHub.
* All commits since the last request + all new ones are automatically added to this request
* You can't control which commits are added and which are not.
* When you try to open another pull request, I get an "Oops! There's already a pull request" error.

### 4. sources
* [What Is A Pull Request? - YouTube](https://www.youtube.com/watch?v=For9VtrQx58)
* <https://www.earthdatascience.org/workshops/intro-version-control-git/pull-request/>
* [git - How to open multiple pull requests on GitHub - Stack Overflow](https://stackoverflow.com/questions/8450036/how-to-open-multiple-pull-requests-on-github)
