/* 
 * the aim of the script is to print a staircase there base and height have the same value
 */


/* RECURSIVE BUILDER */
/**
 * 
 * @param {number} size the size of base and height
 * @param {string} block the building block of the staircase
 */

function recursiveBlockBuilder(size, block){
    if (size === 1) {
        console.log(longestWhiteSpace + block);
        return (longestWhiteSpace + block);
    }
    else {
        let lowerLayer = recursiveBlockBuilder(size - 1, block) + block
        console.log(lowerLayer) + "\n";
        return lowerLayer;
    }
}
function recursiveBuilder(size, block) {
const whiteSpace = " ";
const longestWhiteSpace = whiteSpace.repeat(size-1);
recursiveBlockBuilder(size, block)
}

/* ITERATIVE BUILDER */
function iterativeBuilder(n) {

}

recursiveBuilder(2, "?");