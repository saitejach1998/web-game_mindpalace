//const fs = require('fs')
//const { ipcRenderer } = require('electron')
var questionNum = 0
var currLevel = 0
const hiddenZones = { '0': ['8', '9'], '1': ['1', '3'], '2': ['9', '0'], '3': ['1', '8'], '4': ['4', '4'], '5': ['5', '5'], '6': ['6', '6'], '7': ['7', '7'], '8': ['8', '8'], '9': ['9', '9'], '10': ['10', '10'], '11': ['11', '11'], '12': ['12', '12'], '13': ['13', '13'], '14': ['14', '14'], '15': ['15', '15'] }
const Maxlevel = 9
var json = []
var submitButton = document.getElementById('Submit')
var submitred = document.getElementById('Submit-red')
var trail = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
var consQ = 0;
var isLadder = false;
let flag123 = false;


//const { remote, ipcRenderer } = require('electron')
var rowIndex = 0;
var cellIndex = 0;
const liveZone = [0, 8, 4, 7, 0, 9, 6, 2, 4, 0];
const red = "#FF0000"
const yellow = "#ffff00"
const grey = "#ccccb3"
const green = "#008744"

initBoard = () => {
        flag123 = true
        for (rowIndex = 0; rowIndex < 10; rowIndex++) {
        var cell = document.getElementById('board').rows[rowIndex].cells[liveZone[rowIndex]];
        cell.style.transition = 'background 1000ms ease-in-out'
        //cell.style.border = '1px solid blue'
        if (rowIndex == 9) {
            cell.style.background = yellow
            continue;
        }

        cell.style.background = grey

    }
}


getCurrentQuestion = (questionNo) => {
    var question = document.getElementById('question')
    console.log("inside getquestion")
    question.textContent = json[questionNo]['question']

    imagediv = document.getElementById('picture')
    if ('imageLink' in json[questionNo]) {
        imagediv.style.display = 'block'
        var image = document.getElementById('image')
        image.src = "./pictures/" + questionNo + ".jpg"
    } else {
        imagediv.style.display = 'none'
    }
    document.getElementById('userAnswer').focus()
}

endGame = () => {}

submitred.addEventListener('click', () => {
    let redAnswer = document.getElementById('randomAnswer')
    if ((redAnswer.value == hiddenZones[15 - questionNum][0] || redAnswer.value == hiddenZones[15 - questionNum][1])) {
        alert("correct")
        /*swal(
            'Good job!',
            'You got it right!',
            'success'
        )*/
        trail[currLevel]++
        userAnswer = document.getElementById('userAnswer')
        userAnswer.value = null
        userAnswer.focus()
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel,'yellow')
    } else {
        alert("better luck next time")
        /*swal(
            'Hard Luck...',
            'Better luck Next time!',
            'error'
        )*/
        isLadder = false
        getCurrentQuestion(++questionNum)
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel,'yellow')


    }
    document.getElementById('red-zone').style.display = 'none'
    document.getElementById('quiz').style.display = 'block'
    redAnswer.value = null;

}, false)

submitButton.addEventListener('click', () => {


    let userAnswer = document.getElementById('userAnswer')
    if (userAnswer.value == json[questionNum]['answer']) {
        alert('answered')
        /*swal(
            'Good job!',
            'You got it right!',
            'success'
        )*/
        //ipcRenderer.send('change-colour', currLevel, "green")
        changeBoardState(currLevel,'green')
        currLevel++;
        questionNum++;
        consQ++
        if (isLadder == true) {
            //ipcRenderer.send('change-colour', currLevel, 'green')
            changeBoardState(currLevel,'green')
            currLevel++
            isLadder = 0
            consQ = 0
        }
        if (consQ % 4 == 0 && consQ > 1)
            isLadder = 1
        if (currLevel >= 10 || questionNum == 15) {
            //ipcRenderer.send('endgame')
            endGame()

        }
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel,'yellow')
        getCurrentQuestion(questionNum)
        if (isLadder == 1)
        alert('You Have won a ladder question.')
            /*swal(
            'Yay..',
            'You won a ladder question',

            'question'
        )*/
        userAnswer.value = null

    } else {
        consQ = 0
        if (trail[currLevel] == 0) {
            alert('You have entered an incorrect answer.Prepare to test your luck')
            /*swal(
                'Oops...',
                'You got it wrong!',
                'error'
            )*/

            //ipcRenderer.send('change-colour', currLevel, 'red')
            changeBoardState(currLevel,'red')
            document.getElementById('red-zone').style.display = 'block'
            document.getElementById('quiz').style.display = 'none'
            document.getElementById('randomanswer').focus()
            userAnswer.value = null
        } else {
            alert("wrong")
        /*    swal(
                'Oops...',
                'You got it wrong!\n Prepare to test your luck',
                'error'
            )*/
            getCurrentQuestion(++questionNum)
        }



    }
}, false)

changeBoardState = (currLevel, colour) => {

    var cell = document.getElementById('board').rows[Maxlevel - currLevel].cells[liveZone[Maxlevel - currLevel]];

    if (colour == "green") {
        cell.style.background = green
    } else if (colour == "yellow") {
        cell.style.background = yellow
    } else if (colour == "red") {
        cell.style.background = red
    }
}

$.getJSON('questions.json',(data) => {
    json = data.Q
    console.log(data)
    //informationArray.push("success");
})
    .done(() => {
        initBoard()
        getCurrentQuestion(questionNum)
    })
