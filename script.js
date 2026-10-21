let price = 5.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');

const currencyUnits = [
  ['ONE HUNDRED', 100],
  ['TWENTY', 20],
  ['TEN', 10],
  ['FIVE', 5],
  ['ONE', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.1],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
];

const checkCashRegister = () => {
  const cashProvided = parseFloat(cashInput.value);

  if (isNaN(cashProvided)) {
    alert("Please enter a valid amount");
    return;
  }

  if (cashProvided < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashProvided === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeNeeded = Math.round((cashProvided - price) * 100);
  const totalCidCents = Math.round(
    cid.reduce((sum, curr) => sum + curr[1], 0) * 100
  );

  if (totalCidCents < changeNeeded) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const cidCents = cid.reduce((acc, curr) => {
    acc[curr[0]] = Math.round(curr[1] * 100);
    return acc;
  }, {});

  let changeArr = [];
  let remainingChange = changeNeeded;

  for (let [unit, value] of currencyUnits) {
    const unitInCents = Math.round(value * 100);
    let amountFromUnit = 0;

    while (remainingChange >= unitInCents && cidCents[unit] > 0) {
      remainingChange -= unitInCents;
      cidCents[unit] -= unitInCents;
      amountFromUnit += unitInCents;
    }

    if (amountFromUnit > 0) {
      changeArr.push(`${unit}: $${amountFromUnit / 100}`);
    }
  }

  if (remainingChange > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalCidCents === changeNeeded) {
    changeDue.textContent = `Status: CLOSED ${changeArr.join(' ')}`;
  } else {
    changeDue.textContent = `Status: OPEN ${changeArr.join(' ')}`;
  }
};

purchaseBtn.addEventListener('click', checkCashRegister);
