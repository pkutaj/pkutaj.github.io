---
layout: post
title: git > github actions & page build timeout
categories: [git]
---

### 1. abstract
The aim is documenting the github UI and mapping it to some of the real-life xp.

## TOC
<!-- TOC -->

- [1. abstract](#1-abstract)
- [2. actions](#2-actions)
- [3. issues](#3-issues)
- [4. PRs](#4-prs)
    - [4.1. push vs pull](#41-push-vs-pull)
- [5. sources](#5-sources)

<!-- /TOC -->


### 2. actions
* for this blog, the action action _Page build_ that is failing with timeout for the blog post on the worklog

![github_page]({{ site.url }}/assets/img001250.png)

![github_pages_finished]({{ site.url }}/assets/img001257.png)

### 3. issues
* issues are often tickets that are referred to in release notes 

![github_issues]({{ site.url }}/assets/img001266.png)


### 4. PRs 
* pull requests for merging branches

![github_pull_requests]({{ site.url }}/assets/img001268.png)

#### 4.1. push vs pull
* If you have a code change in your repository and want to move it to a target repository, then:
    * **PUSH** is **YOU forcing the changes in the TARGET REPOSITORY** with  `git push`
    * —> **push request** would be the **TARGET REPOSITORY requesting YOU** to push your changes already. 
    * **PULL** is the **TARGET REPOSITORY grabbing changes made by YOU** with `git pull` from the other repo
    * —> A **pull request** is **YOU requesting the TARGET REPOSITORY** to please check and grab my changes, I have finished the work.

### 5. sources