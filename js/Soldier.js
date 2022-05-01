class Soldier extends Piece {
    constructor(row, col, type, color) {
        super(row, col, type, color)
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

    getPawnRelativeMoves() {
        let result = []
        let i = this.row + this.pawnDirectionFactor
        let j = this.col
        // Check if the next tile is empty
        if (isWithinBounds(i, j) && board[i][j].color === "e") {
            result.push([i, j])
            // If the pawn's on it's first move, check if the tile after the first one is empty
            if (this.isOnFirstMove && board[i + this.pawnDirectionFactor][j].color === "e") {
                result.push([i + this.pawnDirectionFactor, j])
            }
        }
        if (isWithinBounds(i, j + 1) && board[i][j + 1].color === this.opponentColor) {
            this.threatenThisPiece(board[i][j + 1])
            result.push([i, j + 1])
        }
        if (isWithinBounds(i, j - 1) && board[i][j - 1].color === this.opponentColor) {
            this.threatenThisPiece(board[i][j - 1])
            result.push([i, j - 1])
        }
        return result
    }

    threatenThisPiece(piece) {
        piece.threatend = true
        getCellFromPiece(piece).classList.add("threatend")
    }

    getMovesInDirection(result, i, j, rowDirection, colDirection) {
        i += rowDirection
        j += colDirection
        // If cell is in bounds
        if (isCoordinateInBounds(i, j)) {
            // If encountered an opponent piece
            if (board[i][j].color === this.opponentColor) {
                if (board[i + rowDirection][j + colDirection].type === EMPTY) {
                    this.threatenThisPiece(board[i][j])
                    result.push([i + rowDirection, j + colDirection])
                }
            }
            // If encountered an empty tile
            else if (board[i][j].color === "e") {
                result.push([i, j])
            }
            // If encountered an ally piece, maybe add somthing later
            else {
            }
        }
    }

    getSoldierRelativeMoves() {
        let result = []
        // First iteration calls for the relevant directions
        if (this.color === WHITE_PLAYER) {
            this.getMovesInDirection(result, this.row, this.col, 1, -1)
            this.getMovesInDirection(result, this.row, this.col, 1, 1)
        } else {
            this.getMovesInDirection(result, this.row, this.col, -1, 1)
            this.getMovesInDirection(result, this.row, this.col, -1, -1)
        }
        console.log(result)
        return result
    }
}
