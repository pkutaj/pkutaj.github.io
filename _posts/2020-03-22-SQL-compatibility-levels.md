---
layout: post
title: SQL > Compatibility Level
categories: [sql]
---
## the case	of the compatibility
* the question is how make newer versions of SQL server compatible with older ones

## toc
<!-- TOC -->

- [compatibility level](#compatibility-level)
- [determine current compatibility level](#determine-current-compatibility-level)
- [change compatility level](#change-compatility-level)
- [sources](#sources)

<!-- /TOC -->

## findings
### compatibility level
* level settings
* aim is to provide maximum backward compatibility
* if we restore a SQL Server 2005 database backup to SQL Server 2017, then the compatibility level of the restored database would be set to 100 because that is the minimum SQL 2017 level supported.
* everything is backward compatible to SQL Server 2008

Product                                         | Database Engine Version | Default Compatibility Level Designation | Supported Compatibility Level Values
------------------------------------------------|-------------------------|-----------------------------------------|-------------------------------------
SQL Server 2019 (15.x)                          | 15                      | 150                                     | 150, 140, 130, 120, 110, 100
SQL Server 2017 (14.x)                          | 14                      | 140                                     | 140, 130, 120, 110, 100
Azure SQL Database single database/elastic pool | 12                      | 150                                     | 150, 140, 130, 120, 110, 100
Azure SQL Database managed instance             | 12                      | 150                                     | 150, 140, 130, 120, 110, 100
SQL Server 2016 (13.x)                          | 13                      | 130                                     | 130, 120, 110, 100
SQL Server 2014 (12.x)                          | 12                      | 120                                     | 120, 110, 100
SQL Server 2012 (11.x)                          | 11                      | 110                                     | 110, 100, 90
SQL Server 2008 R2                              | 10.5                    | 100                                     | 100, 90, 80
SQL Server 2008                                 | 10                      | 100                                     | 100, 90, 80
SQL Server 2005 (9.x)                           | 9                       | 90                                      | 90, 80
SQL Server 2000 (8.x)                           | 8                       | 80                                      | 80

### determine current compatibility level

```sql
SELECT name, compatibility_level 
  FROM sys.databases;
```

### change compatility level

```sql
Use Master
Go
ALTER DATABASE '<database name>'
  SET COMPATIBILITY_LEVEL = '<compatibility-level>';
```

### sources
* [ALTER DATABASE Compatibility Level (Transact-SQL) - SQL Server - Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-compatibility-level?view=sql-server-ver15)
* [Microsoft SQL Server database compatibility levels](https://developer.rackspace.com/blog/Microsoft-SQL-Server-database-compatibility-levels/)