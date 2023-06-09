const gameBoard = (() => {
    let board = ['O', 'O', 'X',
                'X', 'X', 'O', 
                'O', 'X', 'X'];

    //renders the contents of the board array to the webpage
    render = () => {
        let allSquares = document.querySelectorAll('.square');
        allSquares.forEach((square, index) => {
            square.textContent = board[index];
        });
    }
    return { render };
})();

//returning the render function as a property of the object returned by the gameBoard module (enclosing it in curly braces) 
//exposes the otherwise private render function to be accessed publicly outside of the gameBoard module"
gameBoard.render();