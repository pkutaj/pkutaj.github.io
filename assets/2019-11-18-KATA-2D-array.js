/* 
 * the concern of this script is to calculate the highest sum of an hourglass shape within a 2,D array (2,D array kata)
 */

/* INITS */
let arr = [
    [1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 2, 4, 4, 0],
    [0, 0, 0, 2, 0, 0],
    [0, 0, 1, 2, 4, 0]
]
let i;
let j;
 /* WORK */
 function hourGlasssum(arr) {
//--------
//STEP: print an hourglass
/* TEST-START */
for(i=0; i < arr.length - 2; i++){
    for(j=0; j < arr.length - 2; j++) {
        let glass =`
            ${arr[i][j]} ${arr[i][j+1]} ${arr[i][j+2]}
              ${arr[i+1][j+1]} 
            ${arr[i+2][j]} ${arr[i+2][j+1]} ${arr[i+2][j+2]}
            `
        console.log(glass);
    }
}

/* TEST-END */
//RESULT:
//------------
 }
 hourGlasssum(arr);

