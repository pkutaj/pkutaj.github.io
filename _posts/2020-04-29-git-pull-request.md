---
layout: post
title: git > pull request
categories: [pull request]
---
## the case	of pulling
the question is, what pull request means, the difference of pushing and pulling and the overal common sense

## toc
<!-- TOC -->

- [push vs pull](#push-vs-pull)
- [the rational of the pull request process](#the-rational-of-the-pull-request-process)
- [sources](#sources)

<!-- /TOC -->

## findings

### push vs pull
If you have a code change in your repository, and want to move it to a target repository, then:

* **PUSH** is **YOU forcing the changes in the TARGET REPOSITORY** with  `git push`
* ➔ **push request** would be the **TARGET REPOSITORY requesting YOU** to push your changes already. 
* **PULL** is the **TARGET REPOSITORY grabbing changes made by YOU** with `git pull` from the other repo
* ➔ A **pull request** is **YOU requesting the TARGET REPOSITORY** to please check and grab my changes, I have finished the work.

### the rational of the pull request process
* this happens on projects where you are not the lone dev
* pull request is also a request to **REVIEW** the change (two set of eyes principle)
* only afterward it can be implemented and released
* pull request is a process of **RECONCILLIATION** of changes you've made with changes made by others on the codebase

### sources
* [What Is A Pull Request? - YouTube](https://www.youtube.com/watch?v=For9VtrQx58)