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

    //filter creates new array of just squares with empty strings (to find available squares) 
    const getAvailableSquares = () => board.filter(square => square.getSquareValue() === "");

    const addMarker = (marker, boardLocation, magicSum, setMagicSum) => {
        //checks if the board location is in the availableCells array and is free to place a marker onto
        //Each board index has a corresponding value that adds to each player's magicSum. 3 in a row sum up to 15 in any direction
        // For this configuration, 15 is the magic constant to reach
        if (getAvailableSquares().includes(board[boardLocation])) {
            board[boardLocation].addMarkerSelection(marker); 
            
            switch (boardLocation) {
                case 0:
                setMagicSum(magicSum + 2);
                    break;
                case 1:
                setMagicSum(magicSum + 7);
                    break;
                case 2:
                setMagicSum(magicSum + 6);
                    break;
                case 3:
                setMagicSum(magicSum + 9);
                    break;
                case 4:
                setMagicSum(magicSum + 5);
                    break;
                case 5:
                setMagicSum(magicSum + 1);
                    break;
                case 6:
                setMagicSum(magicSum + 4);
                    break;
                case 7:
                setMagicSum(magicSum + 3);
                    break;
                case 8:
                setMagicSum(magicSum + 8);
                    break;

            }
            console.log(`${marker} placed at square ${boardLocation}.`)
            return true;
        } else if (!getAvailableSquares().includes(board[boardLocation])) {
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

    return { addMarker, getAvailableSquares, printBoardToConsole };
})();


//HANDLES MOVES AND TURNS, AND CHECKS IF THEY ARE VALID
const Game = (() => {
    let turnCounter = 1;
    const magicConst = 15;
    let currentPlayer; 
    let playerOneName = "";
    let playerTwoName = "";

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

    while (playerOneName === "" || playerOneName.includes(" ")) {
        playerOneName = prompt(`Welcome to Tic-Tac-Toe! Enter a name for Player One:`);
    }
    while (playerTwoName === "" || playerTwoName.includes(" ")) {
        playerTwoName = prompt(`Welcome to Tic-Tac-Toe! Enter a name for Player Two:`);
    }
    const playerOne = createPlayer(playerOneName, "X", 0);
    const playerTwo = createPlayer(playerTwoName, "O", 0);
        
        //starting the game as Player One
        setCurrentPlayer(playerOne);

        const switchTurns = () => {
        console.log(`- Turn #${turnCounter} -`);
            if (getCurrentPlayer() === playerOne) {
                setCurrentPlayer(playerTwo);
            } 
            else if (getCurrentPlayer() === playerTwo) {
                setCurrentPlayer(playerOne);
            };
            console.log(`${getCurrentPlayer().playerName}'s turn...`)
        }

        const checkWinner = () => {
            if (playerOne.getMagicSum() === magicConst || playerTwo.getMagicSum() === magicConst) {
                return true;
            }
            else return false;
        
        }
        //if there are no available spaces, and no player has reached the magic const then game is a draw
        const checkDraw = () => {
            if (gameBoard.getAvailableSquares().length === 0 && (playerOne.getMagicSum() !== magicConst) && (playerTwo.getMagicSum() !== magicConst)) {
            return true;
        } 
        else return false;
    }
        
        const playRound = () => {
            //if there is a winner or a draw, stop playing rounds
            if (checkWinner() || checkDraw()) return;

            //print game title and blank board on the first turn
            if (turnCounter === 1) {
                console.log(`-- TIC-TAC-TOE --`);
                console.log(`Player One: ${playerOneName}`);
                console.log(`Player Two: ${playerTwoName}`);
                console.log(`- Turn ${turnCounter} -`)
                console.log(`${getCurrentPlayer().playerName}'s turn...`)
                gameBoard.printBoardToConsole(); 
            }
            
            const playerMove = prompt(`${getCurrentPlayer().playerName}, where do you want to place your marker? Use numbers 0 to 8, 0 being top left, and 8 being bottom right:`);
        
            //parse the string from the prompt to an integer so it can be used as a board location
            const boardLocation = parseInt(playerMove);
        
            //checking if the move is valid
            if (boardLocation >= 0 && boardLocation <= 8) {
            const validMarker = gameBoard.addMarker(
                getCurrentPlayer().markerType, 
                boardLocation,
                getCurrentPlayer().getMagicSum(),
                getCurrentPlayer().setMagicSum
                );

                if (validMarker) {
                gameBoard.printBoardToConsole();
                //checking for winner or draw before switching turns
                if (checkWinner()) {
                    console.log(`${getCurrentPlayer().playerName} wins the game. Congratulations!!`);
                    return;
                }
                if (checkDraw()) {
                    console.log(`Game is a draw.`);
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
        if (turnCounter === 1) {
            setTimeout(playRound, 1500);
        }
        playRound();
    }

    return { playRound, checkWinner, play }

})();

Game.play();