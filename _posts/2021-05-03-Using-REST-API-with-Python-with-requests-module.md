## usecase
The aim of this how-to-guide🏁 is to demo the essential use of the invokation of REST API request with the help of requests module

<!-- TOC -->

- [1. steps/?](#1-steps)
- [2. example](#2-example)

<!-- /TOC -->

### 1. steps/?
1. install with pip with `python -m pip install requests`
2. import `import requests`
3. assign/run `response = requests.<method>(<url>, auth=(user, token))`
4. ... and don't forget proper exception handling, wonderfully covered in <https://stackoverflow.com/a/16511493/11082684>

* **NOTE:** there is 1 response object — VS — 7 methods callable with on `requests` class: 
- `request`
- `head`
- `get`
- `post`
- `put`
- `patch`
- `delete`


### 2. example
* archives a Zendesk HelpCenter article if its id is passed
* if unauthorized, prints a prompt to handle local setup properly
* other issues, just print out an error with the base class exception

```python
def delZDarticle(article_id):
    cafile = "cacert.pem"
    user = os.environ['ZENDESK_USER']
    token = os.environ['ZENDESK_PASS']
    docURL_Const = "https://foo.zendesk.com/api/v2/help_center/en-us/articles"
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
