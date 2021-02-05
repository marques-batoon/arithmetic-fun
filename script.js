var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// vvv countdown function vvv
var timeleft = 10;
var timerStart = function() {
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Finished";
    } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
    }, 1000);
}
// ^^^ countdown function ^^^

// Math function
var addition = function(){
    var randInt1 = getRandomInt(100);
    var randInt2 = getRandomInt(100);
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
        timeleft+=2;
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        $('#userAnswer').val('');
        addition();
    }
});

addition();
timerStart();