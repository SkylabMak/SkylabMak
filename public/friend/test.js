

const btn = document.getElementById('btn')
const imgInput = document.getElementById('imgUpload')
const showimg = document.getElementById('showimg')
const tagnameimg = document.getElementById('nameimg')
var uploadImg = ""

async function sent (){
    const formData = new FormData()
    formData.append('image', imgInput.files[0])

    if (String(imgInput.files[0]) === "undefined"){
      return console.log("Please select an image")
    }
    console.log(imgInput.files)
    console.log(imgInput.files[0])
    fetch('http://localhost:8001/uploadIMG/0645688156', {
        method: 'POST',
        body: formData
      })
      .then(response => 
        {return response.json()})
      .then(data => {
        console.log(data.url)
      })
      .catch(error => {
        console.error(error)
      })
    }

function preview(){
    const reader = new FileReader();
    reader.addEventListener('load', () =>{
        uploadImg = reader.result;
        showimg.style.backgroundImage = `url(${uploadImg})`;
    })
    reader.readAsDataURL(this.files[0]);
    let nameimg = imgInput.files[0].name;
    tagnameimg.textContent = nameimg;
}
btn.addEventListener('click',sent)
imgInput.addEventListener('change',preview)

const test = new Date();
console.log(test);

