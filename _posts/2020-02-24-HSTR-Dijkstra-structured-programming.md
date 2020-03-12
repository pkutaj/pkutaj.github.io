---
layout: post
title: History > On Edsger Dijkstra and Structured Programming
---
## the case	
the question is the birth of the structured programming paragidm, as presended by [uncle bob](https://youtu.be/SVRiktFlWxI?t=7561)

![edsgar_dijkstra]({{ site.url }}/assets/img000504.png)

— Edsger W. Dijkstra (1930-2002) hero of the **first generation of programmers** 

## toc
<!-- TOC -->

- [(1968): Go-To considered harmful](#1968-go-to-considered-harmful)
- [Why harmful?](#why-harmful)
- [xkcd explanation](#xkcd-explanation)
- [sources](#sources)

<!-- /TOC -->

## findings
* Created Structure Programming
* Dutch, fisrt programmer in the Netherlands
* he saw the very first computer in Netherlands and fell in love with it
* wanted to do nuclear physics and when raising doubts to his advisor about the absolute absence of formalized knowledge about computing, he told him to go and create those rules and knowledge
* this is 1950s when he studies

### (1968): Go-To considered harmful
* in that time, the goto statement was widely used
* an article was published under the name _Letter to the editor: The goto statement considered harmful_
* famous note causing an uproar in the software community
* in those days languages have go to statement as a conventional way to get things done
* world went nuts for 5 years...
* ...result: `goto` statements are not used anymore

### Why harmful?
* Djikstra want software to be a branch of mathematics
* he wants postulates same as there are Euclidian postulates on geometry, to be proven true
* we would write applications by writing well proven theorems and writing little lambdas to adapt them to the needs of the service
* there would be a library of theorems - of proven software and we would build atop of that
* his work was going through software and proving it mathematically correct
* results: you can write a mathematical proof for two sequential lines
* you can write a more complicated proof for an if statement
* to prove a loop correct, you need an induction, even more complicaated
* observation: there are algorithms **that cannot be proven correct** and these that have **unrestrained goto**
    * this goes back to the halting problem of 1936 - there are algorithms that cannot be proven correct
* another observation by assertion of that time: every algorithm can be composed of just 3 elements: sequence, selection (if), iteration(loop)
* that means; go-to is not there, write in these three structures
* his vision for software having a superstructure in a way geometry **failed**
* what do we have? not mathematics, but another branch of knowledge — **science**
* science cannot be proven correct, only false (Karl Popper's Logic of scientific inquiry)
* software is like science, not proven it correct we are surrounding with so many tests that prove that it's not false yet, not failing

### xkcd explanation
* great thanks to <https://stackoverflow.com/a/46789/11082684> for this

![velociraptors prey on the week]({{ site.url }}/assets/img000516.png)


### sources
* [uncle bob presentation of the origins of structured programming](https://youtu.be/SVRiktFlWxI?t=7561)
* [Dijkstra's Rallying Cry for Generalization](https://www.dijkstrascry.com/)
* [language agnostic - GOTO still considered harmful? - Stack Overflow](https://stackoverflow.com/questions/46586/goto-still-considered-harmful)