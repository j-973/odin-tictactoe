//HOLDS LOGIC OF THE STATE OF THE GAME BOARD, AND HOW IT GETS PRINTED TO THE BROWSER CONSOLE
const gameBoard = (() => {
    const numOfSquares = 9;
    const board = [];
    

    //1 dimensional array represenation of 3 by 3 grid is 9 squares total
    //for each board index, make a square

    //"" empty string means empty square, no selection made yet
    function square() {
        let squareValue = "";

        //the square is assigned the value of what player selects
        const addMarkerSelection = (selection) => {
            squareValue = selection;
        }

        //returns the current value of squareValue for other functions that need it for filtering or printing to console
        //would be an empty string (no selection), an X, or an O.  
        const getSquareValue = () => squareValue;

        return { addMarkerSelection, getSquareValue }
    }

    for (let i = 0; i < numOfSquares; i++) {
        board[i] = square();
    }

    const addMarker = (marker, boardLocation) => {
        //filter creates new array of just squares with empty strings (to find available squares) 
        const availableCells = board.filter(square => square.getSquareValue() === "");
    
        //checks if the board location is in the availableCells array and is free to place a marker onto 
        if (availableCells.includes(board[boardLocation])) {
            board[boardLocation].addMarkerSelection(marker);
            return true;
        } else {
            console.log(`Square ${boardLocation} is already taken. Please choose a different square.`);
            return false;
        }
    }

    const printBoardToConsole = () => {
        //Map the board array to a new array containing just the values of the board squares
        const boardValues = board.map(square => square.getSquareValue());

        //Format the board values as a string, breaking them up and setting a new line to make tic-tac-toe grid columns
        //i increments by 3 to add one row of the 3-by-3 grid to the formatted output at a time, starting from an empty string
        let formattedBoard = "";
        for (let i = 0; i < numOfSquares; i += 3) {
            formattedBoard += `${boardValues[i]} | ${boardValues[i + 1]} | ${boardValues[i + 2]}\n`;
        }
    
        console.log(formattedBoard);
    };

    return { addMarker, printBoardToConsole };
})();


//HANDLES MOVES, AND CHECKS IF THEY ARE VALID
const Game = (() => {
    let turnCounter = 1; 
        const playRound = () => {
            const marker = "X";
            const playerMove = prompt(`Where do you want to place your marker? Use numbers 0 to 8, 0 being top left, and 8 being bottom right:`);
        
            //parse the string from the prompt to an integer so it can be used as a board location
            const boardLocation = parseInt(playerMove);

            //checking if the move is valid
            if (boardLocation >= 0 && boardLocation <= 8) {
            validMarker = gameBoard.addMarker(marker, boardLocation);
                if (validMarker) {
                gameBoard.printBoardToConsole();
                turnCounter++
            } 
        } else {
            console.log("Number is out of range. Please choose a number between 0 and 8.")
        }
    }
    
    //recursive function - calls itself after calling a round, so that it indefinitely calls more rounds to play.
    const play = () => {
        playRound();
        console.log(`Turn #${turnCounter}...`);
        setTimeout(play, 2000);
        
    }
        return { playRound, play }
}
    
)();


Game.play();