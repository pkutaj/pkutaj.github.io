## usecase
The aim of this playbook🏁 is a commentary under SICP and SICP-in-PYTHON, illustrating a simple example of a local-state function returning another function allowing for the creation of multiple counters. 

<!-- TOC -->

- [1. instructions](#1-instructions)
- [2. links](#2-links)

<!-- /TOC -->

### 1. instructions
* The returned `incr()` function **must** be nested in `make_counter()` function
* The `nonlocal` variable **must** be explicitly declared in the nested function
* Only then can you modify `n` in the parent scope and keep the state for repeated calls

```python
def make_counter(n):
    def incr():
        nonlocal n
        n = n + 1
        print(n)
    return incr
~~~
>>> c1 = make_counter(1)
>>> c2 = make_counter(99)
>>> c1()
2
>>> c1()
3
>>> c2()
100
>>> c1()
4
```

* If you omit/comment out `nonlocal n` in the code above you get

```python
def make_counter(n):
    def incr():
        n = n + 1
        print(n)
    return incr

>>> c1 = make_counter(1)
>>> c1()

Traceback (most recent call last):
  File "c:/Users/Admin/Documents/workspace/work.log/kb/sicp/s09_03.py", line 10, in <module>
    c()  # 2
  File "c:/Users/Admin/Documents/workspace/work.log/kb/sicp/s09_03.py", line 4, in incr
    n = n+"yyy"
UnboundLocalError: local variable 'n' referenced before assignment
```

* from [official docs](https://docs.python.org/3/reference/simple_stmts.html#the-nonlocal-statement), defined in [PEP 3104 -- Access to Names in Outer Scopes](https://www.python.org/dev/peps/pep-3104/)

```
The nonlocal statement causes the listed identifiers to refer to previously bound variables in the nearest enclosing scope excluding globals. 
This is important because the default behavior for binding is to search the local namespace first. 
The statement allows encapsulated code to rebind variables outside of the local scope besides the global (module) scope.
Names listed in a nonlocal statement, unlike those listed in a global statement, must refer to pre-existing bindings in an enclosing scope (the scope in which a new binding should be created cannot be determined unambiguously).
Names listed in a nonlocal statement must not collide with pre-existing bindings in the local scope.
```
 
### 2. links
* https://wizardforcel.gitbooks.io/sicp-in-python/content/11.html
* [5A: Assignment, State, and Side-effects - Structure and Interpretation of Computer Programs](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/video-lectures/5a-assignment-state-and-side-effects/)
* https://docs.python.org/3/reference/simple_stmts.html#the-nonlocal-statement
* [PEP 3104 -- Access to Names in Outer Scopes](https://www.python.org/dev/peps/pep-3104/)
