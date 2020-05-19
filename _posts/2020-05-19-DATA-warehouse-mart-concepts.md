---
layout: post
title: data > data warehouse vs data mart
categories: [data]
---

## overview
The concern this document is outline the differences between data warehouse and data marts and give an example of SAP BW as a data warehouse that contain both as it's main architectural feature (not going much into details for the corresponding objects such as DataStore Objects or InfoCubes, etc). 

![Bill_Inmon_father_of_the_warehouse]({{ site.url }}/assets/img000949.png)

## toc
<!-- TOC -->

- [enterprise data warehouse concept and layer](#enterprise-data-warehouse-concept-and-layer)
- [example: SAP Business Data Warehouse (SAP BW)](#example-sap-business-data-warehouse-sap-bw)
- [sources](#sources)

<!-- /TOC -->

## findings
### enterprise data warehouse concept and layer
* data in the data warehouse layer are **IMMUTABLE** 
    * do not change
    * do not delete
* in the upper layers (upstream), you build (architect) models (datamarts) for specific recipient (finance, marketing, controlling, SCM, sales, etc) 
* in the warehouse, the aim is to store as much "unopionated" data as possible
* starting with the warehouse layer (let's collect everything first and build models according to whatever need) is called **BILL INMON approach for building data warehouse**
* the opposite approach favors first getting the data requirements, then it builds mission-critical data marts that already give value, and then these are integrated for data consistency into a data warehouse

![edw_vs_datamart_layers]({{ site.url }}/assets/img000948.png)

### example: SAP Business Data Warehouse (SAP BW)
* let's remember SAP BW, which is also divided into two major sections: **EDW layer** and **DataMart layer**

![LSA_architecture]({{ site.url }}/assets/img000945.png)

* **UNOPIONATED** is already  **HARMONIZED/HOMOGENIZED** so that you can do things with them
    * data can arrive in many different shapes and forms (formats!)...
    * ...while the warehouse by definition hosts **STRUCTURED** data
    * the lake can host **UNSTRUCTURED**
    * that's why the [Snowflake guy refers to his producs as data "lake house"](https://www.youtube.com/watch?v=M2qClkqcVD8) it can store both structured and unstructed data
    * SAP BW cannot store unstructured data, beware
* Data-Warehouse "layer", the layer of granular homogenized high quality data is the **SINGLE SOURCE OF TRUTH** for the enterprise according to the traditional theory of data warehousing and in the sphere of enterprise BI (high budgets, enterprise tools), this is taken as a matter of course

### sources
* [Kimball vs. Inmon in Data Warehouse Architecture](https://www.zentut.com/data-warehouse/kimball-and-inmon-data-warehouse-architectures/)
* [Big Data LDN 2019: Snowflake? Why should I care? - YouTube](https://www.youtube.com/watch?v=M2qClkqcVD8)