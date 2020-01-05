---
layout: post
title: GAS > To-Do List with Auto-ID
last_modified_at: 
---
## the case	
the puzzle is the auto-population of the ID column, similar to what is easily done in SQL. 
Building a todo list in Sheets and need to have a key to identify a record. 
Key is a concatenation of the project name + incrementing nr. 

## solution
Created a [TODO-template](https://docs.google.com/spreadsheets/d/18_rKIbXuwVbo0FEO6nA5bk4SIKaxVNJC_8lVdVww-Mk/edit#gid=1517944297) with a function that is automatically creating an ID and timestamp for the request creaton. Check [CODE](#code). 

![demo]({{ site.url }}/assets/2019-09-23.gif)

## toc

<!-- TOC -->

- [sources](#sources)
- [code](#code)

<!-- /TOC -->

### sources
* [TODO-template](https://docs.google.com/spreadsheets/d/18_rKIbXuwVbo0FEO6nA5bk4SIKaxVNJC_8lVdVww-Mk/edit#gid=1517944297)
* [Working with Dates and Times](https://developers.google.com/google-ads/scripts/docs/features/dates)
* [How to turn off Insert/Overwrite in Google Spreadsheets](https://webapps.stackexchange.com/questions/93404/how-to-turn-off-insert-overwrite-in-google-spreadsheets)
* [How to limit the length of data in a cell in Google Sheets?](https://webapps.stackexchange.com/questions/76174/how-to-limit-the-length-of-data-in-a-cell-in-google-sheets)
  

### code
```javascript
function onEdit(e) {
  /* CORE VARIABLES */
// The column you want to check if something is entered.
var COLUMNTOCHECK = 3;
// Where you want the date time stamp offset from the input location. [row, column]
var ID_LOCATION = [0,-2];
var TIMESTAMP_LOCATION = [0,1]
// Sheet you are working on
var SHEETNAME = "LIST"
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var activeCell = ss.getActiveCell();
  // bindings that create a unique ID
  var projectNameCell = sheet.getRange(1,2).getValue()
  var idRow = (activeCell.getRow() - 2);
  var projectID = projectNameCell + idRow
  Logger.log(projectID)
  //checks that we're on the correct sheet.
  if(activeCell.getRow() >2) {
    
    //clears the timestamp if the drop-down is deleted
    if(activeCell.isBlank() && activeCell.getColumn() === COLUMNTOCHECK) {
      activeCell.offset(ID_LOCATION[0],ID_LOCATION[1]).clearContent();
      activeCell.offset(TIMESTAMP_LOCATION[0],TIMESTAMP_LOCATION[1]).clearContent();
    }
    
    //populates the offsetted column with a timestamp
    if(sheet.getSheetName() == SHEETNAME && activeCell.isBlank() === false) { 
    
    //checks the column to ensure it is on the one we want to cause the date to appear.
    if( activeCell.getColumn() == COLUMNTOCHECK) { 
      var idCell = activeCell.offset(ID_LOCATION[0],ID_LOCATION[1]);
      var timeStampCell = activeCell.offset(TIMESTAMP_LOCATION[0],TIMESTAMP_LOCATION[1]);
      idCell.setValue(projectID);
      timeStampCell.setValue(new Date()); 
      }
  }
  }}
```
 