//var fs = require('fs')
//var { ipcRenderer } = require('electron')
var questionNum = 0;
var currLevel = 0;
var hiddenZones = { '0': ['8', '9'], '1': ['1', '3'], '2': ['9', '0'], '3': ['1', '8'], '4': ['4', '4'], '5': ['5', '5'], '6': ['6', '6'], '7': ['7', '7'], '8': ['8', '8'], '9': ['9', '9'], '10': ['10', '10'], '11': ['11', '11'], '12': ['12', '12'], '13': ['13', '13'], '14': ['14', '14'], '15': ['15', '15'] };
var Maxlevel = 9;
var json = [];
var submitButton = document.getElementById('Submit');
var submitred = document.getElementById('Submit-red');
var trail = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var consQ = 0;
var isLadder = false;
//let flag123 = false;


//var { remote, ipcRenderer } = require('electron')
var rowIndex = 0;
var cellIndex = 0;
var liveZone = [0, 8, 4, 7, 0, 9, 6, 2, 4, 0];
var red = "#FF0000";
var yellow = "#ffff00";
var grey = "#ccccb3";
var green = "#008744";

initBoard = function(){
        //flag123 = true
        for (rowIndex = 0; rowIndex < 10; rowIndex++) {
        var cell = document.getElementById('board').rows[rowIndex].cells[liveZone[rowIndex]];
        cell.style.transition = 'background 1000ms ease-in-out';
        //cell.style.border = '1px solid blue'
        if (rowIndex == 9) {
            cell.style.background = yellow;
            continue;
        }

        cell.style.background = grey;

    }
};


getCurrentQuestion = function(questionNo){
    var question = document.getElementById('question');
    console.log("inside getquestion");
    question.textContent = json[questionNo].question;

    imagediv = document.getElementById('picture');
    if ('Imagelink' in json[questionNo]) {
        console.log('picture');
        imagediv.style.display = 'block';
        var image = document.getElementById('image');
        image.src = json[questionNo].Imagelink;
    } else {
        imagediv.style.display = 'none';
    }
    document.getElementById('userAnswer').value = null;
    document.getElementById('userAnswer').focus();

};

endGame = function(){};

document.getElementById('userAnswer').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('Submit').click();
    }
};

document.getElementById('randomAnswer').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('Submit-red').click();
    }
};

submitred.addEventListener('click', function(){
    var redAnswer = document.getElementById('randomAnswer');
    if ((redAnswer.value == hiddenZones[15 - questionNum][0] || redAnswer.value == hiddenZones[15 - questionNum][1])) {
        //alert("correct")
        swal(
            'Good job!',
            'You got it right!',
            'success'
        );
        trail[currLevel]++;
        userAnswer = document.getElementById('userAnswer');
        userAnswer.focus();
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel,'yellow');
    } else {
        //alert("better luck next time")
        swal(
            'Hard Luck...',
            'Better luck Next time!',
            'error'
        );
        isLadder = false;
        getCurrentQuestion(++questionNum);
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel,'yellow');


    }
    document.getElementById('red-zone').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    redAnswer.value = null;
    userAnswer.value = null;
}, false);

submitButton.addEventListener('click', function(){


    var userAnswer = document.getElementById('userAnswer');
    if (userAnswer.value == json[questionNum].answer) {
        //alert('answered')
        swal(
            'Good job!',
            'You got it right!',
            'success'
        );
        //ipcRenderer.send('change-colour', currLevel, "green")
        changeBoardState(currLevel,'green');
        currLevel++;
        questionNum++;
        consQ++;
        if (isLadder == true) {
            //ipcRenderer.send('change-colour', currLevel, 'green')
            changeBoardState(currLevel,'green');
            currLevel++;
            isLadder = 0;
            consQ = 0;
        }
        if (consQ % 4 == 0 && consQ > 1)
            isLadder = 1;
        if (currLevel >= 10 || questionNum == 15) {
            //ipcRenderer.send('endgame')
            endGame();

        }
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel,'yellow');
        getCurrentQuestion(questionNum);
        if (isLadder == 1)
        //alert('You Have won a ladder question.')
            swal(
            'Yay..',
            'You won a ladder question',

            'question'
        );
        userAnswer.value = null;

    } else {
        consQ = 0;
        if (trail[currLevel] == 0) {
        //    alert('You have entered an incorrect answer.Prepare to test your luck')
            swal(
                'Oops...',
                'You got it wrong!',
                'error'
            );

            //ipcRenderer.send('change-colour', currLevel, 'red')
            changeBoardState(currLevel,'red');
            document.getElementById('red-zone').style.display = 'block';
            document.getElementById('quiz').style.display = 'none';
            document.getElementById('randomanswer').focus();
            userAnswer.value = null;
        } else {
            //alert("wrong")
        swal(
                'Oops...',
                'You got it wrong!\n Prepare to test your luck',
                'error'
            );
            getCurrentQuestion(++questionNum);
        }
    }
}, false);

changeBoardState = function(currLevel, colour){

    var cell = document.getElementById('board').rows[Maxlevel - currLevel].cells[liveZone[Maxlevel - currLevel]];

    if (colour == "green") {
        cell.style.background = green;
    } else if (colour == "yellow") {
        cell.style.background = yellow;
    } else if (colour == "red") {
        cell.style.background = red;
    }
};

$.getJSON('questions.json',function(data){
    json = data.Q;
    console.log(data);
    //informationArray.push("success");
})
    .done(function(){
        initBoard();
        getCurrentQuestion(questionNum);
    });
