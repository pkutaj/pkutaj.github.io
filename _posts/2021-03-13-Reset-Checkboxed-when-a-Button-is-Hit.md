## usecase
The aim of this tutorial🔍 is to create a simple sheet containing list of checkboxes and a button that resets all of them at once for the quality review

TL DR; 
just take and populate the template from 
> https://docs.google.com/spreadsheets/d/1dAcvKPKAlYSxMp9MmEsdB5AjU24c63THYOKcjl4AWgo/edit?usp=sharing

<!-- TOC -->

- [1. Checkbox reset](#1-checkbox-reset)
- [2. Add button](#2-add-button)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. Checkbox reset

```js 
function ResetCheckboxesOnSheet() {
  var ss=SpreadsheetApp.getActive();
  var sh=ss.getActiveSheet();
  var rg=sh.getDataRange();
  var vA=rg.getDataValidations();
  var cbA=[];
  for(var i=0;i<vA.length;i++) {
    for(var j=0;j<vA[i].length;j++) {
      var rule=vA[i][j];
      if(rule!=null) {
        var criteria = rule.getCriteriaType();
        if(criteria == SpreadsheetApp.DataValidationCriteria.CHECKBOX) {
          sh.getRange(i+1,j+1).setValue(false)

        }
      }
    }
  }
}
```

— from [Google Script to clear Checkboxes and Notes in cells unexpectedly clears HYPERLINKS as well - Stack Overflow](https://stackoverflow.com/questions/54929107/google-script-to-clear-checkboxes-and-notes-in-cells-unexpectedly-clears-hyperli)

### 2. Add button
* Add button as per [Google Sheets Button: Run Apps Script With A Single Click](https://www.benlcollins.com/apps-script/google-sheets-button/)


![resetChecklist]({{ site.url }}/assets/img002698.gif)

### 3. sources
* [Google Sheets Button: Run Apps Script With A Single Click](https://www.benlcollins.com/apps-script/google-sheets-button/)
* [Google Script to clear Checkboxes and Notes in cells unexpectedly clears HYPERLINKS as well - Stack Overflow](https://stackoverflow.com/questions/54929107/google-script-to-clear-checkboxes-and-notes-in-cells-unexpectedly-clears-hyperli)

