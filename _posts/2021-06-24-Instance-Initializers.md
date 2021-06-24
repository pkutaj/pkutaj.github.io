## usecase
The aim of this page📝is to define class instance (i.e. object) intializers.

<!-- TOC -->

- [1. initializer is not a constructor](#1-initializer-is-not-a-constructor)
- [2. it must contain the self keyword in params](#2-it-must-contain-the-self-keyword-in-params)
- [3. there is no return object](#3-there-is-no-return-object)
- [4. underscored attributes](#4-underscored-attributes)
- [5. often contains class invariants](#5-often-contains-class-invariants)
- [6. namespaces and attributes](#6-namespaces-and-attributes)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. initializer is not a constructor
* initializer is a function that configures the instance at the point of its creation
* aka **initialization method**
    - is optional 
    - optionality is part of the slightly anarchic bend of Python's design
* code: `__init__(self, <object_init_params>)`
* **it is not** a constructor; it is **used by** a constructor:
    - constructor already exists at the time then initializator is called
    - constructor is handled by python runtime system
    - one of the things constructor does is to check if initializer is present
    - initializer is called by a constructor as part of the new-object process

### 2. it must contain the self keyword in params
* the concept of the `self` keyword is analogous to `this` in C#, Java, C++, JS

### 3. there is no return object
* initializer does not return anything
    - it just modifis an object refered to by `self` 
    - just as we do not declare vars before assignment (there are languages where a declaration statement is separate from an assignment statement)
    - in Python, we do not need to declare object attributes before assignment 

### 4. underscored attributes
* [GH: Underscored-Vars-in-Python-Initializers.md][#3]
* [local: Underscored-Vars-in-Python-Initializers.md][#4]

### 5. often contains class invariants
* good practice for an initializer to establish
* truths about an object that endure during for its lifetime 
* often: test & `raise` the incom
* [GH: Using-String-Methods-for-Class-Invariant-Case-Analysis.md][#1]
* [local: Using-String-Methods-for-Class-Invariant-Case-Analysis.md][#2]

```python
def __init__(self, number):
        """ class invariants """
        if not number[:2].isalpha():
            raise ValueError(f"No airline code in '{number}")
        if not number[:2].isupper():
            raise ValueError(f"Inalid airline code '{number}'")
        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError(f"Invalid route number '{number}'")

        self._number = number

```

### 6. namespaces and attributes
* [GH: On-Attributes-and-Namespaces-in-Python.md][#5]
* [local: On-Attributes-and-Namespaces-in-Python.md][#6]


### 7. sources
[#1]: https://github.com/pkutaj/kb/blob/master/python/2021-06-22-Using-String-Methods-for-Class-Invariant-Case-Analysis.md
[#2]: ..\python\2021-06-22-Using-String-Methods-for-Class-Invariant-Case-Analysis.md
[#3]: https://github.com/pkutaj/kb/blob/master/python/2021-06-22-Underscored-Vars-in-Python-Initializers.md
[#4]: ..\python\2021-06-22-Underscored-Vars-in-Python-Initializers.md
[#5]: https://github.com/pkutaj/kb/blob/master/python/2021-06-24-On-Attributes-and-Namespaces-in-Python.md
[#6]: ..\python\2021-06-24-On-Attributes-and-Namespaces-in-Python.md
