function isCoordinateInBounds(i, j) {
    return i >= 0 && i <= 7 && j >= 0 && j <= 7
}

function coordinateToCheckersCoordinate(row, col) {
    let asciiNumOfA = 65
    return String.fromCharCode(asciiNumOfA + row) + (col + 1)
}

function switchTurn() {
    currentPlayerTurn = currentPlayerTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
}

function getOpponentPlayer(currentPlayerTurn) {
    return currentPlayerTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
}
function getPieceFromCell(cell) {
    return board[Math.floor(cell.id.slice(2) / BOARD_SIZE)][cell.id.slice(2) % BOARD_SIZE]
}

function getCellFromPiece(piece) {
    return document.querySelector("#td" + (piece.row * BOARD_SIZE + piece.col))
}
function getCellInCoordinate(i, j) {
    return table.rows[i].cells[j]
}
