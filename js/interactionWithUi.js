/**
 * Creates a new piece image and displays it in the given cell
 * @param {object} cell The given cell
 * @param {String} type The type of the piece
 * @param {String} cellColor The color of the piece
 */
function drawPieceInit(cell, type, cellColor) {
    const pieceImg = document.createElement("img")
    pieceImg.className += "piece " + type
    pieceImg.src = "styles/imgs/pieces/" + cellColor + "_" + type + ".png"
    cell.appendChild(pieceImg)
}

/**
 * Moves a piece image to the given cell
 * @param {object} cell The given cell
 */
function drawPieceInCell(cell) {
    cell.appendChild(cellSelected.children[0])
}

/**
 * Removes a piece image from a given cell
 * @param {object} cell The given cell
 */
function erasePieceFromCell(cell) {
    cell.replaceChildren()
}

/**
 * Checks if the given cell is indeed a possible move
 * @param {object} emptyCell The given cell
 * @returns True if it is a possible move, false otherwise
 */
function isEmptyCellInPossibleMoves(emptyCell) {
    return [...emptyCell.classList].indexOf("possible-move") !== -1
}

/**
 * Checks if the clicked cell is a valid cell to empty
 * @param {Piece} pieceClicked The given piece to be moved
 * @param {object} cell The clicked cell
 * @returns
 */
function isValidCellDestination(pieceClicked, cell) {
    return (
        pieceClicked.color === EMPTY &&
        cellSelected !== undefined &&
        isEmptyCellInPossibleMoves(cell)
    )
}

/**
 * Removes all the possible moves and captures from the screen
 */
function removePossibleMovesAndCaptures() {
    possibleUnderThreats = []
    // Clear all previous possible moves and captures
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove("possible-move", "threatened")
            board[i][j].threatened = false
        }
    }
}

/**
 * Displays all the possible moves and captures of a selected piece
 * @param {object} possibleMoves An array that holds all the possible moves of a certain piece
 */
function showPossibleMovesAndCaptures(possibleMoves) {
    const realPossibleMoves = getAllPossibleMovesOfPlayer(currentPlayerTurn)
    // Show all possible moves
    for (const realPossibleMove of realPossibleMoves) {
        if (possibleMoves.toString() === realPossibleMove.toString()) {
            for (const possibleMove of possibleMoves) {
                const cell = getCellFromPiece(board[possibleMove[0]][possibleMove[1]])
                cell.classList.add("possible-move")
            }
        }
    }
    // Show all threatened pieces
    for (let possibleUnderThreat of possibleUnderThreats) {
        if (
            board[possibleUnderThreat[0]][possibleUnderThreat[1]].color !== currentPlayerTurn.color
        ) {
            const cell = getCellFromPiece(board[possibleUnderThreat[0]][possibleUnderThreat[1]])
            cell.classList.add("threatened")
        }
    }
}

/**
 * Selects a new given cell
 * @param {object} cell The given cell
 */
function selectCellClick(cell) {
    // Remove any previous selected cells and rest cellSelected
    if (cellSelected != undefined) {
        removeSelectedCell()
    }
    // Select the given cell and update cellSelected accordingly
    cellSelected = cell
    cell.classList.add("selected-cell")
}

/**
 * Removes the selected-cell html class from the current selected cell
 */
function removeSelectedCell() {
    cellSelected.classList.remove("selected-cell")
    cellSelected = undefined
}

/**
 * Updates the message box according to the event that happened
 * @param {String} event The event that happened
 * @param {Piece} piece1 The piece that the event is about, if there is such a piece
 * @param {Piece} piece2 a second piece that the event is about, if there is such a piece
 */
function updateMessageBox(event, piece1 = undefined, piece2 = undefined) {
    const messageBox = document.querySelector(".message-box")
    messageBox.innerText = ""
    messageBox.className = "message-box"
    // if the game is over
    if (event === "game over") {
        messageBox.innerText =
            "Congratulations! " +
            WINNER.color.slice(0, 1).toUpperCase() +
            WINNER.color.slice(1) +
            " player won!"
        messageBox.classList.add("message-box-game-over")
        // if a new queen was aquired
    } else if (event === "new queen") {
        messageBox.innerText =
            piece1.color.slice(0, 1).toUpperCase() +
            piece1.color.slice(1) +
            " player acquired a queen!"
        messageBox.classList.add("message-box-new-queen")
        // if a capture has been made
    } else if (event === "capture") {
        messageBox.innerText =
            piece1.color.slice(0, 1).toUpperCase() +
            piece1.color.slice(1) +
            " " +
            piece1.type +
            " captured " +
            piece2.color +
            " " +
            piece2.type +
            "!"
        messageBox.classList.add("message-box-capture")
        // if a move has been made
    } else if (event === "move") {
        messageBox.innerText =
            piece1.color.slice(0, 1).toUpperCase() +
            piece1.color.slice(1) +
            " " +
            piece1.type +
            " moved to " +
            coordinateToCheckersCoordinate(piece1.row, piece1.col)
    }
}
