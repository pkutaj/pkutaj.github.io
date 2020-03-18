---
layout: post
title: PowerShell > validate input and parse JSON (currency conversion app/front-end)
categories: [powershell]
---

## the case	
* the question is, how to format a returned `JSON` and work with that as a UI element for the currency conversion app. 
* this is part of the larger, node-based, back-end 
* the point of this is only to illustrate the front-end minimalism of powershell

![cur_conv]({{ site.url }}/assets/2020-01-27-currency-converter.gif)

* The back-end written for Node is on <https://github.com/pkutaj/curcon>

## toc
<!-- TOC -->

- [a. get keys of an object](#a-get-keys-of-an-object)
- [b. the default value not passed into the backend](#b-the-default-value-not-passed-into-the-backend)
- [c. final thoughts](#c-final-thoughts)
- [sources](#sources)

<!-- /TOC -->

## CODE

```powershell
<# 
 # The concern of this module is to provide a poweshell-core front-end with a simple text-based UI to 
 # return the lasets currency exchange rates as well as pass the required parameters into the node-based 
 # back-end
 #>

<# INTRO #>
$intro = @"
  ____     
 / __ \  Mr. Paul's
/ /  \ \ Currency Converter
\ \__/ / Quit with CTRL-C
 \____/  
"@


<# FUNCTION #>
function curCon {
    param(
        # Insert Last Name
        [Parameter(Mandatory = $true)]
        [string]
        $base_currency,
        [Parameter(Mandatory = $true)]
        [string]
        $transaction_currency,
        [Parameter(Mandatory = $true)]
        [string]
        $exchange_amount
    )
    $inputValidated = validateInput
    if ($inputValidated -ne $true) { return } else {
        if ($baseCurrency -eq "q") { exit }
        node ..\..\app $base_currency $transaction_currency $exchange_amount
        Pause
        Clear-Host
    }
}

function validateInput {
    $inputError = "does not match any of the listed currencies, please try again and correct it"
    $base_currency = $base_currency.toUpper();
    $transaction_currency = $transaction_currency.toUpper();
    [Bool]$inputValidated = $true
    [Bool]$base_currency_Input_Validated = $false
    [Bool]$transaction_currency_Input_Validated = $false
    foreach ($currencyKey in $currencyKeys.Name) {
        if ($base_currency -eq $currencyKey) { $base_currency_Input_Validated = $true }
        if ($transaction_currency -eq $currencyKey) { $transaction_currency_Input_Validated = $true }
    }
    
    if ($base_currency_Input_validated -ne $true) { 
        Write-Host "The requested base currency $base_currency $inputError" -foregroundcolor Red
        $inputValidated = $false
    }
    if ($transaction_currency_Input_validated -ne $true) { 
        Write-Host "The requested transaction currency $transaction_currency $inputError" -foregroundcolor Red 
        $inputValidated = $false
    }
    return $inputValidated
    
}

Write-Host $intro
Pause
Clear-Host

<# MENU #>

$exchangeRateListBase = "EUR"
$today = Get-Date -Format "dd.MM.yyyy"
$latestRates = Invoke-WebRequest -method GET "https://api.exchangeratesapi.io/latest/?base=$exchangeRateListBase";
$latestRatesParsed = $latestRates | ConvertFrom-Json;
$output = $latestRatesParsed.rates | Out-String
$exchangeRateList = @"
  ____  
 / __ \  THE EXCHANGE RATE
/ /  \ \ BASE CURRENCY: $exchangeRateListBase
\ \__/ / DATE: $today
 \____/ 

$output

"@

$currencyKeysReadOnly = $latestRatesParsed.rates | Get-Member -type NoteProperty | Select-Object Name
[System.Collections.ArrayList]$currencyKeys = $currencyKeysReadOnly
$currencyKeys.Add(@{Name = $exchangeRateListBase })

#S3 BIND THE INPUT
Write-Host $exchangeRateList -ForegroundColor Cyan 
while ($true) {
    curcon
}
```


### a. get keys of an object 
* how to unpack that but still a question
* ? what type of an object is this

- [x] `ConvertFrom-Json()` gives you a PowerShell custom object (`PSCustomObject`) that reflects the data in the JSON string.
- [x] You can loop through the properties of a custom object with `Get-Member -type NoteProperty`

### b. the default value not passed into the backend
* the received `$currencyList` against which the input validation is done is missing the base currency for the exchange rates list
* this has to be added to the array, but there is a problem 

```
$currencyKeys.Add("EUR")
Exception calling "Add" with "1" argument(s): "Collection was of a fixed size."
At line:1 char:1
+ $currencyKeys.Add("EUR")
+ ~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
+ FullyQualifiedErrorId : NotSupportedException
```

* Change the type so `[System.Collections.Arraylist]` to make it modifiable
* the error persists here, it seems not to be possible to attach another value to the Array that contains a hash table, that is an array with a single item and that contains an object
array[0]


```powershell
$currencyKeysReadOnly = $latestRatesParsed.rates | Get-Member -type NoteProperty | Select-Object Name
[System.Collections.ArrayList]$currencyKeys = $currencyKeysReadOnly
$currencyKeys.Add(@{Name=$exchangeRateListBase})
```

### c. final thoughts
* that code above is still unreadable
* to me, it currently seems that functions should be extracted into dedicated files and requested appropriately, the added `inputvalidation` has invaded the codespace like a parasitic monster spreading itself in the center of the territory and should be removed
* ... it's still just an initial UI for passing the important parameters into the heart of code, the service layer that is (business logic)

### sources
* [source_code]({{ site.url }}/assets/2020-03-18-curcon.ps1)
* [Adding and Removing Items from a PowerShell Array – Jonathan Medd's Blog](https://www.jonathanmedd.net/2014/01/adding-and-removing-items-from-a-powershell-array.html)
* <https://stackoverflow.com/a/33521853/11082684>