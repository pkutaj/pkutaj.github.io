## usecase
The aim of this page📝 is to utilize Python slicing to insert a data structure into a list at a given index. 
I used this with my inserter script: 

```python
# inserter.py
import json
import os


def main():
    with open("foo.json", mode="rt", encoding="utf-8") as f1:
        source_list = [line for line in f1.readlines()]

    with open("bar.json", mode="rt", encoding="utf-8") as f2:
        insert_list = [line for line in f2.readlines()]

    pos = [i for i, s in enumerate(
        source_list) if 'Server Mirror eu1' in s][0] + 9
    source_list[pos: pos] = insert_list                     # <<< insert insert_list into source_list

    with open("foo.json", mode="wt", encoding="utf-8") as f1:
        f1.write("".join(source_list))


if __name__ == "__main__":
    main()
```

<!-- TOC -->

- [1. notes](#1-notes)

<!-- /TOC -->

### 1. notes
* slicing indexes operate as a half-open range - the first item is included, the last is not

```python
>>> l = [1,2,3,4]
>>> l[0:1]
[1]
```

* to insert at a given point, start with pointing to the index you want the new structure to start with ( **not-after** — ***at***)
* then, use the same index after `:`, e.g. `[0:0]` to enter at index0 and beyond
* the values in the `[]` are not specifying the span, they only point to the point of entry
* in a stupid example below I want to add `666` at the beginning of the list `[1,2,3,4]`

```python
>>> l = [1,2,3,4]
>>> l[0:0] = [6,6,6,]
>>> l
[6, 6, 6, 1, 2, 3, 4]
>>>
```

* the script at the beginning utilizes this for inserting file contents into another file
