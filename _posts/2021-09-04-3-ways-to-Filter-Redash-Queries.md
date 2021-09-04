## usecase
The aim of this tutorial🔍 is to list 3 ways a redash query can be filtered without modifying a SQL query. This is just a compilation of official docs used for a quick syntactical reference. 

<!-- TOC -->

- [1. query parameters with double curly braces](#1-query-parameters-with-double-curly-braces)
- [2. query filters with double columns](#2-query-filters-with-double-columns)
- [3. table visualization search](#3-table-visualization-search)
- [4. sources](#4-sources)

<!-- /TOC -->

### 1. query parameters with double curly braces

```sql
SELECT a, b c
FROM table1
WHERE
  relevant_date >= '{{ myDate.start }}'
  AND table1.relevant_date <= '{{ myDate.end }}'
```

* this allows passing query into a query string in the browser
* great for custom searches and running queries directly from the URL bar
* +1 for large datasets
* substitute values into your query at runtime
* any string between double curly braces `{{ }}` will be treated as a parameter
* a widget will appear above the results pane so you change the parameter value.

### 2. query filters with double columns

```sql
SELECT action AS "action::filter", COUNT(0) AS "actions count"
FROM events
GROUP BY action
```

* query Filters filter data
* similar to Query Parameters — but with a few key differences. 
* query Filters limit data **after** it has been loaded into your browser. 
* this makes them ideal for smaller datasets
* just alias your column to `<columnName>::filter` or ``<columnName>::multi-filter`
* note that you can use `filter` or  `multi-filter`
* query Filters aren’t suitable for especially large data sets or query results with hundreds or thousands of distinct field values. Depending on your computer and browser configuration, excessive data can deteriorate the user experience.

### 3. table visualization search
* i use this a lot - for example for querying contacts
* select _Add Visusalization_ → _Table_ → Select _Use for Search_
* great for fast dynamic search, you can select multiple columns that react to search

### 4. sources
* [Query Parameters](https://redash.io/help/user-guide/querying/query-parameters)
* [Query Filters](https://redash.io/help/user-guide/querying/query-filters)
* [Table Visualization Options](https://redash.io/help/user-guide/visualizations/table-visualizations)
