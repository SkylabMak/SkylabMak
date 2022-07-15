document.title = "SM. my profile";
const age = document.getElementById("age")
const cal = document.getElementById("cal")
const today = new Date();
function getAge(birthday) {
    var today = new Date();
    //var birthDate = new Date(2004, 7, 14);
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}
const ageNewFunction =  getAge(new Date(2004, 0, 16));
console.log(ageNewFunction)
age.innerHTML = `อายุ ปัจจุบัน : ${ageNewFunction} `
cal.innerHTML = `(auto edit ${today.getDate()}/${(today.getMonth())+1}/${today.getFullYear()})`
// ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}