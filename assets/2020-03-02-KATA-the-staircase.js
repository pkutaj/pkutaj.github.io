/* 
 * the aim of the script is to print a staircase there base and height have the same value
 */


/* RECURSIVE BUILDER */

/**
 * 
 * @param {number} size the size of base and height
 * @param {string} block the building block of the staircase
 */

function buildRightAlignedStaircase_recursively(size, block) {
    let whiteSpaceSize = size - 1;
    let blockSize = 1;
    let whiteSpace = " ";
    helpWithEnrichedParameters(whiteSpaceSize, whiteSpace, blockSize, block);
}

function helpWithEnrichedParameters(whiteSpaceSize, whiteSpace, blockSize, block) {
    if (whiteSpaceSize === 0) {
        console.log(block.repeat(blockSize))
    } else {
        console.log(whiteSpace.repeat(whiteSpaceSize) + block.repeat(blockSize))
        helpWithEnrichedParameters(whiteSpaceSize -1, whiteSpace, blockSize + 1, block)
    }

}

buildRightAlignedStaircase_recursively(25, "@");