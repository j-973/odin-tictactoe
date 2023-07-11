const gameBoard = (() => {
    let board = ['O', 'O', 'X',
                'X', 'X', 'O', 
                'O', 'X', 'X'];

    //renders the contents of the board array to the webpage
    const render = () => {
        let allSquares = document.querySelectorAll('.square');
        allSquares.forEach((square, index) => {
            square.textContent = board[index];
        });
    }

    const clear = () => {
        board = ['', '', '', 
                '', '', '',
                '', '', ''];
    }

    return { render, clear };
})();

const game = (() => {
    const start = () => {
        gameBoard.clear();
    }

return { start }
})();

game.start();