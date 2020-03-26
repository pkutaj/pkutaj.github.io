/*  
 * The aim of this script is to exertice arrays. 
 * Findind a minimal and maximal sum of 4 items within array of 5 items
 * 
*/

/* INITS */
let array = [4,5,1,1,2]
let arraySum = 0;
let i = 0;
let minSum = 0;
let maxSum = 0; 
let maxVal = Number.MIN_VALUE;
let minVal = Number.MAX_VALUE;

/* WORK */
for(i; i<array.length; i++) {
minVal = Math.min(array[i], minVal);
maxVal = Math.max(array[i], maxVal);
arraySum += array[i];
}

minSum = arraySum - maxVal;
maxSum = arraySum - minVal;

/* OUTPUT */
console.log(`the array provided is ${array}`);
console.log(`the sum of all items is ${arraySum}`);
console.log(`the minimal Value is ${minVal}`);
console.log(`the maximal Valus is ${maxVal}`);
console.log(`the minimal Sum is ${minSum}`);
console.log(`the maximal Sum is ${maxSum}`);