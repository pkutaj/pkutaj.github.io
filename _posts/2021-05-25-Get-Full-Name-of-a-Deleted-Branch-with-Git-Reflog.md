## usecase
The aim of this playbook🏁 is to find the easiest way of getting the name of a branch that was deleted. 
In particular, when following a naming convention of `<issueTrackerID_description>`. 

<!-- TOC -->

- [1. steps/?](#1-steps)
- [sources](#sources)

<!-- /TOC -->

### 1. steps/?

1. `(git reflog > reflog.md) | Invoke-Item` → the log opens in your markdown editor
2. `ctrl-f` for the issueTrackerID → [copy]
3. `git checkout -b [paste]`

* or even easier, a single-stepper `git reflog | Select-String <issue trackerID>`

```
git reflog | sls <issue trackerID>
---
<!-- I NEED A DESCRIPTION FOR ISSUETRACKER_ID SPT-705 -->
git reflog | sls SPT-705
347b87b HEAD@{15}: checkout: moving from SPT-705_include-images-to-ACD to master
...
```

### sources
* * [Git Reflog — How To Recover A Deleted Branch That Was Not Merged](https://medium.com/edureka/git-reflog-dc05158c1217)
