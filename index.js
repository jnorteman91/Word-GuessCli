//NPM modules to obtain user input
var word = require("./word.js");
var inquirer = require("inquirer");
var colors = require("colors");

//Array of characters
wordArray = ["aku aku", "coco bandicoot", "dingodile", "dr. neo cortex", "dr. n. gin", "crash bandicoot", "pinstripe", "dr. nefarious trophy", "nitrous oxide", "polar", "pura"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var count = 0;

//Selects a word from the array, and uses a constructor to creat display and function
function startGame() {
    if (wordArray.length < 2) {
        wordArray = ["aku aku", "coco bandicoot", "dingodile", "dr. neo cortex", "dr. n. gin", "crash bandicoot", "pinstripe", "dr. nefarious trophy", "nitrous oxide", "polar", "pura"];
    }
    select = Math.floor(Math.random()*wordArray.length);
    chosenWord = wordArray[select];
    gameWord = new word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordArray.splice(select, 1);
    }
    console.log("\nGuess the lettes of characters of the classic game Crash Team Racing. You get 10 guesses. Good luck!.\n".green)
    promptUser();
}

//Lets the user input a guessed letter and resets if there is no more remaining guesses
function promptUser() {
    if (count < 10) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nSelect a letter & press enter.\n".green
            }
        ]).then(function(data) {
            checkAnswer(data);
        });
    } else {
        console.log("\nOut of guesses! Try again.\n".red);
        console.log(chosenWord.rainbow);
        chosenWord = "";
        gameWord = "";
        select = 0;
        count = 0;
        startGame();
    }
}

//Checks input for format and compares letter to see if it is correct
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var check = data.letter.toLowerCase();
        var let = gameWord.showWord();
        gameWord.checkGuess(check);
        if (let === gameWord.showWord()) {
            console.log("\nSorry, you guessed wrong\n".red);
            count++;
            console.log(((10 - count) + " Guess left").green);
            promptUser();
        } else {
            rightGuess();
        }
    } else {
        console.log("\nPlease enter a letter one at a time.\n".yellow);
        promptUser();
    }
}

//If correct the array displays the word with the correct letter and if the entire word is filled in, the game will restart
function rightGuess() {
    console.log("\nCorrect!\n".green);
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord().inverse);
        console.log("\nWinner!\n".inverse);
        chosenWord = "";
        gameWord = "";
        select = 0;
        count = 0;
        startGame();
    } else {
        promptUser();
    }
}

startGame();