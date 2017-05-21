$(document).ready(function() {
  //Keeps track of round # - zero indicates game is not active
  var round = 0;
  // Keep track of user moves and attempts
  var pos = 0;
  var tries = 0;
  //Keeps track of strict mode - default is false
  var strictOn = false;
  // Arrays for Simon & user's turns
  var simonArr = [];
  var userArr = [];
  // Keeps track of whose turn it is - if userTurn is F,
  // they'll get an error message if they try to push the buttons
  var userTurn = false;
  // Used to identify individual tiles
  var selectedTile = "";
  // Sound files
  var tileTone = "";
  var errorTone = $("#error-sound")[0];

  // Resets the game
  function reset(){
    console.log("Resetting ...");
    round = 0; // Reset count
    // Reset move Arrays
    userArr = [];
    simonArr = [];
    // Reset user variables
    pos = 0;
    tries = 0;
    // Reset counter display
    $(".count").text("Press Start");
  }

  //Reset the game with a button click
  $("#reset-btn").click(function(){
    reset();
  });

  //Begin game
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
    strictOn = false;
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

// Records user moves & sends them to compareMoves
$(".game-tile").click(function() {
  if(userTurn === true){
  selectedTile = parseInt($(this).attr("id"));
  userArr.push(selectedTile);
  compareMoves();
}else{
  errorTone.play();
}
});

// Compares user input with what Simon said to do, then lets user complete turn,
// sends game back to Simon, or ends game as appropriate
function compareMoves(){
  console.log("Simon pos = " + simonArr[pos]);
  console.log("User arr = " + userArr);
  console.log("User click = " + userArr[pos]);
  // CASE 1: Strict on; user makes mistake - end game
  if(strictOn === true && userArr[pos] != simonArr[pos]){
    console.log("Case 1");
    errorTone.play();
    setTimeout(function() {
      window.alert("Game Over");
      reset();
    }, 1500);
// CASE 2: Strict off; user makes mistake - remind user & let them try again
// User gets two more tries
}else if(userArr[pos] != simonArr[pos] && tries<2){
  console.log("Case 2");
    errorTone.play();
    $(".count").text("ERROR");
    userArr = []; //Reset user array
    pos = 0; // Reset position
    userTurn = false;
    tries++;
    setTimeout(function() {
      $(".count").text("Round " + round);
      simonSays(simonArr); //Simon reminds user of correct moves
    }, 1500);
// CASE 2a - User out of tries; game over
}else if(userArr[pos] != simonArr[pos] && tries===2){
  console.log("Case 2a");
    errorTone.play();
    setTimeout(function() {
      window.alert("Game Over");
      reset();
    }, 1500);
  // CASE 3 - User presses correct button but has not ended sequence; light up tiles and let user continue
}else if(userArr.length < simonArr.length && userArr[pos] === simonArr[pos]){
  console.log("Case 3");
  highlightBtn(selectedTile);
  pos++;
// CASE 4 - User presses correct button; end of sequence; send back to Simon
}else if(userArr.length === simonArr.length && userArr[pos] === simonArr[pos]){
  console.log("Case 4");
  highlightBtn(selectedTile);
  pos = 0;
  tries = 0;
  userArr = [];
  userTurn == false;
  setTimeout(function() {
    simonTurn();
  }, 1500);
}else{
  console.log("Default");
  return;
}

}

  // Simon's turn - Calculates Simon's next "move"
function simonTurn(){
  //Increment round #
  round++;
  if(round === 21){
    window.alert("You win!")
    reset();
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

//Takes array of Simon's "moves"
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
      userTurn = true;
      return;
    }
    nextBtn();
  }, 750);
  console.log(simonArr);
}

});
