function isValid(s) {
    let open = {
        1: "(",
        2: "{",
        3: "["
    };
    let close = {
        1: ")",
        2: "}",
        3: "]"
    };

    let mid = s.length / 2
    let i = mid - 1
    let j = mid
    let openMid; 
    if (s.length % 2 !== 0) return false;
    while (i >= 0) {
        for (parents in open) {
            if (open[parents] === s[i]) openMid = true;
            if (open[parents] === s[i] && close[parents] !== s[j]) return false
        }
        i--;
        j++;
    }
    if(!openMid) {return false} else {return true}
}
module.exports = isValid;