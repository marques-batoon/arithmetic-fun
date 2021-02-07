// { success: true, id: 292 }
var currentScore = 0;
var highScore = 0;
//var namae = prompt("Please enter a name for global ranking.");
var namae = 'Marques';
$('#welcomeMessage').html('Welcome ' + namae);
var scores = [];

/* ADD SCORES
$.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=292',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: "Marques: 3"
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
*/

var updateScores = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=292',
        dataType: 'json',
        success: function(response) {;
            taskList = response;
            for(var i = 0; i < response.tasks.length; i++){
                //$('#scoreHolder').prepend($('<p class="gscore" id="' + response.tasks[i].id + '">' + response.tasks[i].content + '</p>'));
                console.log(response.tasks[i]);
                scores.unshift(response.tasks[i].content);
            }
        },
        error: function(request, errorMessage) {
            console.log(errorMessage);
        }
    });
}
console.log(scores);
console.log(scores[1]);
scores.sort( function(a, b) {
    if( Math.parseInt(a.substring(a.lastIndexOf(" ") + 1)) >  Math.parseInt(b.substring(b.lastIndexOf(" ") + 1)) ) return 1;
    if( Math.parseInt(a.substring(a.lastIndexOf(" ") + 1)) <  Math.parseInt(b.substring(b.lastIndexOf(" ") + 1)) ) return -1;
    return 0;
});
console.log(scores);



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
    updateScores();
});