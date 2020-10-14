---
layout: post
title:
categories: []
---
## usecase
The concern is documenting using the queried DNS names in grafana dropdowns — to filter them as variables

<!-- TOC -->

- [steps](#steps)

<!-- /TOC -->

### steps
* create a _datasource type_ variable such as `Client` for `Cloudwatch`
* create a _query type_ variable against that datasource with the exemplary syntax

STEP# | CODE                 | COMMENT
------|----------------------|------------
01    | `dimension_values`   | const
02    | `default`            | region
03    | `AWS/ApplicationELB` | namespace
04    | `RequestCount`       | metric Name
05    | `LoadBalancer`       | dimensions

```
dimension_values(default,AWS/ApplicationELB,RequestCount,LoadBalancer)
```

![create_var_for_dimension_values]({{ site.url }}/assets/img002039.png)

* refer to the `dimension_value` in the _Dimension_ field with the variable with `$` prefix, e.g. `$ALB` 

![using_var_from_dropdown]({{ site.url }}/assets/img002038.png)
