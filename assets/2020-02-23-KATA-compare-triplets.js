/* 
 * The concern of this script is to run a comparison between two arrays and produce a new array that returns the comparison score
 * The rule is that each winning comparison is one point in the final index with two items. 
 */

/* INITS */
const allScoresPersonA = [10, 1, 0, 1];
const allScoresPersonB = [1, 2, 3, 1];
let i;
let comparison = [0,0];

function compareTriplets(tripletA, tripletB) {
    const tripletLength = tripletA.length
    for (i = 0; i < tripletLength; i++) {
        tripletA[i] > tripletB[i] ? comparison[0]++
            : tripletA[i] < tripletB[i] ? comparison[1]++
                : null

        /*  if(tripletA[i] > allScoresPersonB[i]) {comparison[0]++}
         else if (tripletA[i] < allScoresPersonB[i]) {comparison[1]++} */
    }
    console.log(comparison)
}

//--------
//STEP: loop through the triplets and return score at the end
/* TEST-START */
compareTriplets(allScoresPersonA, allScoresPersonB)
/* TEST-END */
//RESULT: PASS; Array(2) [1, 2]
//------------

