///*<script type="text/javascript" src="index.js"></script> */


var currentWord = ""
var guessedLetters = []
var providedLetters = ['r', 's', 't', 'l', 'n', 'e']
var vowels = ['a', 'e', 'i', 'o', 'u']
var puzzleBoxes = document.getElementsByClassName('letter')
var keyboardGuesses = {
    "vowel": "",
    "consonants": []
}
var vowelElement = document.getElementById("vowels").querySelectorAll('p')[0]
var consonantElement = document.getElementById("consonants").querySelectorAll('p')[0]

document.getElementById("generate").addEventListener('click', generateWord)

function generateWord() {
    resetValues()
    currentWord = getRandomWord()
    console.log(testDict)
    console.log(currentWord)
    changeLetterPuzzleBox()
    document.getElementById("start").addEventListener('click', startAndSolve)
}

function resetValues() {
    defaultPuzzleConfiguration()
    currentWord = ""
    guessedLetters = []
    testDict = {}

    document.getElementById('start').innerHTML = 'Start'
    resetKeyboard()
    removeEventListeners()
}

function changeLetterPuzzleBox() {
    for (let i = 0; i < currentWord.length; i++) {
        let currentPuzzleBox = puzzleBoxes[i]
        currentPuzzleBox.querySelector('p').textContent = "_"
        currentPuzzleBox.querySelector('p').style.paddingTop = '50%'
        currentPuzzleBox.querySelector('p').style.paddingBottom = '50%'
        currentPuzzleBox.style.backgroundColor = "white"

    }
}


function handleKeyboardClick(event) {
    let target = event.target
    if (vowels.includes(target.innerHTML)) {
        handleVowel(target)
    } else {
        handleConsonant(target)
        consonantElement.innerHTML = "Consonants: " + keyboardGuesses["consonants"].length
    }


}

function handleVowel(target) {

    if (keyboardGuesses['vowel'] == "") {
        keyboardGuesses['vowel'] = target.innerHTML
        target.style.borderColor = 'blue'
        vowelElement.innerHTML = "Vowels: 1"
    } else if (keyboardGuesses['vowel'] == target.innerHTML) {
        keyboardGuesses["vowel"] = ""
        vowelElement.innerHTML = "Vowels: 0"
        target.style.borderColor = 'black'
    } else {
        alert("You Have Already Selected A Vowel")
        return
    }
}

function handleConsonant(target) {

    let consonants = keyboardGuesses["consonants"]


    if (consonants.includes(target.innerHTML)) {
        removeTargetFromArray(target.innerHTML, consonants)
        target.style.borderColor = 'black'
    } else if (!consonants.includes(target.innerHTML) && consonants.length < 3) {
        consonants.push(target.innerHTML)
        target.style.borderColor = 'blue'
    } else {
        alert("You Have Already Selected 3 Consonants")
    }
    console.log(consonants)
    keyboardGuesses["consonants"] = consonants
}







function resetKeyboard() {
    keyboardGuesses = { "vowel": "", "consonants": [] }
    let keys = document.getElementsByClassName('keys')
    for (let i = 0; i < keys.length; i++) {
        keys[i].style.borderColor = 'black'
    }
}

function removeEventListeners() {

    document.getElementById('start').removeEventListener('click', startAndSolve)
    document.getElementById('keyboard').removeEventListener('click', handleKeyboardClick)
}


function defaultPuzzleConfiguration() {
    for (let i = 0; i < currentWord.length; i++) {
        let currentPuzzleBox = puzzleBoxes[i]
        let paragraph = currentPuzzleBox.querySelector('p')
        paragraph.textContent = "Wheel Of Fortune"
        paragraph.style.paddingTop = '0px'
        paragraph.style.paddingBottom = '0px'
        currentPuzzleBox.style.backgroundColor = "deepskyblue"

    }
}


function start() {
    configPuzzleBoxes()
    document.getElementById('start').innerHTML = 'Solve'
    document.getElementById('keyboard').addEventListener('click', handleKeyboardClick)
}
// R,S,T,L,N, or E
function configPuzzleBoxes() {
    let hasSetUpFirstPuzzleBox = false
    for (let i = 0; i < currentWord.length; i++) {
        let letter = currentWord[i]
        if (providedLetters.includes(letter)) {
            guessedLetters.push(letter)
            puzzleBoxes[i].querySelector('p').textContent = letter.toUpperCase()


        } else {
            puzzleBoxes[i].style.cursor = 'pointer'
        }
    }
}

function solve() {

    guessedLetters = guessedLetters.concat(keyboardGuesses['consonants'])
    guessedLetters.push(keyboardGuesses['vowel'])
    let puzzleHasBeenSolved = true
    for (let i = 0; i < currentWord.length; i++) {
        puzzleBoxes[i].querySelector('p').textContent = currentWord[i].toUpperCase()
        if (guessedLetters.includes(currentWord[i])) {
            continue
        } else {
            puzzleHasBeenSolved = false
        }
    }
    if (puzzleHasBeenSolved == true) {
        alert('Congratulations, You Have Defeated Wheel of Fortune (No Connection to Wheel of Fortune TM)')
    } else {
        alert(`Dun Dun Dun... You Have Failed. The correct word was ${currentWord.charAt(0).toUpperCase() + currentWord.slice(1)}`)
    }
    removeEventListeners()
}

function startAndSolve() {
    switch (document.getElementById('start').innerHTML) {
        case 'Start':
            start()
            break
        case 'Solve':
            solve()
            break
    }
}
function removeTargetFromArray(target, arr) {
    for (let i = 0; i < arr.length; i++) {

        if (arr[i] == target) {
            arr.splice(i, 1);
            i--;
        }
    }
}