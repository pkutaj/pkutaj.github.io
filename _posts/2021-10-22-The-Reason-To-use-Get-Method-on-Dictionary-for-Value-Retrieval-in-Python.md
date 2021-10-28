## usecase
The aim of this explainer💡 is to define a diff between

```
<dict>.get(<key>) VS <dict>[<key>]
```

in Python. 
<!-- TOC -->

- [1. notes](#1-notes)
- [2. example](#2-example)

<!-- /TOC -->

### 1. notes
* It allows you to provide a default value/expression if the key is missing
* ...a sort of if/then mechanism without if statement

```python 
>>> d = {"name": "mr_paul"}
>>> d.get("name")
'mr_paul'
>>> d.get("job", print("seems to be unemployed"))
seems to be unemployed
```
* If omitted in the `.get()` , `default_value` is `None`, such that

```python
>>> d.get("job", None)
```

* is the same as

```python
>>> d.get("job")  # <-- No default specified -- defaults to None
```

* however, checking for a non-existent key with `[]` syntax throws an **ERROR** 

```python
>>> d["name"]
'mr_paul'
>>> d["job"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'job'

'job'
```

* raises a `KeyError` which you can properly catch if needed

### 2. example
* in the example below, the initializer checks what is being passed:
* if the filename has `.bz2` or `.gz` extensions, the `opener` will be mapped `.opener()`
* if the filename has any other extension like `.txt` it will become a default value, the built-in `open` function object

```python
import os
import bzipped, gzipped

extension_map = {
    ".bz2": bzipped.opener,
    ".gz": gzipped.opener
}


class MultiReader:
    def __init__(self, filename):
        extension = os.path.splitext(filename)[1]
        opener = extension_map.get(extension, open)
        self.f = opener(filename, 'rt')

    def close(self):
        self.f.close()

    def read(self):
        return self.f.read()
```
