var topScreen, subScreen, memory, result;

subScreen = document.getElementById('displaySub');
topScreen = document.getElementById('displayTop');

function number(input){
  subScreen.innerHTML += input;
  return subScreen;
}
//This here be keybinds. Open at your own risk.
document.onkeydown = function(e){
  if (e.which == 96) {
    number(0);
  }
  if (e.which == 97) {
    number(1);
  }
  if (e.which == 98) {
    number(2);
  }
  if (e.which == 99) {
    number(3);
  }
  if (e.which == 100) {
    number(4);
  }
  if (e.which == 101) {
    number(5);
  }
  if (e.which == 102) {
    number(6);
  }
  if (e.which == 103) {
    number(7);
  }
  if (e.which == 104) {
    number(8);
  }
  if (e.which == 105) {
    number(9);
  }
  if (e.which == 106) {
    calculate('*');
  }
  if (e.which == 107) {
    calculate('+');
  }
  if (e.which == 109) {
    calculate('-');
  }
  if (e.which == 110) {
    calculate('.');
  }
  if (e.which == 111) {
    calculate('/');
  }
  if (e.which == 46) {
    noScreen("");
  }
  if (e.shiftKey && e.which == 46) {
    noScreenA("");
  }
  if (e.which == 13) {
    equate(memory);
  }
  if (e.which == 57) {
    number('\(');
  }
  if (e.which == 48) {
    number('\)');
  }
}

memory = [];

function calculate(oper){
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
