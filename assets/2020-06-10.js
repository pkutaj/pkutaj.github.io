function longestPrefix() {
    let arr = [1, 2, 3, 4, 5]
    let arrLen = arr.length;
    let runs = 0;
    let i = 0;
    for (i; i < arrLen; i++) {
        let j = i + 1
        for (j; j < arrLen; j++) {
            runs++;
        }
    }
    return runs;
}

module.exports = longestPrefix;