
const pi = (22/7)
let generateButton = document.getElementById("g-btn")
let circle = document.getElementById("circle")
let circumference;
let circumferenceElement = document.getElementById("circumference-el")


generateButton.addEventListener("click",()=>{
    
    let r = Number(window.prompt("Enter Radius of Circle:(in 'cm')"));
    circumference = 2 * pi * r
    circumferenceElement.style.display="block"
    circumferenceElement.innerHTML+=circumference
    circle.style.width =`${r*2}`+"cm"
    circle.style.height = `${r*2}` +"cm"
    circle.style.display = "block"
    
})