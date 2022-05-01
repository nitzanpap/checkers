function drawPieceInit(cell, type, cellColor) {
    const piece = document.createElement("img")
    piece.className += "piece " + type
    piece.src = "styles/imgs/pieces/" + cellColor + "_" + type + ".png"
    cell.appendChild(piece)
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
        board[i][j] = new Soldier(i, j, type, color)
    } else if (type === KING) {
        board[i][j] = new King(i, j, type, color)
    }
}

function updateMessageBox(event, piece1, piece2 = undefined) {
    messageBox.innerText = ""
    messageBox.className = "message-box"
    if (event === "capture") {
        messageBox.innerText =
            piece1.color + " " + piece1.type + " Captured " + piece2.color + " " + piece2.type + "!"
        messageBox.classList.add("message-box-capture")
    } else if (event === "move") {
        messageBox.innerText =
            piece1.color +
            " " +
            piece1.type +
            " moved to " +
            coordinateToCheckersCoordinate(piece1.row, piece1.col)
    }
    if (event === "new king") {
        messageBox.innerText = piece1.color + " player aquired a king!"
        messageBox.classList.add("message-box-check")
    }
    if (event === "game-over") {
        messageBox.innerText = "Congratulations! " + piece1.color + " player Won!"
        messageBox.classList.add("message-box-checkmate")
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
    currentColorTurn = currentColorTurn === "white" ? "black" : "white"
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
    board[rowTo][colTo].setRowAndColumn(rowTo, colTo)
}

function movePiece(piece, rowTo, colTo) {
    // Move piece in the board array
    updatedBoardPieceLocation(piece.row, piece.col, rowTo, colTo)
    // Draw piece in it's location according to its data
    drawPieceInCell(getCellFromPiece(piece))
}
