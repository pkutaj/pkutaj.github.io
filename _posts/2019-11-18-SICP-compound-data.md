---
layout: post
title: CS > Compound Data (SICP, lecture 3)
last_modified_at: 2019-11-18
---
## the case	
the question is, 

## toc
<!-- TOC -->

- [recap](#recap)
- [layered-system](#layered-system)
    - [example: square-root procedure](#example-square-root-procedure)
- [what about layered-system not in procedures, but in data ?](#what-about-layered-system-not-in-procedures-but-in-data-)

<!-- /TOC -->

## findings
### recap
* up to now, talking about procedures
* structurally
    * primitive things built-in
    * means of combination ➔ complicated things out of primitive
    * means of abstraction ➔ named things as building blocks
    * higher order procedures ➔ methods of doing things

### layered-system
* the crucial idea is to **separate**
    * the task of building things
    * from the task of implementing the parts
* you will use this over and over and over in implementing procedures

#### example: square-root procedure
* if you use square root procedure called _square root_
* within the procedure another proecedure is used called _good enough_ 
* betweem them there is an abstraction boundary
    * make contract with "george" that his job it is to write _good enough_ and we don't care about the details of _good enough_

### what about layered-system not in procedures, but in data ?
* key idea again is to build system in layers
* to isolate lower layers from the higher layers
* we don't care about lower layers

## terminology
* abstraction boundary
* compound data
* layered system
 
## sources  