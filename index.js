
// Array of button colors
let buttonColors = ["red", "blue", "green", "yellow"];

// Arrays to store game patterns and user inputs
let gamePattern = [];
let userClickedPattern = [];

// Game state variables
let started = false;
let level = 0;

// Start the game when a key is pressed
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    
  }
});

// Handle button clicks
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Check if user's sequence matches the game's sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    
    playSound("wrong");
    $("body").addClass("gameOver");
    $("#level-title").text("Game Over 💀 Press any Key To Start");
    setTimeout(function(){
      $("body").removeClass("gameOver");
    }, 200);
    
    startOver();
  }
}
// Generate the next sequence in the game 
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// Add animation to button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
// Play sound by file name
function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
// Reset the game state 
function startOver() {
  level = 0;
  started = false
  gamePattern = [];
}
