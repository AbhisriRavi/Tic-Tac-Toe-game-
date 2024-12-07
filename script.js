const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  }
};

const handleCellClick = (event) => {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
