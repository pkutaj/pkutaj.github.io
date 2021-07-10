## usecase
The aim of this playbook🏁 is to try to standardize a simple use of argparse module in Python for passing named arguments from CLI (PowerShell in my case). This is used mostly within PowerShell scripts to improve readability. 

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)

<!-- /TOC -->

### 1. steps/notes
1. import argparse module
2. use if `__name__ == "__main__": main()` pattern to execute from terminal
3. parse arguments within the `main()` function that has no parameters as all
4. define an `init_argparse()` function:
5. create a parser object by calling `argparse.ArgumentParser()`
6. declare one or more argumnent with `parser.add_argument("--<long_param_name>")`
7. return parser
8. parse args by creating an args object by calling `parser.parse_args()`
9. define a function proper with `param1`, `param2`, ...
10. call function_proper with params being assigned as attributes of an args object. e.g. `function_proper(param1=args.param1, param2=args.param2)`
11. within a shell call the module with named arguments:
    - e.g. `python foobar.py --param1="foo" --param2=="bar"`

```python
#file: foobar.py
import argparse

def function_proper(param1, param2) -> None:
    #CODE...

def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser()
    parser.add_argument("--param1")
    parser.add_argument("--param2")
    return parser


def main() -> None:
    parser = init_argparse()
    args = parser.parse_args()
    function_proper(param1=args.param1, param2=args.param2)


if __name__ == "__main__":
    main()
```
