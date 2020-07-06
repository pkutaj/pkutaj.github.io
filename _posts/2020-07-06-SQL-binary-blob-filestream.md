---
layout: post
title: sql > storing binaries in database
categories: [sql]
---
## the case	of a file in the database
the question is, if binary files (photos?) are regularly stored in database, mainly in SQL server

## toc
<!-- TOC -->

- [BLOB and FILESTREAM](#blob-and-filestream)
    - [pre-2008: filegroup](#pre-2008-filegroup)
- [post-2008: filestream](#post-2008-filestream)
- [sources](#sources)

<!-- /TOC -->

## findings
### BLOB and FILESTREAM
#### pre-2008: filegroup
* pre-SQL Server 2008, large binaries were stored as BLOB (binary large objects) in **DATABASE FILEGROUPS** — optimized for storing structured row data in 8k pages
    * **BLOBs** do not fit into that structure, so they were pushed into of-row storage ➔ structured filegroups are bloating ➔ performance goes down significantly
* the datatype is `varbinary(max)`

### post-2008: filestream
* still the same datatype `varbinary(max)` but stored there is only an attribute and the actual BLOB content is stored as files in the file system
* BLOB is physically stored separtely from structured row data, but it is an ingegral part of the database
* ➔ backing up the database **INCLUDES** the BLOB data, with the option of performing a partial backup that excludes the FILESTREAM filegroup for backups without BLOBs

### sources
*[BLOB SQL Server: Integrating document storage - Pluralsight](https://www.pluralsight.com/blog/tutorials/integrating-document-blob-storage-with-sql-server)