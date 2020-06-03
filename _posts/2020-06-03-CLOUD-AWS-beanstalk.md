---
layout: post
title: cloud > aws > elastic beanstalk
categories: [cloud]
---
## overview
The concern is to document AWS elastic beanstalk

![aws_beanstalk_logo]({{ site.url }}/assets/img001076.png)

## toc
<!-- TOC -->

- [(1) definition](#1-definition)
- [(2) technologies](#2-technologies)
- [(3) 8x supported application platforms](#3-8x-supported-application-platforms)
- [(4) why choose Beanstalk](#4-why-choose-beanstalk)
- [(5) Use Cases](#5-use-cases)
- [(6) DEMO](#6-demo)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) definition
* **AUTOMATES** the process of deploying and scaling workloads on EC2

SERVICE   | MODEL
----------|--------------------------
ec2       | **Infra as a Service**
beanstalk | **Platform as a Service**

* Beanstalk is **Platform as a Service** 🠊 there are constraints for supported technologies

### (2) technologies
- [x] leverages existing AWS services
- [x] only pay for the other services you leverage
- [x] handles: 
    1.  provisioning
    2.  load balancing
    3.  scaling
    4.  monitoring

### (3) 8x supported application platforms
1. Java
2. .NET
3. PHP
4. Node.js
5. Python
6. Ruby
7. Go
8. Docker
    * you can set up Docker container with another technology and it should work

### (4) why choose Beanstalk
- [x] monitoring is included
- [x] deployment is critical
- [x] scaling
    * handles upcoming new demand
    * additional config can be added
- [x] ec2 customization
    * stretches behind PaaS here

### (5) Use Cases
> It’s not that hard to understand there is an overhead every time you want to create a test bench for a simple service with database access because you have to set up the EC2 instance, the database, the security groups, VPC, optionally load balancing and auto-scaling. Amazon came up with a great idea to compose these things together into a new service called Amazon Elastic Beanstalk. Elastic Beanstalk (EB) is a service to easily deploy an application with the usual needs, EC2 instances where the app will run, database, scaling, load balancing, etc. 

— [Deploying a simple Spring Boot with MySQL app to AWS using Elastic Beanstalk](https://medium.com/swlh/deploying-a-simple-spring-boot-with-mysql-app-to-aws-using-elastic-beanstalk-24b1598d9fdf)

* deploy an app with minimal knowledge of other services
* reduce the overall maintenance needed for the application
    * if you can fit into a templated use case
* making sense if just a few customizations are required

### (6) DEMO
* from [Tutorials and samples - AWS Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/tutorials.html)

![setup_node_app_in_minutestickets]({{ site.url }}/assets/img001001.png)

### sources
* [Deploying a simple Spring Boot with MySQL app to AWS using Elastic Beanstalk](https://medium.com/swlh/deploying-a-simple-spring-boot-with-mysql-app-to-aws-using-elastic-beanstalk-24b1598d9fdf)