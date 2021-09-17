## usecase
The aim of this how-to-guide🏁 is to delete a file in python.

<!-- TOC -->

- [notes](#notes)
- [example](#example)
- [links](#links)

<!-- /TOC -->

### notes
1. `import os` module
2. be explicit and include `try/except` block ([EAFP style](https://devblogs.microsoft.com/python/idiomatic-python-eafp-versus-lbyl/) of exception handling)
3. use `os.remove(<filename>)` method

### example

````python
import os
myfile= raw_input("Enter file name to delete: ")
try:
    os.remove(myfile)
except OSError as e:
    print ("Error: %s - %s." % (e.filename, e.strerror))
````

- From <https://stackoverflow.com/a/42641792/11082684>

### links
* https://stackoverflow.com/a/42641792/11082684
* https://devblogs.microsoft.com/python/idiomatic-python-eafp-versus-lbyl/
