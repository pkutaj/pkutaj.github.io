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