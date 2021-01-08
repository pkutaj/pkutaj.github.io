## Usecase
The doc's aim is illustrating

```
Flat is better than nested
```

aphorism from the [The Zen of Python](https://www.python.org/dev/peps/pep-0020/)

<!-- TOC -->

- [1. if statements](#1-if-statements)
- [sources](#sources)

<!-- /TOC -->
### 1. if statements
* ✅ `else` is not intended at all
* ✅ `elif` is implemented so that conditinons (tests) can be as flat as possible

```python
""" nested ifs """

if h > 50:
    print("greater than 50")
else:
    if h > 20:
        print("between 20 and 50")
    else:
        print("less or equal to 20")

""" if-elif-else statement syntax """
if h > 50:
    print("Greater than 50")
elif h < 20:
    print("Less than 20")
else:
    print("Between 20 and 50")
```

### sources
* [PEP 20 -- The Zen of Python | Python.org](https://www.python.org/dev/peps/pep-0020/)
