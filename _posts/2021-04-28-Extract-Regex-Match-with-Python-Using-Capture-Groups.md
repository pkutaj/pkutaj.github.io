## usecase
The aim of this explainer💡 is to show how a match can be extracted using regex in Python

<!-- TOC -->

- [1. steps](#1-steps)

<!-- /TOC -->

### 1. steps
* so I need to extract `01` from the string `91.01 Demo B` so here it goes

0. `import re` module at the top of the script
1. use `re.compile()` to create a regex object:  `reg = re.compile(<regex>)`
2. include a _capture group_  for extraction purposes: `reg = re.compile("\d{2}.(\d{2})")`
3. use `match()` on the created regex object to create a match object: `s1 = reg.match(<string>)`
4. use `group(<n>)` on the created match object to access the first match

```python
>>> import re
>>> reg = re.compile("\d{2}\.(\d{2})")u 
>>> reg
re.compile('\\d{2}\\.(\\d{2})')
>>> s1 = reg.search("91.01 Demo B")
>>> s1
<re.Match object; span=(0, 5), match='91.01'>
>>> s1.group(1)
'01'
>>> type(s1)
<class 're.Match'>
```
