function drawPieceInit(cell, type, cellColor) {
    const pieceImg = document.createElement("img")
    pieceImg.className += "piece " + type
    pieceImg.src = "styles/imgs/pieces/" + cellColor + "_" + type + ".png"
    cell.appendChild(pieceImg)
}

function drawPieceInCell(cell) {
    cell.appendChild(cellSelected.children[0])
}

function isCoordinateInBounds(i, j) {
    return i >= 0 && i <= 7 && j >= 0 && j <= 7
}

function coordinateToCheckersCoordinate(row, col) {
    return String.fromCharCode(ASCII_NUM_OF_A + row) + (col + 1)
}

function getPieceFromCell(cell) {
    return board[Math.floor(cell.id.slice(2) / 8)][cell.id.slice(2) % 8]
}

function getCellFromPiece(piece) {
    return document.querySelector("#td" + (piece.row * 8 + piece.col))
}

function getPieceFromTypeAndColor(type, color) {
    for (let row of board) {
        for (let piece of row) {
            if (piece.type === type && piece.color === color) return piece
        }
    }
}

function addNewPieceToBoardArray(i, j, type, color) {
    if (type === ILLEGAL) {
        board[i][j] = new Piece(i, j, type, color)
    } else if (type === EMPTY) {
        board[i][j] = new Piece(i, j, type, color)
    } else if (type === SOLDIER) {
        board[i][j] = new Soldier(i, j, color)
    } else if (type === QUEEN) {
        board[i][j] = new Queen(i, j, color)
    }
}

function updateMessageBox(event, piece1 = undefined, piece2 = undefined) {
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

function showPossibleMoves(possibleMoves) {
    // Clear all previous possible moves
    for (let possibleMove of possibleMoves) {
        const cell = getCellFromPiece(board[possibleMove[0]][possibleMove[1]])
        cell.classList.add("possible-move")
    }
}

function removePossibleMoves() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove("possible-move")
            table.rows[i].cells[j].classList.remove("threatend")
            board[i][j].threatend = false
        }
    }
}

function switchTurn() {
    if (currentPlayerTurn === WHITE_PLAYER) {
        WHITE_PLAYER.isItThisPlayerTurn = false
        BLACK_PLAYER.isItThisPlayerTurn = true
        currentPlayerTurn = BLACK_PLAYER
    } else {
        WHITE_PLAYER.isItThisPlayerTurn = true
        BLACK_PLAYER.isItThisPlayerTurn = false
        currentPlayerTurn = WHITE_PLAYER
    }
    opponentPlayer = currentPlayerTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
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

function updatedBoardPieceLocation(rowFrom, colFrom, rowTo, colTo) {
    board[rowTo][colTo] = board[rowFrom][colFrom]
    board[rowFrom][colFrom] = new Piece(Number(rowFrom), Number(colFrom), EMPTY, EMPTY)
    let piece = board[rowTo][colTo]
    piece.setRowAndColumn(rowTo, colTo)
}

function movePiece(piece, rowTo, colTo) {
    // Move piece in the board array
    updatedBoardPieceLocation(piece.row, piece.col, rowTo, colTo)
    // Draw piece in its location according to its data
    drawPieceInCell(getCellFromPiece(piece))
}

function getCapturedPieceBetween(previousPiece, currentPiece) {
    let capturedRow =
        previousPiece.row < currentPiece.row ? currentPiece.row - 1 : currentPiece.row + 1
    let capturedCol =
        previousPiece.col < currentPiece.col ? currentPiece.col - 1 : currentPiece.col + 1
    return board[capturedRow][capturedCol]
}

// TODO: Decide if this function is necessary. If so, incorporate it in the code.
function clearPossibleCaptures() {
    possibleCaptures = []
}

function erasePieceFromCell(cell) {
    cell.removeChild(cell.children[0])
}

function removePieceFromBoardArray(piece) {
    board[piece.row][piece.col] = new Piece(piece.row, piece.col, EMPTY, EMPTY)
}

function getAllPossibleMovesOfPlayer(player) {
    let allPossibleMovesOfPlayer = []
    for (let row of board) {
        for (let piece of row) {
            if (piece.color === player.color) allPossibleMovesOfPlayer += piece.getPossibleMoves()
        }
    }
    return allPossibleMovesOfPlayer
}

function turnSoldierToQueen(piece) {
    const cell = getCellFromPiece(piece)
    cell.replaceChildren()
    board[piece.row][piece.col] = new Queen(piece.row, piece.col, piece.color)
    drawPieceInit(getCellFromPiece(piece), QUEEN, piece.color)
}
