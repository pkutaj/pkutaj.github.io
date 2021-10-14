## usecase
The aim of this page📝 is to compare positional args handling in bash and PowerShell. 

<!-- TOC -->

- [1. bash](#1-bash)
    - [all args with $*](#all-args-with-)
    - [one arg with $<n>](#one-arg-with-n)
- [2. posh](#2-posh)
    - [all args with $args](#all-args-with-args)
    - [one $args[n]](#one-argsn)
- [3. links](#3-links)

<!-- /TOC -->

### 1. bash
#### all args with $*
* `$*` is a special variable holding all of the passed arguments to the script via CLI
* this is knowledge from the bible - he knew _her_ 
    - in posh there are 

```bash
prnt(){
    echo "you passed me" $*
}
>>> prnt  fd fd dssddd fdfd
you passed me fd fd dssddd fdfd
```

#### one arg with $<n>
* `$1` is a special variable that denotes the first arg passed to the script via CLI

```bash
prnt(){
    echo "you passed me" $1
}
>>> prnt  fd fd dssddd fdfd
you passed me fd
```

### 2. posh
#### all args with $args
* in PowerShell you don't number the arguments passed, those go into `$args` array and you can iterate over them


```powershell
Function search-google {
    $query = 'https://www.google.com/search?q='
    $args | % { $query = $query + "$_+" }
    $url = $query.Substring(0, $query.Length - 1)
    start "$url"
}
>>> search-google hello my friends
```

#### one $args[n]

```powershell
function prr() {write-host $args[0]}
# prr rr tt ss
# >>> rr
```

### 3. links
* https://stackoverflow.com/a/28099707/11082684
* [Powershell — about Automatic Variables](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_automatic_variables?view=powershell-7.1)
