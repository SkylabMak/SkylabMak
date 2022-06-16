const age = document.getElementById("age")
var today = new Date();
var yeartoday = today.getFullYear();
console.log(today)
let calbirt = yeartoday - 2004;
age.innerHTML = `อายุ ปัจจุบัน : ${calbirt} `