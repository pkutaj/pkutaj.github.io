---
layout: post
title:
categories: []
---
## usecase
The concern is documenting the practice of AWS Redshift maintenance windows and the fact is it killing my load-jobs

![maintenance_windows]({{ site.url }}/assets/img002190.png)

When trying to perform a data-loading jon I am getting the following error and need to... resume manually !

```
Data loading error [Amazon](500150) Error setting/closing connection: Connection refused.
```

<!-- TOC -->

- [1. on maintenance](#1-on-maintenance)
- [2. preferredMaintenanceWindow](#2-preferredmaintenancewindow)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. on maintenance
> If a scheduled maintenance occurs while a query is running, the query is terminated and rolled back and you need to restart it. Schedule long-running operations, such as large data loads or VACUUM operation, to avoid maintenance windows. You can also minimize the risk, and make restarts easier when they are needed, by performing data loads in smaller increments and managing the size of your VACUUM operations. For more information, see Load data in sequential blocks and Vacuuming tables.

— [Schedule around maintenance windows - Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-avoid-maintenance.html)

> Amazon Redshift assigns a 30-minute maintenance window at random from an 8-hour block of time per AWS Region, occurring on a random day of the week (Monday through Sunday, inclusive).

— [Amazon Redshift clusters - Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-maintenance-windows)

```markdown 
The following list shows the time blocks for each AWS Region from which the default maintenance windows are assigned:

REGION                         | TIME
-------------------------------|----------------
US East (N. Virginia) Region   | 03:00–11:00 UTC
US East (Ohio) Region          | 03:00–11:00 UTC
US West (N. California) Region | 06:00–14:00 UTC
```

### 2. preferredMaintenanceWindow
> Gets and sets the property PreferredMaintenanceWindow. The weekly time range (in UTC) during which system maintenance can occur, if necessary. If system maintenance is necessary during the window, it may result in an outage. This maintenance window change is made immediately. If the new maintenance window indicates the current time, there must be at least 120 minutes between the current time and end of the window in order to ensure that pending changes are applied.

— [PreferredMaintenanceWindow Property](https://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/P_Amazon_Redshift_Model_ModifyClusterRequest_PreferredMaintenanceWindow.htm)

```
"preferredMaintenanceWindow" : "tue:06:30-tue:07:00",
```

* this is exactly the time  I am getting  the "outage"

### 3. sources
* [PreferredMaintenanceWindow Property](https://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/P_Amazon_Redshift_Model_ModifyClusterRequest_PreferredMaintenanceWindow.htm)
* [Amazon Redshift clusters - Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-maintenance-windows)
