---
layout: post
title: programming > linked lists
categories: [programming]
---
## abstract

the aim is defining **list** essential for working with **lisp**

## toc
<!-- TOC -->

- [THEORY: on linked list](#theory-on-linked-list)
    - [history](#history)
- [family](#family)
- [structure](#structure)
    - [node](#node)
    - [node chains](#node-chains)
- [sources](#sources)

<!-- /TOC -->


### THEORY: on linked list
* linked list is a data structure

#### history
* developed by the first generation of engineers
* mid-50s at RAND corporation
* shortly afterwards, **LISP** was designed with linked lists at its core
    * LISP is **LIS**t **P**rocessor

### family
* list is a special kind of a more general structure called **GRAPH**
* tree is also a kind of **GRAPH**
* DAG is also a type of **GRAPH**

>... linked list has data in it's nodes — In fact from mathematical view a linked list is some sort of graph. The main difference between graph in general and linked list is that a node in linked list could at most have two pointers (one to its next and one to its previous node) but a node in graph could have more than two pointers.

### structure
#### node
* the element of the linked list
* 2 functions — 2 part structure
    1. mechanism to contain a piece of data — in data, value, payload
    2. means to connecting itself to other node via **OBJECT REFERENCE POINTER** — next pointer, next link

[node_2_functions]({{ site.url }}/assets/img000776.png)

#### node chains
* node stores value
* node contains also an object reference pointer
* the pointer is `null` when the node is constructed / instantiated
* you set the value of the pointer by assigning it to the desired node

![node_chain_essence]({{ site.url }}/assets/img000777.png)

![node_chain_code_example]({{ site.url }}/assets/img000778.png)

* I need a **TAG** for not-obvious, condensed, algorithmis, craftic, because – think excel again, there are references (addresses) that in managed languages are simply invisible and you cannot get the logic **FULLY VISUALIZED**

* I am wrapping my head around this in Excel

![excel_linked_list_structure]({{ site.url }}/assets/img000788.png)

* I am taking clues also from C++ non-managed, close-to-metal memos

![c++_linked_list_structure]({{ site.url }}/assets/img000789.png)

### sources
* [A Comprehensive Guide To Singly Linked List Using C++ - Codementor](https://www.codementor.io/@codementorteam/a-comprehensive-guide-to-implementation-of-singly-linked-list-using-c_plus_plus-ondlm5azr)
