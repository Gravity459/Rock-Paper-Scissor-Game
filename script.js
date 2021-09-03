
// initializing the global variables
// scores of the player and the computer set to 0
let player = 0;
let computer = 0;

// flag for starting the game
let started = 0;

// for selecting the start and finish buttons
const start = document.querySelector('#start');
const end = document.querySelector('#end');

main();

function main() {

    // adding an event listener to the start button
    start.addEventListener('click', startBtn);

    // adding the event listener 
    end.addEventListener('click', endBtn);
}

function startBtn()
{
    // additional exception handling
    if (!started) {

        // changing the flag to 1 as the game is in playing state
        started = 1;
        const mainHeading = document.querySelector('#welcome-header');
        mainHeading.classList.remove('colors');

        // setting up the click listeners for the options
        startGame();
    }

    else {
        alert('The game is already in play!!!');
    }
}

function endBtn()
{
    // additional check whether the game is currently in play or not
    if (!started) {
        alert('The game is not in play!!!');
        return;
    }
    else {
        // changing the flag to 0 since the game has now ended
        started = 0;

        const heading2 = document.querySelector('#start-heading');

        heading2.classList.add('colors');

        if (player > computer) {
            heading2.innerHTML = '<h2>GAME ENDED! The player has won!</h2>';
        }
        else if (player < computer) {
            heading2.innerHTML = '<h2>GAME ENDED! The Computer has won!</h2>';
        }
        else {
            heading2.innerHTML = '<h2>GAME ENDED IN A DRAW!</h2>';
        }
        
        endGame();
    }
}

function startGame() {
    const heading2 = document.querySelector('#start-heading');
    heading2.innerHTML = '<h2>GAME STARTED! Choose your option!</h2>';

    const rock = document.querySelector('.rock');
    rock.addEventListener('click', rockFunc);

    const paper = document.querySelector('.paper');
    paper.addEventListener('click', paperFunc);

    const scissors = document.querySelector('.scissors');
    scissors.addEventListener('click', scissorFunc);
}

function endGame() {
    const rock = document.querySelector('.rock');
    rock.removeEventListener('click', rockFunc);

    const paper = document.querySelector('.paper');
    paper.removeEventListener('click', paperFunc);

    const scissors = document.querySelector('.scissors');
    scissors.removeEventListener('click', scissorFunc);

    player = 0;
    computer = 0;
    
    // Delaying the window restart time to control the flow
    setTimeout(() => alert("Press OK to reload the page"), 1000);
    setTimeout(() => location.reload(), 1000);
}

function rockFunc() {
    let compSelection = computerPlay();
    let result = playRound('Rock', compSelection)

    resultEvaluate(result);
}

function paperFunc() {
    let compSelection = computerPlay();
    let result = playRound('Paper', compSelection)

    resultEvaluate(result);
}

function scissorFunc() {
    let compSelection = computerPlay();
    let result = playRound('Scissors', compSelection)

    resultEvaluate(result);
}

// evaluating the result whether the computer or the player won
function resultEvaluate(result) {
    if (result == 1) {
        computer++;
        const comp = document.querySelector('#comp-score');
        comp.innerHTML = `<h3>${computer}</h3>`;
    }
    else if (result == 0) {
        player++;
        const play = document.querySelector('#play-score');
        play.innerHTML = `<h3>${player}</h3>`;
    }
}

// to randomize the selection of computer
function computerPlay() {

    let list = ['Rock', 'Paper', 'Scissors'];

    let randomNumber = Math.floor(Math.random() * 3);
    let selection = list[randomNumber];

    return selection;
}


// contains all the winning combinations of both parties
function playRound(playerSelection, computerSelection) {

    const playerOpt = document.querySelector('#player-selection');
    playerOpt.textContent = playerSelection;

    const computerOpt = document.querySelector('#computer-selection');
    computerOpt.textContent = computerSelection;

    let result;
    let resultStr = '';

    if (playerSelection == 'Rock' && computerSelection == 'Paper') {
        result = 1;
        resultStr = 'You Lose! Paper beats Rock';
    }
    else if (playerSelection == 'Paper' && computerSelection == 'Scissors') {
        result = 1;
        resultStr = 'You Lose! Scissors beats Paper';
    }
    else if (playerSelection == 'Scissors' && computerSelection == 'Rock') {
        result = 1;
        resultStr = 'You Lose! Rock beats Scissors';
    }

    else if (computerSelection == 'Rock' && playerSelection == 'Paper') {
        result = 0;
        resultStr = 'You WIN! Paper beats Rock';
    }
    else if (computerSelection == 'Paper' && playerSelection == 'Scissors') {
        result = 0;
        resultStr = 'You WIN! Scissors beats Paper';
    }
    else if (computerSelection == 'Scissors' && playerSelection == 'Rock') {
        result = 0;
        resultStr = 'You WIN! Rock beats Scissors';
    }
    else if (computerSelection == playerSelection) {
        result = 2;
        resultStr = 'Its a draw bois';
    }

    const resultHeader = document.querySelector('#result');
    resultHeader.innerText = resultStr;

    return result;
}

