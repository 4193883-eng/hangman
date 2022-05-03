const button = document.querySelector(".button")
const h1 = document.querySelector(".h1")
const keys = document.querySelector(".keys")
const slider = document.querySelector(".slider")
let currentWord
let lives = 0
let score = 0

let word = () => {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", 'https://random-word-api.herokuapp.com/word?length=' + String(slider.querySelector('#sliderRange').value), false);
    xmlHttpReq.send(null);
    let result = JSON.parse(xmlHttpReq.responseText)[0]
    currentWord = result
    lives = 0
    W2SH1(result)
    h1.style.letterSpacing = "1ch"
    return result
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

button.addEventListener('click', word)

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

function guess(letter){
    console.log(whereContains(currentWord, letter).length)
    let u = whereContains(currentWord, letter)
    let ul = u.length
    console.log(u.length)
    let b = toArray(currentWord)
    if(currentWord.includes(letter)){
        for (let i = 0; i < u.length; i++){
            b[u[i]] = currentWord[u[i]]
            console.log(b)
        }
    }else{
        lives++
        drawSVG(lives)
    }
    h1.innerHTML = toString(b)
}

function createKey(key) {
    let e = keys.querySelector('.key').cloneNode(true)
    e.innerHTML = key
    e.removeAttribute('style')
    e.addEventListener("click", () => {
        guess(key.toLowerCase())
    })
    keys.appendChild(e)
}

function init() {
    let alphabetDONTWORK = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
    let alphabet = alphabetDONTWORK.split(' ')
    for (let i = 0; i < alphabet.length; i++) {
        createKey(alphabet[i])
        console.log(alphabet[i])
    }
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