## usecase
The aim of this page📝 is demonstrate the syntax for python unit tests (pytest) that pass if an exception is thrown as expected. 
I have a function `validate_and_capitalize` where I pass a `section_name` and `section_folders` and I need to test if when an improper value is passed, the `ValueError` with given message is raised. 
 

<!-- TOC -->

- [1. code](#1-code)
- [2. links](#2-links)

<!-- /TOC -->

### 1. code

```python
import pytest
def test_validate_and_capitalize():
    section_folders = get_and_print_ZD_Guide_structure()
    section_name = "47 snow"
    with pytest.raises(Exception) as e:
        validate_and_capitalize(section_name, section_folders)
    assert "Provided section id does not seem to be incremeting an existing one" in str(e.value)
    assert e.type == ValueError
```

1. import `pytest`
2. pass `pytest.raises(Exception)` into `with` statement 
4. in the block, call the function that is expected to fail
5. assert exception type with `e.type == <exception_type>`, e.g. `assert e.type == ValueError`
6. if needed, assert error message `assert "<error_msg>" in str(e.value)`, e.g. 

### 2. links
* [How to Check if an Exception Is Raised (or Not) With pytest](https://miguendes.me/how-to-check-if-an-exception-is-raised-or-not-with-pytest)
* [Context Managers and Python's with Statement – Real Python](https://realpython.com/python-with-statement/)
* https://realpython.com/python-with-statement/#testing-for-exceptions-with-pytest
