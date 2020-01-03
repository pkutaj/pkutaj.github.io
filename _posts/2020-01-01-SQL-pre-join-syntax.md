# THE CASE OF PRE-JOIN SYNTAX 

* I realized you can get results for a `JOIN` without `JOIN`
* just `SELECT` from both tables and you get a nice cartesian product - combination of all X all 
* definitive example is to imagine a deck of cards, cartesian product is combination of 4 suits with 8 ranks--> 32 cards

![alt]({{ site.url }}/assets/join01.png)

* this is just old syntax and the query above is identical to `CROSS JOIN`

![alt]({{ site.url }}/assets/join02.png)

* with the old syntax you can filter the result with WHERE

![alt]({{ site.url }}/assets/join03.png)

* the same result using the ;new syntax

![alt]({{ site.url }}/assets/join04.png)

* stick with the new syntax. The logic of JOIN is a different one than the logic of WHERE. 
	* WHERE filters the existing table with a given criteria
	* JOIN first "explodes" the tables with a cartesian product and only then filters them 

### SOURCES
* https://blog.jooq.org/2016/07/05/say-no-to-venn-diagrams-when-explaining-joins/	
* https://stackoverflow.com/questions/1599050/ansi-vs-non-ansi-sql-join-syntax	
	
