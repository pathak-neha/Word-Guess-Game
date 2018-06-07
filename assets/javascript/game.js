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

    // Game sounds
    var winSound = new Audio("./assets/sounds/Splat.wav");
    var loseSound = new Audio("./assets/sounds/Lose.wav");

// ------------------------------------------------------ DEFINING FUNCTIONS -------------------------------------------------------

    // to initiate new game
    function newGame() {
        document.getElementById("main-content").cssText="z-index: 99;";

        // partially reset stats
        clear();
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

    // on keyboard event     
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
                var correctGuess=false;
                for (var i=0;i<word.length;i++) {
                    if (word[i]===userGuess) {
                        blanks[i]=userGuess;
                        correctGuess=true;
                    } 
                }

                // update display
                document.querySelector("#current-word").innerHTML=(blanks.join(" "));
                
                // if user guesses an incorrect letter
                if (correctGuess===false) {
                    // increase error count by one and update display
                    errors+=1;
                    document.querySelector("#error-counter").innerHTML=errors+"/10";

                    // update drawing
                    drawing = document.getElementById("hangman");
                    drawing.src="./assets/images/error-"+errors+".jpg";

                    // include userGuess in "incorrect guesses list" and update display
                    (guessedLetters).push(userGuess);
                    document.querySelector("#guess-arr").innerHTML=guessedLetters.join(", ");
                }

                // reset variable
                var complete=true;
                // to check if the word is complete
                for (var i=0;i<word.length;i++){
                    if (blanks[i]=="_") {
                        complete=false;
                    }
                }

                // if the word is complete, then update win counter and start a new game
                if (complete===true) {
                    wins++;
                    document.querySelector("#wins").innerHTML=wins;
                    showImage((word+"-page"));
                    winSound.play();
                };  
                
                // if max number of errors is reached, update loss counter and start a new game
                if (errors>9) {
                    losses++;
                    document.querySelector("#losses").innerHTML=losses;
                    showImage("lose-page");
                    loseSound.play();
                };

            };
        };
    };

    // to show image
    function showImage(elementID) {
        document.getElementById("main-content").cssText="z-index: 0";
        var graphic = document.getElementById(elementID);
        graphic.style.cssText="display: ";
        graphic.addEventListener("click",newGame);
    }

    // to hide image(s)
    function clear() {
        document.getElementById("violet-page").style.cssText="display: none";
        document.getElementById("indigo-page").style.cssText="display: none";
        document.getElementById("blue-page").style.cssText="display: none";
        document.getElementById("green-page").style.cssText="display: none";
        document.getElementById("yellow-page").style.cssText="display: none";
        document.getElementById("orange-page").style.cssText="display: none";
        document.getElementById("red-page").style.cssText="display: none";
        document.getElementById("lose-page").style.cssText="display: none";
    }

// ------------------------------------------------------ INITIALIZING NEW GAME -------------------------------------------------------
window.onload = newGame();

