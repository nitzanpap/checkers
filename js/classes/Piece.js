class Piece {
    constructor(row, col, type, color) {
        this.row = row
        this.col = col
        this.type = type
        this.color = color
        if (this.color === "e") this.opponentColor = "e"
        else this.opponentColor = color === WHITE ? BLACK : WHITE
        this.threatened = false
    }

    setRowAndColumn(row, col) {
        this.row = row
        this.col = col
    }

    threatenThisPiece(piece) {
        piece.threatened = true
    }

    getPossibleMoves(board) {
        console.log("Getting possible move from the Piece class")
        let absoluteMoves = []
        return absoluteMoves
    }
}
