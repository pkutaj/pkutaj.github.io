---
layout: post
title: Regex Kata — Remove Whitespace in Markdown Hypertext
categories: [regex]
---
## usecase
The concern is documenting the need to remove whitespace with regex

![regex_kata]({{ site.url }}/assets/img002436.jpg)

<!-- TOC -->

- [1. solution](#1-solution)

<!-- /TOC -->

### 1. solution
* some people dislike regex for its conciseness and lack of expressive power but once I got used to it, I see problems and solutions in unusual places!


STEP#   | CODE | COMMENT
--------|------|-----------------------------------------------
FIND    |      |
01      | `(`  | open capture group
02      | `\w` | any part of the word
03      | `)`  | close capture group
04      | `\s` | followed by whitespace
05      | `+`  | one or more instances of whitespace
06      | `\]` | followed by closing square bracket `]`
REPLACE | ``   |
07      | `$1` | letter captured with capture group
08      | `]`  | immediately followed by closing square bracket

* find: `(\w)\s+\]`
* replace with `$1]`

![regex_kata_solved]({{ site.url }}/assets/img002435.gif)
