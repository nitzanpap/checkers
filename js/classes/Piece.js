/**
 * A class representing a single piece
 */
class Piece {
    /**
     * Creates a single piece
     * @param {Number} row Row index
     * @param {Number} col Column index
     * @param {String} type The type of the piece
     * @param {String} color The color of the piece
     */
    constructor(row, col, type, color) {
        this.row = row
        this.col = col
        this.type = type
        this.color = color
        if (this.color === "e") this.opponentColor = "e"
        else this.opponentColor = color === WHITE ? BLACK : WHITE
        this.threatened = false
    }

    /**
     * Sets the row and coordinate information of the piece
     * @param {Number} row Row index
     * @param {Number} col Column index
     */
    setRowAndColumn(row, col) {
        this.row = row
        this.col = col
    }

    /**
     * Raises the threatened flag attribute
     * @param {Piece} piece A given piece
     */
    threatenThisPiece(piece) {
        piece.threatened = true
    }

    /**
     * Gets all of the possible moves this piece can make
     * @param {object} board the array containg all of the pieces
     * @returns {object} An array containing all the possible moves of this piece
     */
    getPossibleMoves(board) {
        let absoluteMoves = []
        if (this.type === ILLEGAL || this.type === EMPTY) {
            absoluteMoves = []
        } else {
            console.log("Getting possible move from the Piece class")
        }
        return absoluteMoves
    }
}
