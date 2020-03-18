/* 
 * the aim of this script is to calculate the ration/fraction of positive/negative/zero values to the sum of items
 * the aim is to be precise to 6 decimal places
 */

/* INITS */
const arr = [-4, 3, -9, , 0, 4, 1]
const arrLength = arr.length;
let positive = 0;
let zero = 0;
let negative = 0;
let i = 0;

/* ROUNDING FUNCTINO */
function roundToFourDecimals(x) {
    return Number.parseFloat(x).toPrecision(4);
}

/* DO THE WORK */
for (i; i < arrLength; i++) {
    arr[i] > 0 ? positive++ :
        arr[i] === 0 ? zero++ :
            arr[i] < 0 ? negative++ :
                null
if(i === (arrLength-1)) {
    positive /= arrLength
    negative /= arrLength
    zero /= arrLength
}
            }

/* OUTPUT */
console.log(roundToFourDecimals(positive))
console.log(roundToFourDecimals(negative))
console.log(roundToFourDecimals(zero))
