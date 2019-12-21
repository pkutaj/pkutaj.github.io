---
layout: post
title: CS > Craftsman Oath (lecture notes)
---

## THE CASE	
notes from Uncle Bob's lecture on ethos within the sw craftsmanship's movement

## SOLUTION
9 rules, 9 principles 


- [-1. no harm](#-1-no-harm)
- [-2. do your best; no shit-spreading](#-2-do-your-best-no-shit-spreading)
- [-3. produce proper tests](#-3-produce-proper-tests)
- [-4. release small, meaningfully, frequently](#-4-release-small-meaningfully-frequently)
- [-5. continuously clean your code](#-5-continuously-clean-your-code)
- [-6. protect productivity levels](#-6-protect-productivity-levels)
- [-7. be a team-member](#-7-be-a-team-member)
- [-8. give honest estimates and no false promises](#-8-give-honest-estimates-and-no-false-promises)
- [-9. learn, learn, learn, teach](#-9-learn-learn-learn-teach)

### sources

* [Uncle Bob Martin - The Craftsman's Oath - SCLConf 2018 - YouTube](https://www.youtube.com/watch?v=17vTLSkXTOo)


### -1. no harm
> I will not produce harmful code

- what is harmful? 
- who to harm? 
- society - how many computers are in the world at the moment and what is the pace of deployment
- hundreds of billions?
- book: turinng's cathedral
- book: there is a book by medieval scholar about craft
-  largest hurt so far: vw scandal - it was a couple of sw devs who did it for whatever reason and whether they were told to do it **is irrelevant**
-  software can be hurt itself by "getting hard", by getting more difficult to change its behaviour and to maintain it
-  deadlines don't aleviate the need not to harm

### -2. do your best; no shit-spreading
> the code I produce will always be may best work. I will not knowingly allow defective code to accumulate

- broken window theory
- best work that I can means going over the code all the time. craft it. apply disciplines to the work I do. circling and improving, staying with it
- NOT TO: get it to work and put in wuarantine and don't touch it anymore. 
- once you got it to the way it behaves - how can I make it better? how can I make it robust ? 
- getting code to work is actually the easy part
- the hard piece is to make te code explanatory, readable, newspaper-like
- always clean what you write and works

### -3. produce proper tests
> I will produce with each release a quick, sure, repeatable proof that every element of the code works as it should

- this should go without saying
- hoiw do we know it works? 
- we write tests!
- analogy with accountants - TDD is our answer to the discipline of double entry bookkeeping
- 0 tests failed should be on a  "balance sheet"

### -4. release small, meaningfully, frequently
> I will make frequent small releases as not to empede the progress of others

- check in code daily, hourly
- NOT after months
- more than just code
- requirements, documentation, everything
- of everything, because that is the only way to get feedback
- before - comprehensive docs were required in the waterfall regime
- this is the only way to get feedback - small frequent releases
- courage - comm/honesty - simplcty - feedback

### -5. continuously clean your code
> i will fearlessly and relentlesly improve our work and I will never allow code to degrade

- fight degradation
- software can rot, getting worse and worse with time
- how is this ? 
- why do we rot the code?
- we don't touch rotten code - if you touch it, you own it. we don't touch it. 
- so we go into it when we absolutely must and spend the least possible time there
- rotten code is mysterious - what happens if you change that line...
- there are shadowy, creeping dependencies
- solution is getting rid of the fear
- how? with a suite of tests that you trust, really trust
- if you have tests, cleaning is easier and natural
- why don't you have those tests?
- are u making it better or worse

### -6. protect productivity levels
> I will  do all that I can to keep the productivity as high as possibly and to nothing to decrease it

- decrease? omit writing tests
- don't write tests after the fact       
- you need to build testable system
- test suites with holes in it unreliable
- test suite needs to allow decision when it passes - ship; you haven't broken it hj                                  
- write messy code

### -7. be a team-member
> i will continually ensure that others cover for me and that i will cover for them

- team behaves like a sports team
- if someone falls, the situation on the fields changes, the team covers
- are we a team? covering for each other ?
- if bill is not here, can't do a thing ?
- don't allow silos to block you
- work with each other
- write code together in environment what u work together
- pair programming - fundamental reasonm behinf this practice is that we can cover each other

### -8. give honest estimates and no false promises
> i will produce estimate that are as realistic as possible and don't give promises without certainty

- estimates have to be honest and accurare as possible
- what is the most accurate estimate? i don't know
- this is not useful, however
- add, i don't know, but...
- shape IDK with
- optimistic, realistic, pessismistic and combine with experience
- don't promise, don't play the funny game "i'll ship in 3 weeks" when there IS uncertainty
- devs lie a lot when it comes to estimates, devs are not decs necauser

### -9. learn, learn, learn, teach
>i will never stop learning and improving my craft

- first impetus is 1999 book sw craftsmanship
- medieval model of getting seniority
- modern model is an academic one
- but universities are NOT equipped to produce high quality developers
- why ? 
- professors have never worked professionaly in software
- the technique is continuous learning on the job
- the best way to learn anything is to teach it
- best teachers are 1 day ahead from their students