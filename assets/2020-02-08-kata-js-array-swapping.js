/* 
 * The concern of this script is to swap the existing array of items
 */

let swapMe = [1,2,3,4]
console.log("original array: " + swapMe )
let i;
let lastExchangedPosition;
let middlePosition = Math.floor(swapMe.length / 2)

for (i = 0; i < middlePosition; i++) {
    swapMe.push(swapMe[i]);
    let lastExtraPosition = swapMe.length -1
    lastExchangedPosition = [lastExtraPosition -1 -i]
    swapMe[i] = swapMe[lastExchangedPosition];
    swapMe[lastExchangedPosition] = swapMe[lastExtraPosition];
    swapMe.pop();
    lastExchangedPosition--;}

console.log("swapped array: " + swapMe)
//PASSED: swapped array: 6,5,4,3,2,1
