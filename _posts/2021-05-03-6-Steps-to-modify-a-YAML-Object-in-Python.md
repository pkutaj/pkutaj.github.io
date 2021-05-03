## usecase
The aim of this how-to-guide🏁 is to create a memorable 6-step instruction for the modification of a YAML file. 
I am using [oyaml · PyPI](https://pypi.org/project/oyaml/) to work with yaml objects in Python to keep the order or `yaml` items identical before and after manipulations. 

<!-- TOC -->

- [1. steps](#1-steps)
- [2. example](#2-example)

<!-- /TOC -->

### 1. steps

1. `import oyaml as yaml`
2. access resource in read mode `with open(<file>, rt, utf8) as <fileAlias>:`
3. create `<object>` by loading the existing yaml with `<object> = yaml.load(<fileAlias>, Loader=yaml.Loader)`
4. modify `<object>` and close the block
5. access resource in a write mode: `with open(<file>, wt, utf8) as <fileAlias>:`
6. dump object back to `<fileAlias>.write(yaml.dump(<object>))` and close the block

### 2. example

```python
import oyaml as yaml                                                    #1
def enrichConfig(section, docIndexItem):
    with open('index.yaml', mode='rt', encoding='utf-8') as indexFile:  #2
        indexObject = yaml.load(indexFile, Loader=yaml.Loader)          #3
    for indexSection in indexObject['sections']:                        #4  
        if (indexSection['name'] == section):                           #4
            indexSection['articles'].append(docIndexItem)               #4
    # print(yaml.dump(indexObject))
    with open('index.yaml', mode='wt', encoding='utf-8') as conf_updated: #5  
        conf_updated.write(yaml.dump(indexObject))                      #6
```
