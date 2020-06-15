function longestPrefix(arr) {
    /* let arr = new Array(arrSize); */
    let n = arr.length;
    let runs = 0;
    let i = 0;
    for (i; i < n; i++) {
        let j = i + 1
        for (j; j < n; j++) {
            runs++;
        }
    }
    return runs;
}

module.exports = longestPrefix;