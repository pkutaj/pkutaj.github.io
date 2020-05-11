---
layout: post
title: powershell > modules, snapins and invoke-sqlcmd
categories: [powershell]
---

| **THE CASE OF THE POSH SQL**                                         |
|----------------------------------------------------------------------|
| **question**                                                         |
| what is the way of calling a query from the shell?                   |
| **thesis**                                                           |
| Use `Invoke-SqlCmd` either with SQL Server Module or with SQL        |
| **anti-thesis**                                                      |
| there is a reason why SSMS is almighty                               |
| **video**                                                            |
| <https://drive.google.com/open?id=1ehQy6tFvwY_MNSkivjROKpMcnWeiQY3f> |

## toc
<!-- TOC -->

- [on Invoke-SqlCmd](#on-invoke-sqlcmd)
- [Snap-ins vs Modules](#snap-ins-vs-modules)
- [Snapin: SqlServerCmdletSnapin](#snapin-sqlservercmdletsnapin)
- [Module: SQLServer](#module-sqlserver)
- [sources](#sources)

<!-- /TOC -->

## findings
### on Invoke-SqlCmd
> probably the most crucial cmdlet in SQL PowerShell space because of its broad capabilities

— [Invoke\-Sqlcmd is Now Available Supporting Cross\-Platform](https://devblogs.microsoft.com/powershell/invoke-sqlcmd-is-now-available-supporting-cross-platform/)

* currently also in powershell core via the SQL server module 🠊 for 5.0 and above

### Snap-ins vs Modules
* in PowerShell, there are two ways of adding additional functionality
    * via `Add-PSSnapin`
    * via `Import-Module`

`Add-PSSnapin`                      | `Import-Module`
------------------------------------|--------------------------------
older (v1)                          | newer (v2+)
cannot remove from session          | can remove with `Remove-Module`
DLLs installed in protected folders | just replacing files
.NET assembly (binaries)            | scripts, assemblies, ...

### Snapin: SqlServerCmdletSnapin

```
Add-PSSnapin SqlServerCmdletSnapin100
```

* additionally, you may want to use [SQL Server PowerShell Provider](https://docs.microsoft.com/en-us/sql/powershell/sql-server-powershell-provider?redirectedfrom=MSDN&view=sql-server-ver15)

### Module: SQLServer

```
Install-Module -Name SqlServer -AllowPrerelease
```

### sources
* [Invoke-Sqlcmd is Now Available Supporting Cross-Platform ~ PowerShell](https://devblogs.microsoft.com/powershell/invoke-sqlcmd-is-now-available-supporting-cross-platform/)
* [Loading SQL Server Snapins into your PowerShell Session – Dan's Blog](https://blogs.msdn.microsoft.com/dtjones/2011/03/31/loading-sql-server-snapins-into-your-powershell-session/)
* [SQL Server PowerShell Provider - SQL Server - Microsoft Docs](https://docs.microsoft.com/en-us/sql/powershell/sql-server-powershell-provider?redirectedfrom=MSDN&view=sql-server-ver15)