---
layout: post
title: 
categories: []
---
## usecase
The concern is documenting patterns for writing into a python file, in particular to:
1. create an empty markdown file with the title from an input
2. populate with a template text

<!-- TOC -->

- [1. open()](#1-open)
- [2. write()](#2-write)
- [3. usecase: populate a new file with a template for documentation](#3-usecase-populate-a-new-file-with-a-template-for-documentation)
    - [3.1. test](#31-test)
    - [3.2. prod](#32-prod)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. open()

![3_modes_2_selector_for_open_method]({{ site.url }}/assets/img002487.jpg)

* even though you don't have to pass selector, it is recommended for the sake of readability
* as far as the `write` --vs-- `append` goes: 
    * the `write` mode erases the previous file data 
    * the `append` mode attaches the content to the file
* also, it is highly recommended to pass `encoding=utf-8` (or any other desired one)


### 2. write()
* the `write()` method writes a string to a stream
* in a repl, the `write()` returns the number of code points (chars) written to the file
* you are responsible for providing newline — where is no write line method on Python file objects

```python
f = open('hello-world.txt', mode = 'wt', encoding = 'utf-8')
f.write('hello-world
')
f.write('hello-world, again!)
f.close()
```

* which results in `hello-world.txt` with - even when done repeatedly (`append` would keep lines growing)

```txt
hello-world
hello-world, again!
```

### 3. usecase: populate a new file with a template for documentation
* The script creates a file with the title based on the user's input 
* Then it needs to populate it with markdown's template

```
## Overview
The aim of this document is 

### Use cases

* common usage or referral tickets

### Prerequisites

* technical or knowledge
<!-- ... -->
```


#### 3.1. test
* I don't know how to test for this side-effect, the fast/stupid way seems to be to check if the first line is identical to the one from the template (I guess you could count the number of lines or compare files, but this is just to learn new methods)
* using the with-block 

```python
def test_template():
    opsdocs.new_doc()
    with open('./Demo/hello-world.md', mode='rt', encoding='utf-8') as template:
        first_line = template.readline().strip()
    assert first_line == "## Overview"
```

#### 3.2. prod
* not using the with-block
* this is a private function within the larger function

```python
def _createFile(docPath):
    newDoc = open(docPath, mode='wt', encoding='utf-8')
    template = open('./zendesk/template.md', mode='rt', encoding='utf-8')
    newDoc.write(template.read())
    template.close()
    newDoc.close()
```

### 4. sources
* <https://stackoverflow.com/a/1904455/11082684>
* [Python - Append content of one text file to another - GeeksforGeeks](https://www.geeksforgeeks.org/python-append-content-of-one-text-file-to-another/)
