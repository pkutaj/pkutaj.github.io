/* 
 * the aim of this script of to return an absolute difference of the sum of diagonals in array of arrays
 */

/* INITS */
const diagonals = [
    [1, 2, 3],
    [3, 4, 5],
    [9, 8, 9]
];
const diagonalsLength = diagonals.length;
let primaryDiagonal = 0;
let secondaryDiagonal = 0;
let absoluteDifference = 0;
let i = 0; 
let j = 0;
let k = 2;

/* WORK */
function diagonalDifference(diagonals) {
    for (i; i < diagonalsLength; i++) {
        primaryDiagonal += diagonals[i][j];
        console.log(`round ${i} primaryDiagonal is ${primaryDiagonal}`)
        j++;
        secondaryDiagonal += diagonals[i][k]
        k--;
        console.log(`round ${i} secondaryDiagonal is ${secondaryDiagonal}`)
    }
    absoluteDifference = Math.abs(primaryDiagonal - secondaryDiagonal)
    console.log(`The absolute difference of diagonal sums is ${absoluteDifference}`)
}

/* CALL */
diagonalDifference(diagonals)