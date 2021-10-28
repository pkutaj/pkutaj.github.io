## usecase
The aim of this page📝 is to show the use of `[-n "$foo"]` and `[-z "$foo"]` comparison operators in bash. I am learning how to read bash and I have encountered.

```bash
if [ -z "${env_json}" ]; then
```

Which executes only if `${env_json}` evaluates to an empty string. I am also adding pieces from Powershell (posh) and python (it's PEP8 style guide).

<!-- TOC -->

- [1. bash](#1-bash)
- [2. posh and pep8](#2-posh-and-pep8)
- [3. links](#3-links)

<!-- /TOC -->

### 1. bash
* there is no built-in null variable
* there is a built-in `null` command, but that is a different story
* [Comparison Operators](https://tldp.org/LDP/abs/html/comparison-ops.html#COMPARISON-OPS) 

```
-n
   string is not null.

-z
  string is null, that is, has zero length
```

* To illustrate with an AND logical operator (`&&`) where the statement executes only if both of the clauses evaluate to true

```bash
$ foo="bar";
$ [ -n "$foo" ] && echo "foo is not null" #true > echo executes
foo is not null
$ [ -z "$foo" ] && echo "foo is null"     #false > nothing
$ foo="";
$ [ -n "$foo" ] && echo "foo is not null" #false > nothing
$ [ -z "$foo" ] && echo "foo is null"     #true > echo executes
foo is null
```
 
### 2. posh and pep8
* empty string evaluates to `False` in a test
* but it is not `$null`

```powershell
if ($foo) {echo "hello there"}
if ($null -eq $foo) {echo "hello there"}
if (-not $foo) {echo "hello there"}
>>> hello there
```
 
* there are other methods in [posh](https://thinkpowershell.com/test-powershell-variable-for-null-empty-string-and-white-space/) but I would side with Python's PEP8 (Style Guide) that the above is the best way

> For sequences, (strings, lists, tuples), use the fact that empty sequences are false

— [PEP8](https://pep8.org/#:~:text=For%20sequences%2C%20(strings%2C%20lists%2C%20tuples)%2C%20use%20the%20fact%20that%20empty%20sequences%20are%20false%3A)
 
### 3. links
* [How to check if a variable exists or is “null"](https://www.shell-tips.com/bash/if-statement/#how-to-check-if-a-variable-exists-or-is-null)
* [Shell scripting: -z and -n options with if - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/109625/shell-scripting-z-and-n-options-with-if/109631)
* [Other Comparison Operators](https://tldp.org/LDP/abs/html/comparison-ops.html)
* [Test PowerShell Variable for Null, Empty String, and White Space](https://thinkpowershell.com/test-powershell-variable-for-null-empty-string-and-white-space/)
* [PEP 8: The Style Guide for Python Code](https://pep8.org/#:~:text=For%20sequences%2C%20(strings%2C%20lists%2C%20tuples)%2C%20use%20the%20fact%20that%20empty%20sequences%20are%20false%3A) 
* [What is the Bash Null Command?](https://www.shell-tips.com/bash/null-command/)
