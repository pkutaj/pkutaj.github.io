## usecase
The aim of this page📝is to descripe `any` and `all` boolean operators in python.

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. example](#2-example)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps/?

* `any` and `all` are equivalent to the logical operators `and` and `or`
* they are specifically used for iterable series of [bool] values. 
* `any` takes an iterable and tells you if any elements in it are true. 
* `all` takes an iterable and tells you if all the elements in it are true. 

![]({{ site.url }}/assets/img002883.jpg)

### 2. example
* This is amazing for validation of input
* My case is checking if a list of strings contains a substring which is an ID
* Only if the ID has not been used yet, I proceed with the function, else I raise a ValueError
* If the first 2 characters of a selected name are found in the `sectionFolders` list of `folder`s, it is over

```python
if any([name[:2] in folder for folder in sectionFolders]):
        raise ValueError(
            f"ID already used, select a proper one"
        )
```

### 3. sources
* [How to check if a list contains a substring in Python](https://www.kite.com/python/answers/how-to-check-if-a-list-contains-a-substring-in-python)
