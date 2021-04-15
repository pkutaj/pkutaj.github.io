## usecase
The aim of this page📝is to outline 5 steps for accessing exception objects and formatting their content

<!-- TOC -->

- [1. steps](#1-steps)
- [2. example](#2-example)

<!-- /TOC -->

### 1. steps

1. `import sys` at the top of your script
2. use `as` clause at the end of the `except` statement and create an alias for the error object (e.g. `e`)
3. print error message with an `f string`
4. use `f"{e!r}"` inserting the **repl representation** into your string
    - in case of exception objects, this gives us more info about the type of the exception
5. pass a keyword argument `file=sys.stderr` into the `print` statement   

### 2. example

```python
import sys          #1
DIGIT_MAP = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

def convert(s):
    number = ''
    x = -1
    try:
        for token in s:
            number += DIGIT_MAP[token]
        x = int(number)
        print(f"Conversion Succeded. x = {x}")
    except (KeyError, TypeError) as e:          #2
        print(f"{e!r}", file=sys.stderr)        #3-5
    return x

print(convert(512)
```

* this returns 

```
TypeError("'int' object is not iterable")
-1
```
