## usecase
The aim of this page📝is to handle 2 ways to remove an item from a python list (applicable to other collections as well). 

<!-- TOC -->

- [1. remove by index: del keyword](#1-remove-by-index-del-keyword)
- [2. remove by value: remove()](#2-remove-by-value-remove)

<!-- /TOC -->

### 1. remove by index: del keyword
* use the `del <object>[<index>]` keyword

```
del a_list[index]
```

```python
>>> l = "I like Icecream a Lot"
>>> l = "I like Icecream a Lot".split()
>>> l
['I', 'like', 'Icecream', 'a', 'Lot']
>>> del l[3]
>>> l
['I', 'like', 'Icecream', 'Lot']
>>>
```

### 2. remove by value: remove()
* use the `remove(<value>)`
* note that it removes the first instance of the value


```
>>> l.remove('like')
>>> l
['I', 'Icecream', 'Lot']
```

* this is the same as

```
>>> del l[l.index('like')]
```
