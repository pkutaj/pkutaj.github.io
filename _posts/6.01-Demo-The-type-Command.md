## usecase
The aim of this page📝is to present the `type` command in bash, noting there is no object model in bash that one may take for granted in coming from Python & Powershell. 


<!-- TOC -->

- [1. notes](#1-notes)
- [2. links](#2-links)

<!-- /TOC -->

### 1. notes
* note that `type` in bash does not tell you the type of variable you have - like `type(<name>)` in Python

> Bash doesn't have types in the same way as Python (although I would say that Python has classes rather than types). But bash variables do have attributes that are given (mostly) through declare, but the range of attributes is fairly small. You can find an attribute using declare -p, for example, declare -i creates an integer

— https://stackoverflow.com/a/29840856/11082684

* coming from posh/python then, a weird thing may happen

```
<!-- PYTHON -->
>>> greeting = "hello"
>>> type(greeting)
<class 'str'>

<!-- POSH -->
>>> $greeting = "hello"
>>> $greeting.GetType()

IsPublic IsSerial Name   BaseType
-------- -------- ----   --------
True     True     String System.Object

<!-- BASH -->
>>> greeting="hello"
>>> echo $greeting
hello
>>> type $greeting
-bash: type: hello: not found
```

* there are only **5 possible "types"** that the `type` command returns

1. `alias` → command is shell alias
2. `keyword` → command is shell reserved word
3. `function` → command is shell function
4. `builtin` → command is shell builtin
5. `file` → command is disk file

* if it is a function

```bash
$ prnt(){
>     echo "you passed me" $*
> }
$ prnt fd fdsfsd fs fdsf
you passed me fd fdsfsd fs fdsf
$ type prnt
prnt is a function
prnt ()
{
    echo "you passed me" $*
}
```

* in posh, `type` is a built-in alias for `Get-Content` aka `cat` command

### 2. links
* https://stackoverflow.com/a/69593802/11082684 
* [Type command - Linux Shell Scripting Wiki](https://bash.cyberciti.biz/guide/Type_command)
