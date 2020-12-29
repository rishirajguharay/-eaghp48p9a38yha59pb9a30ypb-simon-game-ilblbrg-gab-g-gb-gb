var buttonColors=["red","blue","green","yellow"];
var userPattern = [];
var gamePattern = [];
var level=0;


var start=false;
$(document).keydown(function() {
  if(!start) {
    start=true;
    $("h1").html("The game begins");
    nextSequence();
  }
})
function nextSequence() {
  userPattern=[]
  var rand=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[rand];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio=new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();
  level++;
  $("h1").html("Level"+" "+level);

  //console.log(gamePattern);
}

function animatePress(color) {
  var box=document.querySelector("#"+color);
  box.classList.add("pressed");
  setTimeout(function() {
    box.classList.remove("pressed");
  },100)
}
$(".btn").click(function() {
  userPattern.push($(this).attr("id"));
  var audio=new Audio("sounds/"+$(this).attr("id")+".mp3");
  audio.play();
  animatePress($(this).attr("id"));
  //console.log(userPattern);

  checkAnswer(userPattern.length -1);

})
function playSound(string) {
  var audio=new Audio(string+".mp3");
  audio.play();
}
function checkAnswer(current) {
  if(userPattern[current]===gamePattern[current]) {
    if(userPattern.length === gamePattern.length) setTimeout(function() {
      nextSequence();
    },1000);
  }
  else {
    playSound("sounds/wrong");
    start=false;
    level=0;
    gamePattern=[];
    $("h1").html("Game Over Bitch! Press any key to continue");
    document.querySelector("body").classList.add("game-over");
    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    },2000);

  }
}
