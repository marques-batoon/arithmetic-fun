var currentScore = 0;
var highScore = 0;
var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// vvv countdown function vvv
var timeleft = 10;
var timerStart = function() {
    $('#userAnswer').prop("disabled", false);
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        timeleft = 10;
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        $('#userAnswer').prop("disabled", true);
    } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
    }, 1000);
}
// ^^^ countdown function ^^^

// Math function
var addition = function(){
    var randInt1 = getRandomInt(99) + 1;
    var randInt2 = getRandomInt(99) + 1;
    $('#num1').html(randInt1);
    $('#num2').html(randInt2);
    $('#operator').html(' + ');
}

window.addEventListener('keyup', function(e){
    var answer = document.getElementById('userAnswer').value;
    console.log(answer);
    var randInt1 = $('#num1').html();
    var randInt2 = $('#num2').html();
    console.log(randInt1 + ' + ' + randInt2);
    console.log(Number.parseInt(randInt1) + Number.parseInt(randInt2));
    if((answer == Number.parseInt(randInt1) + Number.parseInt(randInt2))&&(timeleft>=0)){
        addition();
        timeleft+=2;
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        $('#userAnswer').val('');
        currentScore++;
        $('#score').html('Score: ' + currentScore);
        if(currentScore > highScore){
            highScore = currentScore;
            $('#bestScore').html('Best Score: ' + highScore);
        }
    }
});

$(document).ready(function() {
    addition();
});