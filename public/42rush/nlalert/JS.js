const navHeight = document.getElementById('nav').offsetHeight
console.log(navHeight)
document.getElementById("home")
    .addEventListener("click", () => {
        history.back();
    })
document.getElementById("up")
    .addEventListener("click", () => {
        window.scrollTo(0, 0);
    })
document.getElementById("about")
    .addEventListener("click", () => {
        window.scrollTo(0,
            (document.getElementById("About").offsetTop) - navHeight
        )
    })
document.getElementById("resume")
    .addEventListener("click", () => {
        window.scrollTo(0,
            (document.getElementById("Resume").offsetTop) - navHeight
        )
    })
document.getElementById("skill")
    .addEventListener("click", () => {
        window.scrollTo(0,
            (document.getElementById("Skill").offsetTop) - navHeight
        )
    })
document.getElementById("contact")
    .addEventListener("click", () => {
        window.scrollTo(0,
            (document.getElementById("Contact").offsetTop) - navHeight
        )
    })

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
const ageNewFunction = getAge(new Date(2004, 01, 18));
console.log(ageNewFunction)
age.innerHTML = `${ageNewFunction}`

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