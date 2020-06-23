

function calculate() {
  var principalRaw,
    principalDisplay,
    discount,
    rate,
    period,
    payment,
    i = 0,
    inPayRaw = [],
    inPayDisplay,
    prPayRaw = [],
    prPayDisplay,
    totalInt,
    totalPr,
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

  while (principalRaw > 0 && i < period) {
    inPayRaw[i] = rate * principalRaw;
    inPayDisplay = inPayRaw[i].toFixed(2);
    prPayRaw[i] = p - inPayRaw[i];
    prPayDisplay = prPayRaw[i].toFixed(2);
    principalRaw = principalRaw - prPayRaw[i];
    principalDisplay = principalRaw.toFixed(2);
    totalInt = eval(inPayRaw.join('+'));
    totalPr = eval(prPayRaw.join('+'));
    console.log(totalInt);
    i++;
    document.getElementById('schedule').innerHTML += "<p class='schedule'>" + "Month " + i + ": Interest Payment: " + inPayDisplay + " Principal Payment: "+ prPayDisplay + " Prinicipal Balance: " + principalDisplay + '</p>' ;
    if (i == period) {
      document.getElementById('intPaid').innerHTML += totalInt.toFixed(2);
      totalPaid = totalPr + totalInt;
      document.getElementById('totalPaid').innerHTML += totalPaid.toFixed(2);
    }
  }
}
