## usecase
The aim of this how-to-guide🏁 is to be a go-to for Python Requests Module exception handling

<!-- TOC -->

- [1. 4 error types and 2 notes](#1-4-error-types-and-2-notes)
- [2. Base Class Exception](#2-base-class-exception)
- [3. Stack Overflow Example](#3-stack-overflow-example)
- [4. Personal example](#4-personal-example)
- [5. sources](#5-sources)

<!-- /TOC -->

### 1. 4 error types and 2 notes
* Have a look at the [Requests exception docs](https://requests.readthedocs.io/en/latest/user/quickstart/#errors-and-exceptions) - 
* Memorize these four exception types

NR | TYPE               | COMMENT
---|--------------------|----------------------------------------------------------------------------
1  | `ConnectionError`  | network problem (DNS failure, refused connection, etc)
2  | `HTTPError`        | rare invalid HTTP response or more often with `Response.raise_for_status()`
3  | `Timeout`          | request times out
4  | `TooManyRedirects` | request exceeds the configured number of maximum redirections

* **NOTE1**: `HTTPError` is also raised by `Response.raise_for_status()` if the HTTP Request returned an unsuccesful status code (4xx or 5xx)
* **NOTE2**: exceptions that Requests explicitly raises inherit from `requests.exceptions.RequestException`

### 2. Base Class Exception
* You can either catch the base-class exception, which will handle all cases:

```python
try:
    r = requests.get(url, params={'s': thing})
except requests.exceptions.RequestException as e:  # This is the correct syntax
    raise SystemExit(e)
```

### 3. Stack Overflow Example
* Or you can catch them separately and do different things.

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

### 4. Personal example

```python
def delZDarticle(article_id):
    cafile = "cacert.pem"
    user = os.environ['ZENDESK_USER']
    # token = os.environ['ZENDESK_PASS']
    token = "7elCpPNAe7dOcKoqIrP3GEeWC7KYpUrk5J3A7xv"  # incorrect for now for testing
    docURL_Const = "https://snowplow.zendesk.com/api/v2/help_center/en-us/articles"
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

### 5. sources
* <https://stackoverflow.com/a/16511493/11082684>
* [Requests exception docs](https://requests.readthedocs.io/en/latest/user/quickstart/#errors-and-exceptions)
