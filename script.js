"use strict"
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

        //Each board index has a corresponding value that adds to each player's magicSum. 3 in a row sum up to 15 in any direction
        // For this configuration, 15 is the magic constant to reach
        if (availableCells.includes(board[boardLocation])) {
            board[boardLocation].addMarkerSelection(marker);

            let currentPlayer = Player.getCurrentPlayer();
            let magicSum = currentPlayer.getMagicSum();
            switch (boardLocation) {
                case 0:
                currentPlayer.setMagicSum(magicSum + 2);
                    break;
                case 1:
                currentPlayer.setMagicSum(magicSum + 7);
                    break;
                case 2:
                currentPlayer.setMagicSum(magicSum + 6);
                    break;
                case 3:
                currentPlayer.setMagicSum(magicSum + 9);
                    break;
                case 4:
                currentPlayer.setMagicSum(magicSum + 5);
                    break;
                case 5:
                currentPlayer.setMagicSum(magicSum + 1);
                    break;
                case 6:
                currentPlayer.setMagicSum(magicSum + 4);
                    break;
                case 7:
                currentPlayer.setMagicSum(magicSum + 3);
                    break;
                case 8:
                currentPlayer.setMagicSum(magicSum + 8);
                    break;
            }

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
    const createPlayer = (playerName, markerType, magicSum) => {
        //retrieve or add to the magicSum of each individually created Player
        const getMagicSum = () => magicSum;
        const setMagicSum = (amount) => magicSum = amount;

        return { playerName, markerType, getMagicSum, setMagicSum }
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
    const magicConst = 15; 

    const playerOne = Player.createPlayer("Player One", "X", 0);
    const playerTwo = Player.createPlayer("Player Two", "O", 0);
        
        //starting the game as Player One
        Player.setCurrentPlayer(playerOne);

        const switchTurns = () => {
        console.log(`Turn #${turnCounter}...`);
            if (Player.getCurrentPlayer() === playerOne) {
                Player.setCurrentPlayer(playerTwo);
            } 
            else if (Player.getCurrentPlayer() === playerTwo) {
                Player.setCurrentPlayer(playerOne);
            };
        }

        //
        const checkWinner = () => {
            if (Player.getCurrentPlayer().getMagicSum() === magicConst) {
                return true;
            }
        else return false;
        
        }

        const playRound = () => {
            const playerMove = prompt(`${Player.getCurrentPlayer().playerName}, where do you want to place your marker? Use numbers 0 to 8, 0 being top left, and 8 being bottom right:`);
        
            //parse the string from the prompt to an integer so it can be used as a board location
            const boardLocation = parseInt(playerMove);
        
            //checking if the move is valid
            if (boardLocation >= 0 && boardLocation <= 8) {
            const validMarker = gameBoard.addMarker(Player.getCurrentPlayer().markerType, boardLocation);
                if (validMarker) {
                gameBoard.printBoardToConsole();
                //before switching turns, check for a winner
                if (checkWinner()) {
                    console.log(`${Player.getCurrentPlayer().playerName} wins the game!!`);
                    return;
                }
                turnCounter++
                switchTurns();
            } 
        } else {
            console.log("Number is out of range. Please choose a number between 0 and 8.")
        }
    
        setTimeout(playRound, 2000);
    }

    //playRound is a recursive function, calling itself indefinitely with a 2 second timeout delay after each round until a winner is found
    const play = () => {
        playRound();
    }

    return { playRound, checkWinner, play }

})();

Game.play();
