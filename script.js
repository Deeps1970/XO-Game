const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

// initializing game variables

let player = 'X';
let isPauseGame = false;
let isGameStart = false;

// input condition array's

const inputCells = ['', '', '',
                    '', '', '',
                    '', '', ''];
                    
// win condition array

const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 4, 8], [2, 4, 6], //diagonals
    [0, 3, 6], [1, 4, 7], [2, 5, 8] //columns
];

// eventlistner 'click' to cells


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
}); 

function tapCell(cell, index) {
    if (cell.textContent === '' && !isPauseGame) {
        isGameStart = true;
        updateCell(cell, index);
        if (!checkWinner()) {
            changePlayer();  
            randomPick();
        };
    };
};

function updateCell(cell, index) {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player === 'X') ? '#1892ea' : '#a737ff'
};

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
};

function randomPick() {
    isPauseGame = true;
    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * inputCells.length)
        }
        while (
            inputCells[randomIndex] != ''
        );
        updateCell(cells[randomIndex], randomIndex, player);

        if (!checkWinner()) {
            changePlayer();
            isPauseGame = false
            return
        }
        player = (player === 'X') ? 'X' : 'O';
    }, 750)
};

function checkWinner() {
    for (const [a,b,c] of winCondition) {
        if (inputCells[a] === player && inputCells[b] === player && inputCells[c] === player
        ) {
            declareWinner([a, b, c]);
            return true;
        };
    };

    // Draw
    if (inputCells.every(cell => cell != '')) {
        declareDraw();
        return true;
    };
};

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Won!`
    isPauseGame = true;

    // highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#413972c8'
    );

    restartBtn.style.visibility = 'visible';
};

function declareDraw() {
    titleHeader.textContent = `Draw the Match!`;
    isPauseGame = true;
    restartBtn.style.visibility = 'visible';
};

function choosePlayer(selectedPlayer) {
    player = selectedPlayer;
    if (!isGameStart) {
        if (player === 'X') {
            // Highlight X dsiplay
            xPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.classList.remove('player-active');
        }
        else {
            // Highlight O display
            xPlayerDisplay.classList.remove('player-active');
            oPlayerDisplay.classList.add('player-active');
        }
    }
};

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';
    inputCells.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = '';
    });
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose Player'
});