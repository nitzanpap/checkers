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

function removePieceFromBoardArray(piece) {
    board[piece.row][piece.col] = new Piece(piece.row, piece.col, EMPTY, EMPTY)
}

function turnSoldierToQueen(piece) {
    const cell = getCellFromPiece(piece)
    erasePieceFromCell(cell)
    board[piece.row][piece.col] = new Queen(piece.row, piece.col, piece.color)
    drawPieceInit(getCellFromPiece(piece), QUEEN, piece.color)
}

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
    return allPossibleCaptureMovesOfPlayer.length === 0
        ? allPossibleMovesOfPlayer
        : allPossibleCaptureMovesOfPlayer
}

function getCapturedPieceBetween(previousPiece, currentPiece) {
    let capturedRow =
        previousPiece.row < currentPiece.row ? currentPiece.row - 1 : currentPiece.row + 1
    let capturedCol =
        previousPiece.col < currentPiece.col ? currentPiece.col - 1 : currentPiece.col + 1
    return board[capturedRow][capturedCol]
}
