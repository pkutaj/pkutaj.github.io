## usecase
The aim of this playbook🏁 is to learn how text is to be quickly matched in text files with python

<!-- TOC -->

- [1. steps](#1-steps)
- [2. usage](#2-usage)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. steps

1. open file with `with open(<fileName>, <mode>, <encoding>) as fileAlias`
2. write a predicate expression with `<string>`, `in` operator and `fileAlias.read()`


```python

with open('example.txt', mode='rt', encoding='utf-8') as f:
    if 'example' in f.read():
        print("true")
```

### 2. usage
* I run unit tests with this checking if the item is deleted properly from an index file (a manifest table of the knowledge base)


```python
def test_delIndexItem():
    inpt = "01.03"
    delPubItem(docID=inpt)
    with open("index.yaml", mode="rt", encoding="utf-8") as indexFile:
        fl = indexFile.read()
    result = True if inpt in fl else False
    assert result == False
```


### 3. sources
* [python -? - Stack Overflow](https://stackoverflow.com/questions/4940032/how-to-search-for-a-string-in-text-files)
