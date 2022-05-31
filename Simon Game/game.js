var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var gameOver = false;

function nextSequence() {
  userClickedPattern = [];
  level ++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
    setTimeout(function(){
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      gameOver = true;
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 1000);

  }
}

//start
if (!start || gameOver){
  $(document).on("keypress", function(event){
    gameOver = false;
    start = true;
    level = 0;
    gamePattern = [];
    $("#level-title").text("Level " + level);
    nextSequence();
  });
}



$(".btn").on("click", function(event){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $(event.target).fadeOut(100).fadeIn(100);
  playSound(userChosenColor);
  $(event.target).addClass("pressed"); //add class no need for "."
  setTimeout(function(){
    $(event.target).removeClass("pressed");}, 100);
  checkAnswer(userClickedPattern.length - 1);
});
