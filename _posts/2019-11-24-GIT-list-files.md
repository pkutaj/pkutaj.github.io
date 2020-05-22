---
layout: post
title: GIT > show list of commited files
categories: [git]
---
## overview
The concern is to document listing commited files to pinpoint the error I made.
Scenario: mistakenly commiting `gemfile.lock` breaking my blog without any build error on github pages. 

## toc
<!-- TOC -->

- [(1) git log](#1-git-log)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) git log
```
git log --name-status --oneline

16574a4 (HEAD -> master, origin/master) gen > delete gemfile.lock
D       Gemfile.lock
M       _config.yml
200bde2 asset -U
A       assets/img000974.png
e7c03df applications > VSC shortcuts -U analytics
M       _posts/2020-04-15-vsc_shortcuts.md
66dc240 history > craftsmanship -U
M       _posts/2019-12-10-software-craftsmanship.md
e9bb555 gen > blog from VSC -U > button
M       _posts/2019-11-01-blog-from-vsc-via-github-pages.md
7ed99f1 history > languages 1980-2010
A       _posts/2020-05-21-history-languages-1980-2010.md
031c9d3 gen > button size decrease + centering
M       assets/main.scss
6ac9859 gen > implement  button
A       _includes/buttons.html
M       _layouts/post.html
a185882 assets -U 2020-05-21
M       assets/2020-05-19.js
M       assets/2020-05-19.test.js
A       assets/2020-05-20_uncle_bob_on_languages_1980_2010.mp3
A       assets/img000959.png
A       assets/img000960.png
A       assets/img000961.png
A       assets/img000962.png
A       assets/img000963.png
A       assets/img000964.png
A       assets/img000965.png
M       assets/main.scss
727b9a6 PS > service family
A       _posts/2020-05-20-PS-service-family.md
```
### sources