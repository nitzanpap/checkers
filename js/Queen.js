class Queen extends Piece {
    constructor(row, col, color) {
        super(row, col, QUEEN, color)
    }

    getPossibleMoves(board) {
        let absoluteMoves = []
        if (this.type === QUEEN) {
            absoluteMoves = this.getQueenRelativeMoves()
        } else {
            console.log("Unknown type", type)
        }
        return absoluteMoves
    }

    getMovesInDirection(result, i, j, rowDirection, colDirection, encounteredOpponent) {
        i += rowDirection
        j += colDirection
        // If cell is in bounds
        if (isCoordinateInBounds(i, j)) {
            // If encountered an opponent piece
            if (board[i][j].color === this.opponentColor) {
                encounteredOpponent = true
                if (
                    isCoordinateInBounds(i + rowDirection, j + colDirection) &&
                    board[i + rowDirection][j + colDirection].type === EMPTY
                ) {
                    this.threatenThisPiece(board[i][j])
                    result.push([i + rowDirection, j + colDirection, CAPTURE])
                    possibleCaptures.push([i + rowDirection, j + colDirection])
                }
            }
            // If encountered an empty tile
            else if (board[i][j].color === "e" && !encounteredOpponent) {
                result.push([i, j, MOVE])
                this.getMovesInDirection(
                    result,
                    i,
                    j,
                    rowDirection,
                    colDirection,
                    encounteredOpponent
                )
            }
            // If encountered an ally piece, maybe add somthing later
            else {
            }
        }
    }

    getQueenRelativeMoves() {
        let result = []
        this.getMovesInDirection(result, this.row, this.col, 1, 1, false)
        this.getMovesInDirection(result, this.row, this.col, -1, -1, false)
        this.getMovesInDirection(result, this.row, this.col, 1, -1, false)
        this.getMovesInDirection(result, this.row, this.col, -1, 1, false)
        return result
    }
}
