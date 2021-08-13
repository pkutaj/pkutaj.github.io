## usecase
The aim of this playbook🏁 is to define the use of an anchor link with Markdown, i.e. link within the same page. 

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)

<!-- /TOC -->

### 1. steps/notes
* Create a link with markdown syntax referencing an id within the page 

```markdown 
[go to chapter one](#chapter-1)
```

* Use a regular HTML to insert an anchor point with that id

```markdown
<a id="chapter-1"></a>Chapter 1
```

* You can put the anchor point within a heading

```markdown
### <a id="chapter-1"></a>Chapter 1 
```
