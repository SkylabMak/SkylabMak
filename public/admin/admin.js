//hide html
const hidehtml = document.getElementById("hidehtml")
//textloading
const Tl = document.getElementById("textloading")
const Tl02 = document.getElementById("textloadingNT")

var i = 0
const textL = ["-","\\","/"]
function Ftextloading(tag){
    setInterval(() => {
        if (i === 3) {
            i = 0
        }
        tag.innerText = textL[i]
        i += 1
    }, 100)
}
Ftextloading(Tl);
Ftextloading(Tl02);
Tl.style.display = "none"
Tl02.style.display = "none"
//login
const popuplogin = document.getElementById("formlogin")
const loginPhone = document.getElementById("loginPhone")
const loginpassword = document.getElementById("loginpw")
const btnlogin = document.getElementById("login")
const btnClogin = document.getElementById("Clogin")
const textcomP = document.getElementById("textcomP")
//noty
var imgnoty = ""
var namenoty = ""

async function btnloginpushed() {
    Tl.style.display = "inline-block"
    console.log("start")
    let url = (`https://db-admin-one.vercel.app/login`)
    let user = {
        "namephone": loginPhone.value,
        "password": loginpassword.value
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
            if(json.success === "true"){
                imgnoty = json.avatar
                namenoty = json.name
                console.log(imgnoty)
                hidehtml.style.display = "block"
                popuplogin.style.display = "none"
            }
            else if (json.success === "false"){
                
                textcomP.innerText = "รหัสผิด"
            }
            else{
                return
            }
            Tl.style.display = "none"
        })
        .catch((error) => {
            console.log("Error. fetch again")
            shownoty();
        })
}
btnlogin.addEventListener("click",btnloginpushed)
btnClogin.addEventListener("click",()=>{
    history.back();
})
async function editnoty() {

}
//noty----------------------------------------------------------------
const boxnoty = document.getElementById("boxnoty")
const popup = document.getElementById("forminsertnoty")
const textinsertnoty = document.getElementById("insertnoty")
const btninsertnotyDB = document.getElementById("btninsertnoty")
const btnCinsertnoty = document.getElementById("btnCinsertnoty")
const btninsertnoty = document.getElementById("editnoti")


async function shownoty() {
    let url = "https://db-admin-one.vercel.app/noty"
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", resJson)
            var sortdata = [...resJson].sort((data1, data2) => {
                if (Number(data1.date) > Number(data2.date)) {
                    return -1 //ซ้ายมาก่อน
                }
                else if (Number(data1.date) < Number(data2.date)) {
                    return 1 //สลับ ขวามาก่อน
                }
                else {
                    return 0
                }
        
            })
        return sortdata})
        .then((Groupdatanoty) => {
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", Groupdatanoty)
            Groupdatanoty.forEach((datanoty) => {
                //box
                let mainbox = document.createElement('div')
                mainbox.classList.add('boxNoti')
                let boxavatar = document.createElement('div');
                boxavatar.classList.add('Lnoti');
                let boxcenter = document.createElement('div');
                boxcenter.classList.add('Cnoti')
                let boxdate = document.createElement('div');
                boxdate.classList.add('Rnoti')

                //img
                let img = document.createElement('img');
                img.classList.add('miniimg');
                img.src = datanoty.pic

                //text
                let textnoty = document.createElement('span');
                textnoty.innerText = datanoty.text;
                //-----
                let textdate = document.createElement('span');
                let date = datanoty.date
                let dateSlice = date.slice(6, 8) + "/" + date.slice(4, 6) + "/" + date.slice(0, 4)
                textdate.innerHTML = "อัปเดตโดย " + datanoty.name + "<br>" + " เมื่อ " + dateSlice;


                //mix 
                boxavatar.append(img)
                boxcenter.append(textnoty)
                boxdate.append(textdate)
                mainbox.append(boxavatar,boxcenter,boxdate)
                boxnoty.append(mainbox)
            })
        })
        .catch(() => {
            console.dir(error);
        });
}
shownoty();
async function insertnoty(){
    let textcomP02 = document.getElementById("textcomPIninsertnoty")
    Tl02.style.display = "inline-block"
    console.log("start")
    let url = (`https://db-admin-one.vercel.app/noty/insert`)
    //date
    const d = new Date();
    const date = String(d.getFullYear())
        + String(("0" + (d.getMonth() + 1)).slice(-2))
        + String(("0" + d.getDate()).slice(-2));
    console.log(date);
    let user = {
        "date": date,
        "pic": imgnoty,
        "name" : namenoty,
        "text" : textinsertnoty.value
    }
    console.log(user)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
            Tl02.style.display = "none"
            textcomP02.innerText = "เสร็จ"

        })
        .catch((error) => {
            console.log(err.stack);
            //console.log("Error. fetch again")
            //shownoty();
        })
}
btninsertnotyDB.addEventListener('click',insertnoty)
btninsertnoty.addEventListener("click",()=>{
    popup.style.display = "block"
})
btnCinsertnoty.addEventListener("click",()=>{
    popup.style.display = "none"
})
popup.style.display = "none"
const btn_comment = document.getElementById("btncomment")
const boxcommnet = document.getElementById("comment")
btn_comment.addEventListener("click",()=>{
    let url = "https://db-admin-one.vercel.app/comment"
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((Groupdatanoty) => {
            console.log("ค่าตอบกลับ ที่ได้จากเซิฟ", Groupdatanoty)
            Groupdatanoty.forEach((datanoty) => {
                //box
                let boxdate = document.createElement('div');

                //text
                let textnoty = document.createElement('span');
                textnoty.innerText = datanoty.comment;

                //mix 
                boxdate.append(textnoty)
                boxcommnet.append(boxdate)
            })
        })
        .catch(() => {
            console.dir(error);
        });
})

//ณ ขณะนี้ ช่อง"comment" พร้อมใช้งาน ทุกท่านสามารถแสดงความคิดเห็นหรือเสนอไอเดีย ต่างๆได้ ตามความในใจ
//const editnoty = document.getElementById("editnoti")