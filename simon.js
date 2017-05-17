$(document).ready(function() {
  //Keeps track of round # - zero indicates game is not active
  var round = 0;
  // Keep track of user moves and attempts
  var pos = 0;
  var tries = 1;
  var steps = 0;
  //Keeps track of strict mode - default is false
  var strictOn = false;
  // Arrays for Simon & user's turns
  var simonArr = [];
  var userArr = [];
  // Keeps track of whose turn it is - if userMove is F,
  // they'll get an error message if they try to push the buttons
  var userMove = false;
  // Used to identify individual tiles
  var selectedTile = "";
  // Sound files
  var tileTone = "";
  var errorTone = $("#error-sound")[0];
  // Reset the game after a loss
  function reset(){
    console.log("Resetting ...");
    round = 0; // Reset count
    // Reset move Arrays
    userArr = [];
    simonArr = [];
    // Reset user variables
    pos = 0;
    tries = 1;
    // Reset counter display
    $(".count").text("Press Start");
  }

  //Reset the game with a button click
  $("#reset-btn").click(function(){
    reset();
  });

  //Start new game
  $("#start-btn").click(function(){
    simonTurn();
  });

  //Enter strict mode
  $("#strict-on").click(function(){
    if(round !=0){
      window.alert("Error - Cannot Make Change While Game in Play");
    }else{
    strictOn = true;
    $("#strict-off").removeClass("btn-primary"); // Hide Bootstrap btn-primary class to disable button
    $("#strict-on").addClass("btn-primary");
  }
  });

  //Turn off strict mode
  $("#strict-off").click(function(){
    if(round !=0){
      window.alert("Error - Cannot Make Change While Game in Play");
    }else{
    strictOn = true;
    $("#strict-on").removeClass("btn-primary"); // Hide Bootstrap btn-primary class to disable button
    $("#strict-off").addClass("btn-primary");
  }
  });

 //Highlights game tiles & plays sound
  function highlightBtn(id) {
  tileTone = $("#sound" + id)[0];
  $("#" + id).addClass("light-up");
  tileTone.play();
  setTimeout(function() {
    $("#" + id).removeClass("light-up");
  }, 500);
}

//Highlights game tiles & plays sound when user clicks on them
//Uses helper fn highlightBtn
$(".game-tile").click(function() {
  steps++; // Increment steps
  if(userMove === true){
  selectedTile = $(this).attr("id");
  userArr.push(selectedTile);
  // CASE 1: Strict on; user makes mistake - end game
  if(userArr[pos] != simonArr[pos] && strictOn === true){
    errorTone.play();
    $(".count").text("GAME OVER");
  // Case 2: Strict off; user makes mistake - give user two chances to try again
  }else if(userArr[pos] != simonArr[pos] && tries < 3){
    errorTone.play();
    $(".count").text("ERROR");
    tries++; // Keep track of attempts
    userArr = []; //Reset user array
    console.log("Simon array = " + simonArr);
    setTimeout(function() {
      $(".count").text("Round " + round);
      simonSays(simonArr); //Simon reminds user of correct moves
    }, 1500);
  }else if(userArr[pos] != simonArr[pos] && tries === 3){
    // If user fails on 3rd attempt, game over
    errorTone.play();
    $(".count").text("GAME OVER");
  // Case 3 - User presses correct button
  }else{
  highlightBtn(selectedTile);
  pos++;
  tries = 1;
}
}else{
  window.alert("Error");
}
});


  // Simon's turn - Calculates Simon's next "move"
function simonTurn(){
  //Increment round #
  round++;
  if(round === 21){
    window.alert("You win!")
    $(".count").text("GAME OVER");
  }else{
  // Display round # on counter
  $(".count").text("Round " + round);
 // Calculate next move and push into simonArr
 var nextMove = Math.floor((Math.random() * 4));
 simonArr.push(nextMove);
 // Send array to simonSays fn
 simonSays(simonArr);
 }
}

//Helper fn for simonTurn - takes array of "moves"
//Lights up tiles and plays sounds
function simonSays(arr){
  index = 0;
  function nextBtn() {
    highlightBtn(arr[index]);
    index++;
  }
  nextBtn();

  var presser = window.setInterval(function () {
    if (index >= arr.length) {
      clearTimeout(presser);
      userMove = true;
      return;
    }
    nextBtn();
  }, 750);
}

});
