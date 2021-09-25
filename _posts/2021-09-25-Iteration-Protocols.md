## usecase
The aim of this page📝is to demonstrate the dynamics of the [2 iteration protocols](https://mypy.readthedocs.io/en/stable/protocols.html#iteration-protocols): iterable and iterator

<!-- TOC -->

- [1. notes](#1-notes)
- [2. classroom example - from iterable to iterator to StopIteration exception](#2-classroom-example---from-iterable-to-iterator-to-stopiteration-exception)
- [3. real-life example - unit testing multiple command line inputs](#3-real-life-example---unit-testing-multiple-command-line-inputs)
- [4. links](#4-links)

<!-- /TOC -->

### 1. notes
* iteration - of course - is taking items one by one from a source and doing something with each in turn
* in python, this is commonly used in for loops and comprehensions
* these structures **iterate over the whole structure by default**
* sometimes, however, a more fine-grained control is needed - like in **generators**
* for this, there are 2 important concepts/protocols, on top of which much of Python is constructed: 1. iterable objects and 2. iterator objects
* they are reflected in standard python protocols
* note that both for loops and comprehensions are built directly upon these lower-level elements of iteration protocol
* **iterable object** (collection or stream of objects) is any object that can be passed into the built-in `iter()` function
* `iter()` returns **iterator object**
* in turn, the built-in `next()` requires an iterator object - and it returns the next value in the iteration of a collection

### 2. classroom example - from iterable to iterator to StopIteration exception
* Python, liberally, raises an **exception** of the type `StopIteration`

```python
iterable = ['Spring', 'Summer', 'Autumn', 'Winter']
iterator = iter(iterable)
next(iterator)
# >>> 'Spring'
next(iterator)
# >>> 'Summer'
next(iterator)
# >>> 'Autumn'
next(iterator)
# >>> 'Winter'
next(iterator)
# >>> Traceback (most recent call last):
# >>> File "<stdin>", line 1, in <module>
# StopIteration
```

### 3. real-life example - unit testing multiple command line inputs
1. define/get an iterable object such as a list `["20.01", "y"]`
2. pass an iterable object into `iter()` → create an iterator object
3. pass an iterator object into a `next()` to yield the next value of the list each time the function is called

```python
def test_pubDoc(monkeypatch):
    inputs = iter(["20.01", "y"])
    monkeypatch.setattr("builtins.input", lambda _: next(inputs))
    #...
```

* the first time `input()` is encountered, the `"20.01"` value is passed, the second time it is `"y"`
* the third time it would be an exception


### 4. links
* https://mypy.readthedocs.io/en/stable/protocols.html#iteration-protocols
