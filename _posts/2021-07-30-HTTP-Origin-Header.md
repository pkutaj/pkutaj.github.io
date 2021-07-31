## usecase
The aim of this explainer💡 is to conceptualize HTTP origin header because I work with a product that calculates/returns a server-side cookie with all its attributes based on its value. 

![]({{ site.url }}/assets/img003020.jpg)

<!-- TOC -->

- [1. notes](#1-notes)

<!-- /TOC -->

### 1. notes
* indicates where a request originates from
* doesn't include path information
* is similar to the Referer header, but, unlike that header, it doesn't disclose the whole path.
* **browsers** add the Origin request header to:
    - all cross origin requests
    - same-origin requests except for GET or HEAD requests 
    - i.e. they are added to same-origin POST, OPTIONS, PUT, PATCH, and DELETE requests
