---
layout: post
title: Get String as an Argument Without Quotes Necessary
categories: [powershell]
---
## usecase
The concern is documenting the Powershell's pattern to accept an argument as `[string]` with multiple words without quotes necessary. 

<!-- TOC -->

- [1. search-google](#1-search-google)
- [2. convert to filename](#2-convert-to-filename)

<!-- /TOC -->

### 1. search-google 

```powershell
Function search-google {
    $query = 'https://www.google.com/search?q='
    $args | % { $query = $query + "$_+" }
    $url = $query.Substring(0, $query.Length - 1)
    start "$url"
}
```

* this works

### 2. convert to filename

* the aim here is to pass a string say

```
90.1 Sparse is Better than Beautiful
```

* and get copied to clipboard

```
90.1-Sparse-is-Better-than-Beautiful.md
```

* this was my old way - with quotes necessary around the argument

```powershell
function convertTo-filename ($docTitle) {
    $filename = ("$docTitle" -replace "\s", "-") -replace ".+", "$&.md"
    $filename | clip
    Write-Host "$filename clipped" -ForegroundColor Darkcyan
}
```

```
▶ convertTo-filename "90.1 Sparse is Better than Beautiful"
90.1-Sparse-is-Better-than-Beautiful.md clipped
```

* new

```powershell
function convertTo-filename {
    $docTitle = ""
    $args | % {$docTitle += "$_ "}
    $docTitle = $docTitle.substring(0, $docTitle.Length - 1)
    $filename = ("$docTitle" -replace "\s", "-") -replace ".+", "$&.md"
    $filename | clip
    Write-Host "$filename clipped" -ForegroundColor Darkcyan
}
```

```
▶ convertTo-filename 90.1 Sparse is Better than Beautiful
90.1-Sparse-is-Better-than-Beautiful.md clipped
```
