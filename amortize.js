

function calculate() {
  var principalRaw,
    principalDisplay,
    discount,
    rate,
    period,
    payment,
    i = 1,
    inPayRaw,
    inPayDisplay,
    prPayRaw,
    prPayDisplay,
    totalInt = 0,
    totalPr = 0,
    totalPaid;
  document.getElementById('schedule').innerHTML = ""
  document.getElementById('intPaid').innerHTML = ""
  document.getElementById('totalPaid').innerHTML = ""

  principalRaw = document.getElementById('principal').value;
  rate = (document.getElementById('rate').value / 100) / 12;
  period = document.getElementById('number').value * 12;
  discount = (((1 + rate) ** period) - 1) / (rate * (1 + rate) ** period);
  var p = principalRaw / discount;
  payment = p.toFixed(2);

  document.getElementById('payment').innerHTML = payment;

  while (principalRaw > 0 && i <= period) {
    inPayRaw = rate * principalRaw;
    inPayDisplay = inPayRaw.toFixed(2);
    prPayRaw = p - inPayRaw;
    prPayDisplay = prPayRaw.toFixed(2);
    principalRaw = principalRaw - prPayRaw;
    principalDisplay = principalRaw.toFixed(2);
    document.getElementById('schedule').innerHTML += "<p class='schedule'>" + "Month " + i + ": Interest Payment: " + inPayDisplay + " Principal Payment: "+ prPayDisplay + " Prinicipal Balance: " + principalDisplay + '</p>' ;
    totalInt += inPayRaw;
    totalPr += prPayRaw;
    console.log(totalInt);
    i++;
    if (i == period) {
      document.getElementById('intPaid').innerHTML += totalInt.toFixed(2);
      totalPaid = totalPr + totalInt;
      document.getElementById('totalPaid').innerHTML += totalPaid.toFixed(2);
    }
  }
}
