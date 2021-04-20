## usecase
The aim of this how-to-guide🏁 is to outline 4 steps to be memorized when writing formatted multiline strings in Python. 

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. example](#2-example)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps/?
* [Multiline f-string in Python - Stack Overflow](https://stackoverflow.com/questions/45965007/multiline-f-string-in-python)
1. place _f-strings_ in parentheses
2. do not separate them by comma and do not use backslash for line continuation
3. do signal a newline with `\n` except on the last line
4. each _f string_ line has its own `f"string"` notation

```
The preferred way of wrapping long lines is by using Python’s implied line continuation inside parentheses, brackets, and braces. 
Long lines can be broken over multiple lines by wrapping expressions in parentheses. 
These should be used in preference to using a backslash for line continuation.
```

— From <https://pep8.org/#maximum-line-length>

### 2. example

```python
#... printing out the name of the deleted branch and the confirmation there of in an f-string multiliner
try:
            os.remove(filename)
            print(f"deleted '{filename}' doc ")
            git.Git().branch("-D", docID)  # delete the branch
            print(f"deleted >{docID}< branch\n"
                  f"~~~> Deletion complete")
        except Exception as e:
            print(f"{e!r}", file=sys.stderr)
#...
```

### 3. sources
* [Multiline f-string in Python - Stack Overflow](https://stackoverflow.com/questions/45965007/multiline-f-string-in-python)
* <https://pep8.org/#maximum-line-length>
