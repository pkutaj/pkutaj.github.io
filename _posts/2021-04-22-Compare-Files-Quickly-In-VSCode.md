## the case	
the question is, how to quickly compare two files in vscode and ideally, merge changes when needed
* I used  [beyond compare](https://www.scootersoftware.com/) at the moment to do this kind of work more fluently

## toc
<!-- TOC -->

- [1. config](#1-config)
- [2. steps](#2-steps)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. config
* color settings to work properly on my theme
```
"workbench.colorCustomizations": {
        "diffEditor.removedTextBackground": "#FF000050",
        "diffEditor.insertedTextBackground": "#ffff0035",
        ...}        
```

* I found a flow which is fastest for me, by first associating a keyboard shortcut `ctrl+shift+alt+c` to _Compare Active File With..._ 

### 2. steps
1. Open or focus **target-file** 
2. Open or focus **source-file**.
3. Press `ctrl+shift+alt+c` → a quick open menu **will be shown with target-file focused**.
4. **Press Enter**.

* Result: **source-file on left and target-file on right**

5. Proceed with `alt+f5` and return with `shift+alt+f5`

### 3. sources
* [https://stackoverflow.com/a/52300744](https://stackoverflow.com/a/52300744)
* [themes - How to change diff color Visual Studio Code - Stack Overflow](https://stackoverflow.com/questions/49036101/how-to-change-diff-color-visual-studio-code)
* [Copy/replace/add left <-> right in compare views · Issue #25887 · microsoft/vscode](https://github.com/microsoft/vscode/issues/25887)
