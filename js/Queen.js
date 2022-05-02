class Queen extends Piece {
    constructor(row, col, color) {
        super(row, col, QUEEN, color)
    }

    getPossibleMoves(board) {
        // Get relative moves
        let absoluteMoves = []
        // absoluteMoves = this.getKnightRelativeMoves()
        if (this.type === QUEEN) {
            absoluteMoves = this.getQueenRelativeMoves()
        } else {
            console.log("Unknown type", type)
        }
        return absoluteMoves
    }

    getMovesInDirection(result, i, j, rowDirection, colDirection, optionalIterLimit = -1) {
        // If optionalIterLimit has been given a value, then only run this recursive function that
        // many times.
        if (optionalIterLimit != 0) {
            i += rowDirection
            j += colDirection
            // If cell is out of bounds
            if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
                // If encountered an empty cell
                if (board[i][j].color === "e") {
                    result.push([i, j])
                    this.getMovesInDirection(
                        result,
                        i + rowDirection,
                        j + colDirection,
                        rowDirection,
                        colDirection,
                        optionalIterLimit - 1
                    )
                }
                // If encountered an opponent piece
                else if (board[i][j].color !== this.color) {
                    result.push([i, j])
                    this.threatenThisPiece(board[i][j])
                }
                // If encountered an ally piece, maybe add somthing later
                else {
                }
            }
        }
    }

    getQueenRelativeMoves() {
        let result = []
        this.getMovesInDirection(result, this.row, this.col, 1, 1)
        this.getMovesInDirection(result, this.row, this.col, -1, -1)
        this.getMovesInDirection(result, this.row, this.col, 1, -1)
        this.getMovesInDirection(result, this.row, this.col, -1, 1)
        return result
    }
}
