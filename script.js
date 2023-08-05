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

    //Map the board array to a new array containing just the values of the board squares
    const getBoardValues = () => board.map(square => square.getSquareValue());
    
    //filter creates new array of just squares with empty strings (to find available squares) 
    const getAvailableSquares = () => board.filter(square => square.getSquareValue() === "");

    const addMarker = (marker, boardLocation) => {
        //checks if the board location is in the availableCells array and is free to place a marker onto
        if (getAvailableSquares().includes(board[boardLocation])) {
            board[boardLocation].addMarkerSelection(marker); 
            console.log(`${marker} placed at square ${boardLocation}.`)
            return true;
        } else if (!getAvailableSquares().includes(board[boardLocation])) {
            console.log(`Square ${boardLocation} is already taken. Please choose a different square.`);
            return false;
        } 
    }

    const printBoardToConsole = () => {
        //Format the board values as a string, breaking them up and setting a new line to make tic-tac-toe grid squares
        //i increments by 3 to add one row of the 3-by-3 grid to the formatted output at a time, starting from an empty string
        let formattedBoard = "";
        for (let i = 0; i < numOfSquares; i += 3) {
            formattedBoard += `${getBoardValues()[i]} | ${getBoardValues()[i + 1]} | ${getBoardValues()[i + 2]}\n`;
        }
    
        console.log(formattedBoard);
    };

    return { addMarker, getBoardValues, getAvailableSquares, printBoardToConsole };
})();

//HANDLES MOVES AND TURNS, AND CHECKS IF THEY ARE VALID
const Game = (() => {
    let turnCounter = 1;
    let currentPlayer; 
    let playerOneName = "";
    let playerTwoName = "";

        //factory function for making new players
        const createPlayer = (playerName, markerType) => {
            return { playerName, markerType }
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
            const boardValues = gameBoard.getBoardValues();
            const winCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],

                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],

                [0, 4, 8],
                [6, 4, 2]
            ];
            for (let i = 0; i < winCombos.length; i++) {
                //iterating through each sub-array of horizontal, vertical, and diagonal winning combos
                const a = winCombos[i][0];
                const b = winCombos[i][1];
                const c = winCombos[i][2];

                //checking to see if the same marker is 3 in a row -- a, b, and c
                if (boardValues[a] && boardValues[a] === boardValues[b] && boardValues[a] === boardValues[c]) {
                    return true;
                }
            }
            return false;
        }
    
        //if there are no available spaces, and no player has won, then game is a draw
        const checkDraw = () => {
            if (gameBoard.getAvailableSquares().length === 0 && !checkWinner()) {
            return true;
        } 
        else return false;
    }
        
        const playRound = (playerMove) => {
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
            
            //parse the string from the prompt to an integer so it can be used as a board location
            const boardLocation = parseInt(playerMove);
        
            //checking if the move is valid
            if (boardLocation >= 0 && boardLocation <= 8) {
            const validMarker = gameBoard.addMarker(getCurrentPlayer().markerType, boardLocation);
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
    
    }

    //playRound is a recursive function, calling itself indefinitely with a 2 second timeout delay after each round until a winner is found
    const play = () => {
        if (turnCounter === 1) {
            setTimeout(playRound, 1500);
        }
        playRound();
    }

    return { getCurrentPlayer, setCurrentPlayer, checkWinner, checkDraw, playRound, play }
})();

//HANDLES THE GRAPHICAL USER INTERFACE AND UPDATING THE SCREEN
const displayController = (() => {
    const divTurn = document.querySelector('#player-turns');
    const divBoard = document.querySelector('#game-board');
    const divGameOver = document.querySelector(`#game-over`);

    const clearScreen = () => {
        divTurn.textContent = "";
        divBoard.textContent = "";
        divGameOver.textContent = "";
    }

    const updateScreen = () => {
      //clears the board and shows the most recent turn
      clearScreen();
      divTurn.textContent = `${Game.getCurrentPlayer().playerName}'s turn...`

      if (Game.checkWinner()) {
        clearScreen();
        divGameOver.textContent = `${Game.getCurrentPlayer().playerName} wins the game. Congratulations!!`;
        return;
    }
    if (Game.checkDraw()) {
        clearScreen();
        divGameOver.textContent = `Game is a draw.`;
        return;
    }

    //renders the contents of the board array to the webpage
    //Using data attribute to associate each square with the corresponding board button for clicking
        gameBoard.getBoardValues().forEach((currentValue, index) => {
              const btnSquare = document.createElement("button");

              btnSquare.classList.add("square");
              btnSquare.dataset.square = index; 

              btnSquare.textContent = currentValue;

              divBoard.appendChild(btnSquare);
          })
        }

    //Handler to place moves/markers for each round wherever the player clicks
    const handleBoardClicks = (ev) => {
      const playerMove = ev.target.dataset.square;
      
      //if the blank space around the board squares is clicked, don't make a move
      if (!playerMove) return;
      
      Game.playRound(playerMove);
      updateScreen();
    }

    divBoard.addEventListener("click", handleBoardClicks);

    //intially rendering the screen
    updateScreen();
    
})();