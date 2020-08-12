---
layout: post
title: devops > meet nomad
categories: [devops]
---
## abstract
The concern is documenting the benefits and character of NOMAD as a runner of either service discovery/config changes done in my experience withi the Consul’s KV store.

## video
## contents
<!-- TOC -->

- [1. HashiCorp](#1-hashicorp)
    - [1.1. Tao of HashiCorp](#11-tao-of-hashicorp)
- [2. What is Nomad](#2-what-is-nomad)
- [3. Why use Nomad](#3-why-use-nomad)

<!-- /TOC -->

### 1. HashiCorp

![timeline]({{ site.url }}/assets/img001597.png)

* w/ vagrant you can spinUP environments very very quickly
* packer is a VM image creator
* TF is for **remote provisioning** — like Vagrant, but remotely
* Consul is Service Discovery
* Vault comes to manage secrets
* Nomad comes last to the party for **container orchestration**

#### 1.1. Tao of HashiCorp
* there is a manifest guiding the tool: [The Tao of HashiCorp](https://www.hashicorp.com/tao-of-hashicorp)
* this reminds me of [PEP 20 -- The Zen of Python — Python.org](https://www.python.org/dev/peps/pep-0020/)
* this reminds me of

>And the crucial idea in all of this is the one that we build a layered system. So for instance, if we're writing the square root procedure, somewhere the square root procedure uses a procedure called good-enough, and between those there is some sort of abstraction boundary. It's almost as if we go out and in writing square root, we go and make a contract with George, and tell George that his job is to write good-enough, and so long as good-enough works, we don't care what it does. We don't care exactly how it's implemented. There are levels of detail here that are George's concern and not ours. So for instance, George might use an absolute value procedure that's written by Harry, and we don't much care about that or even know that, maybe, Harry exists. So the crucial idea is that when we're building things, we divorce the task of building things from the task of implementing the parts. And in a large system, of course, we have abstraction barriers like this at lots, and lots, and lots of levels. And that's the idea that we've been using so far over and over in implementing procedures.

— From the classical [structure_and_interpretation_of_computer_programs](https://youtu.be/DrFkf-T-6Co?t=132)

* ... so you don't care if the application is running on AWS, GCP or Azure and you don't care if it's containerized or a VM; all of that is a black box away abstracted away, behind the abstraction boundary... you just want to run these jobs like deployment of an application

### 2. What is Nomad
* **SCHEDULER**
    * global state
        * access to the entire state of the cluster when making decisions
        * w/ constraints
        * w/ job priorities
        * w/ resource preemption
    * optimistically concurrent
        * allow to make parallel scheduling decisions
        * read-yes, write-no
        * [see KB doc on optimistic concurrency](https://github.com/pkutaj/kb/blob/master/DATA/2020-01-29-DATA-optimistic-concurrency-control.md)
* **FOR 3 TYPES OF APPS** that are
    * containerized
    * legacy
    * batch
* **WITH 3 HIGH AIM TO**
    * reduce latency
    * increase throughput
    * keep scale

### 3. Why use Nomad
* simple
* scalable to 10k nodes
* runs on multiple clouds and on-prem
* run 3 job types
    * containerization
    * legacy (VM)
    * batches
* integrates easily with CircleCI, Jenkins, etc.
