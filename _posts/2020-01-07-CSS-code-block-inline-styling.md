---
layout: post
title: CSS > inline styling of code blocks
---
## the case	
When using a **code block** in WYSIWYG editors (Zendesk Guide here), publishing it in just a few lines but too wide & with the scroll-bar — is a really **user-unfriendly**. This case solves turning the wide blocks into friendly elements. 

![element_too_wide]({{ site.url }}/assets/2020-01-07-too-wide.gif)


## findings
* this situation is usually handled in the central CSS stylesheet 
* But these rules can be overwritten with `style="foobar"` in HTML itself (known as **inline styling**) 
* In this case, apply 

```html
<pre style="white-space: pre-wrap">foobar</pre> 
```
* from the weeds: WYSIWYG uses incorrect mark-up (not just in this case), as there should be 

![pre_tag]({{ site.url }}/assets/2020-01-07-pre-tag.png)


```html
<pre><code>foobar</code></pre> 
 ```

![pre_tag_done]({{ site.url }}/assets/2020-01-07-pre-tag-finished.png)

* **note:** this may **not work** for actual snippets of code, as line breaks may deform the syntax ! it's working perfectly in this dump / log, though

### sources 
* [https://www.sitepoint.com/everything-need-know-html-pre-element/](https://www.sitepoint.com/everything-need-know-html-pre-element/)
* [white-space - CSS: Cascading Style Sheets - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
* [\<pre\>: The Preformatted Text element - HTML: Hypertext Markup Language - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)
