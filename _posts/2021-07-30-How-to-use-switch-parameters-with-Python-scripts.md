## usecase
The aim of this page📝is to find how to use switch parameters when calling python scripts from CLI

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)
- [2. store-true and store false parameter](#2-store-true-and-store-false-parameter)
- [3. what about the first argument being positional](#3-what-about-the-first-argument-being-positional)
- [4. CODE](#4-code)

<!-- /TOC -->

### 1. steps/notes
* you want to run `python run.py <job> -t -s`
* `-t` and `-s` should get no arguments
* `<job>` should not get no flag
* this is like a switch parameter `function foo ([switch]$var)` in PowerShell

### 2. store-true and store false parameter
* where adding an argument within `def init_argparse() -> argparse.ArgumentParser:`

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-w', action='store_true')
```

* `action='store_true'` implies `default=False` implies argument is `False` when not passed
* `action='store_false'` implies `default=True` implies argument is `True` when not passed   

### 3. what about the first argument being positional
* this seems to be working

```python
parser.add_argument("job")
```

### 4. CODE

```python
def xo(pipeline, cluster_type):
    #CODE

def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser()
    parser.add_argument("job")
    parser.add_argument("-t", action="store_true")
    parser.add_argument("-p", action="store_true")
    return parser

def main() -> None:
    parser = init_argparse()
    args = parser.parse_args()
    pipeline = args.job
    
    if args.t:
        cluster_type = "transient"
    if args.p:
        cluster_type = "persistent"

    xo(pipeline, cluster_type)


if __name__ == "__main__":
    main()
```
