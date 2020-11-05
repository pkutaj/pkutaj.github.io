---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the keyword `self` as used in python — when working within the OOP (Python w/ classes)

<!-- TOC -->

- [1. intro: on instance method](#1-intro-on-instance-method)
    - [1.1. the four rules for method names (same for variables)](#11-the-four-rules-for-method-names-same-for-variables)
- [2. CODE](#2-code)
- [3. instance method requirement: self parameter](#3-instance-method-requirement-self-parameter)
- [4. import class from file](#4-import-class-from-file)
- [5. instantiate an object](#5-instantiate-an-object)
- [6. shorthand method call: no self parameter](#6-shorthand-method-call-no-self-parameter)
- [7. longhand method call: argument for self parameter](#7-longhand-method-call-argument-for-self-parameter)
- [8. sources](#8-sources)

<!-- /TOC -->

### 1. intro: on instance method 
* Instance methods are methods that can be called on objects, i.e. unique instances of the class
* **INSTANCE** means that with this method it is possible to **ACCESS UNIQUE DATA** of the instantiated object of that class

> If you have two objects each created from a car class, then they each may have different properties. 
> They may have different colors, engine sizes, seats, and so on.

— <https://www.makeuseof.com/tag/python-instance-static-class-methods/>

* belong to family of methods together with 
    * class methods (a method for the whole class)
    * static methods (a method for the whole runtime)

#### 1.1. the four rules for method names (same for variables)
1. all lower case
2. words separated by an underscore
3. non-public methods begin with a single underscore
4. if a method name needs to be mangled, two underscores may begin the name

### 2. CODE

```python
""" example.py """
class ClassExample:
    def instance_method_example(self):
        return "Hello, this is your instance method"
```

### 3. instance method requirement: self parameter
* instance method must accept a reference to the instance of the class to which the method was called
* this is the keyword `self` as the first argument
* of course, `self` is just a convention as it is a parameter

### 4. import class from file

```
>>> from example import ClassExample
>>> ClassExample
<class 'example.ClassExample'>
```

### 5. instantiate an object

```
>>> example_object = ClassExample()
>>> example_object
<example.ClassExample object at 0x00A5AF70>
```

### 6. shorthand method call: no self parameter
* note that in this way of calling the method you are not passing the `argument` name for the `self` parameter

* check the code

```python
class ClassExample:
    def instance_method_example(self):
        return "Hello, this is your instance method"
```

* check the REPL and call the method without the reference to the class at all

```
>>> example_object.instance_method_example()
'Hello, this is your instance method'
```

### 7. longhand method call: argument for self parameter

* the longhand format with the `self` passed would be

```
>>> ClassExample.instance_method_example(example_object)
'Hello, this is your instance method'
```

* here you proceed `ClassName.method_name(object_name)` where `object_name` argument stands for `self` parameter

### 8. sources
* [Python Naming Conventions — CodingConvention 0 documentation](https://visualgit.readthedocs.io/en/latest/pages/naming_convention.html#methods)
