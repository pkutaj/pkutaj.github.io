## usecase
The aim of this playbook🏁 is to create a snippet for scripting that creates and merges a pull request in the feature branches GitHub workflow. I am using this for things like post-outage configuration amendments where I need to update lots of repositories at once, script-wise.
This helps to remove any interactive process, utilizing git & [gh cli](https://cli.github.com/)

I am leaving out the cloning and navigation part for multi-repo manipulations. This is focused primarily on automating the merge of a single-repo.

<!-- TOC -->

- [1. instructions](#1-instructions)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. instructions
* check if you are on a master branch
* pull possible changes
* checkout a new branch 
* do the work
* stage -> commit -> push
* create and merge the PR

```powershell
if ("master" -ne ((git branch) -replace "\* ", "")) {git checkout master}
git pull origin
git checkout -b "JIRA-ID/foo_description"

# MAIN CODE CHANGING SOMETHING IN THE REPO

git add "foobar.json"
git commit -m "<ops> config change within foobar.json"
git push -u origin
gh pr create --fill
gh pr merge --merge --delete-branch
```

* `-u` sets origin as a default remote repo
* `--fill` helps not to prompt for title/body and just use commit info
* `--merge` selects a merge commit, instead of rebase/squash options
* optional `--delete-branch` Delete the local and remote branch after merge

### 2. sources
* [The importance and advantage of git push -u](https://www.interglobalmedianetwork.com/blog/2020-02-15-the-importance-and-advantage-of-git-push-u/)
* [gh pr create | GitHub CLI](https://cli.github.com/manual/gh_pr_create)
* [gh pr merge - GitHub CLI](https://cli.github.com/manual/gh_pr_merge)
* [Allow setting a default push target for `pr create`](https://github.com/cli/cli/issues/1718#issuecomment-748292216)
