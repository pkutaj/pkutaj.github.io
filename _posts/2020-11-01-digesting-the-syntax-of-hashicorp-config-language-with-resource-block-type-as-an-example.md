---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the analysis of the hcl syntax when encountered for the first time

```
### Mr Paul ###
resource "google_project_iam_member" "mrPaul_bigquery_dataeditor" {
  role   = "roles/bigquery.dataEditor"
  member = "user:mrPaul@gmail.com"
}

resource "google_project_iam_member" "mrPaul_bigquery_jobuser" {
  role   = "roles/bigquery.jobUser"
  member = "user:mrPaul@gmail.com"
}
```

<!-- TOC -->

- [1. block and block types](#1-block-and-block-types)
- [2. resource: instance of block type](#2-resource-instance-of-block-type)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. block and block types
* **block** is a container
* there are particular **types** of blocks
* block types differ in number of **required labels** (0 and more)

### 2. resource: instance of block type

![resource_block_type_syntax]({{ site.url }}/assets/img002145.png)

STEP# | CODE                            | COMMENT
------|---------------------------------|-----------------------------------------------------------
01    | `resource`                      | block type
02    | `"google_project_iam_member"`   | resource type
03    | `"mrPaul_bigquery_dataeditor"`  | resource local name — for reference within the same module
04    | `{..`                           | start of the block body
05    | `role=..`                       | identifier - argument name
06    | `.."roles/bigquery.dataEditor"` | expression - argument value
07    | `member`                        | identifier - argument name
08    | `.."user:mrPaul@gmail.com"`     | expression - argument value

```
resource "google_project_iam_member" "mrPaul_bigquery_dataeditor" {
  role   = "roles/bigquery.dataEditor"
  member = "user:mrPaul@gmail.com"
}
```

### 3. sources
* [Syntax - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/syntax.html)
* [Resources - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/resources.html)
