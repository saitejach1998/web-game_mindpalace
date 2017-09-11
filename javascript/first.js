//var fs = require('fs')
//var { ipcRenderer } = require('electron')
var questionNum = 0;
var currLevel = 0;
var hiddenZones = { '0': ['1', '9'], '1': ['4', '0'], '2': ['2', '5'], '3': ['0', '6'], '4': ['1', '3'], '5': ['8', '9'], '6': ['0', '8'], '7': ['4', '7'], '8': ['2', '1'], '9': ['9', '6'], '10': ['1', '5'], '11': ['7', '8'], '12': ['2', '4'], '13': ['5', '9'], '14': ['3', '6'], '15': ['7', '4'] };
var Maxlevel = 9;
var json = [];
var submitButton = document.getElementById('Submit');
//var submitred = document.getElementById('Submit-red');
var trail = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var consQ = 0;
var isLadder = false;
var noTrialVisits = 0;
//let flag123 = false;

var redAns;
//var { remote, ipcRenderer } = require('electron')
var rowIndex = 0;
var cellIndex = 0;
var liveZone = [0, 8, 4, 7, 0, 9, 6, 2, 4, 0];
var red = "#FF0000";
var yellow = "#ffff00";
var grey = "#ccccb3";
var green = "#008744";
var rightdivColor = "#333333"



$('#dropdown li').on('click', function() {


    redAns = ($(this).text());
    if ((redAns == hiddenZones[15 - questionNum][0] || redAns == hiddenZones[15 - questionNum][1])) {
        //alert("correct")
        swal(
            'Good job!',
            'You got it right!',
            'success'
        );
        trail[currLevel]++;
        // userAnswer = document.getElementById('userAnswer');
        // userAnswer.focus();ss
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel, 'yellow');
    } else {

        //alert("better luck next time")
        swal(
            'Hard Luck...',
            'Better luck Next time!',
            'error'
        );
        isLadder = false;
        if (currLevel == 14) {
            swal(
                'Oh no!',
                'Game over!',
                'error'
            );

            endGame();
        }
        getCurrentQuestion(++questionNum);
        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel, 'yellow');

    }
    document.getElementById('right').style.backgroundColor = rightdivColor;
    document.getElementById('red-zone').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    redAns = null;
    userAnswer.value = null;


});


initBoard = function() {
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

sendPayload = function() {
    var payload = { 'teamName': localStorage.getItem("teamName"), 'noTrialVisits': noTrialVisits, "currLevel": currLevel, 'noQuestions': questionNum };
    console.log(payload);
    $.post('/php/ranking.php', payload, function(response, status) {
        console.log(response);
    });
};

getCurrentQuestion = function(questionNo) {

    if (questionNo == 15) {


        swal(
            'Oh no',
            'You ran out of questions!',
            'error'
        );

        endGame();

    }
    var question = document.getElementById('question');
    question.textContent = json[questionNo].question;

    imagediv = document.getElementById('picture');
    if ('Imagelink' in json[questionNo]) {
        imagediv.style.display = 'block';
        var image = document.getElementById('image');
        image.src = json[questionNo].Imagelink;
    } else {
        imagediv.style.display = 'none';
    }
    document.getElementById('userAnswer').value = null;
    document.getElementById('userAnswer').focus();

};


endGame = function() {

    setTimeout(function() {
        window.location.href = '/last.html';
    }, 1500);

};

document.getElementById('userAnswer').onkeypress = function(e) {
    if (e.keyCode == 13) {
        document.getElementById('Submit').click();
    }
};
/*
document.getElementById('randomAnswer').onkeypress = function(e) {
    if (e.keyCode == 13) {
        document.getElementById('Submit-red').click();
    }
};
*/

/*
submitred.addEventListener('click', function() {
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
        changeBoardState(currLevel, 'yellow');
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
        changeBoardState(currLevel, 'yellow');


    }
    document.getElementById('red-zone').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    redAnswer.value = null;
    userAnswer.value = null;
}, false);
*/
submitButton.addEventListener('click', function() {
    /*if (currLevel > 9 || questionNum > 14) {
        //ipcRenderer.send('endgame')
        endGame();

    }*/
    var userAnswer = document.getElementById('userAnswer');
    if (userAnswer.value == json[questionNum].answer) {
        //alert('answered')



        swal(
            'Good job!',
            'You got it right!',
            'success'
        );

        if (currLevel == 9) {
            currLevel++;
            sendPayload();
            endGame();
        }
        //ipcRenderer.send('change-colour', currLevel, "green")
        changeBoardState(currLevel, 'green');
        currLevel++;
        questionNum++;
        consQ++;
        if (isLadder == true) {
            //ipcRenderer.send('change-colour', currLevel, 'green')
            changeBoardState(currLevel, 'green');
            currLevel++;
            isLadder = 0;
            consQ = 0;
        }
        if (consQ % 4 == 0 && consQ > 1)
            isLadder = 1;

        //ipcRenderer.send('change-colour', currLevel, 'yellow')
        changeBoardState(currLevel, 'yellow');
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
            noTrialVisits++;
            //    alert('You have entered an incorrect answer.Prepare to test your luck')
            swal(
                'Oops...',
                'You got it wrong!\n Prepare to test your luck',
                'error'
            );

            //ipcRenderer.send('change-colour', currLevel, 'red')

            changeBoardState(currLevel, 'red');
            document.getElementById('right').style.backgroundColor = "#ff3333";
            document.getElementById('red-zone').style.display = 'block';
            document.getElementById('quiz').style.display = 'none';

            //document.getElementById('randomAnswer').focus();
            userAnswer.value = null;
        } else {
            //alert("wrong")
            swal(
                'Oops...',
                'You got it wrong!',
                'error'
            );
            getCurrentQuestion(++questionNum);
            trail[currLevel] = 0;
        }
    }
    console.log("end qes");
    sendPayload();
}, false);

changeBoardState = function(currLevel, colour) {

    var cell = document.getElementById('board').rows[Maxlevel - currLevel].cells[liveZone[Maxlevel - currLevel]];

    if (colour == "green") {
        cell.style.background = green;
    } else if (colour == "yellow") {
        cell.style.background = yellow;
    } else if (colour == "red") {
        cell.style.background = red;
    }
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("teamname");
    if (user != "" && user == localStorage.getItem("teamName")) {
        window.location.href = "/nicetry.html";
    } else {
        setCookie("teamname", localStorage.getItem("teamName"), 365);
    }
}

$.getJSON('/data/questions.json', function(data) {
        json = data.Q;
    })
    .done(function() {
        initBoard();
        getCurrentQuestion(questionNum);
    });


$(document).ready(function() {
    checkCookie();
});