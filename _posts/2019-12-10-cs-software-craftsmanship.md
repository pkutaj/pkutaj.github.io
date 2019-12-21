---
layout: post
title: CS > Software Craftsmanship Notes
last_modified_at: 
---
## the case	
the puzzle is the conceptualization and history of software craftsmanship

## solution
As per Uncle Bob Martin, the idea is the responce to the invasion of project manager into the space defined by signatories of Agile Manifesto. The craftsmanship movement was intialized by programmers in 2009 as an outcry for the quality of work, it's conceptual roots being somewhere around the books The Pragmatic Programmer as well as [Software Craftsmanship: The New Imperative by Pete McBreen](https://www.goodreads.com/book/show/1035377.Software_Craftsmanship).

## notes

<!-- TOC -->

- [CRAFT = EDU + PRIDE](#craft--edu--pride)
    - [We who cut mere stones must always envision cathedrals](#we-who-cut-mere-stones-must-always-envision-cathedrals)
- [MANIFESTO FOR SOFTWARE CRAFTSMANSHIP](#manifesto-for-software-craftsmanship)
    - [... not only working software, but also well-crafted software](#-not-only-working-software-but-also-well-crafted-software)
    - [... not only responding to change, but also steadily adding value](#-not-only-responding-to-change-but-also-steadily-adding-value)
    - [... not only individuals and interactions, but also a community of professionals](#-not-only-individuals-and-interactions-but-also-a-community-of-professionals)
    - [... not only customer collaboration, but also productive partnership](#-not-only-customer-collaboration-but-also-productive-partnership)
    - [Craftsmen don't tolerate Bullshit (From Harry's Frankfurt On Bullshit (1986))](#craftsmen-dont-tolerate-bullshit-from-harrys-frankfurt-on-bullshit-1986)

<!-- /TOC -->

## sources

* [Episode 150: Software Craftsmanship with Bob Martin : Software Engineering Radio](https://www.se-radio.net/2009/11/episode-150-software-craftsmanship-with-bob-martin/)
* [Manifesto for Software Craftsmanship](http://manifesto.softwarecraftsmanship.org/)
* [Manifesto for Software Craftsmanship](http://manifesto.softwarecraftsmanship.org/)
* [On Bullshit](http://www2.csudh.edu/ccauthen/576f12/frankfurt__harry_-_on_bullshit.pdf)
* [The Bullshitter-in-Chief](https://www.vox.com/policy-and-politics/2017/5/30/15631710/trump-bullshit)

### CRAFT = EDU + PRIDE
- [PragProg` preface (1999)](https://pragprog.com/the-pragmatic-programmer/extracts/preface) has a section about about catedral builders

#### We who cut mere stones must always envision cathedrals

> The construction of software should be an engineering discipline. 
> However, this doesn’t preclude individual craftsmanship. 
> Think about the large cathedrals built in Europe during the Middle Ages. 
> Each took thousands of person-years of effort, spread over many decades. 
> Lessons learned were passed down to the next set of builders, who advanced the state of structural engineering with their accomplishments. 
>But the carpenters, stonecutters, carvers, and glass workers were all craftspeople, interpreting the engineering requirements to produce a whole that transcended the purely mechanical side of the construction. 
>It was their belief in their individual contributions that sustained the projects:

>"We who cut mere stones must always be envisioning cathedrals."
>—Quarry worker’s creed

>Within the overall structure of a project there is always room for individuality and craftsmanship. 
>This is particularly true given the current state of software engineering. 
>One hundred years from now, our engineering may seem as archaic as the techniques used by medieval cathedral builders seem to today’s civil engineers, while our craftsmanship will still be honored.

- discipline itself is enough
- no need to proceed into management: 
    - surgeon is surgeon for the lifetime, no need to become a director of a hospital. Quite the opposite

### MANIFESTO FOR SOFTWARE CRAFTSMANSHIP
- Elaboration of the [Manifesto for Agile Software Development (2001)](http://agilemanifesto.org/)
    - There are 4 main tenets of the manifesto:
    1. Individuals and interactions over processes and tools
    2. Working software over comprehensive documnetation
    3. Customer collaboration over contract negotiation
    4. Responding to change over following a plan

#### 1. ... not only working software, but also well-crafted software
- working software surely necessary ➔ well crafted works! it's extensible and maintable
- moreover, the state of disrepair of the codebase is hidden from the users

#### 2. ... not only responding to change, but also steadily adding value
- not just respond to change ➔ add value
- new features
- defect repair
- boy scout rule: when you leave the campground leave it cleaner than what you found

#### 3. ... not only individuals and interactions, but also a community of professionals
- community ➔ old school idea that craftsmaship is not academical, but mainly tutor-based 
- responsibility for the next generation 

#### 4. ... not only customer collaboration, but also productive partnership
- not being just executioners of the request
- bound by the need of the customer
- focus is on the domain ➔ help make system appropriately 
- basically, don't tolerate bulshit even if it's coming from the one paying you

#### Craftsmen don't tolerate Bullshit (From Harry's Frankfurt On Bullshit (1986))

```plaintext
Wittgenstein once said that the following bit of verse by Longfellow could serve him as a motto:

   In the elder days of art
   Builders wrought with greatest care
   Each minute and unseen part,
   For the Gods are everywhere.
   
The point of these lines is clear. In the old days, craftsmen did not cut corners.
They worked carefully and they took care with every aspect of their work. 
Every part of the product was considered, and each was designed and made to be exactly as it should be. 
These craftsmen did not relax their thoughtful self-discipline even with respect to features of their work which would ordinarily not be visible. 
Although no one would notice if those features were not quite right, the craftsmen would be bothered by their consciences. 
So nothing was swept under the rug. 
Or, one might perhaps also say, there was no bullshit.
```