const inventoryRecords = [
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
let inventoryKeys = new Set();
let inventoryAggregate = {}; 

function aggregateInitialization() {
    for (let key of inventoryKeys) {
        inventoryAggregate[key] = {quantity:0, amount: 0}   
    }
    return inventoryAggregate;
}

function extractInventoryKeys() {
    for (let record of inventoryRecords) {
        if (!inventoryKeys.has(record.name)) {
            inventoryKeys.add(record.name)
        }
    }
    return inventoryKeys;
}


function aggregateInventory(inventoryRecords) {    
    extractInventoryKeys();
    aggregateInitialization();
    for (record of inventoryRecords) {
        for (let key of inventoryKeys) {
            if(record.name === key) {
                inventoryAggregate[key].amount += record.amount
                inventoryAggregate[key].quantity += record.quantity
            }
        }
    }
    console.log(inventoryAggregate);
    return inventoryAggregate;
}

aggregateInventory(inventoryRecords);