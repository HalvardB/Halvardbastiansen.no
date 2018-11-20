let cvTrykk = false;
let spillTrykk = false;
let tilbakeTrykk = false;
const utdanning = document.getElementById("utdanning");
const om = document.getElementById("om");
const cv = document.getElementById("cv");
const game = document.getElementById("game");
const cvKnapp = document.getElementById("utdanningKnapp");
const spillKnapp = document.getElementById("spillKnapp");
const tilbakeKnapp = document.getElementById("tilbakeKnapp");
const buttons = document.getElementById("buttons");
const about = document.getElementById("about");
let sitat = document.getElementById("sitat");
let forfatter = document.getElementById("forfatter");

let newQuoteCountdown = window.setInterval(printQuote, 5000); // Changing the quote automatically after 5 seconds.

// Click event on CV button
cvKnapp.addEventListener("click", function visUtdanning(){
  if(cvTrykk === false){
    utdanning.className = "vis margin";
    om.className = "rad";
    cv.className = "vis margin";
    cvKnapp.innerHTML = "Skjul CV";
    cvTrykk = true;

  } else {
    utdanning.className = "skjul";
    om.className = "skjul";
    cv.className = "skjul";
    cvKnapp.innerHTML = "Vis CV";
    cvTrykk = false;
  }
});

// Click event on game button
spillKnapp.addEventListener("click", function visSpill(){
  game.className = "vis";
  about.className = "skjul";
});

// Click event on Back button
tilbakeKnapp.addEventListener("click", function tilbake(){
  game.className = "skjul";
  about.className = "vis";
  utdanning.className = "skjul";
  om.className = "skjul";
  cv.className = "skjul";
  cvKnapp.innerHTML = "Vis CV";
  cvTrykk = false;
});

// Random quote generator
function getRandomQuote(){
  quoteId = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteId];
  return quote;
}

// Print function
function printQuote(){

  // Calling the getRandomQuote function and storing the value in a variable.
  // getRandomQuote();
  const randomQuote = getRandomQuote();

  // Printing the Quote and Source
  sitat.innerHTML = randomQuote.quote;
  forfatter.innerHTML = randomQuote.source;
}

// To make sure the visitor see a random quote when first opening the page.
printQuote();


// Tic Tac Toe
// Creds: https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37

$(document).ready(function() {
  $("td").click(function() {
    move(this, huPlayer, huCo);
  });
});

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "#FFA000";
var huCo = "#3688C3";

function move(element, player, color) {
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).addClass("dotsHuman");
    $(element).removeClass("dot");
    board[element.id] = player;

    if (winning(board, player)) {
      setTimeout(function() {
        alert("Gratulerer, du klarte å vinne! Imponerende!");
        reset();
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function() {
        alert("Uavgjort..");
        reset();
      }, 500);
      return;
    } else {
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      $(selector).addClass("dots2Computer");
      $(selector).removeClass("dot");
      board[index] = aiPlayer;

      if (winning(board, aiPlayer)) {
        setTimeout(function() {
          alert("Jeg vant!");
          reset();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function() {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}

function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").addClass("dot");
  $("td").removeClass("dots2Computer");
  $("td").removeClass("dotsHuman");
}

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

//available spots
function avail(reboard) {
  return reboard.filter(s => s != "P" && s != "C");
}

// winning combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
