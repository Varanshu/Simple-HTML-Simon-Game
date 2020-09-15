var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    started=true;
    // setTimeout(function(),500);
    nextSequence();
  }
})


function nextSequence(){
  var rand=Math.floor(Math.random()*4);
  // console.log(rand);
  var randomChosenColor=buttonColors[rand];
  gamePattern.push(randomChosenColor);

  // console.log(gamePattern);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level "+level);
  userClickedPattern=[];
}

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAns(userClickedPattern.length-1);
})

function checkAns(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function playSound(name){

  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
