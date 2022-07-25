//ship-----------------------------------------------------
var ship = document.getElementById("ship")
const centerShip = "translate(-50%, -50%)"
ship.style.transform = centerShip + " " + ` rotate(0deg)`;
document.title = "SM. shooting meteorite";

var IDgive_up = 0;
var positionShip = ship.getBoundingClientRect();
var getcenterShip = (positionShip.right - positionShip.left) / 2
var xS = positionShip.left + getcenterShip;
var yS = positionShip.top + getcenterShip;
console.log(positionShip.left + getcenterShip)
console.log(positionShip.top + getcenterShip)
//prepare
ship.src = "/pic/shipFire.png"
window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
});
setTimeout(() => {
    window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth'
    });
},250)
setTimeout(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
},500)
setTimeout(() => {
    window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth'
    });
    ship.src = "/pic/ship.png"
},1000)
//-----------------------------------------
window.addEventListener("scroll", () => {
    positionShip = ship.getBoundingClientRect();
    getcenterShip = (positionShip.right - positionShip.left) / 2
    xS = positionShip.left + getcenterShip;
    yS = positionShip.top + window.scrollY + getcenterShip;
});
window.addEventListener('resize', ()=>{
    positionShip = ship.getBoundingClientRect();
    getcenterShip = (positionShip.right - positionShip.left) / 2
    xS = positionShip.left + getcenterShip;
    yS = positionShip.top + window.scrollY + getcenterShip;
});

document.onmousemove = function (event) {
    let laser = document.getElementById("laser")
    let angle = Math.atan2(event.pageY - yS
        , event.pageX - xS) * (180 / Math.PI)
    //console.log(angle);
    //console.log("Y" + event.pageY + " " + "X" + event.pageX)
    ship.style.transform = centerShip + " " + ` rotate(${angle + 90}deg)`;
    laser.style.transform =`rotate(${angle-90}deg)`
}
//mouse down up 
const laser = document.getElementById("laser")
var laserposition = laser.getBoundingClientRect();
function getDistanceDivide2(x1, y1, x2, y2){
    let y = (x2 - x1);
    let x = (y2 - y1);
    
    return Math.sqrt(x * x + y * y);
}
document.onmousedown = function (){
    laser.style.display ="block"
    ship.src = "/pic/shipFire.png"
}
document.onmouseup = function (){
    laser.style.height = "100px"
    laser.style.display ="none"
    ship.src = "/pic/ship.png"
    setTimeout(()=>{
        laser.style.display ="none"
    },10)
}
//in bodyspace----------------------------------------------------
//hitbox
var hitbox = {
    "x1": Number(positionShip.left.toFixed()), "x2": Number(positionShip.right.toFixed()),
    "y1": Number(positionShip.top.toFixed()), "y2": Number(positionShip.bottom.toFixed())
}
console.log(hitbox)
//score
const score = document.getElementById("score")
score.classList.remove("Showscore")
var scoretext = 0
console.log(scoretext)
//time
const time = document.getElementById("time")
var thistime = 99999
function countdown(maxtime) {
    thistime = maxtime
    time.innerText = thistime
    var countdownTimeId = setInterval(() => {
        thistime -= 1
        time.innerText = thistime
        if (thistime === 0 || IDgive_up === 1) {
            clearInterval(countdownTimeId)
        }
    }, 1000)
}


//meteor---------------------------------------------------------------
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomIntBodyspace(maxX, maxY) {
    let bodyspace = document.getElementById("bodyspace");
    let p1x = bodyspace.offsetWidth / 3
    let p1y = bodyspace.offsetHeight / 3
    let except = {
        "x1": p1x - 100, "x2": (p1x * 2) + 100,
        "y1": p1y - 100, "y2": (p1y * 2) + 100
    }
    let RandomX = except.x1
    let RandomY = except.y1
    //console.log(except)
    while (((RandomX >= except.x1 && RandomX <= except.x2)
        && (RandomY >= except.y1 && RandomY <= except.y2))) {
        RandomX = Math.floor(Math.random() * maxX);
        RandomY = Math.floor(Math.random() * maxY);
    }
    return [RandomX, RandomY]
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
const property = [{
    "type": 0,
    "size": "100px",
    "img": "meteor3.png"
}, {
    "type": 1,
    "size": "75px",
    "img": "meteor4.png"
}, {
    "type": 2,
    "size": "50px",
    "img": "meteor5.png"
}
]

function createmeteor(speed) {
    var indexscore = 0
    //declaration-------------------------------
    let Randomtype = (getRandomInt(3));
    //console.log(Randomtype);
    let typemrteor = property[Randomtype]
    const bodyspace = document.getElementById("bodyspace");
    const meteor = document.createElement("img");
    const boom = document.createElement("img")
    boom.classList.add("boom")
    boom.src = "pic/boom.png"
    boom.style.width = typemrteor.size
    bodyspace.append(boom)

    //createmeteor-------------------------------
    meteor.classList.add('meteor');
    let urlImg = `/pic/meteor/${typemrteor.img}`;
    meteor.src = urlImg;
    meteor.style.width = typemrteor.size
    meteor.style.height = typemrteor.size
    bodyspace.append(meteor);


    //position and center image
    let Mp = getRandomIntBodyspace(
        bodyspace.offsetWidth, bodyspace.offsetHeight);
    //console.log(Mp);
    let Ml = Mp[0]
    let Mt = Mp[1]
    meteor.style.left = `${Ml}px`
    meteor.style.top = `${Mt}px`
    var positionMeteor = meteor.getBoundingClientRect();
    var centerImg = (positionMeteor.right - positionMeteor.left) / 2
    //console.log("+ กลาง ", centerImg)

    //dynamic-------------------------------------
    //angle
    const xM = positionMeteor.left + centerImg;
    const yM = positionMeteor.top + centerImg;
    let angleM = Math.atan2(yS - yM
        , xS - xM) * (180 / Math.PI)
    //angle and dynamic meteor
    var i = 0
    var xMRealtime = positionMeteor.left + centerImg
    var yMRealtime = positionMeteor.top + centerImg
    var MeteorIimeID = setInterval(() => {
        indexscore += 1 
        i += speed
        //console.log(i)
        positionMeteor = meteor.getBoundingClientRect();
        xMRealtime = (Number(positionMeteor.left + centerImg).toFixed());
        yMRealtime = (Number(positionMeteor.top + centerImg).toFixed());
        boom.style.left = `${positionMeteor.left-centerImg}px`
        boom.style.top = `${(positionMeteor.top-300)+window.scrollY}px`
        /*
        console.log(xMRealtime, "=", `{${hitbox.x1},${hitbox.x2}}`,
            "& ", yMRealtime + "=", `{${hitbox.y1},${hitbox.y2}}`);
        console.log("L" + positionMeteor.left + " " + "T" + positionMeteor.top)
        */
        meteor.style.transform =
            ` rotate(${angleM - 5}deg)` + " " + `translate(${i}%, 0%)`;
        if ((xMRealtime > hitbox.x1 && xMRealtime < hitbox.x2) &&
            (yMRealtime > hitbox.y1 && yMRealtime < hitbox.y2)) {
            boom.remove();
            //console.log("ทำงาน")
            if (typemrteor === 0) {
                scoretext -= 8
            }
            else if (typemrteor === 1) {
                scoretext -= 5
            }
            else {
                scoretext -= 1
            }
            score.innerText = scoretext
            setTimeout(() => {
                meteor.remove();
            }, 100)

            clearInterval(MeteorIimeID)
        }
        if (thistime === 0 || IDgive_up === 1) {
            meteor.remove();
            clearInterval(MeteorIimeID)
        }

        //console.log(scoretext)

    }, 10)

    
    meteor.addEventListener("mousedown", () => {
        laser.style.height = `${getDistanceDivide2(
            positionShip.left + getcenterShip,
            positionShip.top + getcenterShip,
            positionMeteor.left+centerImg,
            positionMeteor.top+centerImg)}px`
        //mouseup
        meteor.remove();
        boom.style.display = "block"
        //console.log(indexscore)
        //console.log(scoretext)
        if ((indexscore) <= 50) {
            scoretext += 10
        }
        else if ((indexscore) <= 80) {
            scoretext += 8
        }
        else if ((indexscore) <= 100) {
            scoretext += 5
        }
        else if ((indexscore) <= 150) {
            scoretext += 3
        }
        else {
            scoretext += 1
        }
        score.innerText = scoretext
        setTimeout(()=>{
            boom.style.display = "none"
        },200)
        clearInterval(MeteorIimeID)
    })
    
}

//start game--------------------------------------------------------------
//typr
const difficultyType = {
    "hard": {
        "timecreatmeteor": 250,
        "speed": 3
    },
    "normal": {
        "timecreatmeteor": 500,
        "speed": 2
    },
    "eazy": {
        "timecreatmeteor": 1000,
        "speed": 1
    }
}
const start = document.getElementById("start");
const give_up = document.getElementById("give-up");
function startgame(type) {
    IDgive_up = 0
    score.classList.remove("Showscore")
    scoretext = 0
    console.log(type)
    var createmeteorIimeID = setInterval(() => {
        createmeteor(type.speed)
    }, type.timecreatmeteor)
    countdown(60)
    var startcountdown = setInterval(() => {
        if (thistime === 0 || IDgive_up === 1) {
            start.style.display = "block"
            score.classList.add("Showscore")
            clearInterval(createmeteorIimeID)
            clearInterval(startcountdown)
        }
    }, 100)
}


//btn---------------------------------------------

start.addEventListener("click", () => {
    let difficulty = document.getElementById("difficulty")
    difficulty.style.display = "inline-block"
    start.style.display = "none"
    give_up.style.display ="block"
})
give_up.addEventListener("click", () => {
    IDgive_up = 1;
    start.style.display = "block"
    give_up.style.display ="none"
})
const hard = document.getElementById("hard")
    .addEventListener("click", () => {
        startgame(difficultyType.hard);
        difficulty.style.display = "none";
    })
const normal = document.getElementById("normal")
    .addEventListener("click", () => {
        startgame(difficultyType.normal);
        difficulty.style.display = "none";
    })
const eazy = document.getElementById("eazy")
    .addEventListener("click", () => {
        startgame(difficultyType.eazy);
        difficulty.style.display = "none";
    })

start.style.display = "block"
give_up.style.display ="none"