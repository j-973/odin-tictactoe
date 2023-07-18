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


//HANDLES CREATION OF NEW PLAYERS, AND MANAGEMENT OF CURRENT PLAYER
const Player = (() => {
    //represents the player whose turn it is in the game
    let currentPlayer;

    //factory function for making new players
    const createPlayer = (playerName, markerType) => {
        return { playerName, markerType }
    }
    
    //these two functions allow the currentPlayer value to be retrieved, or assigned a new value, from other modules while keeping currentPlayer itself private 
    //helps keep code readable and organzied
    const getCurrentPlayer = () => currentPlayer;
    const setCurrentPlayer = (player) => currentPlayer = player;
    
    return { createPlayer, getCurrentPlayer, setCurrentPlayer }
})();
    
//HANDLES MOVES AND TURNS, AND CHECKS IF THEY ARE VALID
const Game = (() => {
    let turnCounter = 1; 

    const playerOne = Player.createPlayer("Player One", "X");
    const playerTwo = Player.createPlayer("Player Two", "O");
        
        //starting the game as Player One
        Player.setCurrentPlayer(playerOne);

        const switchTurns = () => {
            if (Player.getCurrentPlayer() === playerOne) {
                Player.setCurrentPlayer(playerTwo);
            } 
            else if (Player.getCurrentPlayer() === playerTwo) {
                Player.setCurrentPlayer(playerOne);
            };
        }

        const playRound = () => {
            const playerMove = prompt(`${Player.getCurrentPlayer().playerName}, where do you want to place your marker? Use numbers 0 to 8, 0 being top left, and 8 being bottom right:`);
        
            //parse the string from the prompt to an integer so it can be used as a board location
            const boardLocation = parseInt(playerMove);

            //checking if the move is valid
            if (boardLocation >= 0 && boardLocation <= 8) {
            validMarker = gameBoard.addMarker(Player.getCurrentPlayer().markerType, boardLocation);
                if (validMarker) {
                gameBoard.printBoardToConsole();
                turnCounter++
                switchTurns();
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