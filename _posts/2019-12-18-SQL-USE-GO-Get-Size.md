---
layout: post
title: SQL > Getting the size of the DB
last_modified_at: 
---
## the case	
the puzzle is, getting the size of a selected SQL DB

## solution
```sql
USE fooDB
GO
sp_spaceused
```

## toc
<!-- TOC -->

- [USE](#use)
- [GO](#go)
- [SPSPACE](#spspace)

<!-- /TOC -->

## sources

* [USE (Transact-SQL)](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-2017)
* [GO (Transact-SQL)](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-2017)
* [sp_spaceused (Transact-SQL)](https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-spaceused-transact-sql?view=sql-server-2017)

### USE 
* Changes the database context to the specified database of database snapshot in SQL Server

### GO
* Commits the command before the Stored Procedure can be executed
* Without `GO` there would be a syntax eror
* ![sp_spaceused without GO]({{ site.url }}/assets/img000103.png)

### SP_SPACE
* System stored procedure 
* ![sp_spaceused_with_USE_and_GO]({{ site.url }}/assets/img000104.png)