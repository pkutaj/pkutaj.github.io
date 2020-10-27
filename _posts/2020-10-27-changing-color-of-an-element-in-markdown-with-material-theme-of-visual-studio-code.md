---
layout: post
title:
categories: []
---

## usecase	
the puzzle is, how to change a single selected color in the editor, in this case the color of text for inline code highlighted with a backtick (`hello world`)

<!-- TOC -->

- [1. inspect editor tokens and scopes](#1-inspect-editor-tokens-and-scopes)
- [2. open settings.json](#2-open-settingsjson)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. inspect editor tokens and scopes
* go to the element in question
* run `Developer: Inspect Editor Tokens and Scopes`
* open 

![change_color_of_selected_element]({{ site.url }}/assets/img002125.png)

* get the name of the **SCOPE** in this case

```
markup.inline.raw.string.markdown
```

### 2. open settings.json
* open `settings.json` 
    * note I have to open settings (`ctrl` + `,` ) and click open settings button in the upper right corner
* insert

```json
 "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "markup.inline.raw.string.markdown",
                "settings": {
                    "foreground": "#f88253",
                }
            }
```

* save
* done

![done_change_applied]({{ site.url }}/assets/img002127.png)

### 3. sources
* [Change highlight text color in Visual Studio Code - sStack Overflow](https://stackoverflow.com/questions/35926381/change-highlight-text-color-in-visual-studio-code)
