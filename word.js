// Word constructor using letter to create words 
var letter = require("./letter.js");

function word(wordList) {
    this.wordList = wordList;
    this.testWord = [];
    this.makeWord = function() {
        for (var i = 0; i < wordList.length; i++) {
            var let = new letter(wordList[i]);
            this.testWord.push(let);
        }
    }
    this.showWord = function() {
        var wordDisplay = [];
        for (var i = 0; i < this.testWord[i]; i++) {
            wordDisplay.push(this.testWord[i].displayLet());
        }
        return wordDisplay.join(" ");
    }
    this.checkGuess = function(guess) {
        for (var i = 0; i < this.testWord.length; i++) {
            this.testWord[i].check(guess);
        }
    }
}

module.exports = word;