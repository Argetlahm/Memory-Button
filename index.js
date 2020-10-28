var gamePattern = [];
var arrayButton = ["green", "red", "yellow", "blue"]
var playerCounter = [];
var playCheck = 0
var level = 1;
var gamePaused = false;


var blueSound = new Audio("sounds/blue.mp3")
var greenSound = new Audio("sounds/green.mp3")
var redSound = new Audio("sounds/red.mp3")
var yellowSound = new Audio("sounds/yellow.mp3")
var wrongSound = new Audio("sounds/wrong.mp3")
beginGame()

$(".btn").on("click", function(e) {
  // console.log(e.target.id)
  if (gamePattern.length > 0 && gamePaused === false) {
    pushButton(e.target.id)
    checkPattern()
  }
})

function checkPattern() {
  if (playerCounter[playCheck] === arrayButton[gamePattern[playCheck]]) {
    if (playCheck === gamePattern.length - 1) {
      console.log(gamePattern.length - 1)
      setTimeout(function() {
        level++
        createPattern()
      }, 700)
    } else {
      playCheck++;
    }

  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    gamePaused = true
    gameOver()
  }

}

function gameOver() {

  $("h1").text("Game Over. Press 'A' to play again.")
  gamePattern = []

}

function beginGame() {

  $(document).on("keypress", function(e) {
    if (gamePattern.length === 0 && e.key === "a") {
      playerCounter = []
      level = 1
      playCheck = 0
      createPattern()

    }

  })
  // createPattern()

}


function createPattern() {
  $("h1").text("Level " + level)
  playCheck = 0
  gamePaused = true
  playerCounter = []
  var newPattern = Math.floor(Math.random() * 4)
  animatePattern(newPattern)
  gamePattern.push(newPattern)
  // console.log(gamePattern)
}

function pushButton(id) {
  // for capturing the pressed button
  if (gamePaused === false) {
    playerCounter.push(id)

    playSound(id)
    animatePress(id)
  }


}



function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed")
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100)
}

function animatePattern(id) {
  $("." + arrayButton[id]).animate({
    opacity: 0.25
  }, 80).animate({
    opacity: 1
  }, 80, function() {
    gamePaused = false
  })
  playSound(arrayButton[id])

}

function playSound(id) {
  var soundBtn = this[id + "Sound"]
  soundBtn.play()
}
