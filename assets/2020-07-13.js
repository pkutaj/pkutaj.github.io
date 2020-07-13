function isValid(input) {
    let open = {
        1: "(",
        2: "{"
    };
    let close = {
        1: ")",
        2: "}"
    };

    // use the for parenthesis in open loop to test for the first char

    let i = 0
    for(parents in open) {
        if (open[parents] !== input[i] && close[parents] !== input[i+1]) return false
        i = i+2
    }

    return true

}
module.exports = isValid;