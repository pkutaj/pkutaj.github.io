## usecase
The aim of this playbook🏁 is to show the PowerShell version of a Python idiom that executes a script if called from a shell, but imports of called from REPL

```python
def main()
    #CODE...
    
if __name__ == "__main__":
    main()
```

<!-- TOC -->

- [1. notes](#1-notes)
- [2. sources](#2-sources)

<!-- /TOC -->

### 1. notes
* Use `$MyInvocation.Invocation` 
    - it has information about how the script was started.
* I use _dot sourcing operator_ (`.`), but you if needed, use _call opetator_ (`&`)
* If called with `. foo.ps1`, the `main()` executes.
* If imported with `Import-Module foo.ps1`, nothing happens (useful for importing with $profile, etc.)

```powershell
#foo.ps1
Function main {
    # CODE
}

If ($MyInvocation.InvocationName -eq '.') { main }
```

### 2. sources
* [What is the difference between dot (.) and ampersand (&) in PowerShell?](https://stackoverflow.com/questions/54661916/what-is-the-difference-between-dot-and-ampersand-in-powershell)
* https://stackoverflow.com/a/5582692/11082684
