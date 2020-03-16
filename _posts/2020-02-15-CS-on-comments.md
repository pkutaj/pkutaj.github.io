---
layout: post
title: Programming > CLEAN CODE > On Comments
categories: [programming]
---
## the case	
Notes from Uncle Bob's lecture on the role of comments in code

## toc
<!-- TOC -->

- [general](#general)
- [when are comments beneficial?](#when-are-comments-beneficial)
- [the rest is nonsense ?](#the-rest-is-nonsense-)
- [journal comments](#journal-comments)

<!-- /TOC -->

## findings
### general
* comments explain the purpose of code **if code is not explanatory**
* historically, this was not the case in Fortran
    * there was a limit to the length of bindings on name length - 6 chars for Fortran
    * in old Basic, it was even worse — 2 characters
    * ➔ great limitation to the semantic namings and characters were indeed needed
* **early books taught that comments are great**, they measured the number of comments
* today there is no such limitation, but many are still held by the old prejudice that comments signify quality and they are good and should be used as much as possible
* we have tools that allow code to explain itself
* rule: never talk about code that's somewhere else
* make code to speak for itself as much as possible and when to fail at that, use the comment

### when are comments beneficial? 
* compensate for the failure we cannot perfectly express yourself in code
* comment is a failure in expressivity
* comment is an unfortunate necessity
* IF you are adding an explanatory value to the name that is constrained by a canonical form (of a design pattern, for example)
* IF you are explaining what is the regular expression matching
* realize, code is rife with optical illusion

### ...the rest is nonsense ? 
* because comments lie
* they are painted in the color that's ignorable
* uncle bob has comments in bright red
* they have to be read and are not maintained
* there are 5 years old comments
* comment don't make up for the bad code
* clean it up, don't comment it
* don't be the boy who cries wolf
* commented out code is garbage
* for experiments, comment it out, but never ever check that in


### journal comments
- used before source control existed
- at the top of the source file

