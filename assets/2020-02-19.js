const printerRecords = [
    {
        name: "HP",
        quantity: 3,
        amount: 300
    },
    {
        name: "Xerox",
        quantity: 5,
        amount: 750
    },
    {
        name: "Brother",
        quantity: 1,
        amount: 130
    },
    {
        name: "Brother",
        quantity: 3,
        amount: 390
    },
    {
        name: "Brother",
        quantity: 10,
        amount: 1300
    },
    {
        name: "Xerox",
        quantity: 8,
        amount: 900
    },
    {
        name: "HP",
        quantity: 7,
        amount: 1000
    },

]

function aggregatePrinters(printerRecords) {
    let printerNames_IDs = [];
    for (let printer of printerRecords) {
        if (printerNames_IDs.length === 0) printerNames_IDs.push(printer.name)
        for (let printerName of printerNames_IDs) {
            if (printer.name === printerName) {
                break
            } else {
                printerNames_IDs.push(printer.name)
                console.log(printerNames_IDs.length)
            };
            console.log(printerNames_IDs);
        }
    }
}

aggregatePrinters(printerRecords);