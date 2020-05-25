/* The concern is to swap integers using to the "to the array and back approach */

class arrayJob {
    constructor(x) {
        Array.from(String(x), Number)
    }
};

const makeArray = x => Array.from(String(x), Number)
const removeZeroes = x => {
    while (checkZeroes(x)) {
        x = x / 10;
    }
    return x;
}
const checkZeroes = x => x % 10 === 0 ? true : false;
const makePositive = x => Math.abs(x);
const checkNegative = x => x < 0 ? true : false;
const checkInt32 = x => {
    if (x >= Math.pow(2, 31) || x < Math.pow(-2, 31)) { return true }
    else { return false }
}

var reverse = function (x) {

    let isNotInt32 = checkInt32(x);
    if (isNotInt32 || x === 0) return 0

    let isNegative = checkNegative(x);
    if (isNegative) x = makePositive(x);

    let isEndedWithZeroes = checkZeroes(x)
    if (isEndedWithZeroes) x = removeZeroes(x);


    let arrFromX = makeArray(x);
    let i = 0;
    let lastIndex = arrFromX.length - 1;
    let size = arrFromX.length;
    let mid = Math.floor(size / 2);

    while (i < mid) {
        let helper = 0;
        helper = arrFromX[i];
        arrFromX[i] = arrFromX[lastIndex]
        arrFromX[lastIndex] = helper;
        i++;
        lastIndex--;
    }

    let absResult = Number(arrFromX.join(""));
    isNotInt32 = checkInt32(absResult);
    if (isNotInt32) return 0
    if (isNegative) return -Math.abs(absResult);
    return absResult;
};

module.exports = reverse