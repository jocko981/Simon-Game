
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(document).keydown(function() {

	if (started == false) {

		nextSequence();
		started = true;
		$("#start").hide();
	}
});

$("#start").click(function() {

	if (started == false) {

		nextSequence();
		started = true;
		$("#start").hide();
	}
});



function nextSequence() {
	userClickedPattern = [];
	level++;
    $("#level-title").text("LEVEL " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);     // I typed <-- THIS -playSound- function, instead of:  var audio = new Audio("sounds/" + randomChosenColour + ".mp3"); audio.play();
    
}


$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");                  //event.target.id;
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);                      // function

	animatePress(userChosenColour);                   //function

	checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");

	setTimeout(function() { $("#" + currentColour).removeClass("pressed") }, 100)
}


/////////////////////

function checkAnswer(currentLevel) {
	
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
        	setTimeout(function() {	nextSequence() }, 1000); }
	        
        } else { 

        	console.log("Wrong!");

        	playSound("wrong");

        	$("body").addClass("game-over");
        	setTimeout(function() {	$("body").removeClass("game-over"), 200 });

        	$("#level-title").text("GAME OVER, to Restart Press Any Key or CLick the START button");

		    startOver();
		    $("#start").show();
		  }
    }



function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
	

//     setTimeout(function, milliseconds)