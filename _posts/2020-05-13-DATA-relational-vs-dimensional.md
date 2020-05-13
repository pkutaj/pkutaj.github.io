---
layout: post
title: data > relational VS dimensional
categories: [data]
---

| **THE CASE OF THE SCHEMAS**                                                                             |
|---------------------------------------------------------------------------------------------------------|
| **question**                                                                                            |
| what are the differences between relational and dimensional models and how they apply to the data-usage |

## toc
<!-- TOC -->

- [(1) relational](#1-relational)
- [(2) dimensional (star)](#2-dimensional-star)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) relational
* typical difference in transactional and analytical applications
* normalization means **THE REMOVAL OF REPEATED DATA**
    * from a table
    * into **MANY** auxiliary connected table
* normalization makes table smaller
* it is an **ESSENCE OF CRUD**

### (2) dimensional (star)
* relational schema with a **HIGHLY-NORMALIZED DESIGN** makes it difficult for complex analytical queries that are 
    * ad-hoc
    * historical
    * with high number of variables
* to solve this, **STAR SCHEMA** was developed and it divides data in to 2 essential groups
* 1. **FACTS (aka measures)** stored in a highly normalized **FACT TABLE**
    * fact table is the heart of the star
    * in SAP, facts are known as **KEY FIGURES**
        * e.g. _sales_ are known as facts and _sales data_ are known as fact data
    * the primary key of the fact is a **COMBINATION** of all the dimension keys
* 2. **DIMENSION ATTRIBUTES** stored in denormalized **DIMENSION TABLES**
    * dimensions are stored hierarchically in dimension tables
    * dimension tables are relationally linked with a central fact table via key relationship
    * dimension keys are known as **DIM IDs** and are machine-generated (sequentially assigned numbers)
    * e.g. _time_, _cost center_, _cost element_, etc.

![star_schema_fact_table_dimensions]({{ site.url }}/assets/img000866.png)

* the following example is from [Stars and Snowflakes: Schemas for Analytics](https://ebrary.net/64660/computer_science/stars_snowflakes_schemas_analytics)

![facts_and_dimensions]({{ site.url }}/assets/img000886.png)

### sources
* [Stars and Snowflakes: Schemas for Analytics - Designing Data-Intensive Applications. The Big Ideas Behind Reliable, Scalable and Maintainable Syst](https://ebrary.net/64660/computer_science/stars_snowflakes_schemas_analytics)