---
layout: post
title: cloud > aws > big data physical transfer (snowball VS snowmobile)
categories: [cloud]
---
### abstract
The concern is to document the 2 large data transfer AWS services available in 2020: snowball and snowmobile

![snowmobile]({{ site.url }}/assets/img001132.png)

## contents

SNOWBALL                                             | SNOWMOBILE
-----------------------------------------------------|---------------------------------------------------------------------------
large-scale data transfer                            | large-scale data transfer
petabyte-scale                                       | exabytes scale
the physical device is delivered by AWS              | ruggedized shipping container delivered to a location
connect the snowball to your network and upload data | AWS sets up a connection to your network
device returned by local carrier                     | you load your data on the Snowmobile
AWS receives device and loads data into S3 for you   | AWS will load data into S2 when a container is received at an AWS location

### sources
* [Yellow and Black Snowmobile · Free Stock Photo](https://www.pexels.com/photo/mountains-winter-yellow-vehicle-67788/)