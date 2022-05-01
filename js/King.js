class King extends Piece {
    constructor(row, col, type, color) {
        super(row, col, type, color)
    }

    getPossibleMoves(board) {
        // Get relative moves
        let absoluteMoves = []
        // absoluteMoves = this.getKnightRelativeMoves()
        if (this.type === KING) {
            absoluteMoves = this.getKingRelativeMoves()
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
        getTileFromPiece(piece).classList.add("threatend")
        if (piece.type === KING) piece.inCheck = true
    }

    // TODO: Refactor this function so it can receive the initial piece's coordinate, and adds to it according to the direction.
    // TODO: Example: Instead of calling getMovesInDirection(arr,i+1,j+1,1,1), should be getMovesInDirection(arr,i,j,1,1).
    getMovesInDirection(result, i, j, rowDirection, colDirection, optionalIterLimit = -1) {
        // If optionalIterLimit has been given a value, then only run this recursive function that
        // many times.
        if (optionalIterLimit != 0) {
            // If tile is out of bounds
            if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
                // If encountered an empty tile
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

    getKingRelativeMoves() {
        let result = []
        this.getMovesInDirection(result, this.row + 1, this.col + 1, 1, 1)
        this.getMovesInDirection(result, this.row - 1, this.col - 1, -1, -1)
        this.getMovesInDirection(result, this.row + 1, this.col - 1, 1, -1)
        this.getMovesInDirection(result, this.row - 1, this.col + 1, -1, 1)
        return result
    }
}
