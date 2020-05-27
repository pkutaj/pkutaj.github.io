function isPalindrome(x) {
    let arr = Array.from(String(x), Number)
    let i = 0
    let lastI = arr.length - 1
    let result;
    if(arr.length === 1) return true
    while (i < lastI) {
        if(arr[i] !== arr[lastI]) return result = false;
        i++;
        lastI--;
    }
    return result = true;
}
module.exports = isPalindrome;