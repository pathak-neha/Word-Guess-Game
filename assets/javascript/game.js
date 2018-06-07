// ------------------------------------------------------ DEFINING VARIABLES -------------------------------------------------------
    // game stats
    var errors;
    var guessedLetters;
    var wins=0;
    var losses=0;

    // word generation
    var wordChoices = ["violet","indigo","blue","green","yellow","orange","red"];
    var word;
    var blanks = [];

    // for user letter selection
    var possible = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var userGuess;
    var lettersGuessed = [];

    // within game functions
    var correctGuess=true;
    var complete=true;

// ------------------------------------------------------ DEFINING FUNCTIONS -------------------------------------------------------

    // to start a new game
    function newGame() {
        // partially reset stats
        errors=0;
        guessedLetters=[];
        blanks=[];
        
        // update display
        document.querySelector("#guess-arr").innerHTML="N/A";
        document.querySelector("#error-counter").innerHTML="nil";
        drawing = document.getElementById("hangman");
        drawing.src="./assets/images/error-0.jpg";
        
        // generate random word choice for game
        var n = Math.floor(Math.random()*wordChoices.length);
        word = wordChoices[n];
        console.log("The word is "+word);

        // generating blanks with the same length as the word
        for (var i=0;i<word.length;i++) {
            blanks[i]="_";
        }

        // displays the blanks
        document.querySelector("#current-word").innerHTML=(blanks.join(" "));
    };

    // to recognize keyboard event     
    document.onkeyup = function(event) {
        userGuess = event.key;

        // to ensure the input is a letter
        if (possible.includes(userGuess)) {
            
            // records the key input as a lower case letter
            userGuess = userGuess.toLowerCase();
            console.log("You guessed "+userGuess);
            
            // to filter duplicates
            if (guessedLetters.includes(userGuess)) {
                alert("You already guessed "+userGuess);
            } else {

                // to check if the word contains the guessed letter
                correctGuess=false;
                for (var i=0;i<word.length;i++) {
                    if (word[i]===userGuess) {
                        blanks[i]=userGuess;
                        correctGuess=true;
                    } 
                }

                // update display
                document.querySelector("#current-word").innerHTML=(blanks.join(" "));
                
                // to check status of correctGuess
                // console.log("status of correctGuess is "+correctGuess);
                
                // if user guesses an incorrect letter
                if (correctGuess===false) {
                    // increase error count by one and update display
                    errors+=1;
                    document.querySelector("#error-counter").innerHTML=errors;

                    // update drawing
                    drawing = document.getElementById("hangman");
                    drawing.src="./assets/images/error-"+errors+".jpg";

                    // include userGuess in "incorrect guesses list" and update display
                    (guessedLetters).push(userGuess);
                    document.querySelector("#guess-arr").innerHTML=guessedLetters.join(", ");
                }

                // reset variable
                complete=true;
                // to check if the word is complete
                for (var i=0;i<word.length;i++){
                    if (blanks[i]=="_") {
                        complete=false;
                    }
                }

                // to check complete status
                // console.log("status of complete is "+complete);
                
                // if the word is complete, then update win counter and start a new game
                if (complete===true) {
                    wins++;
                    document.querySelector("#wins").innerHTML=wins;
                    newGame();
                };

                // if max number of errors is reached, update loss counter and start a new game
                if (errors>9) {
                    losses++;
                    document.querySelector("#losses").innerHTML=losses;
                    newGame();
                };
            };
        };
    };

// ------------------------------------------------------ INITIALIZING NEW GAME -------------------------------------------------------
window.onload = newGame();

