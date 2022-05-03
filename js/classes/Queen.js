/**
 * A class representing a single Queen piece
 */
class Queen extends Piece {
    /**
     * Creates a single Queen piece
     * @param {Number} row Row index
     * @param {Number} col Column index
     * @param {String} color The color of the piece
     */
    constructor(row, col, color) {
        super(row, col, QUEEN, color)
    }
    /**
     * Gets all of the possible moves this piece can make
     * @param {object} board the array containg all of the pieces
     * @returns {object} An array containing all the possible moves of this piece
     */
    getPossibleMoves(board) {
        let absoluteMoves = []
        let capturingMoves = []
        if (this.type === QUEEN) {
            absoluteMoves = this.getQueenRelativeMoves()
        } else {
            console.log("Unknown type", type)
        }
        //
        for (let absoluteMove of absoluteMoves) {
            if (absoluteMove[2] === CAPTURE) {
                capturingMoves.push(absoluteMove)
            }
        }
        return capturingMoves.length !== 0 ? capturingMoves : absoluteMoves
    }

    /**
     *
     * @param {object} result An array containing all the possible moves of this piece
     * @param {Number} i Row index
     * @param {Number} j Column index
     * @param {Number} rowDirection An incremanter for the row index
     * @param {Number} colDirection An incremanter for the column index
     */
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
                    possibleUnderThreats.push([i, j, THREATENEND])
                }
            }
            // If encountered an empty tile
            else if (board[i][j].color === "e") {
                result.push([i, j, MOVE])
                this.getMovesInDirection(result, i, j, rowDirection, colDirection)
            }
        }
    }

    /**
     * Gets all the possible moves that this Queen can make
     * @returns {object} An array containing all the possible moves of this piece
     */
    getQueenRelativeMoves() {
        let result = []
        this.getMovesInDirection(result, this.row, this.col, 1, 1)
        this.getMovesInDirection(result, this.row, this.col, -1, -1)
        this.getMovesInDirection(result, this.row, this.col, 1, -1)
        this.getMovesInDirection(result, this.row, this.col, -1, 1)
        return result
    }
}
