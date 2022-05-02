class Piece {
    constructor(row, col, type, color) {
        this.row = row
        this.col = col
        this.type = type
        this.color = color
        if (this.color === "e") this.opponentColor = "e"
        else this.opponentColor = color === WHITE ? BLACK : WHITE
        this.threatend = false
    }

    setRowAndColumn(row, col) {
        this.row = row
        this.col = col
    }

    threatenThisPiece(piece) {
        piece.threatend = true
        getCellFromPiece(piece).classList.add("threatend")
    }

    getPossibleMoves(board) {
        // Get relative moves
        let absoluteMoves = []
        if (this.type === ILLEGAL) {
            absoluteMoves = []
        } else if (this.type === EMPTY) {
            absoluteMoves = []
        } else {
            console.log("Unknown type", type)
        }
        return absoluteMoves
    }
}
