## usecase
The aim of this playbook🏁 is to extract list of clients I need to upgrade from `clients.txt` file — as a part of the script that changes the version of the component within Consul. 

<!-- TOC -->

- [1. instructions](#1-instructions)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. instructions

```python
def client_list():
    with open("clients.txt", mode="rt", encoding="utf-8") as client_file:
        return [line.strip() for line in client_file.readlines()]
```

* 2 new string-object methods to memorize
1. `<file>.readlines()` reads lines from a file and passes them into a list
2. `<str>.string()` strips the string from special character such as `\n`

* the value is a transformation of the client name into URL
* I do not need to write anything back into a file, that is a slightly different story 

### 2. sources
* https://stackoverflow.com/a/3277516/11082684
