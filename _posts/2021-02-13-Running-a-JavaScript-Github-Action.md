## usecase
* The aim of this tutorial🔍 is offer both a hello-world and a real-world example of a succesfully set up and executed JavaScript Github Action. 

<!-- TOC -->

- [1. Prerequisites](#1-prerequisites)
    - [1.1. Setup a Project (github repo, npm init)](#11-setup-a-project-github-repo-npm-init)
    - [1.2. Add NPM Github Actions Toolkit Packages](#12-add-npm-github-actions-toolkit-packages)
- [2. Action Metadata](#2-action-metadata)
    - [2.1. Hello-World AMF](#21-hello-world-amf)
    - [2.2. Real-World AMF](#22-real-world-amf)
- [3. Action](#3-action)
    - [3.1. Hello-World Action](#31-hello-world-action)
    - [3.2. Real-World Action](#32-real-world-action)
- [4. Workflow](#4-workflow)
    - [4.1. Hello-World Workflow](#41-hello-world-workflow)
    - [4.2. Real-World Workflow](#42-real-world-workflow)
- [5. Commit && Push](#5-commit--push)
- [6. Summary: required items to be commited](#6-summary-required-items-to-be-commited)
- [7. Tests](#7-tests)
    - [7.1. Hello-World verification](#71-hello-world-verification)
- [8. sources](#8-sources)

<!-- /TOC -->

### 1. Prerequisites
#### 1.1. Setup a Project (github repo, npm init)
* create a new repo
* clone locally
* run `npm init -y` to initialize a node project by creating a `package.json`

```json
Wrote to C:\Users\Admin\Documents\workspace\SNOW\hello-world-javascript-action\package.json:

{
  "name": "hello-world-javascript-action",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/pkutaj/hello-world-javascript-action.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/pkutaj/hello-world-javascript-action/issues"
  },
  "homepage": "https://github.com/pkutaj/hello-world-javascript-action#readme"
}
```

#### 1.2. Add NPM Github Actions Toolkit Packages

* use `npm` to install 2 required packages from the toolkit
    * `@actions/core` → **interface** to the workflow commands, input, output variables, exit statuses, debug messages
    * `@actions/github` → returns an authenticated Octokit REST client; provides access to Github Actions contexts
    * to install, run
* run `npm install @actions/core`
* run `npm install @actions/github`
```
▶ npm install @actions/core
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN hello-world-javascript-action@1.0.0 No description

+ @actions/core@1.2.6
added 1 package and audited 1 package in 0.742s
found 0 vulnerabilities

~\Documents\workspace\SNOW\hello-world-javascript-action  master ≢ +4 ~0 -0 ! ⚡ ⨯
▶ npm install @actions/github
npm WARN hello-world-javascript-action@1.0.0 No description

+ @actions/github@4.0.0
added 21 packages from 56 contributors and audited 22 packages in 4.408s
found 0 vulnerabilities
```

### 2. Action Metadata
> Docker and JavaScript actions require a metadata file. The metadata filename must be either action.yml or action.yaml. The data in the metadata file defines the inputs, outputs and main entrypoint for your action.

* Action Metadata File == AMF
* location: root of the repo (`./`)
* name: `action.yaml`
* it has a specific [metadata syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)
* in essence you have  **4 required keys**
  1. `Name:` Action Name
  2. `Description:` Action's description
  3. `Runs: using:` What application are you using to execute the code
  4. `Runs: main:` The actuual file containing the action code (what is being executed)
* There are other optional fields as well, as illustrated in the Hello World AMF

#### 2.1. Hello-World AMF
* this is from the exemplary GitHub's **action metadata file** that
    * defines input: `who-to-greet`
    * defines output: `time` 
    * tells the action runner hot to start running this actions

```yaml
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  who-to-greet:  # id of input
    description: 'Who to greet'
    required: true
    default: 'World'
outputs:
  time: # id of output
    description: 'The time we greeted you'
runs:
  using: 'node12'
  main: 'index.js'
```

#### 2.2. Real-World AMF
* This is the bare bones essential with the 4 required fields

```yaml
name: 'Publish to Zendesk'
description: 'Publish Markdown to Zendesk'
runs:
  using: 'node12'
  main: 'publish.js'
```
### 3. Action
* Action == Code to be executed by a SQL runner that is in a separate file or a repo

#### 3.1. Hello-World Action
* create `index.js` as defined in the metadata and populate with your code, for example with

STEP# | CODE                                                                   | COMMENT
------|------------------------------------------------------------------------|-----------------------------------------------
1     | `const core = require('@actions/core');`                               | request core module at runtime
2     | `const github = require('@actions/github');`                           | request github module at runtime
3     | `const nameToGreet = core.getInput('who-to-greet');`                   | pull the binding from the action metadata file
4     | `const time = (new Date()).toTimeString();`                            | bind timestamp to `time`
5     | `core.setOutput("time", time);`                                        | push the `time` const to the output
6     | `const payload = JSON.stringify(github.context.payload, undefined, 2)` | bind stringified payload to `payload`
7     | `console.log(`The event payload: ${payload}`);`                        | print `payload`
8     | `} catch (error) {`                                                    | open the `catch` block
9     | `core.setFailed(error.message);`                                       | if error, pass the `error.message` to

```js
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

#### 3.2. Real-World Action
* Running a fork of [docs/publish.js at master · JupiterOne/docs](https://github.com/JupiterOne/docs/blob/master/zendesk/publish.js)
* It is in a private repo, but a variation of publishing markdown files within the repo into zendesk

### 4. Workflow
* required
* it has to be in a location 

```
repo\.github\workflows\main.yaml
```

* if you are not running a shared public action it **must** include a public action called **Checkout**
* the `uses` key points to a repository where `action.yml` is located

#### 4.1. Hello-World Workflow
```yaml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Hello world action step
      id: hello
      uses: ./
      with:
        who-to-greet: 'Mr Paul'
    # Use the output from the `hello` step
    - name: Get the output time
      run: echo "The time was ${{ steps.hello.outputs.time }}"
```

#### 4.2. Real-World Workflow

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
      id: publish
      uses: ./
    - name: Commit
      run: |
          date > generated.txt
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add .
          git commit -m "generated"
          git push
```

### 5. Commit && Push
* During the runtime of a workflow, github downloads each action used there
  - Actions are executed as s complete packages of code before commands like `run` can be used
  - It follows, that any package dependencies **must be included**
  - A shared prerequisite are **core** and **github** npm packages checked in the action repo

### 6. Summary: required items to be commited
1. `action.yml`
2. `index.js` any code to be executed
3. `node_modules`
4. `package.json`
5. `package-lock.json`
+ `README.md` being optional

### 7. Tests
#### 7.1. Hello-World verification

![finished_ok]({{ site.url }}/assets/img002573.jpg)

### 8. sources
* [Creating a JavaScript action - GitHub Docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
* [Metadata syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)
