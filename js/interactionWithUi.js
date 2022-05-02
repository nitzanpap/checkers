function drawPieceInit(cell, type, cellColor) {
    const pieceImg = document.createElement("img")
    pieceImg.className += "piece " + type
    pieceImg.src = "styles/imgs/pieces/" + cellColor + "_" + type + ".png"
    cell.appendChild(pieceImg)
}

function drawPieceInCell(cell) {
    cell.appendChild(cellSelected.children[0])
}

function erasePieceFromCell(cell) {
    cell.replaceChildren()
}

function isEmptyCellInPossibleMoves(emptyCell) {
    return [...emptyCell.classList].indexOf("possible-move") !== -1
}

function isValidCellDestination(pieceClicked, cell) {
    return (
        pieceClicked.color === EMPTY &&
        cellSelected !== undefined &&
        isEmptyCellInPossibleMoves(cell)
    )
}

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

function showPossibleMovesAndCaptures(possibleMoves) {
    // Show all possible moves
    for (let possibleMove of possibleMoves) {
        const cell = getCellFromPiece(board[possibleMove[0]][possibleMove[1]])
        cell.classList.add("possible-move")
    }
    // Show all possible captures
    for (let possibleUnderThreat of possibleUnderThreats) {
        if (possibleUnderThreat[2] === THREATENEND) {
            const cell = getCellFromPiece(board[possibleUnderThreat[0]][possibleUnderThreat[1]])
            cell.classList.add("threatened")
        }
    }
}

function selectCellClick(cell) {
    // Remove any previous selected cells and rest cellSelected
    if (cellSelected != undefined) {
        removeSelectedCell()
    }
    // Select the given cell and update cellSelected accordingly
    cellSelected = cell
    cell.classList.add("selected-cell")
}

function removeSelectedCell() {
    cellSelected.classList.remove("selected-cell")
    cellSelected = undefined
}

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
