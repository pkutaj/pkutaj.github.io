---
layout: post
title: networking > IIS fundamentals (website, application pool, virtual directory)
categories: [networking]
---
## the case	of IIS fundamentals
the question is, what makes the core of the IIS webserver
the answer discusses the elements of the following hierarchy

![iis_server_hierarchy]({{ site.url }}/assets/img000797.png)

## toc
<!-- TOC -->

- [(1) web site](#1-web-site)
    - [what is a web site](#what-is-a-web-site)
    - [access a web site](#access-a-web-site)
    - [web site hierarchy](#web-site-hierarchy)
        - [(1.1) web server](#11-web-server)
        - [(1.2) web site](#12-web-site)
        - [(1.3) app](#13-app)
        - [(1.4) virtual directory](#14-virtual-directory)
    - [binding](#binding)
        - [binding protocol](#binding-protocol)
        - [binding information](#binding-information)
- [powershell > IIS overview](#powershell--iis-overview)
- [(2) application pool](#2-application-pool)
    - [(2.1) what is an application](#21-what-is-an-application)
    - [(2.2) w3wp.exe](#22-w3wpexe)
    - [(2.3) design example: applications:application pool relationship](#23-design-example-applicationsapplication-pool-relationship)
    - [(2.4) what can be configured in application pool](#24-what-can-be-configured-in-application-pool)
- [(3) virtual directory](#3-virtual-directory)
- [(4) authentication](#4-authentication)
    - [(4.1) authentication concept in IIS](#41-authentication-concept-in-iis)
    - [(4.2) authentication types](#42-authentication-types)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) web site
#### what is a web site
* logical container of 
    * **CONTENT** (pages, images, etc) accessed via one of the **ACCESS METHODS:** a hostname or IP address
    * physical and virtual **DIRECTORIES** joined by **UNIQUE SERVER BINDING**
* is associated with the configuration of **BINDINGS**

#### access a web site
* 3 ways to access a web site

WAY# | WAY        | COMMENT
-----|------------|----------------------
1    | FQDN       | `www.foo.bar`
2    | hostname   | `\\foo`
3    | IP address | `http://192.168.1.25`

#### web site hierarchy 


##### (1.1) web server
* **ROOT OBJECT**
* a single physical server
* one or many virtual servers
* a single entity in IIS

##### (1.2) web site
* within a server several websites
* can be individual domains / subdomains

##### (1.3) app
* belong to a website
* one or more applications 

##### (1.4) virtual directory
* part of the URL mapped to a physical directory on the server
* belong to an application of a website
* it has the symbol of a windows shortcut 

![virtual_directory_symbol]({{ site.url }}/assets/img000803.png)

* **NOTE:** there are cases where you have a **VIRTUAL PATH** configured in advanced settings of an application but there is no **VIRTUAL DIRECTORY**


#### binding
* binding is what associates **METHOD OF ACCESS** to **IIS WEBSITE**
* path between FQDN/hostname/IP to the website
* 2 parts

##### binding protocol
* determines which protocol is used
* HTTP, HTTPS

##### binding information
1. IP 
2. port
3. host header 

```
192.0.0.25 :: 443 :: www.example.com
```

### powershell > IIS overview
* at least IIS 7 is required

>Everybody is familiar with how the file system is organized. File systems are hierarchical namespaces, comprised of directories that contain files and other directories. PowerShell Snap-in leverage this familiarity with the file system and allow other data stores to be exposed as a hierarchical namespace. Like the root of a file system drive is usually C:\ the root of the IIS configuration system is "IIS:".

```
Here is the structure of the IIS PowerShell Snap-in namespace. The following containers cannot be deleted or moved.

IIS:\

    Sites

        Site Collection

            Applications and Virtual Directories
    
    AppPools
        
        WorkerProcesses
    
    SslBindings
```

— [PowerShell Snap-in: Navigating the IIS Snap-in Namespace ~ Microsoft Docs](https://docs.microsoft.com/en-us/iis/manage/powershell/powershell-snap-in-navigating-the-iis-snap-in-namespace)


1. `import-module WebAdministration`
2. cd iis:\
3. dir


### (2) application pool
* application pool is a container for applications 
* containers isolate applications
* application pool seems to have the responsibility of a process it allocates resources across applications

#### (2.1) what is an application
* application is a **SET OF FILES AND FOLDERS THAT DELIVER CONTENT**
* every web site has a default one, but there can be n applications within a website
* each application is assigned a **UNIQUE** application pool
    * the relationship is 1:1
    * but many applications can share an application pool
* you can have multiple applications within the same application pool 

#### (2.2) w3wp.exe
* each application pool spawns a `w3wp.exe`
* the process starts as soon there is a request for the associated application (see below)

![w3wp_instances]({{ site.url }}/assets/img000799.png)

![http_request_processing]({{ site.url }}/assets/img000802.png)

— from [Introduction to IIS Architectures ~ Microsoft Docs](https://docs.microsoft.com/en-us/iis/get-started/introduction-to-iis/introduction-to-iis-architecture#http-request-processing-in-iis)

#### (2.3) design example: applications:application pool relationship
* if 1 pool crashes, it takes down all applications in the pool

![applications_and_application_pool_design_example]({{ site.url }}/assets/img000798.png)

* many admins create application pool per application and bind them together
* you can separate your pools for stability and security

#### (2.4) what can be configured in application pool

CONFIG# | CONFIG           | COMMENT
--------|------------------|---------------------------------------
1       | recycling        | time intervals, memory, usage
2       | process security | identity that the w3wp process runs as
3       | bitness          | 32- or 64-bit process

### (3) virtual directory
* directory name/path mapped to a physical directory on a server
* essentially an alias pointing a URL such as
* this is for fine-tuning the security in different folders

```
www.foo.bar/admin 🠊 c:\bar\admin
```

### (4) authentication
#### (4.1) authentication concept in IIS

![IIS_authorization_concept]({{ site.url }}/assets/img000800.png)

* by default, the **ANONYMOUS AUTHENTICATION** allows access to pages without allowing to modify
1. visitor makes a request
2. IIS receives a request and checks if IP is permitted
3. authentication process — who is this?
    * if anonymous enables 🠊 passthrough no matter who they are
4. check permission for an asset
 
#### (4.2) authentication types
1. Anonymous
    * default
    * no credentials supplied
    * IIS impersonates a specific account when processing the request
    * best for public websites with assets that are meant to be shared
2. Basic
    * provide username / password
    * cleartext for username, password as Base64-encoded stored in the FS
3. Digest — on AD server
4. Integrated Windows — local accounts allowed
5. Client certificate — requires TLS and SSL
6. Form-based with a cookie that must be used with requests

### sources
* [IIS administration fundamentals ~ Pluralsight](https://www.pluralsight.com/courses/iis-administration-fundamentals)
* [Introduction to IIS Architectures ~ Microsoft Docs](https://docs.microsoft.com/en-us/iis/get-started/introduction-to-iis/introduction-to-iis-architecture#http-request-processing-in-iis)
* [PowerShell Snap-in: Navigating the IIS Snap-in Namespace ~ Microsoft Docs](https://docs.microsoft.com/en-us/iis/manage/powershell/powershell-snap-in-navigating-the-iis-snap-in-namespace)