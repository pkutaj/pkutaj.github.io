---
layout: post
title: Programming > How to write amazing functions (podcast notes)
last_modified_at: 
---
## the case	
The question is the best practice of writing functions from the clean code perspective

* [Clean Code – How to Write Amazing Functions](https://www.codingblocks.net/podcast/how-to-write-amazing-functions/)

> All functions start as trees until you dwindle them to toothpicks

## toc
<!-- TOC -->

- [break functions into sections](#break-functions-into-sections)
- [the smaller function the better focus](#the-smaller-function-the-better-focus)
- [long name is better than a long comment](#long-name-is-better-than-a-long-comment)
- [on arguments (2 max)](#on-arguments-2-max)
- [either do or answer, not both](#either-do-or-answer-not-both)
- [on error handling](#on-error-handling)
- [don't duplicate code](#dont-duplicate-code)
- [readibility over shortness of code: always](#readibility-over-shortness-of-code-always)

<!-- /TOC -->

## findings
### break functions into sections
- AAAfunction
    - arrange 
    - act
    - assert - test result
- does not PS has something like this  ?
- unit tests are normally tenish lines

### the smaller function the better focus

### long name is better than a long comment
- if u have to write a super long comment in order to exolain what the function is doing, therew is something wrong

### on arguments (2 max)
- never more than 2
- there are scenarios where functions are ammended and you end up with 12 functions
- monadic - do this or don't do this

### either do or answer, not both
- don't mutate states

### on error handling
- prefer exceptions to err codes
- dude, sql server's sp
- it's dated
- try should be beginning
- catch is the very end
- error handling to one thing - 

### don't duplicate code
- DRY
- duplication leads to bugs if a piece of code gets changed and others not - often

### readibility over shortness of code: always




## terminology
*
 
## sources