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

    //if the game board array's location is empty, assign a marker to that board index
    //since board is an array, location corresponds to the index num of board (0 - 8 for this board with 9 spaces)
    const addMarker = (marker, boardLocation) => {
        if (board[boardLocation] === "") {
            board[boardLocation] = marker;
        }
    }

    return { render, clear, addMarker };
})();

//testing addMarker function by adding an X in the center of the gameboard
const game = (() => {
    const start = () => {
        gameBoard.clear();
        gameBoard.addMarker("X", 4);
        gameBoard.render();
    }

return { start }
})();

game.start();


