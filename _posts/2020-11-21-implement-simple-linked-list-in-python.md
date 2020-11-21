---
layout: post
title:
categories: []
---
## usecase
The concern is documenting

<!-- TOC -->

- [1. node](#1-node)
- [2. linking](#2-linking)
- [3. on terminology: git confuses me](#3-on-terminology-git-confuses-me)
- [4. manipulation methods](#4-manipulation-methods)
- [5. attach to host process](#5-attach-to-host-process)
- [6. trace module](#6-trace-module)
- [7. debugger visualized](#7-debugger-visualized)
    - [7.1. head node-1](#71-head-node-1)
    - [7.2. notes on stateful nature of this algorithm](#72-notes-on-stateful-nature-of-this-algorithm)
    - [7.3. node-2](#73-node-2)
    - [7.4. tail node-3](#74-tail-node-3)
- [8. to make matters complicated: python is calling by object reference ?](#8-to-make-matters-complicated-python-is-calling-by-object-reference-)
- [9. sources](#9-sources)

<!-- /TOC -->

### 1. node
* self-explanatory

STEP# | CODE                     | COMMENT
------|--------------------------|------------------------------------------------------------------------------
01    | `class Node:`            | define class with name `Node`
02    | `..def __init__(self,..` | const for class - define constructor function
03    | `....data,`              | define `data` parameter
04    | `....next=None`          | define `next` parameter with `null` value
05    | `self.data = data`       | assign the passed value to the `data` property
06    | `self.next = next`       | assigh the `None` value to the `next` property of the class
07    | `first = Node(3)`        | initiaze a new object `first` from the class `Node` with the data value `3`..

```python
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next
firstNode = Node(3)
vars(firstNode)
{'data': 3, 'next': None}
```

### 2. linking
* nodes contain 2 primitives: 
    * data  — with values assigned within the constructor
    * pointers — with `None` withing the constructor; the link will happen **later**
* you join data with the help of pointers that under the hood contain memory addresses of the next node
* create a `LinkedList` class with a single `head` pointer

### 3. on terminology: git confuses me
* HEAD of the linked list does not move
* this is different from the HEAD of git, which is actually a TAIL, correct ? 
* ... because git is also using the concept of the list (or DAG to be more precise)
* open question

### 4. manipulation methods

STEP# | CODE                         | COMMENT
------|------------------------------|--------------------------------------------------------------------------------------------------------
01    | def __init__(self):          | constructor, no arguments
02    | ..self.head = None           | create an empty `head` property (the essence)
03    | def insert(self, data):      | define insert method, with `data` argument
04    | ..newNode = Node(data)       | ..bind a new `Node` with the passed `data` to the `newNode`
05    | ..if(self.head):             | ..predicate: if `head` is not `None` → if head is truthy
06    | ....current = self.head      | ....bind the `head` node (consisting of data and next properties) → `current` variable
07    | ....while(current.next):     | ....while `current.next` part of the node is not falsy / `None`, i.e. until you reach the **TAIL** node
08    | ......current = current.next | ......bind the value of the `next` pointer to `current`
09    | ....current.next = newNode   | once **TAIL** is reached,
10    | ..else:self.head = newNode   | ..alternative: assign `newNode` to the head node

```python
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        newNode = Node(data)
        if(self.head):
            current = self.head
            while(current.next):
                current = current.next
            current.next = newNode
        else:
            self.head = newNode

    def printLL(self):
        current = self.head
        while(current):
            print(current.data)
            current = current.next
```


### 5. attach to host process
* in a terminal, run python script.py
* verify that "Hello" gets periodically printed in the debug console
* start a debug session using the "Attach to Process" config
* verify that it connects (e.g. no error, breakpoints work)

### 6. trace module
* module allowing me to visualize the concept and therefore a very useful learning tool
* the following is so truth for understanding the basic concepts of programming 

> Visualization helps us “see” and “understand” information in new ways. 
> Visualization taps into the human visual system (“our eyes”). 
> It improves our confidence - we can “see” trends and discover surprises in data. 
> And we can more easily and intuitively communicate to any audience. 
> It’s not surprising that we rely on charts, graphs and maps to make sense of the world.

— from <https://observablehq.com/@observablehq/why-were-building-observable>

```
python -m trace --trace LinkedList.py
```

```python
"""01""" class Node:
"""02"""     def __init__(self, data, next=None):
"""03"""         self.data = data
"""04"""         self.next = next
"""05""" 
"""06""" 
"""07""" class LinkedList:
"""08"""     def __init__(self):
"""09"""         self.head = None
"""10""" 
"""11"""     def insert(self, data):
"""12"""         newNode = Node(data)
"""13"""         if(self.head):
"""14"""             current = self.head
"""15"""             while(current.next):
"""16"""                 current = current.next
"""17"""             current.next = newNode
"""18"""         else:
"""19"""             self.head = newNode
"""20""" 
"""21"""     def printLL(self):
"""22"""         current = self.head
"""23"""         while(current):
"""24"""             print(current.data)
"""25"""             current = current.next
"""26""" 
"""27""" 
"""28""" LL = LinkedList()
"""29""" LL.insert(3)
"""30""" LL.insert(4)
"""31""" LL.insert(5)
"""32""" LL.printLL()
```

* this is the execution


LL = LinkedList()                              | LL.insert(3)                                       | LL.insert(4)                                          | LL.insert(5)                                              | LL.printLL()
-------- ---------------------------------------|----------------------------------------------------|-------------------------------------------------------|-----------------------------------------------------------|------------------------------------------------------
LinkedList.py(28): LL = LinkedList()           | LinkedList.py(29): LL.insert(3)                    | LinkedList.py(30): LL.insert(4)                       | LinkedList.py(31): LL.insert(5)                           | LinkedList.py(32): LL.printLL()
--- modulename: LinkedList, funcname: __init__ | --- modulename: LinkedList, funcname: insert       | --- modulename: LinkedList, funcname: insert          | --- modulename: LinkedList, funcname: insert              | --- modulename: LinkedList, funcname: printLL
LinkedList.py(9):         self.head = None     | LinkedList.py(12):         newNode = Node(data)    | LinkedList.py(12):         newNode = Node(data)       | LinkedList.py(12):         newNode = Node(data)           | LinkedList.py(22):         current = self.head
                                               | --- modulename: LinkedList, funcname: __init__     | --- modulename: LinkedList, funcname: __init__        | --- modulename: LinkedList, funcname: __init__            | LinkedList.py(23):         while(current):
                                               | LinkedList.py(3):         self.data = data         | LinkedList.py(3):         self.data = data            | LinkedList.py(3):         self.data = data                | LinkedList.py(24):             print(current.data)
                                               | LinkedList.py(4):         self.next = next         | LinkedList.py(4):         self.next = next            | LinkedList.py(4):         self.next = next                | 3
                                               | LinkedList.py(13):         if(self.head):          | LinkedList.py(13):         if(self.head):             | LinkedList.py(13):         if(self.head):                 | LinkedList.py(25):             current = current.next
                                               | LinkedList.py(19):             self.head = newNode | LinkedList.py(14):             current = self.head    | LinkedList.py(14):             current = self.head        | LinkedList.py(23):         while(current):
                                               |                                                    | LinkedList.py(15):             while(current.next):   | LinkedList.py(15):             while(current.next):       | LinkedList.py(24):             print(current.data)
                                               |                                                    | LinkedList.py(17):             current.next = newNode | LinkedList.py(16):                 current = current.next | 4
                                               |                                                    |                                                       | LinkedList.py(15):             while(current.next):       | LinkedList.py(25):             current = current.next
                                               |                                                    |                                                       | LinkedList.py(17):             current.next = newNode     | LinkedList.py(23):         while(current):
                                               |                                                    |                                                       |                                                           | LinkedList.py(24):             print(current.data)
                                               |                                                    |                                                       |                                                           | 5
                                               |                                                    |                                                       |                                                           | LinkedList.py(25):             current = current.next
                                               |                                                    |                                                       |                                                           | LinkedList.py(23):         while(current):
                                               |                                                    |                                                       |                                                           |


```html
python -m trace --trace .\LinkedList.py
<!-- functions -->
 --- modulename: LinkedList, funcname: module
LinkedList.py(1): class Node:
 --- modulename: LinkedList, funcname: Node
LinkedList.py(1): class Node:
LinkedList.py(2):     def __init__(self, data, next=None):
LinkedList.py(7): class LinkedList:
 --- modulename: LinkedList, funcname: LinkedList
LinkedList.py(7): class LinkedList:
LinkedList.py(8):     def __init__(self):
LinkedList.py(11):     def insert(self, data):
LinkedList.py(21):     def printLL(self):
<!-- call1: object instantiation -->
LinkedList.py(28): LL = LinkedList()
 --- modulename: LinkedList, funcname: __init__
LinkedList.py(9):         self.head = None
<!-- call2: insert first node; create HEAD -->
LinkedList.py(29): LL.insert(3)
 --- modulename: LinkedList, funcname: insert
LinkedList.py(12):         newNode = Node(data)
 --- modulename: LinkedList, funcname: __init__
LinkedList.py(3):         self.data = data
LinkedList.py(4):         self.next = next
LinkedList.py(13):         if(self.head):
LinkedList.py(19):             self.head = newNode
<!-- call3: insert second node -->
LinkedList.py(30): LL.insert(4)
 --- modulename: LinkedList, funcname: insert
LinkedList.py(12):         newNode = Node(data)
 --- modulename: LinkedList, funcname: __init__
LinkedList.py(3):         self.data = data
LinkedList.py(4):         self.next = next
LinkedList.py(13):         if(self.head):
LinkedList.py(14):             current = self.head
LinkedList.py(15):             while(current.next):
LinkedList.py(17):             current.next = newNode
<!-- call4; insert third node -->
LinkedList.py(31): LL.insert(5)
 --- modulename: LinkedList, funcname: insert
LinkedList.py(12):         newNode = Node(data)
 --- modulename: LinkedList, funcname: __init__
LinkedList.py(3):         self.data = data
LinkedList.py(4):         self.next = next
LinkedList.py(13):         if(self.head):
LinkedList.py(14):             current = self.head
LinkedList.py(15):             while(current.next):
LinkedList.py(16):                 current = current.next
LinkedList.py(15):             while(current.next):
LinkedList.py(17):             current.next = newNode
<!-- call5: print list -->
LinkedList.py(32): LL.printLL()
 --- modulename: LinkedList, funcname: printLL
LinkedList.py(22):         current = self.head
LinkedList.py(23):         while(current):
LinkedList.py(24):             print(current.data)
3
LinkedList.py(25):             current = current.next
LinkedList.py(23):         while(current):
LinkedList.py(24):             print(current.data)
4
LinkedList.py(25):             current = current.next
LinkedList.py(23):         while(current):
LinkedList.py(24):             print(current.data)
5
LinkedList.py(25):             current = current.next
LinkedList.py(23):         while(current):
```

### 7. debugger visualized
#### 7.1. head node-1
* first node is easy

![first_node]({{ site.url }}/assets/img002254.png)

#### 7.2. notes on stateful nature of this algorithm
> now the creation of a linked list, no matter how algorythmically correct is not straighforward simply because of the fact that not each step is concluded by each iteration the dependency is cross-iterational, that is how it is built it is not discreet; or; if you want to be even more specific; it is not stateless. it needs to know where that instance is in regards to the list creation which is logical; but then rubberducking analysis is a bit more difficult and needs help

#### 7.3. node-2

![second_node]({{ site.url }}/assets/img002276.png)

* a lot of this implementation is about referencing object by memory locations
* this is why it is not so intuitive, but wrapping your head around that for a long enough tie will surely discover more — and the greatness of python's debugger is actually to articulate memory locations next to the object names

> another point for python!

#### 7.4. tail node-3
![third_node]({{ site.url }}/assets/img002277.png)

### 8. to make matters complicated: python is calling by object reference ? 
* [Call By Object](http://effbot.org/zone/call-by-object.htm)
* [Python Objects](http://effbot.org/zone/python-objects.htm)
* https://stackoverflow.com/a/6159699/11082684
* value type and reference type — this seem not to apply in python
* **???**

### 9. sources
* [How to create a Linked List in Python](https://www.educative.io/edpresso/how-to-create-a-linked-list-in-python)
