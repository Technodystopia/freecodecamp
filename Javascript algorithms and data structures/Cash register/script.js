document.getElementById('purchase-btn').addEventListener('click', calculateChange);

let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const currencyUnit = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.10],
    ["QUARTER", 0.25],
    ["ONE", 1.00],
    ["FIVE", 5.00],
    ["TEN", 10.00],
    ["TWENTY", 20.00],
    ["ONE HUNDRED", 100.00]
];

function calculateChange() {
    let cash = parseFloat(document.getElementById('cash').value);
    let changeDue = parseFloat((cash - price).toFixed(2));
    
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cash === price) {
        document.getElementById('change-due').innerText = "No change due - customer paid with exact cash";
        return;
    }

    let totalCid = cid.reduce((total, currency) => total + currency[1], 0).toFixed(2);

    if (parseFloat(totalCid) < changeDue) {
        document.getElementById('change-due').innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    } else if (parseFloat(totalCid) === parseFloat(changeDue)) {
        document.getElementById('change-due').innerText = "Status: CLOSED " + formatChange(cid);
        return;
    } else {
        let changeArray = getChange(changeDue, cid);
        
        if (changeArray === null) {
            document.getElementById('change-due').innerText = "Status: INSUFFICIENT_FUNDS";
        } else {
            document.getElementById('change-due').innerText = "Status: OPEN " + formatChange(changeArray);
        }
    }
}

function getChange(changeDue, cid) {
    let change = [];
    for (let i = currencyUnit.length - 1; i >= 0; i--) {
        let coinName = currencyUnit[i][0];
        let coinValue = currencyUnit[i][1];
        let amountAvailable = cid.find(currency => currency[0] === coinName)[1];
        let amountToReturn = 0;

        while (changeDue >= coinValue && amountAvailable > 0) {
            changeDue = parseFloat((changeDue - coinValue).toFixed(2));
            amountAvailable = parseFloat((amountAvailable - coinValue).toFixed(2));
            amountToReturn = parseFloat((amountToReturn + coinValue).toFixed(2));
        }

        if (amountToReturn > 0) {
            change.push([coinName, amountToReturn]);
        }
    }

    if (changeDue > 0) {
        return null;
    }
    return change;
}

function formatChange(changeArray) {
    return changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(' ');
}
