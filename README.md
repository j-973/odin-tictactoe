# odin-tictactoe
## Description
The classic game of tic-tac toe, in your browser!

Left-click to place your marker.

My iteration of this project adheres to the guidelines set out by the maintainers of **The Odin Project**, a self-paced curriculum for learning web development (links at the bottom).

**Why did I complete this project?:** To demonstrate my understanding of factory functions and the module pattern in JavaScript.
## Preview
![screencapture-j-973-github-io-odin-tictactoe-2023-08-28-22_50_06](https://github.com/j-973/odin-tictactoe/assets/47262509/01f7a515-8617-4196-a9eb-99ea6e9b8c01)
![screencapture-j-973-github-io-odin-tictactoe-2023-08-28-22_53_10](https://github.com/j-973/odin-tictactoe/assets/47262509/4fd1d957-9d8e-4145-bc8d-7af8f21afd92)
## Launching this Project
- Click here to run it in your browser: https://j-973.github.io/odin-tictactoe/
## What I Learned
- **Factory functions** return objects, and are ideal when you need to create many instances of an object with the same capabilities (same inner functions). 
- The **module pattern** refers to the creation and implementation of modules, which hide or make private (encapsulate) certain data.
    - Modules are a good way to organize your code into discrete categories, which also makes it easier to maintain.
    - One commonly used part of the module pattern is the **IIFE (Immediately Invoked Function Expression)**. 
        - Example syntax: `const myModule = (() => {
                                            //Your code here
                                        })();`
        - "Immediately invoked" refers to the set of parentheses `()` placed after the closing curly brace of a function. IIFEs immediately run after the function is defined.
    - For example, the `gameBoard` module handles adding Xs and Os to the game board. Public functions like `addMarker` are used later in the separate `Game` module to determine valid moves. Other functions, like `square()` used to create and return the base squares of the game board, remain private, since they are not needed outside of the `gameBoard` module.   
- **Scope & Private Variables**: everything within a function or module is private (i.e. not accessible outside of the function) unless it is explicity exposed with `return` and curly braces specifying the properties or functions to return as an object.
    - Implementing strict mode by starting any .js file with `"use strict"` prevents the use of undeclared variables, which helps keep variables from being unintentionally globally scoped.
### Sources
- Odin Project Full Stack JavaScript Path: https://www.theodinproject.com/paths/full-stack-javascript/
  - Odin Project "Intermediate" HTML and CSS Course: https://www.theodinproject.com/paths/full-stack-javascript/courses/intermediate-html-and-css
- Project Instructions: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe
