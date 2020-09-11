---
layout: post
title: AWS > ELB & ALB
categories: [AWS]
---
## usecase
The concern is documenting the conceptualization of elastic load balancing and fast comparison of the three types of elastic load balancers:

1. ALB - application LB
2. NLB - network LB
3. CLB - classical LB

<!-- TOC -->

- [1. context](#1-context)
- [2. ELB first](#2-elb-first)
- [3. etymology](#3-etymology)
- [4. schemes: internet-facing, internal-facing](#4-schemes-internet-facing-internal-facing)
- [5. healthchecks](#5-healthchecks)
- [6. request routing](#6-request-routing)
- [you can't ping ELB](#you-cant-ping-elb)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. context
* belongs to the family of AWS network services, and in particular to load balancing services
* see <https://github.com/pkutaj/kb/blob/master/cloud/2020-06-27-cloud-aws-content-network-delivery-services.md>

### 2. ELB first
* all types are **ELASTIC** load balancers
* service
* managed devices
* simple to build out and set up the rules
* provisin in EC2 console
* the concept of **TARGET SERVERS** sitting behind ELB
* users hit load balancers to access application sitting on different server

### 3. etymology
* **APPLICATION** denotes the application layer of the TCP/IP stack

![application_layer_load_balancer]({{ site.url }}/assets/img001735.png)

* aka Layer 7 load balancing (in OSI model)
* designed and optimized for **HTTP/HTTPS**
* along with that comes SNI (Server Name Indication)
    * way to use single secure listener on load balancer
    * behind the LB there are different domains
    * you can present different SSL certs to the client based on the domain
    * this support multiple certificates for differnt domains
* IP addresses as targets
    * for hybrid clouds
* Lambda functions as targets

### 4. schemes: internet-facing, internal-facing
* there are 2 different schemes
* internet-facing

![internet-facing-LB]({{ site.url }}/assets/img001733.png)

* internal-only — you can have **INTERNAL LOAD BALANCERS**

![internal-facing-LB]({{ site.url }}/assets/img001734.png)

### 5. healthchecks
* regardless, there are **HEALTHCHECKS** where load balancer is making sure that servers are up
* stop sending requests until it's healthy again
* you will not send traffic to the server is it is down
* perferct for HA and LB 

### 6. request routing 
* when you provision ELB, you'll get DNS name to access that infrastructure

```
<random>.<region>.elb.amazonaws.com
```

* you can access the aplication also by accessing the AWS-provided DNS name
* the reason this is done is because you'll have different public IP addresses for a FQDN
* the DNS name is **CNAME Alias**, not an A name
* this is what is usually an A Name
* this works also for internal LBs
* example with one of the internet facing ALBs used by Snowplow Analytics 

![domain_name_as_CNAME]({{ site.url }}/assets/img001738.png)

### you can't ping ELB

> Amazon's load balancers have a network security policy which swallows ICMP packets for both ping and traceroute

```
Pinging ec2-18-158-245-136.eu-central-1.compute.amazonaws.com [18.158.245.136] with 32 bytes of data:
Request timed out.
Request timed out.
```

>  I have to admit I don't fully understand why this is necessary -- if you do a ping through ELB and have 10 instances behind it, what is it actually telling you? You may never hit all the instances, so I don't see the benefit. It seems to me that you should check the application health by using the ELB health checks and if you need to ping the back-ends directly, you could expose them directly to the internet and ping them in a round-robing fashion directly. I'd like to understand how passing a ping through ELB helps you.

— [Re: Allowing Ping on Elastic Load Balancer](https://forums.aws.amazon.com/message.jspa?messageID=376782#jive-message-294990)

### 7. sources
* [Implementing AWS Load Balancing](https://app.pluralsight.com/library/courses/aws-load-balancing-implementing/table-of-contents)

