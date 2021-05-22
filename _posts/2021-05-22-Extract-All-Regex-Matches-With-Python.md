## usecase
The aim of this playbook🏁 is to list steps for extracting all regex matches with Python's re module.

<!-- TOC -->

- [1. steps/?](#1-steps)

<!-- /TOC -->

### 1. steps/?
```python
import re


def extractImages(filename):
    imgReg = re.compile("{{ site.url }}/assets/(.*jpg|.*png)")
    with open(filename, mode="rt", encoding="utf-8") as docFile:
        doc = docFile.read()
        images = re.findall(imgReg, doc)
    return ["./assets/" + img for img in images]
# later used in e.g. [os.remove(img) for img in extractImages(filename)]
# above deletes all images located in ./assets/<filename>.jpg|png
```

1. import `re` module
2. define regex and assign it within the regex compile object with `reg = re.compile(<regex>)`
    - You of course need to define a **capture group** to be extracted
    - I.e. with `{{ site.url }}/assets/(.*jpg|.*png)` — only the image filename and not `{{ site.url }}/assets/` location is extracted
3. open the file with `with open(...) as alias:` statement
4. assign the content of the file with `inputObj = alias.read()`
5. assign the list of matches with `matches = re.findall(inputObj, reg)`

* If the match contains more than one group, `re.findall()` will return a list of matching tuples, not a list of matching strings

