## usecase
The aim of this page📝 is to describe hoisting as a mechanism in 3 interpreted, dynamically typed languages: JS, PowerShell and Python. 

* Tried to put a helper `_function` to the bottom of the PowerShell file so that it gets out of the way for readibility purposes and this is not working -> I knew that JavaScript would handle that OK. 

![hoisting]({{ site.url }}/assets/img003143.jpg)

LANG       | SUPPORT
-----------|--------
JS         | YES
PowerShell | NO
Python     | NO

<!-- TOC -->

- [1. javascript](#1-javascript)
- [2. python](#2-python)
- [3. powershell](#3-powershell)
- [4. links](#4-links)

<!-- /TOC -->

### 1. javascript
> JavaScript Hoisting refers to the process whereby the interpreter allocates memory for variable and function declarations prior to execution of the code.

— from https://developer.mozilla.org/en-US/docs/Glossary/Hoisting

```js
/* hoisting.js */

catName("Chloe");

function catName(name) {
  console.log("My cat's name is " + name);
}

>>> "My cat's name is Chloe"
```

### 2. python

* there is no-hoisting-at-all in python


```python
# hoisting.py

catName("Chloe")


def catName(name):
    print(f"My cat's name is {name}")
    
# >>> NameError: name 'catName' is not defined
```

### 3. powershell

* but no hoisting in powershell

```powershell
# hoisting.ps1
catName "Chloe"

function catName($name) {
    Write-Host "My cat's name is $name"
}

# >>> catName : The term 'catName' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if  a path was included, verify that the path is correct and try again.
```

### 4. links
* [Why do I need to have my functions written first in my PowerShell script? - Stack Overflow](https://stackoverflow.com/questions/3917592/why-do-i-need-to-have-my-functions-written-first-in-my-powershell-script)
* [Hoisting - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
