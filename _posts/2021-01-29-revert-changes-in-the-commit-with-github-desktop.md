---
layout: post
title: revert changes in the commit with github desktop
categories: [git]
---
## usecase
The concern is documenting the GUI approach to a simple revert of a commit. I could not come up with an elegang git CLI solution, the easiest is to use the GUI of [GitHub Desktop](https://desktop.github.com/)

<!-- TOC -->

- [1. steps](#1-steps)

<!-- /TOC -->

### 1. steps 
* Find a commit youa want to revers

![find_a_commit_to_revert]({{ site.url }}/assets/img002507.jpg)

* Note: warning, this has to be a simple reversion (causing no breaking changes along the way) → know what you're doing here
* Right-click the commit → _Revert changes in commit_

![right_click_the_commit]({{ site.url }}/assets/img002511.jpg)

* A new commit is created automatically

![right_click_the_commit]({{ site.url }}/assets/img002512.jpg)

* Push → Done

