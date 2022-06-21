fetch("https://skylab-api-login.herokuapp.com")
    .then((response) => { console.log(response) })
document.title = "SkylabMak";
//textloading
const Tl = document.getElementById("textloading")
var i = 0
const textL = ["-","\\","/"]
setInterval(()=>{
    if (i === 3){
        i = 0
    }
    Tl.innerText = textL[i]
    i += 1
}, 100)

//noty-----------------------------------------
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
            Tl.style.display = "none"
        })
        .catch(() => {
            console.log("Error fetch again")
            shownoty();
        });
}
shownoty();
