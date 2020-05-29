const isSingleDigit = arr => arr.length === 1 ? true : false;

function isPalindrome(x) {
    let arr = Array.from(String(x), Number)
    let frontIndex = 0
    let backIndex = arr.length - 1
    if(isSingleDigit(arr)) return true
    while (frontIndex < backIndex) {
        if(arr[frontIndex] !== arr[backIndex]) return false;
        frontIndex++;
        backIndex--;
    }
    return true;
}

module.exports = isPalindrome;