var reverse = function (x) {
    if (x >= Math.pow(2, 31) || x < Math.pow(-2, 31)) return 0
    let intToStr = String(x);
    let i = 0;
    let size = intToStr.length;
    let mid = Math.floor(size / 2);
    let helper = "";
    let lastIndex = intToStr.length - 1

    while (intToStr[lastIndex] === "0") {
        intToStr = intToStr.slice(0, lastIndex)
    }

    while (i < mid) {
        helper = intToStr[i];
        intToStr = intToStr.replace(intToStr[i], intToStr[lastIndex])
        intToStr = intToStr.replace(intToStr[lastIndex],helper)
        i++
        lastIndex--
    }

    return intToStr;
};
module.exports = reverse