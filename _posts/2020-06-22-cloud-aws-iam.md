---
layout: post
title: cloud > aws > iam
categories: [cloud]
---
## abstract
The concern is documenting the free authentication/authorization AWS IAM service

## video
## contents
<!-- TOC -->

- [1. def](#1-def)
- [2. 3x identity type](#2-3x-identity-type)
    - [2.1. (2.1) type-1 users](#21-21-type-1-users)
    - [2.2. (2.2) type-2 groups](#22-22-type-2-groups)
    - [2.3. (2.3) type-3 roles](#23-23-type-3-roles)
- [3. policies](#3-policies)
- [4. ARN role](#4-arn-role)

<!-- /TOC -->

### 1. def
* ✔️ service that controls access to AWS resources
* ✔️ free
* ✔️ both authentication AND authorization
* ✔️ supports **identity federation** via
    * SAML providers
    * also AD

### 2. 3x identity type
#### 2.1. (2.1) type-1 users
* account for a single indicirual to access AWS resources

#### 2.2. (2.2) type-2 groups
* managing permissions for a group of users

#### 2.3. (2.3) type-3 roles
* enables a user or AWS to assume permissions for a task
* example: running ec2 server enables it to have a role that permits to do a specific task

### 3. policies
* policy is a **JSON doc** defining permissions for an AWS IAM identity (principal)
* defines both the AWS services that the identity can access and what actions can be taken on that service
* example
    * read access and write to an S3 bucket
* either **customer-managed** or **AWS managed** 🠊 there are created policies like read-only to AWS account


```json
"Policies": [
          {
            "PolicyName": "admin",
            "PolicyDocument": {
              "Version" : "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": "ec2:Describe*",
                  "Resource": "*"
                },
                {
                  "Effect": "Allow",
                  "Action": "elasticloadbalancing:Describe*",
                  "Resource": "*"
                },
                {
                  "Effect": "Allow",
                  "Action": [
                      "cloudwatch:ListMetrics",
                      "cloudwatch:GetMetricStatistics",
                      "cloudwatch:Describe*"
                  ],
                  "Resource": "*"
                },
                {
                  "Effect": "Allow",
                  "Action": "autoscaling:Describe*",
                  "Resource": "*"
                }
              ]
```

### 4. ARN role
* Amazon Resource Names (ARNs) 
* uniquely identify AWS resources 
* ...when you need to specify a resource unambiguously 
* example: IAM policies; Amazon RDS tags, and API calls, etc.

```json
"roleArn": "arn:aws:iam::1234567890:role/RedshiftLoadRole_Account_1234567890
```