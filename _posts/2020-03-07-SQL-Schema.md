---
layout: post
title: SQL > On Schemas
categories: [sql]
---
## the case	
the question is, what is **SCHEMA** in the context of SQL server

## toc
<!-- TOC -->

- [sources](#sources)

<!-- /TOC -->

## findings
* A Schema is a  **logical group of tables, procedures, views**. 
    * E.g. all employee-related objects in the employee schema
* Introduced in SQL 2005
* Tt's like a sub-structure outlining a relationship between tables in a DB
* The syntax is, therefore `[DATABASE].[SCHEMA].[TABLE].[COLUMN]`
* associated with a username, with a **SCHEMA OWNER**
* belonging to 1 database (many-1 relationship)
* there are default schemas, usually `dbo`
* the function is a schema segregate DB objects for 
    * different applications
    * access rights
    * managing security administration of databases

![db schemas]({{ site.url }}/assets/img000569.png)

### sources
* [What good are SQL Server schemas? - Stack Overflow](https://stackoverflow.com/questions/529142/what-good-are-sql-server-schemas)
