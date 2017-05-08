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
  // Array for buttons
  var buttonArr = [0, 1, 2, 3];

  // Reset the game after a loss
  function reset(){
    console.log("Resetting ...");
    round = 0; // Reset count
    //$(".count").text("Press Start");
    simonSays();
  }

  //Reset the game with a button click
  $("#reset-btn").click(function(){
    reset();
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

  // Simon's turn
function simonSays(){
  //TODO
}




]);
