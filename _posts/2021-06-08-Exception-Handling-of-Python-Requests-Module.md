## usecase
The aim of this playbook🏁 is to outline general steps for exception handling of Python requests module.

<!-- TOC -->

- [1. Steps](#1-steps)
- [2. Contexts](#2-contexts)
    - [2.1. error types and 2 notes](#21-error-types-and-2-notes)
    - [2.2. Stack Overflow Example](#22-stack-overflow-example)
    - [2.3. Personal example](#23-personal-example)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. Steps
1. create & assign a response object within a try block
2. call `response.raise_for_status()` right underneath (for 4xx & 5xx)
3. create an exception block with `requests.exceptions.RequestException` base class
4. pretty print out the exception

```python
import requests
import sys
url = "http://example.com"
try:
    response = requests.get(url,...)
    response.raise_for_status()
except requests.exceptions.RequestException as e:  # This is the correct syntax
    print(e, file=sys.stderr)
```

### 2. Contexts
#### 2.1. error types and 2 notes
* Have a look at the [Requests exception docs](https://requests.readthedocs.io/en/latest/user/quickstart/#errors-and-exceptions) - 
* Memorize these four exception types
* If need be, dedicate an exception block to each 

NR | TYPE               | COMMENT
---|--------------------|-----------------------------------------------------------------------------------------------
1  | `ConnectionError`  | network problem (DNS failure, refused connection, etc)
2  | `HTTPError`        | rare invalid HTTP response or regular unsuccesful (4xx/5xx) with `Response.raise_for_status()`
3  | `Timeout`          | request times out
4  | `TooManyRedirects` | request exceeds the configured number of maximum redirections

* **NOTE1**: `HTTPError` is also raised by `Response.raise_for_status()` if the HTTP Request returned an unsuccesful status code (4xx or 5xx)
* **NOTE2**: exceptions that Requests explicitly raises inherit from `requests.exceptions.RequestException`

#### 2.2. Stack Overflow Example

```python
try:
    r = requests.get(url, params={'s': thing})
except requests.exceptions.Timeout:
    # Maybe set up for a retry, or continue in a retry loop
except requests.exceptions.TooManyRedirects:
    # Tell the user their URL was bad and try a different one
except requests.exceptions.RequestException as e:
    # catastrophic error. bail.
    raise SystemExit(e)
```

#### 2.3. Personal example

```python
def delZDarticle(article_id):
    cafile = "cacert.pem"
    user = os.environ['ZENDESK_USER']
    token = os.environ['ZENDESK_PASS']
    docURL_Const = "https://example.zendesk.com/api/v2/help_center/en-us/articles"
    try:
        response = requests.delete(f"{docURL_Const}/{article_id}",
                                   auth=(user, token), verify=cafile)
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(" ERROR ".center(80, "-"))
        print(e, file=sys.stderr)
        print("~~> make sure you have ZENDESK_USER and ZENDESK_PASS values in your environmental variables.")
    except requests.exceptions.RequestException as e:
        print(e, file=sys.stderr)
```

### 3. sources
* <https://stackoverflow.com/a/16511493/11082684>
* [Requests exception docs](https://requests.readthedocs.io/en/latest/user/quickstart/#errors-and-exceptions)
