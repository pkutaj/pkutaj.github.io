---
layout: post
title: Compare Traditional and Enriched GitHub Workflows
categories: [git]
---
## usecase
The concern is documenting the difference between traditional and enriched github workflow as discussed in 

> https://www.pluralsight.com/courses/github-actions-getting-started

<!-- TOC -->

- [1. traditional](#1-traditional)
- [2. enriched](#2-enriched)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. traditional

![typical_workflow]({{ site.url }}/assets/img002524.jpg)

1. create a feature branch from master 
2. add commits
3. open pull requests → showcase changes to other team members
4. discuss and review commits, or, add more commits if needed
5. once ready, deploy changes to the master branch; run tests; checkout changes into prod
6. merge into master when all looks good and delete feature branch

### 2. enriched

![enriched_workflow]({{ site.url }}/assets/img002525.jpg)

1. add **branch protection** to our master branch
2. you can set up continuous integration  (CI)
3. add another **branch protection** to our pull request to require a review before it can be merged
4. setup **continuous deployment** to a cloud provider (AWS, GCP, Azure)
5. require specific tests to pass for confirmation
6. merge branch into the base branch

### 3. sources
* <https://www.pluralsight.com/courses/github-actions-getting-started>
