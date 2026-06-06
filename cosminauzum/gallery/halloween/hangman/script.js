'use strict'

const guessLettersContainer = document.querySelector('.guessed-letters');

const wordToGuess = prompt('Word to guess:').toLowerCase();
const lettersArray = wordToGuess.split('');
const score = document.querySelector('.score');
const hangmanImg = document.getElementById('hangman');
const title = document.querySelector('.title');
const game = document.querySelector('.container-game');
const lettersInWord = new Set(lettersArray);
let state = 0;

const displayWord = function(word){
    for(let letter of word) {
        const html = `
        <div id="guessed-letter">
            <h1 class="hidden ${letter}">${letter}</h1>
            <img id="underscore" src="img/underscore.png">
        </div>`;
        guessLettersContainer.innerHTML += html;
    };

};
displayWord(lettersArray);

const letterButtons = document.querySelectorAll('.letter');

for(const btn of letterButtons){
    btn.addEventListener('click', function(){
        const letter = btn.textContent.toLowerCase();
        if(lettersArray.includes(letter)){
            btn.classList.add('hidden')
            const correctLetters = document.querySelectorAll(`.${letter}`);
            for(let l of correctLetters) l.classList.remove('hidden');
            state++;
        }else {
            btn.classList.add('hidden')
            score.textContent--;
            hangmanImg.src = `img/${score.textContent}.png`
        }
        if(score.textContent === '0'){
            title.textContent = 'YOU LOST!'
            game.classList.add('hidden');
        }
        if(state === lettersInWord.size){
            title.textContent = 'YOU WON!'
            game.classList.add('hidden');
        }
    })
    
}





