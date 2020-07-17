---
layout: post
title: git > caret ^ vs tilde~
categories: [alert]
---
## TOC
<!-- TOC -->

- [abstract](#abstract)
- [video](#video)
- [from stackOverflow](#from-stackoverflow)
    - [Mnemonics:](#mnemonics)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [sources](#sources)

<!-- /TOC -->

### abstract
The aim is documenting 

### video
### from stackOverflow
* Use ~ most of the time — to go back a number of generations, usually what you want
* Use ^ on merge commits — because they have two or more (immediate) parents

#### Mnemonics:

* Tilde ~ is almost linear in appearance and wants to go backward in a straight line
* Caret ^ suggests an interesting segment of a tree or a fork in the road

— <https://stackoverflow.com/a/2222920>

```
G   H   I   J
 \ /     \ /
  D   E   F
   \  |  / \
    \ | /   |
     \|/    |
      B     C
       \   /
        \ /
         A

A =      = A^0
B = A^   = A^1     = A~1
C = A^2
D = A^^  = A^1^1   = A~2
E = B^2  = A^^2
F = B^3  = A^^3
G = A^^^ = A^1^1^1 = A~3
H = D^2  = B^^2    = A^^^2  = A~2^2
I = F^   = B^3^    = A^^3^
J = F^2  = B^3^2   = A^^3^2
```

### 
### 
### 
### 
### 
### sources