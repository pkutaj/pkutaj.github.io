---
layout: post
title: aws > iam service
categories: [aws]
---
## abstract
The concern is documenting the I AM (IAM) service

## video
## contents
<!-- TOC -->

- [1. def](#1-def)
- [2. authenticate](#2-authenticate)
- [3. authorize](#3-authorize)
- [4. federation](#4-federation)
- [5. identity types](#5-identity-types)
    - [user](#user)
    - [group](#group)
    - [role](#role)
- [6. policy](#6-policy)
- [best practice](#best-practice)
    - [mfa](#mfa)
    - [lpa](#lpa)
- [7. sources](#7-sources)

<!-- /TOC -->

### 1. def
* create user
* configure privileges
* free for all 
* manages both 
    * authentication
    * authorization

### 2. authenticate
* verify user for you

### 3. authorize
* configure what that user can do 

### 4. federation
* use external provider for large orgs with SAML such as AD

### 5. identity types
#### user
#### group
#### role
* enables a user or AWS service to assume permissions for a task
* give a role to the server for, e.g., access to an s3 bucket

### 6. policy
* `.json` doc defining permissions for an AWS IAM identity
* defines
    * aWS services that the identity can access
    * actions within the service that can be done
* can be customer-managed
* can be aws-managed, aka **manager policies**
    * templated 

![policy_file_example](../assets/img001326.png)

### best practice
#### mfa
* multifactor authentication

#### lpa
* least privilege access

### 7. sources