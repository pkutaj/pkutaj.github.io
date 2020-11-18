---
layout: post
title:
categories: []
---

## usecase
The concern is documenting getting consul queries in grafana

<!-- TOC -->

- [1. variables](#1-variables)
- [2. create consul datasource](#2-create-consul-datasource)
- [3. create consul query](#3-create-consul-query)
- [4. queries](#4-queries)
    - [4.1. navigation: no whitespace, relative paths](#41-navigation-no-whitespace-relative-paths)
    - [4.3. retrieve key directly](#43-retrieve-key-directly)
    - [4.4. get selected keys from a parent node](#44-get-selected-keys-from-a-parent-node)
    - [4.5. columns](#45-columns)

<!-- /TOC -->


### 1. variables
### 2. create consul datasource
* create a `Consul` variable as a `datasource` type → select `Consul`
* difference is that here, you can use also **KEYS** (not tree leaves) as values

![add_consul_as_datasource]({{ site.url }}/assets/img001992.png)

### 3. create consul query
* create a `ConsulQuery` variable as a `query` → select `$Consul` as a datasource
* but how could I create the queries made out of variables - well, most probably 
* you have to be using those, the only variable I can think of is, however, only customer, can you create another one

![{{ site.url }}/assets/img001993.png]({{ site.url }}/assets/img001993.png)

### 4. queries
* You can just query consul 
* here I would like to know now many nodes each client has in their ES cluster

#### 4.1. navigation: no whitespace, relative paths
* in columns, **no spaces are allowed**
* navigate with **relative paths**

#### 4.3. retrieve key directly

![storage_size]({{ site.url }}/assets/img001986.png)

#### 4.4. get selected keys from a parent node
* either select a leaf such as

```
customer/${customer}/aws_elasticsearch_prod1/input/volume_size
```

* and then add another leaves to is in columns

```
./,../instance_count/,../instance_type/
```

![select_one_add_more]({{ site.url }}/assets/img001996.png)

#### 4.5. columns
* seems like that is going from the query

![storage_size]({{ site.url }}/assets/img001988.png)

* so if you query

```
customer/*/aws_setup_prod1/input/client_name
```

* you put the following as columns

```
./,../uuid
```

* to have the result of the query as a columns in and of itself, use `./`

![getting_the_paths_correct]({{ site.url }}/assets/img001989.png)
