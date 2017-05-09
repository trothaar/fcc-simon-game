$(document).ready(function() {
  // Button sounds
  var redSound = $("#red-sound")[0];
  var greenSound = $("#green-sound")[0];
  var yellowSound = $("#yellow-sound")[0];
  var blueSound = $("#blue-sound")[0];
  //Keeps track of round # - zero indicates game is not active
  var round = 0;
  //Keeps track of strict mode - default is false
  var strictOn = false;
  // Arrays for Simon & user's turns
  var simonArr = [];
  var userArr = [];

  // Reset the game after a loss
  function reset(){
    console.log("Resetting ...");
    round = 0; // Reset count
    // Reset move Arraysvar simonArr = [];
    var userArr = [];
    var simonArr = [];
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

  // Simon's turn - Calculates Simon's next "move"
function simonTurn(){
  //Increment round no and display on counter
  round++;
  $("counter").text("Round " + round);
 // Calculate next move and push into simonArr
 var nextMove = Math.floor((Math.random() * 4));
 simonArr.push(nextMove);
 // Send array to simonSays fn
 simonSays(simonArr);
}

  //Helper fn for simonTurn - takes array of "moves"
  //Lights up tiles and plays sounds
function simonSays(arr){
  //TODO
}

// User's turn
function userTurn(){
//TODO
}



});
