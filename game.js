let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gamesno = 0; 
let xWins = 0;
let oWins = 0; 

const cells = document.querySelectorAll('.cell');
const games = document.getElementById('gno');
const xDisplay = document.getElementById('xWins');
const oDisplay = document.getElementById('oWins');
const result = document.getElementById('result');
const xwin = document.getElementById('xwin');
const owin = document.getElementById('owin');

function startGame() {
    xwin.style.backgroundColor = '#f2b237';
    owin.style.backgroundColor = '';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('colo','x-player','o-player');
        cell.style.removeProperty("background-color");
    });
    currentPlayer = 'X';
    result.style.visibility = 'hidden';
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.remove('x-player', 'o-player');
        if (currentPlayer === 'X') {
            event.target.classList.add('x-player');
        } else {
            event.target.classList.add('o-player');
        }

        changeturn();
        event.target.classList.add('colo');

    
        if (checkWinner()){
            updateScore(currentPlayer);
            result.textContent = `${currentPlayer} wins!`;
            result.style.visibility = 'visible';
            updateCompletion();
            setTimeout(startGame, 3000); 
        } else if (gameBoard.every(cell => cell !== '')) {
            result.textContent = "It's a draw!";
            result.style.visibility = 'visible'; 
            updateCompletion();
            setTimeout(startGame, 3000); 
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
    
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].style.backgroundColor = '#81a8c5'; 
            cells[b].style.backgroundColor = '#81a8c5'; 
            cells[c].style.backgroundColor = '#81a8c5';
            return combination;
        }
    }
    return null;
}


function updateScore(winner) {
    if (winner === 'X') {
        xWins++;
    } else {
        oWins++;
    }
    xDisplay.textContent = xWins;
    oDisplay.textContent = oWins;
}

function updateCompletion() {
    gamesno++;
    games.textContent = gamesno;
}


function changeturn() {
    xwin.style.backgroundColor = '';
    owin.style.backgroundColor = '';
    if(currentPlayer == 'X')
    {
        owin.style.backgroundColor = '#31c4be';
        
    }
    else
    {
        xwin.style.backgroundColor = '#f2b237';
    }
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));

startGame();
