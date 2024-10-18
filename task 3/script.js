const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (index) => {
    if (gameState[index] !== '' || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    renderBoard();
    checkResult();
};

const renderBoard = () => {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
};

const checkResult = () => {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        message.innerText = 'It\'s a draw!';
        isGameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.innerText = '';
    renderBoard();
};

restartButton.addEventListener('click', restartGame);
renderBoard();
