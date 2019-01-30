$(document).ready(function() {
  // Creates an array that lists out all of the options (Every Letter in the Alphabet).
  var alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];

  // Create an array for every word choice

  var wordChoice = [
    'cntower',
    'raptors',
    'bluejays',
    'yyz',
    'drake',
    'ripleys',
    'casaloma',
    'uoft',
    'toronto',
    'ttc'
  ];

  // Creating variables
  var maxTries = 8;
  var guessedLetters = [];
  var currentWordIndex;
  var guessingWord = [];
  var remainingGueses = 0;
  var gameStarted = false;
  var hasFinished = false;
  var wins = 0;
  var losses = 0;

  // Reset our game-level variables
  function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * wordChoice.length);

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // Make sure the hangman image is cleared
    document.getElementById('hangmanImage').src = '';

    // Build the guessing word and clear it out
    for (var i = 0; i < wordChoice[currentWordIndex].length; i++) {
      guessingWord.push('_');
    }

    // Hide game over and win images/text
    document.getElementById('pressKeyTryAgain').style.cssText = 'display: none';
    document.getElementById('gameover-image').style.cssText = 'display: none';
    document.getElementById('youwin-image').style.cssText = 'display: none';
    document.getElementById('youWinText').style.cssText = 'display: none';
    document.getElementById('youLoseText').style.cssText = 'display: none';

    // Show display
    updateDisplay();
    resetGame();
  }

  //  Updates the display on the HTML Page
  function updateDisplay() {
    document.getElementById('totalWins').innerText = wins;
    document.getElementById('totalLoses').innerText = losses;

    document.getElementById('currentWord').innerText = '';

    for (var i = 0; i < guessingWord.length; i++) {
      document.getElementById('currentWord').innerText += guessingWord[i];
    }
    document.getElementById('remainingGuesses').innerText = remainingGuesses;
    document.getElementById('guessedLetters').innerText = guessedLetters;
    if (remainingGuesses <= 0) {
      document.getElementById('youLoseText').style.cssText = 'display:block';
      document.getElementById('gameover-image').style.cssText =
        'display: block';
      document.getElementById('pressKeyTryAgain').style.cssText =
        'display:block';
      losses++;
      hasFinished = true;
    }
  }

  // Updates the image depending on how many guesses
  function updateHangmanImage() {
    document.getElementById('hangmanImage').src =
      'images/' + (maxTries - remainingGuesses) + '.png';
  }

  document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    console.log(hasFinished);
    if (hasFinished) {
      resetGame();
      hasFinished = false;
    } else {
      // Check to make sure a-z was pressed.
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        makeGuess(event.key.toLowerCase());
      }
    }
  };

  function makeGuess(letter) {
    if (remainingGuesses > 0) {
      if (!gameStarted) {
        gameStarted = true;
      }

      // Make sure we didn't use this letter yet
      if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        evaluateGuess(letter);
      }
    }

    updateDisplay();
    checkWin();
  }

  // This function takes a letter and finds all instances
  function evaluateGuess(letter) {
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < wordChoice[currentWordIndex].length; i++) {
      if (wordChoice[currentWordIndex][i] === letter) {
        positions.push(i);
      }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
      remainingGuesses--;
      updateHangmanImage();
    } else {
      // Loop through all the indicies and replace the '_' with a letter.
      for (var i = 0; i < positions.length; i++) {
        guessingWord[positions[i]] = letter;
      }
    }
  }

  function checkWin() {
    if (guessingWord.indexOf('_') === -1) {
      document.getElementById('youWinText').style.cssText = 'display: block';
      document.getElementById('youwin-image').style.cssText = 'display: block';
      document.getElementById('pressKeyTryAgain').style.cssText =
        'display: block';
      wins++;
      hasFinished = true;
    }
  }
});
