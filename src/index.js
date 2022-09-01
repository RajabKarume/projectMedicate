let myUrl = "http://localhost:3000/meds";
let takeOne = document.getElementById("takeOne");
let takeTwo = document.getElementById("takeTwo");
let Refiller = document.getElementById("refillPills")
let sideEffects = document.getElementById("addEffect")

let counter = 20
let remainingNum = document.getElementById("pillAmount")


function medImages(id){
    fetch (`${myUrl}/${id}`)
    .then((responce) => responce.json())
    .then((data) => {
        document.getElementById("imageOfPill").src = data.image;
        document.getElementById("imageOfPill").alt = data.name;
        document.getElementById("medName").innerText = data.name;
        document.getElementById("sideEffects").innerHTML = data.sideEffects.map((sideEffects) => `<li>${sideEffects}</li>`).join("")
        document.getElementById("medDescription").innerText = data.description;

    })
}
function refillNeeded(){
    if(counter < 10){
        alert("Your medication will running out soon. Please refill your prescription")
    }
}
function medsNav(){
    fetch(myUrl)
    .then((responce) => responce.json())
    .then((data) => {
        document.getElementById("navigation").innerHTML = data.map((meds) => `<li>${meds.name}</li>`).join("");
        // console.log(data)
    })
}
f

document.addEventListener("DOMContentLoaded",() => {
    medImages(8)
    medsNav()
    takeOne.addEventListener("click", () => {
        if (counter >0) {counter -= 1}
        remainingNum.innerHTML = counter
        refillNeeded()
    })
    takeTwo.addEventListener("click", () => {
        if (counter >0) {counter -= 2}
        remainingNum.innerHTML = counter
        refillNeeded()
    })
    Refiller.addEventListener("submit", (e) => {e.preventDefault()
        let inputNum = document.getElementById("refillAmount").value
        counter += parseInt(inputNum);
        remainingNum.innerHTML = counter
    })
    sideEffects.addEventListener("submit", (e) =>{e.preventDefault()
        let effectData = document.getElementById("effectInput").value
        sideEffects.innerHTML += `<li>${effectData}</li>`
    })
})


