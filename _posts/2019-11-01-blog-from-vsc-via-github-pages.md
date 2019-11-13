---
layout: post
title: VSCODE | blogging from the code editor
last_modified_at: 2019-11-12
---
## the case	
* the question is, how to create a **"worklog"** with the following "stack"
    * powershell
    * markdown
    * quicktextpaste
    * visual studio code
    * jekyll
        * lunr.js
    * github pages

## toc 

- [visual studio code & powershell](#visual-studio-code--powershell)
- [jekyll and github pages](#jekyll-and-github-pages)
    - [Add Search with lunr.js](#add-search-with-lunrjs)
    - [Custom CSS](#custom-css)
    - [Add Last Modified Date](#add-last-modified-date)

## findings
### visual studio code & powershell
* Create a template for your articles and save it into a `template.md` folder in your workspace

#### blog article template

```markdown
---
layout: post
title:
last_modified_at: 
---
## the case	
the question is, 

## toc
* <!-- autocreate with ctrl+m t with auto markdown toc extension-->

## findings
* 

## terminology
*
 
## sources
```

* Open `tasks.json` and create a task that overwrites the newly created file with the template
    * I am using Powershell as a default shell

```JSON
{
      "label": "new internalKB doc", //for kb
      "type": "shell",
      "command": "copy-item ${workspaceFolder}\\docs\\templates\\personalKBTemplate.md ${file}"
    }
``` 

* Open `keybindings.json` and assign a key shortcut to the task above to run the task instantly

```JSON
 {
        "key": "ctrl+alt+shift+o",
        "command": "workbench.action.tasks.runTask",
        "args": "new internalKB doc"
    }
```

* Open the powershell `$profile` and create an alias to navigate to the blog folder instantly (I am using the shortcut `lg`)

```powershell
Function open-blog { Set-Location -Path "C:\Users\$env:USERNAME\Documents\workspace\XO\logs\pkutaj\_posts" }
Set-Alias lg open-blog
```

![image creation]({{ site.url }}/assets/2019-11-01.gif)

* I am also using [QuickTextPaste](https://www.softwareok.com/?seite=Microsoft/QuickTextPaste)to paste a curent date with a key-binding as the page needs to have the syntax beginning with `yyyy-mm-dd`
* Powershell aliases for `new-item` ➔ `ni` and `invoke-item` ➔ `ii` are used as well. 
* [Markdown extensions](https://github.com/pkutaj/kb/blob/master/vsc/markdown_the_great.md) are utilized heavily as well. 

### jekyll and github pages
* There a bunch of tutorials out there already, I followed [How to Start a Jekyll Blog on GitHub Pages for Free](https://onextrapixel.com/start-jekyll-blog-github-pages-free/)
* More interestingly, I do use the local instance of jekyll as an internal knowledge base for non-shareable (confidential) things

#### Add Search with lunr.js
* Add `lunr.js` as a [local fast search](https://jekyllcodex.org/without-plugin/search-lunr/).
    * From my experience is editting of `search-lunr.html` from VSCODE 
    * Use `ctrl+k ctrl+shift+s` to save without formatting on save    
    * Use `#lunrsearch` for styling

#### Custom CSS   
* Shout out to Tom Kadwill for this:
    * https://tomkadwill.com/2017/12/16/how-to-override-css-styles-in-jekyll.html
    * again, in my vscode the format on save is breaking the functionality of `scss`
    * saving with `ctrl+k ctrl+shift+s`

#### Add Last Modified Date
* I am constantly cultivating and cleaning the texts, documentation and code
* So the absolute focus on brand new stuff goes against this 
* Found the post [Adding last modified date to Jekyll](https://tomkadwill.com/adding-last-modified-date-to-jekyll) explaining how to enrich the blog with **last udpated date**

## sources
* [How to Start a Jekyll Blog on GitHub Pages for Free](https://onextrapixel.com/start-jekyll-blog-github-pages-free/)
* [Search with Lunr.js](https://jekyllcodex.org/without-plugin/search-lunr/#)
* [Adding last modified date to Jekyll](https://tomkadwill.com/adding-last-modified-date-to-jekyll)
* [How to Override CSS Styles in Jekyll](https://tomkadwill.com/2017/12/16/how-to-override-css-styles-in-jekyll.html)