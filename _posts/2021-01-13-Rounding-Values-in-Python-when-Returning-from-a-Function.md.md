---
layout: post
title: Rounding Values in Python when Returning from a Function
categories: [python]
---
## usecase
The concern is documenting the how to round the values, coming from writing the procedure for finding square root that returns saying

```
Fail: assert 3.00009155413138 == 3
```


<!-- TOC -->

- [1. steps](#1-steps)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. steps
* there is a lot of rounding strategies, at the moment I am using the `truncate` method

```python
def truncate(n, decimals=3):
    multiplier = 10 ** decimals
    return int(n * multiplier) / multiplier
```

* `3.00009155413138` → `3.000` and the test passes there

### 2. sources
* [How to Round Numbers in Python – Real Python](https://realpython.com/python-rounding/)
