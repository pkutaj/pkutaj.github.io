/* The concern is to swap integers using to the "to the array and back" approach */
const checkInt32 = x => {
    if (x >= Math.pow(2, 31) || x < Math.pow(-2, 31)) { return true }
    else { return false }
}
const checkNegative = x => x < 0 ? true : false;
const checkZeroes = x => x % 10 === 0 ? true : false;
const removeZeroes = x => {
    while (checkZeroes(x)) {
        x = x / 10;
    }
    return x;
}

var reverse = function (x) {

    let isNotInt32 = checkInt32(x);
    if (isNotInt32 || x === 0) return 0

    let isNegative = checkNegative(x);
    if (isNegative) x = Math.abs(x)

    let isEndedWithZeroes = checkZeroes(x)
    if (isEndedWithZeroes) x = removeZeroes(x);

    let intToArr = Array.from(String(x), Number)
    let i = 0;
    let lastIndex = intToArr.length - 1
    let size = intToArr.length;
    let mid = Math.floor(size / 2);

    while (i < mid) {
        let helper = 0;
        helper = intToArr[i];
        intToArr[i] = intToArr[lastIndex]
        intToArr[lastIndex] = helper;
        i++;
        lastIndex--;
    }

    let absResult = Number(intToArr.join(""));
    isNotInt32 = checkInt32(absResult);
    if (isNotInt32) return 0
    if (isNegative) return -Math.abs(absResult);
    return absResult;
};

module.exports = reverse