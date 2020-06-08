---
layout: post
title: git > branching
categories: [git]
---
### abstract
The concern is to document the branching git workflow with the step into pull requests on GitHub. This can be abbreviates as cloning 🠊 branching 🠊 pushing 🠊 merging 🠊 fetching 🠊 merging. 

![branches]({{ site.url }}/assets/img001097.png)

## toc
<!-- TOC -->

- [abstract](#abstract)
- [(1) init notes](#1-init-notes)
- [(2) process](#2-process)
    - [(2.1) clone](#21-clone)
    - [(2.2) checkout branch](#22-checkout-branch)
    - [(2.3) commit changes](#23-commit-changes)
    - [(2.4) push branch](#24-push-branch)
    - [(2.5) pull request](#25-pull-request)
    - [(2.6) git fetch](#26-git-fetch)
    - [(2.7) git merge origin/master](#27-git-merge-originmaster)
- [(3) final note: fork vs branch](#3-final-note-fork-vs-branch)
- [(4) video](#4-video)
- [sources](#sources)

<!-- /TOC -->

## findings
### (1) init notes
* the following is a personal analysis of [Git Feature Branch Workflow ~ Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
* ... which is a git workflow where to work on anything, really, you do the work in your own branch and merge it at an opportune moment, at a proper "junction" 
* the work is encapsulated so that the main codebase (origin/master) is not disturbed

### (2) process
#### (2.1) clone
* branches are labels on the SHA-1 hashes of the individual commits 

![git_log_example_of_unmerged_branch_status]({{ site.url }}/assets/img001098.png)

* they follow the commits of the DAG

#### (2.2) checkout branch 
* `git checkout -b new_branch`

#### (2.3) commit changes
* save changes to the file
* stage by `git add foo.bar`
* commit bt `git commit -m "foobar changed"`

#### (2.4) push branch
* push the local branch to `git push origin new_branch`
* you could also `git push -u origin new_branch` and start pushing with `git push` from that moment onwards as `-u` flag defines the branch as the default upstream branch

#### (2.5) pull request
* [Creating a pull request - GitHub Help](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)
* this is specific to the repo management tool
* the pull requests means the signal the work is done and you are requesting the master branch to pull it to itself (to merge)
* this mechanism allows discussion and feedback and transparency

![push_local_branch_to_remote]({{ site.url }}/assets/img001105.png)

* the opposite is to merge locally and push master with `git push origin master`

![commit_message_can_be_reworked]({{ site.url }}/assets/img001108.png)

* merge pull request after review 🠊 changes will be merged with master

![merge_pull_request]({{ site.url }}/assets/img001110.png)

#### (2.6) git fetch

* locally, git is unaware of this situation

![git_unaware_of_remote_merge]({{ site.url }}/assets/img001111.png)

* fetch all the changes and pull requests done remotely by `git fetch`

![git_log_after_git_fetch]({{ site.url }}/assets/img001112.png)

#### (2.7) git merge origin/master
* merge the changes fetched from the origin/master into the local master
* in effect, local repo's master branch is identical to the remote origin

![git_fetch_git_merge_origin_master]({{ site.url }}/assets/img001113.png)

* `git pull` does the same thing in the same way

### (3) final note: fork vs branch
> In git, branch is a lightweight thing that is often temporary and may be deleted. A fork (on GitHub) is a new project that is based on a previous project. You clone a repository to do work on it as a team member.
— <https://softwareengineering.stackexchange.com/a/237506>

![fork_VS_branch]({{ site.url }}/assets/img001104.png)

### (4) video
[[▶ PLAY]](https://drive.google.com/file/d/1Pp3TOiv_yEQloOA6pYcxXHp5If6x94Wf/view?usp=sharing)

### sources
* <https://softwareengineering.stackexchange.com/a/237506>
* [Git Feature Branch Workflow ~ Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)