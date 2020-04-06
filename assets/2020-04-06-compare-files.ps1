param (
    [String(Mandatory = $true)]$file1 = "c:\Users\Admin\Documents\workspace\work.log\pkutaj\assets\2020-04-06-compare-files.ps1"
    [String(Mandatory = $true)]$file2 = "c:\Users\Admin\Documents\workspace\work.log\pkutaj\assets\2020-04-06-compare-files.ps1"
)

$file1hash = (Get-FileHash $file1).hash
$file2hash = (Get-FileHash $file2).hash
[bool]$different = $file2hash.CompareTo($file1hash)
if ($different) {
    Write-Host "Not the Same"
}
else { Write-Host "Same" }`