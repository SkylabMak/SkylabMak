function openForm() {
    document.getElementById("formOF").style.display = "block";
}

function closeForm() {
    document.getElementById("formOF").style.display = "none";
}


var btnOpen = document.getElementById("sign")
    .addEventListener('click', openForm)
var btnClose = document.getElementById("close_popup")
    .addEventListener('click', closeForm)

//showfriend
var screenShow = document.getElementById('screenShow')
function getallusersAndcreateCard() {
    let url = ("https://skylabmakdb.herokuapp.com/products/")
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            screenShow.innerHTML = "<div id ='refresh' class='buttonRefresh'>รีเฟรช</div>"
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson)
            resJson.forEach((resJson) => {
                //box
                let box = document.createElement('div');
                box.classList.add('card');

                //img
                let img = document.createElement('img');
                img.classList.add('personimg');
                img.src = "../pic/personicon.png";

                //text
                let textname = document.createElement('span');
                textname.innerHTML = "<br> ชื่อ : " + resJson.name;
                let textsay = document.createElement('span');
                textsay.innerHTML = "<br> ทักทาย : " + resJson.say;
                let textcontacts = document.createElement('span');
                textcontacts.innerHTML = "<br> ติดต่อ : " + resJson.contact;

                //mix 
                box.append(img, textname, textsay, textcontacts)
                screenShow.prepend(box)
            })
        })
        .catch(() => {
            console.log("ผิดพลาด");
        });

}

//กรอกข้อมูล
var phone_ID = []
//-from
var fromEditData = document.getElementById("fromEditData")
//-input
var input_Phone = document.getElementById("input_Phone")
var nameInput = document.getElementById("input_Name")
var sayInput = document.getElementById("input_say")
var contactInput = document.getElementById("input_contact")
//-button
var senData = document.getElementById("sendData")
var edit = document.getElementById("Edit")
var sign = document.getElementById("sign")
var cancel = document.getElementById("cancel")
var remove = document.getElementById("remove")
var leave = document.getElementById("leave")
var refresh = document.getElementById("refresh")


function notfill() {
    fromEditData.style.display = "none";
    sign.style.display = "none";
    edit.style.display = "inline-block";
    remove.style.display = "inline-block";
    screenShow.style.display = "block";
    leave.style.display = "inline-block";
    getallusersAndcreateCard();
}

function notfillAndSign() {
    fromEditData.style.display = "none";
    edit.style.display = "none";
    remove.style.display = "none";
    sign.style.display = "inline-block";
    leave.style.display = "inline-block";
    phone_ID.shift();
}

function removeuser() {
    notfillAndSign();
    let url = `
    https://skylabmakdb.herokuapp.com/products/delete/${phone_ID}`

    fetch(url, { method: 'POST', })
        .then((response) => {
            alert('ลบข้อมูลเสร็จสิน');
            console.log(response);
        })
        .catch((error) => {
            console.log(error.message)
        })
}

function newuser() {
    let waitdata = document.getElementById("waitdata");
    waitdata.innerHTML = "กำลังส่งข้อมูล";
    let url = `
    https://skylabmakdb.herokuapp.com/products/insert`

    let user = {
        "phonID": input_Phone.value,
        "avatar": "",
        "name": nameInput.value,
        "say": sayInput.value,
        "contact": contactInput.value
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },//ส่งไปเพื่อบอกเกียวกับข้อมูลทที่ส่งไป
        body: JSON.stringify(user)//แปลง เป็น สตริง
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            waitdata.innerHTML = "ส่งข้อมูลเสร็จสิน";
            alert('ส่งขอมูลเสร็จสิน เบอร์โทร สำหรับยืนยืนตัวตนคือ : ' + json.phonID)
            notfill()

        })
        .catch((error) => {
            console.log(error.message)
        })
}

function updateuser() {
    let waitdata = document.getElementById("waitdata");
    waitdata.innerHTML = "กำลังส่งข้อมูล";
    let url = `
    https://skylabmakdb.herokuapp.com/products/edit/${phone_ID}`

    let user = {
        "phonID": input_Phone.value,
        "avatar": "",
        "name": nameInput.value,
        "say": sayInput.value,
        "contact": contactInput.value
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },//ส่งไปเพื่อบอกเกียวกับข้อมูลทที่ส่งไป
        body: JSON.stringify(user)//แปลง เป็น สตริง
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            waitdata.innerHTML = "ส่งข้อมูลเสร็จสิน";
            alert('แก้ไขข้อมูลสำเร็จ เบอร์โทร สำหรับยืนยืนตัวตนคือ : ' + json.phonID)
            notfill()

        })
        .catch((error) => {
            console.log(error.message)
        })
}

function fillNew() {
    fromEditData.style.display = "block";
    sign.style.display = "none";
    leave.style.display = "none";
    input_Phone.value = phone_ID;

    senData.addEventListener("click", newuser);
    cancel.addEventListener("click", notfillAndSign);
}

function warnremove() {
    let removepopup = document.getElementById('removepopup');
    let sureremove = document.getElementById('sureremove');
    let notsureremove = document.getElementById('notsureremove');

    removepopup.style.display = "block";

    sureremove.addEventListener("click", () => {
        removeuser();
        removepopup.style.display = "none";
    })
    notsureremove.addEventListener("click", () => {
        removepopup.style.display = "none";
    })
}

async function fillOld() {
    let waitdata = document.getElementById("waitdata");
    fromEditData.style.display = "block";
    sign.style.display = "none";
    edit.style.display = "none";
    remove.style.display = "none";
    leave.style.display = "none"

    waitdata.innerHTML = "กำลังคืนค่าข้อมูล";

    input_Phone.value = phone_ID;

    let url = (`https://skylabmakdb.herokuapp.com/products/${phone_ID}`)
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {

            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson);
            nameInput.value = resJson.name;
            sayInput.value = resJson.say;
            contactInput.value = resJson.contact;

            console.log("data = " + resJson)
            waitdata.innerHTML = 'คืนค่าข้อมูลเสร็จสิน'
        })
        .catch(() => {
            console.log("ผิดพลาด");
        });
    cancel.addEventListener("click", notfill)
    senData.addEventListener("click", updateuser)
}

edit.addEventListener("click", fillOld)
remove.addEventListener("click", warnremove)
refresh.addEventListener("click", getallusersAndcreateCard)


//check friend---------------------------------------------------
var btnCheck = document.getElementById('next_page')
var PhoneInput = document.getElementById('popup_phone')
var sue = document.getElementById('sue')
var waitcheck = document.getElementById("waitcheck")


async function btnpush() {
    //event.preventDefault();
    console.log('buttonpush')
    let IDphon = String(PhoneInput.value)
    phone_ID.push(IDphon);
    console.log('ค่าที่กรอก', IDphon)
    let url = (`https://skylabmakdb.herokuapp.com/products/${IDphon}`)
    console.log('URL', url)
    waitcheck.innerText = "กำลังติดต่อเซิร์ฟเวอร์"
    if (IDphon === "") {
        var timeID01 = 0
        var timeID02 = 0
        sue.innerText = "กรุณากรอกเบอร์โทร"
        timeID01 = setInterval(() => {
            sue.innerText = "กรุณากรอกเบอร์โทร"
        }, 500)
        setTimeout(() => {
            timeID02 = setInterval(() => {
                sue.innerText = "-"
            }, 500)
        }, 800)
        setTimeout(() => {
            clearInterval(timeID01)
            clearInterval(timeID02)
            sue.innerText = "-"
        }, 5000)
        btnCheck.addEventListener("click", () => {
            clearInterval(timeID01)
            clearInterval(timeID02)
            sue.innerText = "-"
        })
    }
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson)
            if (String(resJson) === "null") {
                fillNew();
                closeForm();
                waitcheck.innerText = ""
            }
            else if (IDphon === "") {
                return;
            }
            else {
                notfill();
                closeForm();
                waitcheck.innerText = ""
            }
            console.log("data = " + resJson)
        })
        .catch(() => {
            console.log("ผิดพลาด");
        });

}
function tentext() {
    if (PhoneInput.value.length > 10 || PhoneInput.value.length < 10) {
        document.getElementById("popup_phone")
            .style.borderBottom = "2px solid red";
    }
    else {
        document.getElementById("popup_phone")
            .style.borderBottom = "2px solid black";
    }
}

btnCheck.addEventListener("click", btnpush)
PhoneInput.addEventListener("input", tentext)


//https://medium.com/neverrest/cors-%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2-cors-%E0%B8%97%E0%B8%B5%E0%B9%88-web-developer-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%88%E0%B8%AD-5afb6a9e742f
//..
//https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl
