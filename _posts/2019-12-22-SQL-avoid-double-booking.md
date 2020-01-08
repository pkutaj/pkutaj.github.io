---
layout: post
title: SQL > avoiding double-booking
---
## the case	
the question is, what would be the logic to avoid double booking in a hotel (or a similar scenario)

## toc
<!-- TOC -->

- [the scenario](#the-scenario)
- [solution 1: a simple subquery to find overlapping ones](#solution-1-a-simple-subquery-to-find-overlapping-ones)
- [solution 2: remodel dataset: row per day per customer](#solution-2-remodel-dataset-row-per-day-per-customer)

<!-- /TOC -->

## findings
### the scenario
* Take as simple dataset as possible: 3 people booking 1 room 
* There is 1 error: Pavol and Jana are overlapping
 
 ![double_book_within_dataset]({{ site.url }}/assets/2020-01-08-double-book1.png)

###  solution 1: a simple subquery to find overlapping ones 
* use Subquery 


* Call the same table twice, remove comparing with itself with (same name) 
* Imagine 2 possible scenarios that intervals can't overlap (see below)

![2_overlapping_scenarios]({{ site.url }}/assets/2020-01-08-double-book2.png)

* Negate these 2 possible scenarios 
* There are many more scenarios how intervals can overlap, so it's much simpler to use via negativa  

![subquery_solution1]({{ siteÄ.url }}/assets/2020-01-08-double-book3.png)

### solution 2: remodel dataset: row per day per customer
* Another answer is to remodel the table itself 
* Create a row for each day a guest is in the hotel

![table_remodeling_create_statement]({{ site.url }}/assets/2020-01-08-double-book4.png)

* Create a **natural primary key** combining 2 columns: room number and a day  
* In this way it gets impossible to create another combination of these values as primary keys are built-in constraints 
 
 ![built_in_constraint]({{ site.url }}/assets/2020-01-08-double-book5.png)