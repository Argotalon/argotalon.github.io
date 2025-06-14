const numFormat = {
    style: "currency",
    currency: "USD"
}

document.getElementById("submit").addEventListener("click",calculate);
document.getElementById("reset").addEventListener("click",clearFields);
document.getElementById("calcDSR").addEventListener("click",calcDSR);
document.getElementById("incomePopOut").addEventListener("click",expandIncome);
document.getElementById("expensesPopOut").addEventListener("click",expandExpenses);

function expandIncome() {
    window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
}

function expandExpenses() {
    window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
}

function calcDSR(payment = 0) {
    const 
        income = Number(document.getElementById('income').value),
        expenses = Number(document.getElementById('expenses').value),
        dsrThreshold = document.getElementById('dsrThreshold')
        dsr = document.getElementById('dsr'),
        newDsr = document.getElementById('newDsr'),
        dsrContainer = document.getElementById("dsrSpan"),
        newDsrContainer = document.getElementById("newDsrSpan");
    
    let 
        dsrThresholdVal = Number(dsrThreshold.value) / 100,
        dsrVal,
        newDsrVal;    
    
    dsrContainer.dataset.valid = "Y"
    newDsrContainer.dataset.valid = "Y"

    dsrVal = expenses / income
    dsr.innerHTML = dsrVal.toLocaleString("en-US",{style:"percent"});
    if (payment > 0) {
        newDsrVal = (expenses + payment) / income
        newDsr.innerHTML = newDsrVal.toLocaleString("en-US",{style:"percent"});
    }
    if (dsrVal > dsrThresholdVal && dsrThresholdVal > 0) {
        dsrContainer.dataset.valid = "N";
    }
    if (newDsrVal > dsrThresholdVal && dsrThresholdVal > 0) {
        newDsrContainer.dataset.valid = "N";
    }
}

function clearFields() {
    document.getElementById('payment').innerHTML = ""
    document.getElementById('schedule').innerHTML = ""
    document.getElementById('intPaid').innerHTML = ""
    document.getElementById('totalPaid').innerHTML = ""
    document.getElementById('principal').value = ""
    document.getElementById('rate').value = ""
    document.getElementById('years').value = ""
    document.getElementById('months').value = ""
    document.getElementById('income').value = ""
    document.getElementById('expenses').value = ""
    document.getElementById('dsrThreshold').value = ""
}

function calculate() {
    let principalRaw,
        principalDisplay,
        discount,
        rate,
        period,
        periodYrs,
        periodMths,
        payment,
        i = 0,
        inPayRaw = [],
        inPayDisplay,
        prPayRaw = [],
        prPayDisplay,
        totalInt = 0,
        totalPr = 0,
        totalPaid = 0;
    document.getElementById('schedule').innerHTML = ""
    document.getElementById('intPaid').innerHTML = ""
    document.getElementById('totalPaid').innerHTML = ""

    principalRaw = document.getElementById('principal').value;
    rate = (document.getElementById('rate').value / 100) / 12;
    periodYrs = document.getElementById('years').value;
    periodMths = document.getElementById('months').value
    period = (periodYrs * 12) + Number(periodMths);
    
    if (period / 12 > 30 || period <= 0) {
        console.log("Tern must be greater than 0 but no higher than 30 years.");
        return;
    }
    discount = (((1 + rate) ** period) - 1) / (rate * (1 + rate) ** period);
    payment = principalRaw / discount;
    document.getElementById('schedule').innerHTML += 
        "<thead class='bg-blue-800 text-white rounded-t-md'>" +
        "<th class='border-2 border-blue-800'>Month</th>" +
        "<th class='border-2 border-blue-800'>Interest Payment</th>" +
        "<th class='border-2 border-blue-800'>Principal Payment</th>" +
        "<th class='border-2 border-blue-800'>Principal Balance</th>" +
        "</thead>"
    while (principalRaw > 0 && i < period) {
        inPayRaw[i] = rate * principalRaw;
        inPayDisplay = inPayRaw[i].toLocaleString("en-US", numFormat);
        prPayRaw[i] = payment - inPayRaw[i];
        prPayDisplay = prPayRaw[i].toLocaleString("en-US", numFormat);
        principalRaw = principalRaw - prPayRaw[i];
        if (principalRaw < 0) {
            principalRaw = principalRaw * -1
        }
        principalDisplay = principalRaw.toLocaleString("en-US", numFormat);
/*
        if (i % 12 == 0){
            document.getElementById('schedule').innerHTML += 
                    "<tr class='border-2 border-blue-800 odd:bg-blue-100 even:bg-blue-300'><td colspan='4' class='tHeader'>" +
                    "<h2 class='place-self-center'>Year " + (i/12+1) +"</h2>" +
                    "</td></tr>";
        }
*/
        i++;
        
        switch (i % 2) {
            case 1:
                classes = " class='border-2 border-blue-800 bg-blue-100 pr-4'";
                break;
        
            default:
                classes = " class='border-2 border-blue-800 bg-blue-300 pr-4'";
                break;
        }
        
        document.getElementById('schedule').innerHTML += 
            "<tr class='text-right last:rounded-b-md'>" +
                `<td${classes}>Month: ` + i + "</td>" +
                `<td${classes}>` + inPayDisplay + "</td>" +
                `<td${classes}>` + prPayDisplay + "</td>" +
                `<td${classes}>` + principalDisplay + "</td>" +
            "</tr>";
    }
    for (let i = 0; i < inPayRaw.length ;i++) {
        totalInt += inPayRaw[i];
    }
    for (let i = 0; i < prPayRaw.length ;i++) {
        totalPr += prPayRaw[i];
    }
    document.getElementById('intPaid').innerHTML = totalInt.toLocaleString("en-US", numFormat);
    document.getElementById('payment').innerHTML = payment.toLocaleString("en-US", numFormat);
    totalPaid = totalPr + totalInt;
    document.getElementById('totalPaid').innerHTML = totalPaid.toLocaleString("en-US", numFormat);
    if (document.getElementById('income').value > 0) {
        calcDSR(payment)
    }
}
