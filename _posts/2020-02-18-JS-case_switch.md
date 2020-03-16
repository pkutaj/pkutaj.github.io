---
layout: post
title: JavaScript > Case switching
categories: [javascript]
---

## the case	
the puzzle is, how and why to do the case switching in the logic of files

## solution
![example_switch_statemtent]({{ site.url }}/assets/2020-02-18-01.png)

## sources
* [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
* [wtf](https://en.wikibooks.org/wiki/Programming_Fundamentals/Case_Control_Structure)

## terminology
* break statement
* default statement
* selection control mechanism
* multiway branching / control flows

## changelog
### 2019-03-08 14:56:33 the dynamics
* switch evaluates its own expression
* switch matches the expression's value to a case clause
* executes statements associated with that case
* proceeds to the next case
* if no matching case clause is found, the program looks for the optional **default** clause and executes it if found
	* by convention, the default clause is the last one
* the optional **break** statement ensures that the program breaks from the switch once the matched statement is executed and continues execution at a statement followingswitch
	* othwerwise, control proceeds to the next case

![executing_multiple_cases]({{ site.url }}/assets/2020-02-18-02.png)

### 2019-08-07 10:58:18 what if there is several values that should have the same response (basically ORs)
 ```javascript
let count = 0;

function cc(card) {
  switch (card) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      count++;
      break;
    case 7:
    case 8:
    case 9:
      break;
    case 10:
    case 'J':
    case 'Q':
    case 'K':
    case 'A':
      count--;
      break;
  }

  if (count > 0) {
    return console.log(count + ' Bet');
  } else {
    return console.log(count + ' Hold');
  }
} 
 ```

 ### 2019-08-07 11:24:17 there is also a tip how to be cool about refactoring the function above
 * notice the range with multiple conditions and `AND` string
 * notice the use of the regex literal

 ```javascript
function cc(card) {
 
  var regex = /[JQKA]/;
  if (card > 1 && card < 7){count++;}
    else if (card === 10 || String(card).match(regex)){count--;}
  
  if (count > 0) return count + " Bet";
  return count + " Hold";

}
 ```

### 2019-08-14 17:13:22 any negatives for switch statements ?
* `break` statements bloat the code
* they have a clear limitation: they can only do **simple equality checks** and **only against a single variable**