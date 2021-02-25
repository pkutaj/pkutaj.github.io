## usecase
* The aim of this page📝is to cover **capabilities of function arguments** in python by defining its three rules. 

<!-- TOC -->

- [1. Default values come last](#1-default-values-come-last)
- [2. Default values only on immutables](#2-default-values-only-on-immutables)
- [3. Keyword parameters come after positional](#3-keyword-parameters-come-after-positional)

<!-- /TOC -->

### 1. Default values come last
----
* **rule:** argument with default values **must** come after those without default values
----
* parameters specified in a function definition with `def` are a comma-separated list
* they can be made **optional** by assiging a **default** values to the parameter
    - else, syntax err
* consider the following one-liner

```python
def printMessage(message="Hello World"): print(message)

>>> printMessage()
Hello World
```

### 2. Default values only on immutables
----
* **rule:** do not use mutable default values; **use only immutable default values**
----

1. ✅ `ints`
2. ✅ `float`
3. ✅ `string`
4. ✅ `tupple`

* lots of newcomers to Python are affected by this

![default_arg_not_changing]({{ site.url }}/assets/img002631.jpg)

* remember that `def` itself is a statement executed at runtime
* i.e. this is **dynamic** and no matter how many times you call that the function object is created only once with `def`
* this can also have other negative consequences when using e.g. `lists` as default values

![mutable_object_called_repeatedlya]({{ site.url }}/assets/img002632.jpg)

* the fix is to use immutable

![mutable_object_called_repeatedlya]({{ site.url }}/assets/img002633.jpg)

### 3. Keyword parameters come after positional 
----
* **rule:** all keyword parameters must be specified after positional parameters
----
* back in my VBA days I made the following note

![keyword_vs_positional_params]({{ site.url }}/assets/img002477.png)

* and it is the same in python functions

![positional_and_keyword_params]({{ site.url }}/assets/img002623.jpg)
