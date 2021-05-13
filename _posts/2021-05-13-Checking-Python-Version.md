## usecase
The aim of this explainer💡 is to look at the ways python's version should be checked. The story is that my script required Python3 and has Python3-specific syntax. 

<!-- TOC -->

- [1. steps/?](#1-steps)

<!-- /TOC -->

### 1. steps/?
* there is a version-checker

```python
try:
    pythonVersion = sys.version_info[0]
    if pythonVersion < 3:
        raise Exception
except Exception:
    sys.exit("""
>>> Cannot start: Python3 required. This script was started with Python version
%s
>>> Please upgrade to Python3 → Retry
    """ % sys.version)
```

* this is the error with Python2

```
SyntaxError: Non-ASCII character '\xe2' in file c:\Users\Admin\Documents\workspace\SNOW\support-kb
ewDoc.py on line 10, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```

* the version checker could only work if this is in a wrapper script that calls the `main()` from a separate module

>  The entire module is syntax checked before a single line of code is run, so it's not possible to catch SyntaxError or perform version checks before it's too late without a wrapper script. 
