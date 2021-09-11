## usecase
The aim of this tutorial🔍 is to demo what you need to create a bookmarked URL for creating a JIRA card directly from the URL. I am opening a new Info card with

```
https://<DOMAIN>.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=<PROJECTID>&issuetype=<ISSUEID>&reporter=<YOUR_ACCOUNT_ID>
```

<!-- TOC -->

- [1. instructions](#1-instructions)

<!-- /TOC -->

### 1. instructions

* Open *Project Settings* and get project ID from URL

```
/secure/project/EditProject!default.jspa?pid=10010
```

* In *Project Settings*, go to _Summary_ and select an *Issue type* you want to create automatically and get the ID from url. This is for `XXX` project. You need `101112` from the URL below

```
/plugins/servlet/project-config/XXX/issuetypes/101112/workflow
```

* Select your picture in the upper right corner → Profile and get your `<ACCOUNT_ID>` from the url

```
/jira/people/5eaff3b88c82141c9f311479
```

* Compose and create this bookmark in a browser and you're good to go. 

```
https://AAA.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10010&issuetype=101112&reporter=5eaff3b88c82141c9f311479
```
