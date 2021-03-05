---
layout: post
title: git > pull request
categories: [pull request]
---
## the case	of pulling
the question is, what pull request means, the difference of pushing and pulling and the overall common sense + some examples of pull requests

## toc
<!-- TOC -->

- [1. push vs pull](#1-push-vs-pull)
- [2. the rational of the pull request process](#2-the-rational-of-the-pull-request-process)
- [3. example: code review](#3-example-code-review)
- [4. example: discussion platform](#4-example-discussion-platform)
- [5. example: restoration point](#5-example-restoration-point)
- [6. example: empty pull request](#6-example-empty-pull-request)
- [7. sources](#7-sources)

<!-- /TOC -->

## findings

### 1. push vs pull
If you have a code change in your repository and want to move it to a target repository, then:

* **PUSH** is **YOU forcing the changes in the TARGET REPOSITORY** with  `git push`
* ➔ **push request** would be the **TARGET REPOSITORY requesting YOU** to push your changes already. 
* **PULL** is the **TARGET REPOSITORY grabbing changes made by YOU** with `git pull` from the other repo
* ➔ A **pull request** is **YOU requesting the TARGET REPOSITORY** to please check and grab my changes, I have finished the work.

### 2. the rational of the pull request process
* this happens on projects where you are not the lone dev
* pull request is a point when someone is done with the change
* but is not directly merging that into `master/main` 
* pull request is also a request to **REVIEW** the change (two sets of eyes principle)
* only afterward it can be implemented and released
* pull request is a process of **RECONCILIATION** of changes you've made with changes made by others on the codebase

### 3. example: code review
* **code review is a major benefit of pull requests**

### 4. example: discussion platform
* note: they are designed as a general way to talk about code
    - e.g. dev needs help with a feature
    - he files a PRkni 2021-03-05-ii 
    - interested parties are notified
    - interested parties are asked the question right next to the relevant commit

### 5. example: restoration point
* we use PRs as a mechanism that creates a restore point for configuration changes
* once the change needs to be restored, we just revert the PR with a click of a button
* all commits are reverted within that umbrella

### 6. example: empty pull request
* I have seen pull request been created **before** any work is done at all1

### 7. sources
* [What Is A Pull Request? - YouTube](https://www.youtube.com/watch?v=For9VtrQx58)
* <https://www.earthdatascience.org/workshops/intro-version-control-git/pull-request/>
