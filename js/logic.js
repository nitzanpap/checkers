/**
 * Adds a new piece to the board array
 * @param {Number} i Row index
 * @param {Number} j Column index
 * @param {String} type the type of the piece
 * @param {String} color the color of the piece
 */
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

/**
 * Moves a piece in the board array to a new coordinate in the board array
 * @param {Number} rowFrom Row index to move the piece from
 * @param {Number} colFrom Column index to move the piece from
 * @param {Number} rowTo Row index to move the piece to
 * @param {Number} colTo Column index to move the piece to
 */
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

/**
 * Replaces the given piece with an empty one
 * @param {Piece} piece The given piece in the board array
 */
function removePieceFromBoardArray(piece) {
    board[piece.row][piece.col] = new Piece(piece.row, piece.col, EMPTY, EMPTY)
}

/**
 * Turns a Soldier piece to a queen
 * @param {Piece} piece The given piece
 */
function turnSoldierToQueen(piece) {
    const cell = getCellFromPiece(piece)
    erasePieceFromCell(cell)
    board[piece.row][piece.col] = new Queen(piece.row, piece.col, piece.color)
    drawPieceInit(getCellFromPiece(piece), QUEEN, piece.color)
}

/**
 * Returns the possible moves of all the pieces of the player
 * @param {Player} player The given player
 * @returns All the possible moves, or all the capturing moves available
 */
function getAllPossibleMovesOfPlayer(player) {
    let allPossibleMovesOfPlayer = []
    let allPossibleCaptureMovesOfPlayer = []
    for (let row of board) {
        for (let piece of row) {
            const piecePossibleMoves = piece.getPossibleMoves()
            if (piece.color === player.color && piecePossibleMoves.length != 0) {
                if (piecePossibleMoves[0][2] === CAPTURE)
                    allPossibleCaptureMovesOfPlayer.push(piecePossibleMoves)
                else allPossibleMovesOfPlayer.push(piecePossibleMoves)
            }
        }
    }
    // If there are capture moves available, return them instead of the regular moves
    return allPossibleCaptureMovesOfPlayer.length === 0
        ? allPossibleMovesOfPlayer
        : allPossibleCaptureMovesOfPlayer
}

/**
 * Get the piece that was captured
 * @param {Piece} previousPiece The captive piece
 * @param {Piece} currentPiece The capturing piece
 * @returns The piece that was captured
 */
function getCapturedPieceBetween(previousPiece, currentPiece) {
    let capturedRow =
        previousPiece.row < currentPiece.row ? currentPiece.row - 1 : currentPiece.row + 1
    let capturedCol =
        previousPiece.col < currentPiece.col ? currentPiece.col - 1 : currentPiece.col + 1
    return board[capturedRow][capturedCol]
}
