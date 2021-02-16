## usecase
* The aim of this tutorial🔍 is to introduce anonymous/lambda functions in Python just to make sure they work in the Higher Order Functions class of SICP

<!-- TOC -->

- [1. syntax](#1-syntax)
- [2. lambda as function expression](#2-lambda-as-function-expression)
- [3. usage](#3-usage)
- [4.3. example: lambdas in higher-order functions (HOF)](#43-example-lambdas-in-higher-order-functions-hof)
- [6. list used sources](#6-list-used-sources)

<!-- /TOC -->

### 1. syntax

> Unlike lambda forms in other languages, where they add functionality, Python lambdas are only a shorthand notation if you’re too lazy to define a function. 

[Design and History FAQ — Python 3.9.1 documentation](https://docs.python.org/3/faq/design.html#why-can-t-lambda-expressions-contain-statements)

* restrictive
* minimal
* in python, lambdas are synonymous with anonymous functions 
* introduce it with `lambda` instead of `def`

```python
lambda args: expression
```

* multiple `args`
* only a single expression

### 2. lambda as function expression
* `lambda` can be assigned to a binding and thus have "name"

```python
double = lambda x: x*2
print(double(5))
>>> 10
```

* note that a vscode linter does rephrase this into a function declaration

### 3. usage
* tiny in size
* needed for a short time
* possibly, the expression is more expressive than the name
* usually, they are passed an argument for higher-order functions

### 4.3. example: lambdas in higher-order functions (HOF)
* the HOF `summationRecursive` from SICP returns the same result for `sumInt(a,b)` as well as for `sumIntLambda(a,b)` 

```python
def summationRecursive(term, a, next, b):
    if (a > b):
        return 0
    else:
        return term(a) + summationRecursive(term, next(a), next, b)

""" proper function declarations """
def sumInt(a, b):
    def _identity(x): return x
    def _next(x): return x+1
    return summationRecursive(_identity, a, _next, b)

""" using lambda functions """
def sumIntLambda(a,b):
    return summationRecursive(lambda x: x, a, lambda x: x+1, b)
```

### 6. list used sources
* [Python Lambda (Anonymous) Function](https://www.programiz.com/python-programming/anonymous-function)
* [How to Use Python Lambda Functions – Real Python](https://realpython.com/python-lambda/)
