---
layout: post
title: SQL > Identity columns
---
## the case	of identity columns
the question is the concept and role of an **IDENTITY COLUMNS** in SQL server

## findings
* **IDENTITY COLUMN** is a column whose value increases automatically and whose value is created by the server
    * users **CANNOT** usually enter values here
    * it is used to **UNIQUELY IDENTIFY ROWS** (primary key)
    * in MS SQL, you provide **SEED** (starting point) and **INCREMENT** (e.g. +1)
    * [SQL Server IDENTITY System Function Comparison](https://www.mssqltips.com/sqlservertip/5079/sql-server-identity-system-function-comparison/)

![sql_identity_column]({{ site.url }}/assets/2020-03-09-sql-identity-column.gif)