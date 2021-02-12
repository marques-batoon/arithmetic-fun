// { success: true, id: 292 }
var currentScore = 0;
var highScore = 0;
var globalHighScore;
var randInt1;
var randInt2;
var namae = prompt("Please enter a name for global ranking.");
var apiAdd = 292;
var apiSub = 295;
var apiMult = 296;
var apiDiv = 297;
if(namae===null || namae===""){
    namae = "No Name Loser";
}
else if (namae.length > 15) {
    namae = namae.substring(0, 15);
}
$('#welcomeMessage').html('Welcome ' + namae);


var deleteScore = function(delId, api) {    // Only accessible to coders
    $.ajax({
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + delId + '?api_key=' + api,
        type: 'DELETE',
        success: function(result) {
            console.log(result);
        }
    });
}

var updateScores = function() { 
    var api;
    if($('#addition').is(':checked')){
        api = apiAdd;
    }
    else  if($('#subtraction').is(':checked')){
        api = apiSub;
    }
    else  if($('#multiplication').is(':checked')){
        api = apiMult;
    }
    else  if($('#division').is(':checked')){
        api = apiDiv;
    }
    $('#scoreHolder').html('');
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=' + api,
        dataType: 'json',
        success: function(response) {
            taskList = response;
            // Loop through all tasks (specific to math expression) and reorders them from largest to smallest
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
            console.log('Score to beat: ' + globalHighScore);
        },
        error: function(request, errorMessage) {
            console.log(errorMessage);
        }
    });
}

var addScore = function(scoreNum){  // Adds new score when they get over 10
    var api;
    if($('#addition').is(':checked')){
        api = apiAdd;
    }
    else  if($('#subtraction').is(':checked')){
        api = apiSub;
    }
    else  if($('#multiplication').is(':checked')){
        api = apiMult;
    }
    else  if($('#division').is(':checked')){
        api = apiDiv;
    }
    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=' + api,
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

// Math functions
var addition = function(){
    randInt1 = getRandomInt(99) + 1;
    randInt2 = getRandomInt(99) + 1;
    $('#num1').html(randInt1);
    $('#num2').html(randInt2);
    $('#operator').html(' + ');
}

var subtraction = function(){
    randInt1 = getRandomInt(88) + 12;
    randInt2 = getRandomInt(randInt1 - 10) + 5;
    $('#num1').html(randInt1);
    $('#num2').html(randInt2);
    $('#operator').html(' - ');
}

var multiplication = function() {
    randInt1 = getRandomInt(14) + 2;
    randInt2 = getRandomInt(14) + 2;
    $('#num1').html(randInt1);
    $('#num2').html(randInt2);
    $('#operator').html(' * ');
}

var division = function() {
    randInt1 = getRandomInt(190) + 10;
    while( !((randInt1%13===0) || (randInt1%11===0) || (randInt1%7===0) || (randInt1%5===0) || (randInt1%3===0) || (randInt1%2===0))){
        randInt1 = getRandomInt(190) + 10;
    }
    while(randInt1 % randInt2 !== 0) {
        randInt2 = getRandomInt(randInt1 - 2) + 2;
        if(randInt1===randInt2){
            division();
        }
    }
    $('#num1').html(randInt1);
    $('#num2').html(randInt2);
    $('#operator').html(' / ');
}

$('#addition').click(function(){
    if(!($('#addition').is([disabled=""]))){
        addition();
        updateScores();
        $('small').html('(Get above 10 to join the ranking)');
    }
});

$('#subtraction').click(function(){
    if(!($('#subtraction').is([disabled=""]))){
        subtraction();
        updateScores();
        $('small').html('(Get above 10 to join the ranking)');
    }
});

$('#multiplication').click(function(){
    if(!($('#multiplication').is([disabled=""]))){
        multiplication();
        updateScores();
        $('small').html('(Get above 10 to join the ranking)');
    }
});

$('#division').click(function(){
    if(!($('#division').is([disabled=""]))){
        division();
        updateScores();
        $('small').html('(Get above 10 to join the ranking)');
    }
});

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
        $('#userAnswer').val('');
        $('#userAnswer').prop("disabled", true);
        $('button').prop("disabled", false);
        $('.form-check-input').prop("disabled", false);
        if(currentScore > globalHighScore){
            addScore(currentScore);
            $('small').html('Nice Job!');
            alert("Congratluations on getting the new high score!");
            $('#tanuki').attr("src", "./pics/chouureshii.png");
            $('#goodluck').attr("src", "./pics/nice.png");
        }
        else if(currentScore > 10){
            $('small').html('Nice Job!');
            addScore(currentScore);
            alert("You made it to the leaderboard!");
            $('#tanuki').attr("src", "./pics/chouureshii.png");
            $('#goodluck').attr("src", "./pics/nice.png");
        }
        else if(currentScore < highScore){
            $('#tanuki').attr("src", "./pics/akiramenaide.png");
            $('#goodluck').attr("src", "./pics/goodluck.png");
        }
        else if(currentScore > 1) {
            $('#tanuki').attr("src", "./pics/yatta.png");
            $('#goodluck').attr("src", "./pics/keepgoing.png");
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
        if((answer == Number.parseInt(randInt1) - Number.parseInt(randInt2))&&(timeleft>=0)){
            subtraction();
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
    else if($('#multiplication').is(':checked')) {
        if((answer == Number.parseInt(randInt1) * Number.parseInt(randInt2))&&(timeleft>=0)){
            multiplication();
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
    else if($('#division').is(':checked')) {
        if((answer == Number.parseInt(randInt1) / Number.parseInt(randInt2))&&(timeleft>=0)){
            division();
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
});
$(document).ready(function() {
    addition();
    updateScores();
});

$('.bi-instagram').on({
    mouseenter: function(){
        $('.bi-twitter').css('opacity', '0.7');
        $('.bi-github').css('opacity', '0.7');
    },
    mouseleave: function(){
        $('.bi-twitter').css('opacity', '1.0');
        $('.bi-github').css('opacity', '1.0');
    }
});

$('.bi-twitter').on({
    mouseenter: function(){
        $('.bi-instagram').css('opacity', '0.7');
        $('.bi-github').css('opacity', '0.7');
    },
    mouseleave: function(){
        $('.bi-instagram').css('opacity', '1.0');
        $('.bi-github').css('opacity', '1.0');
    }
});

$('.bi-github').on({
    mouseenter: function(){
        $('.bi-twitter').css('opacity', '0.7');
        $('.bi-instagram').css('opacity', '0.7');
    },
    mouseleave: function(){
        $('.bi-twitter').css('opacity', '1.0');
        $('.bi-instagram').css('opacity', '1.0');
    }
});