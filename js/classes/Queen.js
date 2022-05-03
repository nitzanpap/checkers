class Queen extends Piece {
    constructor(row, col, color) {
        super(row, col, QUEEN, color)
    }

    getPossibleMoves(board) {
        let absoluteMoves = []
        let capturingMoves = []
        if (this.type === QUEEN) {
            absoluteMoves = this.getQueenRelativeMoves()
        } else {
            console.log("Unknown type", type)
        }
        // TODO: When this works, make sure to incorporate it in Queen class as well.
        for (let absoluteMove of absoluteMoves) {
            if (absoluteMove[2] === CAPTURE) {
                capturingMoves.push(absoluteMove)
            }
        }
        return capturingMoves.length !== 0 ? capturingMoves : absoluteMoves
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
                    possibleUnderThreats.push([i, j, THREATENEND])
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
