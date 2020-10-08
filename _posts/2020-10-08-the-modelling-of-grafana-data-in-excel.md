---
layout: post
title:
categories: []
---
## usecase
The concern is documenting how I export `.csv` with AWS Redshift's data from Grafana to Excel to squeeze insights into its future development

<!-- TOC -->

- [1. Grafana-Extract](#1-grafana-extract)
- [2. Excel-Transform](#2-excel-transform)
    - [2.1. Separation of values](#21-separation-of-values)
- [3. Aim: diff of MAX and MIN](#3-aim-diff-of-max-and-min)
- [4. Messy way: Subtotals: Multiple variables stored in one column](#4-messy-way-subtotals-multiple-variables-stored-in-one-column)
- [5. Difficult way: Pivot tables](#5-difficult-way-pivot-tables)
- [6. Aim: Tidy Data](#6-aim-tidy-data)
    - [6.1. MAX & MIN Array functions](#61-max--min-array-functions)
    - [6.2. Aggregate](#62-aggregate)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. Grafana-Extract
* extract csv from grafana to excel

![average_exported_as_csv]({{ site.url }}/assets/img001978.png)

### 2. Excel-Transform
#### 2.1. Separation of values
* open in excel
* data -> columns to filter time

![prepare_sheet]({{ site.url }}/assets/img001979.png)

### 3. Aim: diff of MAX and MIN
* why ? to see if the daily delta is not changing
* there are data modelling jobs that may be taking more and more space
* the other hypothesis of getting the disk full is that there is simply more data put into the warehouse

### 4. Messy way: Subtotals: Multiple variables stored in one column

![messy_subtotals]({{ site.url }}/assets/img001980.png)

### 5. Difficult way: Pivot tables

![pivot_table]({{ site.url }}/assets/img001982.png)

> But suppose that I want to see the difference between Max and Min. Surely there is somewhere to enter the formula ‘=Max – Min’ (or possibly something like ‘=Values.Max – > Values.Min’). But where?
> 
> It’s not a Calculated Field, since that is essentially a calculated column on the data table. I could, for example, have a field ‘= Sales / Contacts’.
> 
> It’s not a Calculated Item, since that aggregates values for dimension members. For example, I could aggregate Jan+Feb+Mar into a Q1 value. I could even do differences, for example, Jul-Dec minus Jan-Jun. However, although the Min and Max Values (fields) appear as column headers, they are not a dimension.

— From [Pivot Table Calculated Column? — Roy MacLean's VBA Blog](https://roymacleanvba.wordpress.com/2010/09/30/pivot-table-calculated-column/)

### 6. Aim: Tidy Data
> Tidy data is a standard way of mapping the meaning of a dataset to its structure. A dataset is
> messy or tidy depending on how rows, columns and tables are matched up with observations,
> variables and types. In tidy data:
> 1. Each variable forms a column.
> 2. Each observation forms a row.
> 3. Each type of observational unit forms a table

— From [Tidy Data](https://vita.had.co.nz/papers/tidy-data.pdf)

#### 6.1. MAX & MIN Array functions
* put mix and min values as separate columns and calculate a difference between then

```
=MAX(IF(A2=A:A,C:C,""))
=MIN(IF(A2=A:A,C:C,""))
```

![max_min_diff]({{ site.url }}/assets/img001984.png)

#### 6.2. Aggregate
* the daily average has increased by 10%
* this is what you are after -> there is no **TENDENCY** in the data (the diff is not growing)

![daily_aggregate_from_hourly_data]({{ site.url }}/assets/img001985.png)

### 7. sources
* [Tidy Data](https://vita.had.co.nz/papers/tidy-data.pdf)
* [Pivot Table Calculated Column? — Roy MacLean's VBA Blog](https://roymacleanvba.wordpress.com/2010/09/30/pivot-table-calculated-column/)
