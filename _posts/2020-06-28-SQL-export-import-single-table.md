---
layout: post
title: sql > export import a table via a script
categories: [sql]
---

## the case	of a transported table
* the question is, how to extract and move a single table accross DBs; in case there already is an identical table on the other side (no need to recreate the table structure)
    * use SSMS
    
## toc
<!-- TOC -->

- [1. Export](#1-export)
- [2. Import](#2-import)

<!-- /TOC -->

## findings

### 1. Export
1. Open SSMS
2. Right-Click the database —> Task —> Generate Scripts
3. Select **Choose Objects** —> **Select specific database objects** —> open the drop-down of **Tables** —> Select the table to be exported —> Click **Next**
4. Select **Set Scripting Options** —> Keep Output type **Save scripts to a specific location** 
5. Still in Set Scripting Options, click **Advanced** in **Save to file** section —> navigate to **Types of data to script** —> select **Schema and data** 

![export_table_via_generated_script]({{ site.url }}/assets/img000689.png)

5. Keep **Save to File** selected —> Choose the filepath —> Click **Next**
6. In **Summary** click **Next**
7. The `.sql` file should be created

### 2. Import
1. Open SSMS
2. Navigate to the DB where the table should be restored (create a temp DB if it is just for analytical purposes)
3. Go to **File —> Open** or press `CTRL + O`
4. In the opened query, edit the first `USE` statement and replace the name of the origin DB with the name of the target DB (a temp DB in my case)
5. Run the query which should restore the table in the temp DB