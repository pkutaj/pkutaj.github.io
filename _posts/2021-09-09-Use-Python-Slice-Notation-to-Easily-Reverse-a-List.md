git ## usecase
The aim of this explainer💡 analyzes the reversion of a Python list using slicing `[::-1]` notation combining notes from StackOverflow and LeetCode. 

<!-- TOC -->

- [1. instructions](#1-instructions)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. instructions
* slicing syntax in general utilizing half-open range

```
[ <first element to include> : <first element to exclude> : <step> ]
```

* positive int in `<steps>` is the size of increment from the left to the right of a list
* negative int in `<steps>` is the size of increment from the right the left of a list (reversed iteration)
* only the first column is really required, all of the other fields can be empty
* therefore, to make a copy of the list (aka "colon copy")

```
>>> l = [1,2,3,4]
>>> l[:]
[1, 2, 3, 4]
```

* to iterate in a reverse order

```
>>> l[::-1]
[4, 3, 2, 1]
```

* When you use a negative index as either `<first element to include>` or `<first element to exclude>` it is indexing from the back of the list, so `-1` is the last element, `-2` is the second to last element, etc. 

```
>>> l[-1:]
[4]
```

* to iterate over 2 items in a reversed order:

```
>>> l[::-2]
[4, 2]
```

* therefore to reverse an integer, including validation method against overflow is easy

```python
class Solution:
    def reverse(self, x: int) -> int:  
        if x > 0:  # handle positive numbers  
            a =  int(str(x)[::-1])  
        if x <=0:  # handle negative numbers  
            a = -1 * int(str(x*-1)[::-1])  
        # handle 32 bit overflow  
        mina = -2**31  
        maxa = 2**31 - 1  
        if a not in range(mina, maxa):  
            return 0  
        else:  
            return a
```
 
### 2. sources
* https://leetcode.com/problems/reverse-integer/solution/258298
* https://stackoverflow.com/a/5877008/11082684
