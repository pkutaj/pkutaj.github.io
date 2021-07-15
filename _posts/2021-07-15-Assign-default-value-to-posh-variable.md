## usecase
The aim of this playbook🏁 is to demonstrate the assignment of a default value to a variable of a powershell function.

<!-- TOC -->

- [1. answer](#1-answer)
- [2. example](#2-example)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. answer
* use `param` keyword
* put the the `$paramName = defaultValue` into parenthesis right after the code block begins
* use `function <funcName> {param($foo = <defaultValue>) <code>}`

### 2. example
* the example function opens [The Most Dangerous Writing App](https://www.squibler.io/dangerous-writing-prompt-app) with the duration of 1 minute

```powershell
function start-writing {
    param($len = 1)
    $url = "https://www.squibler.io/dangerous-writing-prompt-app/write?limit=$len&type=minutes"
    start chrome $url
}
```

### 3. sources
* [Designing Professional Parameters - powershell.one](https://powershell.one/powershell-internals/attributes/parameters)
* [The Most Dangerous Writing App](https://www.squibler.io/dangerous-writing-prompt-app)
