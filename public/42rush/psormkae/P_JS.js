document.querySelectorAll(".home").forEach((x) => {
    x.addEventListener("click", () => {
        history.back();
    })
})
document.querySelectorAll(".up").forEach((x) => {
    x.addEventListener("click", () => {
        window.scrollTo(0,0);
    })
})
document.querySelectorAll(".about").forEach((x) => {
    x.addEventListener("click", () => {
        window.scrollTo(0, document.getElementById("About").offsetTop);
    })
})
document.querySelectorAll(".resume").forEach((x) => {
    x.addEventListener("click", () => {
        window.scrollTo(0, document.getElementById("Resume").offsetTop);
    })
})
document.querySelectorAll(".skill").forEach((x) => {
    x.addEventListener("click", () => {
        window.scrollTo(0, document.getElementById("Skills").offsetTop);
    })
})
document.querySelectorAll(".contact").forEach((x) => {
    x.addEventListener("click", () => {
        window.scrollTo(0, document.getElementById("Contact").offsetTop);
    })
})
/*
$(".home").click(() => {
    window.scrollTo(0, 0);
})
$(".about").click(() => {
    window.scrollTo(0, $("#About").position().top - 150);
})
$(".resume").click(() => {
    window.scrollTo(0, $("#Resume").position().top - 150);
})
$(".skill").click(() => {
    window.scrollTo(0, $("#Skills").position().top - 150);
})
$(".contact").click(() => {
    window.scrollTo(0, $("#Contact").position().top - 150);
})
console.log($("#Resume").position().top)
*/
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("iconbar02").style.top = "0";
    } else {
        document.getElementById("iconbar02").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}
function scrollreval() {
    var reveals = document.querySelectorAll(".reveal")

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight
        var revealTop = reveals[i].getBoundingClientRect().top
        var revealport = 150

        if (revealTop < windowheight - revealport) {
            reveals[i].classList.add("active")
        }
        else {
            reveals[i].classList.remove("active")
        }
    }
}
window.addEventListener("scroll", scrollreval)
scrollreval()
const texttyping = document.getElementById("texttyping")
var textty = [" 42 Discovery Piscine", "psormkae", "My Nickname Mek"]
var i = 0
var j = 0
function typing() {
    //console.log(i)
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
const age = document.getElementById("age")
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
const ageNewFunction = getAge(new Date(2004, 0, 16));
console.log(ageNewFunction)
age.innerHTML = `${ageNewFunction}
<small style="color: rgba(255, 255, 255, 0.67);"> 
( auto edit  ${today.getDate()}/${(today.getMonth()) + 1}/${today.getFullYear()} )</small>`
//cal.innerHTML = `(auto edit ${today.getDate()}/${(today.getMonth())+1}/${today.getFullYear()})`

async function SenMClick() {
    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    }
    let url = (`https://reqres.in/api/users`)
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            console.log(resJson.name);
            alert(`complete!!\nname : ${resJson.name}\nemail : ${resJson.email}\nid : ${resJson.id}`)
            document.getElementById("name").value = ""
            document.getElementById("email").value = ""
            document.getElementById("subject").value = ""
            document.getElementById("message").value = ""
        })
        .catch(() => {
            console.dir(error);
        });
}
document.getElementById("SenM").addEventListener("click", SenMClick)