/**
 * Checks if a given coordinate is within the 8x8 board
 * @param {Number} i Row index
 * @param {Number} j Column index
 * @returns {Boolean} True if the coordinate is within the 8x8 board
 */
function isCoordinateInBounds(i, j) {
    return i >= 0 && i <= 7 && j >= 0 && j <= 7
}

/**
 * Converts a given coordinate to a checkers coordinate, i.e. 2,2 => B2
 * @param {Number} i Row index
 * @param {Number} j Column index
 * @returns {String} A checkers representation of a coordinate
 */
function coordinateToCheckersCoordinate(row, col) {
    let asciiNumOfA = 65
    return String.fromCharCode(asciiNumOfA + row) + (col + 1)
}

/**
 * Gets the opposite player
 * @param {Player} currentPlayerTurn An object of type Player
 * @returns The opposite player
 */
function getOpponentPlayer(currentPlayerTurn) {
    return currentPlayerTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
}

/**
 * Gets the piece in the board array from the given cell
 * @param {object} cell A <td> element
 * @returns {Piece} The piece in the corresponding coordinate of the cell
 */
function getPieceFromCell(cell) {
    return board[Math.floor(cell.id.slice(2) / BOARD_SIZE)][cell.id.slice(2) % BOARD_SIZE]
}

/**
 * Gets the cell in the DOM from the given piece
 * @param {Piece} piece The piece in the corresponding coordinate of the cell
 * @returns {object} The cell, a <td> element
 */
function getCellFromPiece(piece) {
    return document.querySelector("#td" + (piece.row * BOARD_SIZE + piece.col))
}

/**
 * Gets the cell in the DOM from the given coordinate
 * @param {Piece} piece The piece in the corresponding coordinate of the cell
 * @returns {object} The cell, a <td> element
 */
function getCellInCoordinate(i, j) {
    return table.rows[i].cells[j]
}
