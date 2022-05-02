class Soldier extends Piece {
    constructor(row, col, color) {
        super(row, col, SOLDIER, color)
        this.lastRow = this.color === WHITE ? BOARD_SIZE - 1 : 0
    }

    getPossibleMoves(board) {
        // Get relative moves
        let absoluteMoves = []
        // absoluteMoves = this.getKnightRelativeMoves()
        if (this.type === SOLDIER) {
            absoluteMoves = this.getSoldierRelativeMoves()
        } else {
            console.log("Unknown type", type)
        }
        return absoluteMoves
    }

    getMovesInDirection(result, i, j, rowDirection, colDirection) {
        i += rowDirection
        j += colDirection
        // If cell is in bounds
        if (isCoordinateInBounds(i, j)) {
            // If encountered an opponent piece
            if (board[i][j].color === this.opponentColor) {
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
            else if (board[i][j].color === "e") {
                result.push([i, j, MOVE])
                possibleCaptures.push()
            }
            // If encountered an ally piece, maybe add somthing later
            else {
            }
        }
    }

    getSoldierRelativeMoves() {
        let result = []
        // First iteration calls for the relevant directions
        if (this.color === WHITE) {
            this.getMovesInDirection(result, this.row, this.col, 1, -1)
            this.getMovesInDirection(result, this.row, this.col, 1, 1)
        } else {
            this.getMovesInDirection(result, this.row, this.col, -1, 1)
            this.getMovesInDirection(result, this.row, this.col, -1, -1)
        }
        return result
    }
}
