// { success: true, id: 292 }
var currentScore = 0;
var highScore = 0;
var globalHighScore;
var randInt1;
var randInt2;
var namae = prompt("Please enter a name for global ranking.");
if(namae===null || namae===""){
    namae = "No Name Loser";
}
$('#welcomeMessage').html('Welcome ' + namae);


var deleteScore = function(delId) {
    $.ajax({
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + delId + '?api_key=292',
        type: 'DELETE',
        success: function(result) {
            console.log(result);
        }
    });
}

var updateScores = function() {
    $('#scoreHolder').html('');
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=292',
        dataType: 'json',
        success: function(response) {
            taskList = response;
            
            for(var i = 0; i < response.tasks.length; i++){
                $('#scoreHolder').append($('<p class="gscore" id="' + response.tasks[i].id + '">' + response.tasks[i].content + '</p>'));
                ///*
                if(i >= 1) {
                    for(var mover = 1; mover <= i; mover++) {
                        
                        strMover = mover.toString();
                        strMover1 = (mover - 1).toString();


                        var curNum = Number.parseInt(($('div#scoreHolder p:eq('+strMover+')').html()).substring(($('div#scoreHolder p:eq('+strMover+')').html()).lastIndexOf(' ')+1));
                        var prevNum = Number.parseInt(($('div#scoreHolder p:eq('+strMover1+')').html()).substring(($('div#scoreHolder p:eq('+strMover1+')').html()).lastIndexOf(' ')+1));
                        if(curNum > prevNum) {
                            $('div#scoreHolder p:eq('+strMover+')').insertBefore('div#scoreHolder p:eq('+strMover1+')');
                        }
                        
                    }
                    for(var mover = i; mover >= 1; mover--) {
                        strMover = mover.toString();
                        strMover1 = (mover - 1).toString();


                        var curNum = Number.parseInt(($('div#scoreHolder p:eq('+strMover+')').html()).substring(($('div#scoreHolder p:eq('+strMover+')').html()).lastIndexOf(' ')+1));
                        var prevNum = Number.parseInt(($('div#scoreHolder p:eq('+strMover1+')').html()).substring(($('div#scoreHolder p:eq('+strMover1+')').html()).lastIndexOf(' ')+1));
                        if(curNum > prevNum) {
                            $('div#scoreHolder p:eq('+strMover+')').insertBefore('div#scoreHolder p:eq('+strMover1+')');
                        }
                        
                    }
                }
                //*/
            }
            globalHighScore = Number.parseInt(($('div#scoreHolder p:first-child').html()).substring(($('div#scoreHolder p:first-child').html()).lastIndexOf(' ')+1));
            console.log(globalHighScore);
        },
        error: function(request, errorMessage) {
            console.log(errorMessage);
        }
    });
}

var addScore = function(scoreNum){
    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=292',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
        task: {
            content: namae + ": " + scoreNum
        }
        }),
        success: function (response, textStatus) {
            updateScores();
        },
        error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
        }
    });
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//test
// vvv countdown function vvv
var timeleft = 10;
var timerStart = function() {
    $('img').fadeOut("fast");
    $('button').prop("disabled", true);
    $('#userAnswer').prop("disabled", false);
    $('.form-check-input').prop("disabled", true);
    document.getElementById("userAnswer").focus();
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        timeleft = 10;
        document.getElementById("countdown").innerHTML = timeleft + " seconds left";
        $('#userAnswer').prop("disabled", true);
        $('button').prop("disabled", false);
        $('.form-check-input').prop("disabled", false);
        if(currentScore > globalHighScore){
            addScore(currentScore);
            $('small').html('Nice Job!');
            alert("Congratluations on getting the new high score!");
            $('#tanuki').attr("src", "./pics/chouureshii.png");
        }
        else if(currentScore > 10){
            $('small').html('Nice Job!');
            addScore(currentScore);
            alert("You made it to the leaderboard!");
            $('#tanuki').attr("src", "./pics/chouureshii.png");
        }
        else if(currentScore < highScore){
            $('#tanuki').attr("src", "./pics/akiramenaide.png");
        }
        else if(currentScore > 1) {
            $('#tanuki').attr("src", "./pics/yatta.png");
        }
        $('img').fadeIn("slow");
    } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds left";
    }
    timeleft -= 1;
    }, 1000);
    currentScore = 0;
    $('#score').html('Score: ' + currentScore);
    timeleft = 10;
    $('#countdown').html(timeleft + ' seconds left');
}
// ^^^ countdown function ^^^

// Math functions
var addition = function(){
    randInt1 = getRandomInt(99) + 1;
    randInt2 = getRandomInt(99) + 1;
    $('#num1').html(randInt1);
    $('#num2').html(randInt2);
    $('#operator').html(' + ');
}

window.addEventListener('keyup', function(e){
    var answer = document.getElementById('userAnswer').value;

    if($('#addition').is(':checked')) {
        if((answer == Number.parseInt(randInt1) + Number.parseInt(randInt2))&&(timeleft>=0)){
            addition();
            timeleft+=2;
            document.getElementById("countdown").innerHTML = timeleft + " seconds left";
            $('#userAnswer').val('');
            currentScore++;
            $('#score').html('Score: ' + currentScore);
            if(currentScore > highScore){
                highScore = currentScore;
                $('#bestScore').html('Best Score: ' + highScore);
            }
        }
    }
    else if($('#subtraction').is(':checked')) {

    }
    else if($('#multiplication').is(':checked')) {
        
    }
    else if($('#division').is(':checked')) {
        
    }
});
$(document).ready(function() {
    addition();
    updateScores();
});

