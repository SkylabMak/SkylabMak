fetch("https://skylab-api-login.herokuapp.com")
    .then((response) => { console.log(response) })
document.title = "SkylabMak";
//textloading
const Tl = document.getElementById("textloadingNT")
const Tlcomments = document.getElementById("textloadingCM")
var i = 0
const textL = ["-", "\\", "/"]
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
Ftextloading(Tlcomments);


//noty-----------------------------------------
let reloadCount = 0;
const boxnoty = document.getElementById("boxnoty")
async function shownoty() {
    Tl.style.display = "inline-block"
    let url = "https://skylab-api-login.herokuapp.com/noty"
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
            return sortdata
        })
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
                mainbox.append(boxavatar, boxcenter, boxdate)
                boxnoty.append(mainbox)
            })
            Tl.style.display = "none"
        })
        .catch(() => {
            console.log("Error fetch "+reloadCount)
            if(reloadCount <= 3){
                setTimeout(shownoty(), 1000);
                reloadCount++;
            }
            else{
                let textnoty = document.createElement('span');
                textnoty.innerText = "eror connot get comment";
                boxnoty.append(textnoty)
                console.log("Error fetch, stop ")
            }
            
        });
}
shownoty();
//comment---------------------------------
const btncomment = document.getElementById("comment")
const popupcomment = document.getElementById("popupcomment")
const btnCcomment = document.getElementById("close_popupCM")
const btnsendcomment = document.getElementById("sendCM")
const input_comment = document.getElementById("input_comment")
btncomment.addEventListener("click", () =>
    popupcomment.style.display = "block")
btnCcomment.addEventListener("click", () => {
    popupcomment.style.display = "none"
})
async function sendCM() {
    Tlcomments.style.display = "inline-block"
    var url = "https://skylab-api-login.herokuapp.com/comment/insert"
    var bodycomment = {
        "comment" : input_comment.value
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodycomment)
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            Tlcomments.style.display = "none"
            console.log(json)
            let waitcomment = document.getElementById("waitcomment")
            waitcomment.innerText = "เสร็จ"
        })
        .then(() => {
            setTimeout(() =>{
                input_comment.value = ""
                let waitcomment = document.getElementById("waitcomment")
                waitcomment.innerText = ""
            },3000)
        })
        .catch((error) => {
            console.log(err.stack);
            //console.log("Error. fetch again")
            //shownoty();
        })
}
btnsendcomment.addEventListener("click",sendCM)