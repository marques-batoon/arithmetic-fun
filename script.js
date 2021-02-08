// { success: true, id: 292 }
var currentScore = 0;
var highScore = 0;
//var namae = prompt("Please enter a name for global ranking.");
var namae = 'Marques';
$('#welcomeMessage').html('Welcome ' + namae);

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
                $('#scoreHolder').append($('<p class="gscore" id="' + response.tasks[i].id + '">' + response.tasks[i].content + '</p>'));
                /*
                if(i >= 1) {
                    for(var mover = 1; mover <= i; mover++) {
                        var curNum = (Number.parseInt(response.tasks[mover].content.substring(response.tasks[mover].content.lastIndexOf(' ')+1)));
                        console.log(curNum);
                        var prevNum = (Number.parseInt(response.tasks[mover-1].content.substring(response.tasks[mover].content.lastIndexOf(' ')+1)));
                        console.log('prev num is ' + prevNum);
                        if(curNum > prevNum) {
                            $('#scoreHolder').children(mover).insertBefore($('#scoreHolder').children(mover-1));
                            console.log("removing " + $('#scoreHolder').children(mover+1).html());
                            $('#scoreHolder').children(mover+1).remove();
                        }
                    }
                }
                */
            }
        },
        error: function(request, errorMessage) {
            console.log(errorMessage);
        }
    });
}



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
    currentScore = 0;
    $('#score').html('Score: ' + currentScore);
    timeleft = 10;
    $('#countdown').html(timeleft + ' seconds remaining');
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