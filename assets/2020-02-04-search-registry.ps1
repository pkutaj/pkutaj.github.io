######################################################################
##
## Search-RegistryKeyValues.ps1
## Search the registry keys from the current location and down for a
## given key value.
##
######################################################################
param([string] $searchText = "00062FFF-0000-0000-C000-000000000046")

dir . -rec -ea SilentlyContinue | 
% { 
    if ((get-itemproperty -Path $_.PsPath) -match $searchText) { 
        $_.PsPath
    } 
}