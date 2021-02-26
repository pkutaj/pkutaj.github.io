## usecase
* The aim of this tutorial🔍 is to show how to build help for Python functions using **docstrings**

<!-- TOC -->

- [1. addition of self-documentation to your own module](#1-addition-of-self-documentation-to-your-own-module)
- [2. provide an example of function fetching words from an URL](#2-provide-an-example-of-function-fetching-words-from-an-url)
- [3. tools](#3-tools)
    - [3.1. Google's Python Styleguide format](#31-googles-python-styleguide-format)
- [4. Example](#4-example)
- [5. list used sources](#5-list-used-sources)

<!-- /TOC -->

### 1. addition of self-documentation to your own module
* API documentation in Python uses a facility called **docstrings**
    * document functions, modules, and classes
* requirement: must be the first statement in the blocks for these constructs
* docstring is a literal string occurring as the first string within the named block
* docstring is a place where most code documentation should live
* ❌ it does not explain how code works
* ✅ it does show how to consume facilities the module provides (list parameters, methods, basic concerns)


### 2. provide an example of function fetching words from an URL
* use triple-quotes 
* valid also for single-lined docstrings → can expand easily to add more detail

```python
import sys
from urllib.request import urlopen


def fetchwords():
    """ Fetch a list of words from URL """
    story = urlopen("http://sixty-north.com/c/t.txt")
    story_words = []

```

### 3. tools
* e.g. Sphinx is a tool that builds HTML documentation from Python docstrings
* each tool, however, mandates its preferred docstring format

#### 3.1. Google's Python Styleguide format
* amendable to being machine parsed
* readable at console
* they go in detail to describe docstrings for
    * module
    * function
    * class

### 4. Example
* an example for a function

```python
def fetchwords():
    """Fetch a list of words from URL.
    
    Args:
        url: The URL of UTF-8 text document
    
    Returns:
        A list of strings containing words from the document
    """
```

* access help from the REPL

```python
>>> from words import *
>>> help(fetchwords)
Help on function fetchwords in module words:

fetchwords()
    Fetch a list of words from URL.

    Args:
        url: The URL of UTF-8 text document

    Returns:
        A list of strings containing words from the document
```

### 5. list used sources
* [PEP 257 -- Docstring Conventions | Python.org](https://www.python.org/dev/peps/pep-0257/)
    * this is not widely adopted
* [3.8 Comments and Docstrings @ Style guides for Google-originated open-source projects](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings)
