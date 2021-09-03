## usecase
The aim of this tutorial🔍 is to

<!-- TOC -->

- [1. instructions](#1-instructions)
- [2. JSON minifier](#2-json-minifier)
- [3. on separators keyword](#3-on-separators-keyword)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. instructions
* enclose the whole code section in `"` - so that you evaluate special characters
* use `'` for quotes within the code section
* use ``n` as line separators
* use ``t` as tab character essential for python indentation

### 2. JSON minifier

```
python -c "import json`nimport sys`nwith open(sys.argv[1], 'r') as f:`n`tprint(json.dumps(json.load(f), separators=(',',':')))" file.json
```

### 3. on separators keyword
- If specified, separators should be an `(item_separator, key_separator)` tuple. 
- The default is `(', ', ': ')` if indent is `None` and `(',', ': ')` otherwise. 
- To get the most compact JSON representation, you should specify `(',', ':')` to eliminate whitespace.

— https://docs.python.org/3/library/json.html


### 4. sources
* [Minifying JSON with Python - Jamie Tanna - Software Engineer](https://www.jvt.me/posts/2019/11/23/minify-json-python/)
