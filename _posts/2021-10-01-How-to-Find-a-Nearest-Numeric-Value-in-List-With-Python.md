## usecase
The aim of this page📝 is to show a small function that accepts a list and an integer and returns a closest number from the list to the given value. 

* type hints
* [Naming Conventions From Uncle Bob's Clean Code Philosophy](https://dzone.com/articles/naming-conventions-from-uncle-bobs-clean-code-phil)
* [Lambdas In Python](https://pavolkutaj.medium.com/lambdas-in-python-bd8961f864eb)
* no assignment statements
* see [the official docs](https://docs.python.org/3/library/functions.html#min) for the proper explainer of `min` function
* see [Kite's docs](https://www.kite.com/python/answers/how-to-find-the-nearest-value-in-a-list-to-a-given-one-in-python) for another, more liberal approach
* the point is that the min function accepts a keyword `key` parameter that accepts a function with 1 param
* this param is an item from the iterable (item from a list)
* the `key=function` is a so called mapping function that transforms each item within a list as per our needs 
* here is returns an absolute value of a difference between a given value and each list item

```
list = [1,5,6,10]
given_number = 7

abs(1-7)  -> 6
abs(5-7)  -> 2
abs(6-7)  -> 1 -> min -> this item is desired -> 6 #RESULT
abs(10-7) -> 3
```



<!-- TOC -->

- [1. code](#1-code)
- [2. links](#2-links)

<!-- /TOC -->

### 1. code

```python
def find_nearest(l:list, n:int) -> int:
    return min(l, key=lambda i: abs(i-n))

>>> find_nearest([1,5,6,10], 7)
6
```

 
### 2. links
* [How to find the nearest value in a list to a given one in Python](https://www.kite.com/python/answers/how-to-find-the-nearest-value-in-a-list-to-a-given-one-in-python)
* https://docs.python.org/3/library/functions.html#min
