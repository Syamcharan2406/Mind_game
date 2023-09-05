
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var not_started = 1;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $('#level-title').text('level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(function(){
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } 
    else 
    {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    not_started = 1;
}

$(document).keypress(function() {
    if (not_started){
        $('#level-title').text('level '+level);
        nextSequence();
        not_started = 0;
    }   
});

$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});






