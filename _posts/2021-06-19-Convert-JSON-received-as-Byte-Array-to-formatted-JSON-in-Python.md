## usecase
The aim of this playbook🏁 is to outline steps for converting data received with `requests.get` into proper `json` format with `json` module. 

<!-- TOC -->

- [1. steps/notes](#1-stepsnotes)
- [sources](#sources)

<!-- /TOC -->

### 1. steps/notes
1. import json module
2. transform `foo_bytes` into `bar_json` by 
    - UTF-8 bytes → Unicode
    - converting single quotes → double quotes 
    
    ```python
    import json
    bar_json = foo_bytes.decode('utf8').replace("'", '"')
    ```
    
3. load the JSON to a Python list `json.loads(bar_json)`
4. dump it back out as formatted JSON with `json.dumps(acme_data, indent=4, sort_keys=True)`

```python
import json

foo_bytes = b'[{\'Date\': \'2016-05-21T21:35:40Z\', \'CreationDate\': \'2012-05-05\', \'LogoType\': \'png\', \'Ref\': 164611595, \'Classe\': [\'Email addresses\', \'Passwords\'],\'Link\':\'http://some_link.com\'}]'
bar_json = my_bytes_value.decode('utf8').replace("'", '"')
print(my_json)
print('- ' * 20)
acme_data = json.loads(bar_json)
barbar_json = json.dumps(data, indent=4, sort_keys=True)
print(s)
```

### sources
* <https://stackoverflow.com/a/40060181/11082684>
