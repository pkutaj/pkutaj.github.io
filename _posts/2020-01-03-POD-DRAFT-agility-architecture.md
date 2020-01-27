---
layout: post
title: CS > agility and architecture (podcast notes)
---
## the case	
the question is, what is Uncle Bob's take on the history of the architecture and design within the software engineering

## toc
<!-- TOC -->

- [(1980s-1990s) Era of Architecture](#1980s-1990s-era-of-architecture)
    - [Dominant Figure 1: Winston W. Royce](#dominant-figure-1-winston-w-royce)
        - [Sidenote: Generational Analysis](#sidenote-generational-analysis)
    - [Dominant Figure 2: Grady Bootch](#dominant-figure-2-grady-bootch)
    - [Dominant Figure 3: Ivar Jakobsen](#dominant-figure-3-ivar-jakobsen)
    - [Dominant Figure 4: The Gang of Four](#dominant-figure-4-the-gang-of-four)
- [(1995) The year of re-focus](#1995-the-year-of-re-focus)
- [dot com bubble](#dot-com-bubble)
- [MVC design pattern](#mvc-design-pattern)

<!-- /TOC -->

## findings
### (1980s-1990s) Era of Architecture
* In general, from the late 1970s until cca 1995, the dominant focus of software engineering is on design and architecture. 
* **The plan is the king** 
* The actual code ? ... an afterthought

#### Dominant Figure 1: Winston W. Royce
* the author of the Waterfall model that has dominated the industry from the publishing of the seminal **misunderstood** paper in the 1970 all the way until cca 1995

##### Sidenote: Generational Analysis
* the claim is that there has been a desperate demand for professionalism and disciplie caused by the arrival of the **2nd generation** of engineers 
    * the 1st generation has been mature professionals recruited from other disciplines with cca 50% female participation
    * the 2nd generation is 95% men in their 20s, fresh out of college without experience from the business world
#### Dominant Figure 2: Grady Bootch
#### Dominant Figure 3: Ivar Jakobsen
#### Dominant Figure 4: The Gang of Four
- object oriented analysis and architecturr by Grady Bootch
- chief scientist of Rational
-  vast dream of reusable code and framewaork
-  Ivar Jakobsen - Object Oriented Software Engineering. Use Case driven Approach
-  consultants arrived 
-  Design Patterns arrived - the most important book in the last 40 years
-  it perfectly documented OLD things and gave them names and canonical forms
-  24 common solutions to common provlems
-  Frederick Taylor told us that we need science in companies and changed the world - you plan and execute and measure and this is Tailorism
-  late 70s until 95 there is a change starting inside Design Pattern movemenr

### (1995) The year of re-focus
- 1995 James Complain writes a paper Process Patterns and architecture patterns.
- 1995 very first paper on Scrum
- 1998 Kent Beck preaches extreme programming (era of extreme sports)
- here test first thing 
- late 90s - Refactoring
- code is represented as malleable
- 2001 it all crosses - what is in common? from that there is 4 lines, lateer principles and later peooplew start signing it in 10000s
- 2001 Certified Scrum master course / movement and Agile is pushed into rampant acceptence - great marketing ploy and projecxt managers invade Agile. Famous.

- before; code was all DONE
- nowN FOWLER walks through the step of movinng code
- 1999: Extreme Programming Explained (Kent Beck)
- Focus on small and architectu
- re.
- Idea is nothing is designed and architectured. Idea is that design emerged. But this is crap
- No Agile person ever sasid no ufront design! The attack was on design phase

### .dot com bubble 
- for the first time a fear that there would not be work for programmers
- only a short period in early 2000s
- this is the time internet is growing like crazy
- platforms and frameworks came
- java, .net, ruby
- from there the focus is on frameworks without thinking about design and architecture, very antithetical development there
- architerture as a concept melted into platforms and frameworks
- this is from 2004-2011 
- web is just io device
- in the 60s - idea is io independence
- prograsmmer does not want to know what io is
- unix: standard in and standard out
- code needs to be independent from io device
- system should not know they are handled by the web
- web is not driving architectural 
- db is a bucket of bits
- why rdbms exist ? before the data was stored on a disk. architecture is painful. dbms is created to help you get data in and out of a disk
- data is structured during execution
- future: medium that is addressable like ram is. ssd
- db is an io device, the architecture should not chasnge much
- we are synthetising again design, architecture and thinking well about the structure
- Ivar Jakbsen made 3 objects
- interactor object - application specific business rule, 1 for each use case
- entity object, containing application- independent business rules
- boundary object (interfaces)

### MVC design pattern
- no 1 design pattern
- idea 7- every widget has an MVC
- they were tiny things
- M - business rule
- C - handles input
- V - registers with M, display output
- on the web there is no wall preventing code between the roles of object
- GUI should be a plugin into a business rule
- file / dll is a plugin - you can plug the gui in and keep them replacable
- db is also behind the boundary
- entity gateways have methods specifying queries. 


## terminology
*
 
## sources
* [Winston W. Royce on Wikipedia](https://en.wikipedia.org/wiki/Winston_W._Royce)
* [Theory of generations on Wikipedia](https://en.wikipedia.org/wiki/Theory_of_generations)