---
layout: post
title: Implementing Command Line Arguments with Python — an example refactor
categories: [python]
---
## usecase
The concern is documenting an exemplary implementation of command-line arguments while keeping the code testable also from REPL or module (i.e. code editor). These are notes under the amazing course [Core Python: Getting Started](https://www.pluralsight.com/courses/getting-started-python-core)

<!-- TOC -->

- [1. separate word retrieval and word printing](#1-separate-word-retrieval-and-word-printing)
- [2. pre-refactor](#2-pre-refactor)
- [3. function splitting](#3-function-splitting)
- [4. command line arguments — enter sys module and argv](#4-command-line-arguments--enter-sys-module-and-argv)
    - [4.1. fix](#41-fix)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. separate word retrieval and word printing
* why? you can either import or run and you want different behavior based on the execution
    * if importing → you want to get words as a list
    * if running → you want words to be printed

### 2. pre-refactor
* this already has the `if __name__ == "__main__":` idiom that either imports or run based on the place of call (shell/repl,module)

```python
from urllib.request import urlopen 

def fetchwords():
    story = urlopen("http://sixty-north.com/c/t.txt")
    story_words = []
    for line in story:
        line_words = line.decode("utf-8").split()
        print(line)
        for word in line_words:
            story_words.append(word)
    story.close()
    return stor
    for word in story_words:
        print(word)


if __name__ == "__main__":
    fetchwords()
```

### 3. function splitting
1. split code into functions based on the type of execution
    * if imported, `fetchwords()` returns an array of words
    * if called, `print_words()` prints the fetched words, is built atop of `fetchwords()`
2. the import or execute patterns contains a new function `main()` 
    * it calls the `fetchwords()` 
    * it binds the result to the `words` variable
    * it passes the variable as an argument to the `print_words()` 
3. Actually, `print_words()` is renamed to `print_items()` as what is printed is anything iterable as this python supports dynamic typing
4. The URL is passed as an argument making the module more abstract. You need to pass the URL either as a command-line arg or within a REPL/another module    

```python
from urllib.request import urlopen


def fetchwords():
    story = urlopen("http://sixty-north.com/c/t.txt")
    story_words = []
    for line in story:
        line_words = line.decode("utf-8").split()
        print(line)
        for word in line_words:
            story_words.append(word)
    story.close()
    return story_words


def print_items(items):
    for item in items:
        print(item)


def main():
    words = fetchwords()
    print_items(words)


if __name__ == "__main__":
    main()
```

### 4. command line arguments — enter sys module and argv
* `argv` is the attribute of the `sys` module
* this is a list of strings

```python
import sys
# ...
# ...

def main():
    url = sys.argv[1]
    words = fetchwords(url)

if __name__ == "__main__":
    main()

```

* call a program from the shell

```
PS C:\kb\python> python .\words.py http://sixty-north.com/c/t.txt
b'It was the best of times\n'
b'it was the worst of times\n'
b'it was the age of wisdom\n'
b'it was the age of foolishness\n'
b'it was the epoch of belief\n'
b'it was the epoch of incredulity\n'
b'it was the season of Light\n'
b'it was the season of Darkness\n
```

* but you can't **test** `main()` from the repl/test code as it is immediately referring to `sys.argv[1]`
* this is **unlikely to have any useful value repl or module environment**

#### 4.1. fix
* don't keep `sys.argv[1]` within the function itself what will be executed in the REPL/module
* put it only into the block executed singularly from the shell environment
* capture the string passed in the CLI as `sys.argv[1]` and pass it directly to the `main(url)` 

```python
import sys
from urllib.request import urlopen

#...

def main(url):
    words = fetchwords()
    print_items(words)


if __name__ == "__main__":
    main(sys.argv[1])
```

### 5. sources
* Python Standard Library arg parse module
* doc opt module
