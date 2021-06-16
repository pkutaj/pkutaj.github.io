## usecase
The concern is documenting the keyword `self` as used in python — when working within the OOP (Python w/ classes)

<!-- TOC -->

- [1. intro: on an instance method](#1-intro-on-an-instance-method)
- [2. what other types of methods are there?](#2-what-other-types-of-methods-are-there)
- [3. the four rules for method names (same for variables and functions, btw)](#3-the-four-rules-for-method-names-same-for-variables-and-functions-btw)
- [4. instance method definition: self required](#4-instance-method-definition-self-required)
- [5. instance method definition: self parameter is required](#5-instance-method-definition-self-parameter-is-required)
- [6. short-hand instance method call: no self parameter](#6-short-hand-instance-method-call-no-self-parameter)
- [7. long-hand method call: self parameter is the name of the object instance](#7-long-hand-method-call-self-parameter-is-the-name-of-the-object-instance)
- [8. sources](#8-sources)

<!-- /TOC -->

### 1. intro: on an instance method 
* Instance methods are methods that can be called on objects, i.e. unique instances of the class
* **INSTANCE** method type means that with this method it is possible to **ACCESS UNIQUE DATA** of the instantiated object of that class

> If you have two objects each created from a car class, then they each may have different properties. 
> They may have different colors, engine sizes, seats, and so on.

— <https://www.makeuseof.com/tag/python-instance-static-class-methods/>

### 2. what other types of methods are there? 
* belong to the family of methods together with
    * class methods (a method for the whole class)
    * static methods (a method for the whole runtime)

### 3. the four rules for method names (same for variables and functions, btw)
1. lower case
2. separated by an underscore
3. non-public begin with a single underscore
4. if a name needs to be mangled, two underscores may begin the name

### 4. instance method definition: self required

* you need to put `self` into a method signature that is unique for the class

```python
""" example.py """
class ClassExample:
    def instance_method_example(self):
        return "Hello, this is your instance method"
```

### 5. instance method definition: self parameter is required
* instance method must accept a reference to the instance of the class to which the method was called
* this is the keyword `self` as the first parameter
* of course, `self` is just a convention as it is a parameter

### 6. short-hand instance method call: no self parameter
* note that in this way of calling the method you are not passing the `argument` name for the `self` parameter

* check the code

```python
class ClassExample:
    def instance_method_example(self):
        return "Hello, this is your instance method"
```

* check the REPL and call the method without the reference to the class at all

```python
>>> example_object.instance_method_example()
'Hello, this is your instance method'
```

* if you try to feed it with the name of the object, you receive an error
* this is syntactic sugar where the name of the object makes the first argument

```python
>>> f.Number(self=f)            
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Number() takes 1 positional argument but 2 were given
```

### 7. long-hand method call: self parameter is the name of the object instance
* the long-hand format with the `self` passed would be

```python
>>> ClassExample.instance_method_example(self=example_object)
'Hello, this is your instance method'
```

* this of course is not done like that. `elf is a positional parameter.

```python
>>> ClassExample.instance_method_example(self=example_object)
'Hello, this is your instance method'
```

### 8. sources
* [Python Naming Conventions — CodingConvention 0 documentation](https://visualgit.readthedocs.io/en/latest/pages/naming_convention.html#methods)
