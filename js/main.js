const button = document.querySelector(".button")
const h1 = document.querySelector(".h1")
const keys = document.querySelector(".keys")
const slider = document.querySelector(".slider")
const hint = document.querySelector(".hint")
const scoreDisplay = document.querySelector(".scoreDisplay")
let currentWord = ""
let lives = 0
let score = localStorage.getItem("score")
let previous = 0
let keysStates = {}
function onhint(){
    let result = parseInt(prompt("Which letter do you want to reveal? Will take 5 coins! (type number)"))
    if (result == false){
        return
    }
    if (score < 5){
        alert("Not enough money")
        return
    }else if (score > 5){
        setScore("-", 5)
        guess(currentWord[parseInt(result)-1])
        previous = parseInt(result)-1
    }
}

hint.addEventListener('click', onhint)

let word = () => {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", 'https://random-word-api.herokuapp.com/word?length=' + String(slider.querySelector('#sliderRange').value), false);
    xmlHttpReq.send(null);
    let result = JSON.parse(xmlHttpReq.responseText)[0]
    currentWord = result
    localStorage.setItem('currentWord', result)
    W2SH1(result)
    return result
}

function buttonHandler(){
    h1.style.letterSpacing = "1ch"
    lives = 0
    drawSVG(lives)
    drawSVG("clear")
    word()
    saveLS()
    document.querySelectorAll("button").forEach((e)=>{
        e.disabled = false
        e.style.cursor = "pointer"
        e.style.backgroundColor = "#007EA7"
    })
}

function whereContains(checked, target) {
    let result = []
    for (let i = 0; i < checked.length; i++) {
        if (checked[i] == target){ 
            result.push(i)
        }
    }
    return result
}

button.addEventListener('click', buttonHandler)

function W2SH1(word) {
    h1.innerHTML = ""
    for (let i = 0; i < word.length; i++) {
        h1.innerHTML += "_"
    }
}

slider.querySelector('#sliderRange').addEventListener("change", (event) => {
    document.querySelector(".numberDifficulty").innerHTML = slider.querySelector('#sliderRange').value
})

function toString(target){
    let result = ""
    for (let i = 0; i < target.length; i++){
        result += target[i]
    }
    return result
}

function toArray(target){
    let result = []
    for (let i = 0; i < target.length; i++){
        result.push(target[i])
    }
    return result
}

function setScore(expression, number){
    score = Number(score)
    if (score == null) score = 0
    if (expression == "-"){
        score = score - number
    }else if (expression == "+"){
        score = score + number
    }
    if (score < 1){
        scoreDisplay.style.color = "#DB162F"
    }else{
        scoreDisplay.style.color = "#fff"
    }
    localStorage.setItem("score", String(score))
    scoreDisplay.innerHTML = score
}

function guess(letter){
    currentWord = localStorage.getItem("currentWord")
    let u = whereContains(currentWord, letter)
    let result = ""
    console.log(u.length)
    let b = toArray(h1.innerText)
    if(currentWord.includes(letter)){
        for (let i = 0; i < u.length; i++){
            b[u[i]] = currentWord[u[i]]
        }
        result = "succes"
    }else{
        lives++
        drawSVG(lives)
        result = "fail"
    }
    h1.innerHTML = toString(b)
    if (lives == 10){
        h1.style.letterSpacing = "initial"
        h1.innerText = "You lose! The word was:"+ currentWord
    }
    if (h1.innerText == currentWord){
        h1.style.letterSpacing = "initial"
        h1.innerText = "You win! The word was:" + currentWord
        setScore("+", 5)
    }
    saveLS()
    return result
}

function loadLS(){
    currentWord = localStorage.getItem("currentWord")
    lives = localStorage.getItem("damage")
    h1.innerText = localStorage.getItem("progress")
    keysStates = JSON.parse(localStorage.getItem("keystates"))
    drawSVG(lives)
    h1.style.letterSpacing = '1ch'
    if (currentWord=undefined){
        word()
        saveLS()
        h1.innerText = 'Press button "New game"'
        let _alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
        let alphabet = _alphabet.split(' ')
        for (let i = 0; i < alphabet.length; i++) {
            keysStates[alphabet[i].toLowerCase()] = document.querySelector('.'+String(alphabet[i].toLowerCase())).disabled
        }
        
    }

}

function saveLS(){
    localStorage.setItem("currentWord", currentWord)
    localStorage.setItem("damage", lives)
    if (currentWord == undefined) currentWord = "not yet known"
    localStorage.setItem("progress", h1.innerText)
    keysStates = {}
    let _alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
    let alphabet = _alphabet.split(' ')
    for (let i = 0; i < alphabet.length; i++) {
        keysStates[alphabet[i].toLowerCase()] = document.querySelector('.'+String(alphabet[i].toLowerCase())).disabled
    }
    localStorage.setItem("keystates", JSON.stringify(keysStates))
}

function createKey(key) {
    let e = keys.querySelector('.key').cloneNode(true)
    e.innerHTML = key
    e.classList.add(key.toLowerCase())
    e.removeAttribute('style')
    if (keysStates[key.toLowerCase()]){
        e.disabled = true
        e.style.cursor = "not-allowed"
        e.style.backgroundColor = "#00A7E1"
    }
    e.addEventListener("click", () => {
        guess(key.toLowerCase())
        e.disabled = true
        e.style.cursor = "not-allowed"
        e.style.backgroundColor = "#00A7E1"
        saveLS()
    })
    keys.appendChild(e)
}

function init() {
    if (localStorage.getItem('score') == null){
        localStorage.setItem('score', 0)
        localStorage.setItem('currentWord', 'not yet')
        localStorage.setItem('keystates', '{"a":false,"b":false,"c":false,"d":false,"e":false,"f":false,"g":false,"h":false,"i":false,"j":false,"k":false,"l":false,"m":false,"n":false,"o":false,"p":false,"q":false,"r":false,"s":false,"t":false,"u":false,"v":false,"w":false,"x":false,"y":false,"z":false}')
        localStorage.setItem('progress', 'Press button "New game" to continue')
    }    
    score = localStorage.getItem("score")
    let alphabetDONTWORK = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
    let alphabet = alphabetDONTWORK.split(' ')
    loadLS()
    for (let i = 0; i < alphabet.length; i++) {
        createKey(alphabet[i])
    }
    setScore("set", 0)
    document.querySelector(".numberDifficulty").innerHTML = slider.querySelector('#sliderRange').value
}
function drawSVG(number) {
    let a1 = document.querySelector("#a1")
    let a2 = document.querySelector("#a2")
    let a3 = document.querySelector("#a3")
    let a4 = document.querySelector("#a4")
    let a5 = document.querySelector("#a5")
    let a6 = document.querySelector("#a6")
    let a7 = document.querySelector("#a7")
    let a8 = document.querySelector("#a8")
    let a9 = document.querySelector("#a9")
    let a10 = document.querySelector("#a10")
    if (number == 1) {
        a1.style.display = "block"
    } else if (number == 2) {
        a1.style.display = "block"
        a2.style.display = "block"
    } else if (number == 3) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
    } else if (number == 4) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
    } else if (number == 5) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
        a5.style.display = "block"
    } else if (number == 6) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
        a5.style.display = "block"
        a6.style.display = "block"
    } else if (number == 7) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
        a5.style.display = "block"
        a6.style.display = "block"
        a7.style.display = "block"
    } else if (number == 8) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
        a5.style.display = "block"
        a6.style.display = "block"
        a7.style.display = "block"
        a8.style.display = "block"
    } else if (number == 9) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
        a5.style.display = "block"
        a6.style.display = "block"
        a7.style.display = "block"
        a8.style.display = "block"
        a9.style.display = "block"
    } else if (number == 10) {
        a1.style.display = "block"
        a2.style.display = "block"
        a3.style.display = "block"
        a4.style.display = "block"
        a5.style.display = "block"
        a6.style.display = "block"
        a7.style.display = "block"
        a8.style.display = "block"
        a9.style.display = "block"
        a10.style.display = "block"
    } else if (number == "clear") {
        a1.style.display = "none"
        a2.style.display = "none"
        a3.style.display = "none"
        a4.style.display = "none"
        a5.style.display = "none"
        a6.style.display = "none"
        a7.style.display = "none"
        a8.style.display = "none"
        a9.style.display = "none"
        a10.style.display = "none"
    }
    return "success"
}
init()