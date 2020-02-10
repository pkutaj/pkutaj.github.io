/* 
 * The concern of this script is to return the sum of all items within the array
 */

/* INITS */
let sumMe = [1, 2, 3];
let runningSum = 0;
let total = 0;
let i;

/* WORK */
for (i = 0; i < sumMe.length; i++) {
    runningSum += sumMe[i]
    console.log(`the running sum at the ${i+1}th item is ${runningSum}`)
    if (i === (sumMe.length - 1)) total = runningSum
}
console.log("the total is "+ total);
