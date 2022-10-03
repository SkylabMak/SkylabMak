const box = document.getElementById("box")
const inbox = document.getElementById("inbox")
document.onmousemove = function (event) {
    var x = event.clientX * 100 / window.innerWidth + "%";
    var y = event.clientY * 100 / window.innerHeight + "%";
    console.log(x, y);

    inbox.style.left = x
    inbox.style.top = y
    inbox.style.transform = `translate(-50%,-50%)`

}
const texttyping = document.getElementById("texttyping")
var textty = ["psormkae, nlalert", " 42 Discovery Piscine"]
var i = 0
var j = 0
function typing() {
    //console.log(j)
    if (j == textty.length) {
        j = 0
        setTimeout(typing, 100);
    }
    else if (i < (textty[j].length)) {
        texttyping.innerHTML += textty[j].charAt(i);
        i++;
        setTimeout(typing, 100);
    }
    else if (i == (textty[j].length)) {
        j++
        i = 0
        if (j == textty.length) {
            j = 0
        }
        setTimeout(() => {
            texttyping.innerText = textty[j].charAt(i);
            i++;
            typing()
        }, 2500);
    }
}
typing()