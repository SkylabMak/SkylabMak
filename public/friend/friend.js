document.title = "SM. old friend";
//prepare api
console.log("https://skm-img.onrender.com/ status");
fetch("https://skm-img.onrender.com/")
    .then((response) => { console.log(response) })
console.log("db-friend.vercel.app/ status");
fetch("https://db-friend.vercel.app/")
    .then((response) => { console.log(response) })

const urlUploadImg = "https://skm-img.onrender.com";
const urlDbFriend = "https://db-friend.vercel.app";
//storage
let saveID = '';
//localStorage.setItem(saveID, 'Value'); 
console.log(localStorage.getItem('saveID'));

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
var outbox = document.getElementById('outbox')
function getallusersAndcreateCard() {
    imgload.style.display = "block"
    let url = (`${urlDbFriend}/products/`)
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            outbox.innerHTML = ""
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson)
            resJson.forEach((resJson) => {
                //box
                let box = document.createElement('div');
                box.classList.add('card');

                //img
                let img = document.createElement('img');
                img.classList.add('personimg');
                if (resJson.avatar === "") {
                    img.src = "https://res.cloudinary.com/dsovxvqzi/image/upload/v1655085605/testuploadimg/personicon_fcyarv.png";
                }
                else {
                    img.src = resJson.avatar
                }

                //text
                let textname = document.createElement('span');
                textname.innerHTML = "<br> ชื่อ : " + resJson.name;
                textname.classList.add('textwhire');
                let textsay = document.createElement('span');
                textsay.innerHTML = "<br> ทักทาย : " + resJson.say;
                textsay.classList.add('textwhire');
                let textcontacts = document.createElement('span');
                textcontacts.innerHTML = "<br> ติดต่อ : " + resJson.contact;
                textcontacts.classList.add('textwhire');

                //mix 
                box.append(img, textname, textsay, textcontacts)
                outbox.prepend(box)
            })
            imgload.style.display = "none"
        })
        .catch(() => {
            console.dir(error);
            imgload.style.display = "none";
        });

}

//กรอกข้อมูล
var numIDstates = Math.floor(Math.random() * 1000)
var phone_ID = 0
var IDstatus = 0 // 0  = newuser 1 = olduser
var urlIMG = ""
var uploadImg = ""
//-from
var boxPhone = document.getElementById('boxPhone')
var fromEditData = document.getElementById("fromEditData")
var showphon = document.getElementById('showphon');
//popup
var removepopup = document.getElementById('removepopup');
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
var signout = document.getElementById("signout")
var refresh = document.getElementById("refresh")
var sureremove = document.getElementById('sureremove');
var notsureremove = document.getElementById('notsureremove');
var hide = document.getElementById('hide');
var visit = document.getElementById('visit');
//imgInput
var imgInput = document.getElementById('imgUpload')
var showimg = document.getElementById('showimg')
var tagnameimg = document.getElementById('nameimg')
//load
var imgload = document.getElementById('imgloder')

function notfill() {
    visit.style.display = "none";
    fromEditData.style.display = "none";
    sign.style.display = "none";
    edit.style.display = "inline-block";
    remove.style.display = "inline-block";
    screenShow.style.display = "block";
    signout.style.display = "inline-block";
    screenShow.style.display = "block";
    leave.style.display = "inline-block";
    boxPhone.style.display = "block";
    showphon.innerHTML = phone_ID
    getallusersAndcreateCard();
}

function notfillAndSign() {
    remove.style.display = "none";
    visit.style.display = "inline-block";
    fromEditData.style.display = "none";
    edit.style.display = "none";
    sign.style.display = "inline-block";
    signout.style.display = "none";
    leave.style.display = "inline-block";
    screenShow.style.display = "none"
    boxPhone.style.display = "none";
    localStorage.removeItem('saveID');
    console.log(localStorage.getItem('saveID'));
    phone_ID = 0
    IDstatus = 0
    console.log(IDstatus)
}

function removeuser() {
    imgload.style.display = "block"
    removepopup.style.display = "none";
    console.log(phone_ID)
    let url = `
    ${urlDbFriend}/products/delete/${phone_ID}`
    //console.log(url)

    fetch(url, { method: 'POST', })
        .then((response) => {
            localStorage.removeItem('saveID');
            console.log(localStorage.getItem('saveID'));
            alert('ลบข้อมูลเสร็จสิน');
            console.log(response);
            IDstatus = 0
            //console.log(IDstatus)
            document.getElementById("popup_phone").value = ""
            imgload.style.display = "none"
            notfillAndSign();
        })
        .catch((error) => {
            console.log(error.message)
        })
}

function newuser() {
    imgload.style.display = "block"
    console.log(urlIMG)
    let waitdata = document.getElementById("waitdata");
    waitdata.innerHTML = "กำลังส่งข้อมูล";
    let url =
        `${urlDbFriend}/products/insert`

    let user = {
        "phonID": input_Phone.value,
        "avatar": urlIMG,
        "name": nameInput.value,
        "say": sayInput.value,
        "contact": contactInput.value
    }

    console.log(user)
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
            localStorage.setItem('saveID', input_Phone.value);
            console.log(json)
            waitdata.innerHTML = "ส่งข้อมูลเสร็จสิน";
            alert('ส่งขอมูลเสร็จสิน เบอร์โทร สำหรับยืนยืนตัวตนคือ : ' + json.phonID)
            notfill()
            IDstatus = 1
            console.log(IDstatus)

        })
        .catch((error) => {
            console.log(error.message)
            waitdata.innerHTML = error.message;
            imgload.style.display = "none"
        })
}

function updateuser() {
    imgload.style.display = "block"
    console.log(urlIMG)
    let waitdata = document.getElementById("waitdata");
    waitdata.innerHTML = "กำลังส่งข้อมูล";
    let url = `
    ${urlDbFriend}/products/edit/${phone_ID}`

    let user = {
        "phonID": input_Phone.value,
        "avatar": urlIMG,
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
            localStorage.setItem('saveID', input_Phone.value);
            waitdata.innerHTML = "ส่งข้อมูลเสร็จสิน";
            alert('แก้ไขข้อมูลสำเร็จ เบอร์โทร สำหรับยืนยืนตัวตนคือ : ' + json.phonID)
            notfill()
        })
        .catch((error) => {
            waitdata.innerHTML = error.message;
            console.log(error.message)
            imgload.style.display = "none"
        })
}
//reload count--------------
let reloadCount = 0;
//reload count--------------
async function createURLimg() {
    imgload.style.display = "block"
    let waitdata = document.getElementById("waitdata");
    waitdata.innerHTML = "กำลังส่งรูปภาพ";
    const formData = new FormData()
    formData.append('image', imgInput.files[0])

    if (String(imgInput.files[0]) === "undefined") {
        if (IDstatus === 0) {
            urlIMG = "https://res.cloudinary.com/dsovxvqzi/image/upload/v1655085605/testuploadimg/personicon_fcyarv.png";
            newuser();
        }
        else {
            updateuser();
        }
    }
    else {
        //console.log(imgInput.files)
        console.log(imgInput.files[0])
        await fetch(`${urlUploadImg}/uploadIMG/${phone_ID}`, {
            method: 'POST',
            body: formData
        })
            .then(response => { return response.json() })
            .then(data => {
                console.log(data.url)
                urlIMG = data.url
            })
            .then(() => {
                {
                    if (IDstatus === 0) {
                        newuser();
                    }
                    else {
                        updateuser();
                    }
                }
            })
            .catch(error => {
                console.log("Error fetch " + reloadCount)
                if (reloadCount <= 3) {
                    imgload.style.display = "none"
                    waitdata.innerHTML = "เจอปัญหาในการอัปโหลดรูป กำลังลองใหม่";
                    setTimeout(() => {
                        createURLimg();
                        console.error(error)
                        console.log("เจอปัญหาในการอัปโหลดรูป กำลังลองใหม่")
                        reloadCount++;
                    }, 1000);


                }
                else {
                    imgload.style.display = "none"
                    waitdata.innerHTML = "ไม่สามารถอัปโหลดรูปได้ โปรดรีเฟรช หรือลองในภายหลัง หรือแจ้งเจ้าของเว็บไซต์";
                    console.error(error)
                }
            })
    }


}

//fill
function preview() {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        uploadImg = reader.result;
        showimg.style.backgroundImage = `url(${uploadImg})`;
    })
    reader.readAsDataURL(this.files[0]);
    //let nameimg = imgInput.files[0].name;
    //tagnameimg.textContent = nameimg;
}

function fillNew() {
    document.getElementById("waitdata").innerHTML = "-"
    fromEditData.style.display = "block";
    sign.style.display = "none";
    leave.style.display = "none";
    screenShow.style.display = "none"
    signout.style.display = "none";
    //value
    input_Phone.value = phone_ID;
    nameInput.value = "";
    sayInput.value = "";
    contactInput.value = "";
    console.log(IDstatus);


    senData.addEventListener("click", createURLimg)
}
function Fvisit() {
    visit.style.display = "none";
    fromEditData.style.display = "none";
    sign.style.display = "none";
    edit.style.display = "none";
    remove.style.display = "none";
    screenShow.style.display = "block";
    signout.style.display = "none";
    leave.style.display = "inline-block";
    boxPhone.style.display = "none";
    getallusersAndcreateCard();
}

async function fillOld() {
    imgload.style.display = "block"
    let waitdata = document.getElementById("waitdata");
    fromEditData.style.display = "block";
    sign.style.display = "none";
    edit.style.display = "none";
    remove.style.display = "none";
    leave.style.display = "none"
    signout.style.display = "none";

    //block
    imgInput.disabled = true;
    input_Phone.disabled = true;
    nameInput.disabled = true;
    sayInput.disabled = true;
    contactInput.disabled = true;

    waitdata.innerHTML = "กำลังคืนค่าข้อมูล";

    console.log(phone_ID)
    input_Phone.value = phone_ID;

    let url = (`${urlDbFriend}/products/${phone_ID}`)
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            urlIMG = resJson.avatar
            showimg.style.backgroundImage = `url(${resJson.avatar})`;
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson);
            nameInput.value = resJson.name;
            sayInput.value = resJson.say;
            contactInput.value = resJson.contact;

            //console.log("data = " + resJson)

            //unblock
            imgInput.disabled = false;
            input_Phone.disabled = false;
            nameInput.disabled = false;
            sayInput.disabled = false;
            contactInput.disabled = false;

            waitdata.innerHTML = 'คืนค่าข้อมูลเสร็จสิน'
            imgload.style.display = "none"
        })
        .catch(() => {
            console.dir(error)
            waitdata.innerHTML = 'เกิดข้อผิดพลาด'
        });

    senData.addEventListener("click", createURLimg)
    //run next function in this function
}

imgInput.addEventListener('change', preview)
edit.addEventListener("click", fillOld)
signout.addEventListener("click", notfillAndSign)
refresh.addEventListener("click", getallusersAndcreateCard)
visit.addEventListener("click", Fvisit)
leave.addEventListener("click", () => {
    history.back();
})
cancel.addEventListener("click", () => {
    //console.log(IDstatus)
    if (IDstatus === 0) {
        notfillAndSign()
    }
    else {
        notfill()
    }
})
//เตือน
remove.addEventListener("click", () => {
    removepopup.style.display = "block";
})
sureremove.addEventListener("click", removeuser)
notsureremove.addEventListener("click", () => {
    removepopup.style.display = "none";
})


//check friend---------------------------------------------------
var btnCheck = document.getElementById('next_page')
var PhoneInput = document.getElementById('popup_phone')
var sue = document.getElementById('sue')
var waitcheck = document.getElementById("waitcheck")


async function btnpush() {
    //event.preventDefault();
    imgload.style.display = "block"
    let IDphon = String(PhoneInput.value)
    phone_ID = IDphon;
    console.log('ค่าที่กรอก', IDphon)
    let url = (`${urlDbFriend}/products/${IDphon}`)
    //console.log('URL', url)
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
            imgload.style.display = "none"
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson)
            if (String(resJson) === "null") {
                //history.pushState({id:numIDstates},"",)
                fillNew();
                closeForm();
                IDstatus = 0
                waitcheck.innerText = ""

            }
            else if (IDphon === "") {
                return;
            }
            else {
                localStorage.setItem('saveID', IDphon);
                console.log(localStorage.getItem('saveID'));
                notfill();
                closeForm();
                PhoneInput.value = ""
                IDstatus = 1
                waitcheck.innerText = ""

            }
            console.log("data = " + resJson)
        })
        .catch(() => {
            console.dir(error);
        });

}
function tentext() {
    //https://regex101.com/r/bwn9mp/1
    let waitdata = document.getElementById("waitdata");
    let validatePhone = /^(0[689]{1})+([0-9]{8})+$/g;
    if (validatePhone.test(PhoneInput.value) ||
        validatePhone.test(input_Phone.value)) {
        document.getElementById("popup_phone")
            .style.borderBottom = "4px solid green";
        document.getElementById("input_Phone")
            .style.borderBottom = "4px solid green";
        waitdata.innerHTML = "-"
        btnCheck.disabled = false;
        senData.disabled = false;

        //PhoneInput.value.length > 10 || PhoneInput.value.length < 10
    }
    else {
        document.getElementById("popup_phone")
            .style.borderBottom = "4px solid red";
        document.getElementById("input_Phone")
            .style.borderBottom = "4px solid red";
        waitdata.innerHTML = "กรุณากรอก เบอร์โทร ให้ถูกต้อง"
        btnCheck.disabled = true;
        senData.disabled = true;
    }
}

//first order
if (String(localStorage.getItem('saveID')) === 'null') {
    notfillAndSign()
}
else {
    visit.style.display = "none";
    sign.style.display = "none";
    imgload.style.display = "block"
    async function secondfunction() {
        let url = (`${urlDbFriend}/products/${String(localStorage.getItem('saveID'))}`)
        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((resJson) => {
                if (String(resJson) === "null") {
                    localStorage.removeItem('saveID');
                    notfillAndSign()
                    closeForm();
                    IDstatus = 0
                    waitcheck.innerText = ""
                    imgload.style.display = "none"

                }
                else {
                    imgload.style.display = "none"
                    phone_ID = localStorage.getItem('saveID');
                    notfill();
                    closeForm();
                    PhoneInput.value = ""
                    IDstatus = 1
                    waitcheck.innerText = ""

                }
            })
            .catch(() => {
                console.dir(error);
            });
    }
    secondfunction();
}

//chek phone
btnCheck.addEventListener("click", btnpush)
PhoneInput.addEventListener("input", tentext)
//input phone
input_Phone.addEventListener("input", tentext)
//sensor
hide.addEventListener("click", () => {
    showphon.classList.toggle('sensor')
})


//https://medium.com/neverrest/cors-%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2-cors-%E0%B8%97%E0%B8%B5%E0%B9%88-web-developer-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%88%E0%B8%AD-5afb6a9e742f
//..
//https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl
