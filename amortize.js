const numFormat = {
  style: "currency",
  currency: "USD"
}

function calculate() {
  var principalRaw,
    principalDisplay,
    discount,
    rate,
    period,
    periodyr,
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
  periodyr = document.getElementById('number').value;
  period = periodyr * 12;
  
  if (periodyr > 30 || periodyr <= 0) {
    alert("Period must be greater than 0 but no higher than 30");
    return;
  }
  else {  
    discount = (((1 + rate) ** period) - 1) / (rate * (1 + rate) ** period);
    var p = principalRaw / discount;
    payment = p.toFixed(2);

    document.getElementById('payment').innerHTML = payment;

    while (principalRaw > 0 && i < period) {
      inPayRaw[i] = rate * principalRaw;
      inPayDisplay = inPayRaw[i].toLocaleString("en-US", numFormat);
      prPayRaw[i] = p - inPayRaw[i];
      prPayDisplay = prPayRaw[i].toLocaleString("en-US", numFormat);
      principalRaw = principalRaw - prPayRaw[i];
      if (principalRaw < 0) {
        principalRaw = principalRaw * -1
      }
      principalDisplay = principalRaw.toLocaleString("en-US", numFormat);
      totalInt = eval(inPayRaw.join('+'));
      totalPr = eval(prPayRaw.join('+'));
      console.log(totalInt);

      if (i % 12 == 0){
        document.getElementById('schedule').innerHTML += "<tr><td colspan='4' class='tHeader'><h2>Year " + (i/12+1) +"</h2></td></tr>";
        document.getElementById('schedule').innerHTML += "<tr><th>Month</th><th>Interest Payment</th><th>Principal Payment</th><th>Principal Balance</th></tr>"
      }

      i++;

      document.getElementById('schedule').innerHTML += "<tr><td>Month: " + i + "</td><td>" + inPayDisplay + "</td><td>" + prPayDisplay + "</td><td>" + principalDisplay + "</td></tr>";
      /*"<p class='schedule'>" + "Month " + i + ": Interest Payment: " + inPayDisplay + " Principal Payment: "+ prPayDisplay + " Principal Balance: " + principalDisplay + '</p>';*/
      if (i == period) {
        document.getElementById('intPaid').innerHTML = totalInt.toLocaleString("en-US", numFormat);
        totalPaid = totalPr + totalInt;
        document.getElementById('totalPaid').innerHTML = totalPaid.toLocaleString("en-US", numFormat);
      }
    }
  }
}
