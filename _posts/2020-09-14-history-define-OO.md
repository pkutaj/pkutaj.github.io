---
layout: post
title: history > define OO
categories: [history]
---
## usecase
The concern is documenting the discussion that has followed the provocative tweet by Uncle Bob 

> OO is not a mindset, nor a philosophy, nor a technique for modeling "the real world".  
> It is nothing more, nor less, than 
> data structures manipulated by ASSOCIATED FUNCTIONS 
> and these associated functions are called INDIRECTLY 
> the indirection is implemented through through VECTORS  
> Deal with it.

<!-- TOC -->

- [1. Simula](#1-simula)
- [C++](#c)
- [Smalltalk](#smalltalk)
- [Last words](#last-words)

<!-- /TOC -->

### 1. Simula
- OO defined by ALLAN KEY 
- definition derived from the work of OLE-JOHAN DAHL AND KRISTEN NYGAARD who invented the concept 
- ... almost by accident
- they were fiddling around wit ALGOL60 and trying to simulate ships going in and out od the fjords of Norway
- they decide: there is this new thing we could do with ALGOL60 
- we can move this left data structure from the stack to the heap 
- then functions that we call could RETURN -> but, at the same time, we get to keep all the local variables that were on the heap 
- then we could invoke all the subfunctions of that function 
- objects were born out of that insight
- and then they went oon to invent the languae SIMULA67
- that gave the words CLASS, PUBLIC, PRIVATE

### C++
- BJARNE STROUSTRUP took that and converted C into Simula and came up with C++ (first called _C with Classes_)

### Smalltalk
- KAY who looked at SIMULA, created Smaltalk and coined the term OO
- he defined is technically: it is about encapsulation, message passing and late binding
- OO is technical

### Last words
- ineritance was there since Simula 
- Smalltalk had a different approach as it was dynamic - not used much in Python, Ruby, etc.
- Java finally said - inheritance is terrible and invented a hack of interface and C# took it
- Design Pattern says don't use inheritance                                                                                         
