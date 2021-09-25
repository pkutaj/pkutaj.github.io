## usecase
The aim of this page📝 is to give Python's illustration to the great rant of prof. Sussman about the dangers of inadvertent sharing in [SICP Lecture 5b: Computational Objects](https://youtu.be/yedzRWhi-9E?t=2936) 

<!-- TOC -->

- [1. notes](#1-notes)
- [2. links](#2-links)

<!-- /TOC -->

### 1. notes
> inadvertent sharing - unanticipated interactions between objects - is the source of many bugs in complicated programs - by introducing possibility of things having identity (assignment) and sharing and having multiple names for the same things we get a lot of power. but we have to pay for it with lots of complexity and bugs 

* sure this is the point in python as well - an example there is colon-copy, an idiomatic way of copying a list
* but it is a shallow copy, i.e. it can get tricky for e.g. lists (mutables) made out of lists (mutables)

```python
>>> l = [[1,2,3], [4,5,6]]      # OLD LIST
>>> l1 = l[:]                   # NEW LIST
>>> l1.append([7,8,9])          # <<< ALL GOOD - ONLY L1 MODIFIED
>>> l1
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
>>> l
[[1, 2, 3], [4, 5, 6]]
>>> l1[0].append(666)           # <<< OU SH1T - 666 LEAKED INTO L, TOO !
>>> l1
[[1, 2, 3, 666], [4, 5, 6], [7, 8, 9]]
>>> l
[[1, 2, 31, 666], [4, 5, 6]]
```

### 2. links
* https://youtu.be/yedzRWhi-9E?t=2936

