var topScreen, subScreen, memory, result;

subScreen = document.getElementById('displaySub');
topScreen = document.getElementById('displayTop');

function number(input) {
  subScreen.innerHTML += input;
  return subScreen;
}

memory = [];

function calculate(oper) {
  memory.push(subScreen.innerHTML);
  memory.push(oper);
  subScreen.innerHTML="";
  topScreen.innerHTML = memory.join(" ");
  console.log(memory);
}
function equate(memory){
  memory.push(subScreen.innerHTML);
  result = eval(memory.join(""));
  subScreen.innerHTML = result;
  topScreen.innerHTML = memory.join(" ") + " = ";
  console.log(memory);
  memory.splice(0,memory.length);
}
function noScreenA(input){
  subScreen.innerHTML = input;
  topScreen.innerHTML = input;
  memory.splice(0,memory.length);
  console.log(memory);
  return subScreen;
}
function noScreen(input){
  subScreen.innerHTML = input;
  return subScreen;
}
