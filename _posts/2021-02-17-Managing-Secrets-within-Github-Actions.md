## usecase
* The aim of this tutorial🔍 is a successful setup of secrets to authenticate a request to Zendesk Help Center API

<!-- TOC -->

- [1. Secret creation](#1-secret-creation)
- [2. what are secrets](#2-what-are-secrets)
- [3. how do you make a secret available to an action?](#3-how-do-you-make-a-secret-available-to-an-action)
- [4. github token](#4-github-token)
- [5. list used sources](#5-list-used-sources)

<!-- /TOC -->

### 1. Secret creation
* Open repo
* Go to _Settings_ → _Secrets_ → _Add a new secret_ 
* Enter secret name
* Enter secret value
* Select _Add secret_

![create_a_secret]({{ site.url }}/assets/img002610.jpg)

* Open workflow file `.\github\workflows\mail.yaml`
* Add to the step (you can also add this to different levels of the workflow)

```YAML
env: 
    ZENDESK_PASS: ${{secrets.ZENDESK_PASS}}
    ZENDESK_USER: mail@example.com/token
```

* the whole `workflow` that checks out my private repo, runs a `publish` script located in that repo, and then checks in changes done by that script look as follows

```yaml
on: [push]

jobs:
  publish_to_zendesk:
    runs-on: ubuntu-latest
    name: Publish to Zendesk
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Publish
      env: 
        ZENDESK_PASS: ${{secrets.ZENDESK_PASS}}
        ZENDESK_USER: console.zendesk@snowplowanalytics.com/token
      id: publish
      uses: ./
    - name: Commit
      run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add .
          git commit -m "generated"
          git push
```

### 2. what are secrets
* encrypted environment variables to be used in workflows

### 3. how do you make a secret available to an action? 
* either set as input in a workflow file (not covered here)
* or set as an environment variable in a workflow file

### 4. github token
* a secret automatically generated 
* can be used in a workflow 
* this is an access token that you can use to authenticate on behalf of the GitHub App installed on your repo responsible for running actions
* constraint: only your repo
* same as with other secrets, you need to refer it within the workflow file to make authenticated GitHub API calls with

```
${{secrets.GITHUB_TOKEN}}
```

* usecases: running automated github workflows for features within github (adding labels, creating issues, etc)

### 5. list used sources
* [Getting Started with GitHub Actions](https://www.pluralsight.com/courses/github-actions-getting-started)
