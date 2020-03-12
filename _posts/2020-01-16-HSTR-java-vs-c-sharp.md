---
layout: post
title: History > The Birth of Java as a marketing ploy (podcast notes) ? 
---
## the case	
the question is the situation out of which Java (and eventually, C#, and, even if only etymologically — JavaScript) was born in the early 1990s. 
the notes are from 
* [The History of Java with Todd Sundsted - Internet History Podcast](http://www.internethistorypodcast.com/2018/04/the-history-of-java-with-todd-sundsted/)
* Uncle Bob's Clean Code session

## toc
<!-- TOC -->

- [the birth of java as a marketing ploy ?](#the-birth-of-java-as-a-marketing-ploy-)
- [why did java make it ?](#why-did-java-make-it-)
- [(1990s) the political context and hegemony of Bill](#1990s-the-political-context-and-hegemony-of-bill)
- [(1990s) the rapid evolution of Java](#1990s-the-rapid-evolution-of-java)
- [(2006) change with ruby](#2006-change-with-ruby)
- [(2020) and onwards ?](#2020-and-onwards-)

<!-- /TOC -->

## findings
### the birth of java as a marketing ploy ?
* Java was invented by James Gosling, the work started in 1991 on a completely unrelated project (interactive TV code)
* Java 1.0 was released in 1996

![james_gosling]({{ site.url }}/assets/2020-01-09-james-gosling.jpg)

* James Gosling worked at Sun Microsystems at contract programming division and they got a contract to write a code for a cable television set top box (interactive tv)
* Sun was dedicated to c++ at the time, all this was supposed to be written in c++
* Gosling hated c++ and decided he would write his own language called **oak** (after oak)
* He got all the work and language went into garbage bin where it stayed for some time and would stay there except for the accident of history
    - Sun was a hardware company; they were selling hardware big time
    * their marketing scheme was about selling hardware
    * they realized that the best way to sell hardware is to **win the programmers**, not CEOs, not boards. this is the first time this has been realized. programmers influence the executives
    * Sun wanted to win the programmers by giving them **the language of the internet**
    * ... and decided they would give them the old **oak** taken out from the garbage can, but name should be something stimulating
    * and they won the heart and mind of the programming
    * **Java was created as a marketing tool**, it's a manipulative event
    * ... C# was born out of Java (initially called J++ until Sun sued Microsoft, more about later)

- **simultaneous** with Internet (Netscape), Javascript, Windows95
- Java was a step to build a hardware platform
- The web shows up - and Java people got interested
- And devs picked it up because of simplicity
- what was there at the time: scheme, lisp and dynamic oriented languages like smalltalk
- plus C and C++ system oriented; this was where the actual things got done - but there were issues, like memory management. 
- Leaks are easy to find. here there is a **bunch of system stuff** in addition to business logic you have to write

### why did java make it ?
- it struck a cord because of what they took out
- c++ was thought to be the forward thinking language
- this is where java started and then pieces were took out
- the removal was settinng the footprint
- plus add vm and memory management
- but it was not as expressive as c++ (templates) or functional composition, no strong type resolver
- they included threading library
- included network library out of the gate
- in scheme, networking was not the first thing
- removed really clutter

### (1990s) the political context and hegemony of Bill 
- everybody is afraid of Bill
- there is no Google, no Apple, no Amazon, no Facebook
- Microsoft was the freaking company pushing even IBM out of the picture
- and they had a particular point of view of how things should go; e.g. what web should look like (not html, pishing blackbird)
- people were saying: don't start a company, microsoft will eat you right away
- Netscape supports 1st Java in their browser
- there is a community process to help define evolution of product going forward with the collection of companies supporting it
- released as ECMA standard

### (1990s) the rapid evolution of Java
- alpha is early 1995
- adopted ridiculously quick
- timing was a big deal
- promise of interactivity at the browser more than js
- notion of being able to build simpler application software
- applets never made it in the 90s - but the secession from desktop was in the air
- 1998 and sun is already claiming that computation should be in the cloud
- eventually, sun got clobbered with .dotcom bubble and linux ate their cake on the server side 

### (2006) change with ruby
- until then java was dominant
- this, with the in vasion of project managers into agile space is another inflexion point

### (2020) and onwards ?
- embedded in the world
- java as a language may be downplayed
- but ecosystem achieved its vision even though not the only child on the block
- falling on popularity, relatively losig ground to javascript that is ironically named after java
- still, if you need a decent sized team with experience (200 engineers) to build a large applivcation you have java or ms stack
- proven that managed environment wins
- proved that lot of important problems can be solved with simpler languages
- go is inspired by java 
- lesson is that syntax absolutely matters
- lesson is where object orientation works and where is does not (scala took off)