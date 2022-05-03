/**
 * A class representing a single Soldier piece
 */
class Soldier extends Piece {
    /**
     * Creates a single Soldier piece
     * @param {Number} row Row index
     * @param {Number} col Column index
     * @param {String} color The color of the piece
     */
    constructor(row, col, color) {
        super(row, col, SOLDIER, color)
        this.lastRow = this.color === WHITE ? BOARD_SIZE - 1 : 0
    }

    /**
     * Gets all of the possible moves this piece can make
     * @param {object} board the array containg all of the pieces
     * @returns {object} An array containing all the possible moves of this piece
     */
    getPossibleMoves(board) {
        let absoluteMoves = []
        let capturingMoves = []
        if (this.type === SOLDIER) {
            absoluteMoves = this.getSoldierRelativeMoves()
        } else {
            console.log("Unknown type", type)
        }
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
                // If the cell after the opponent is empty
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
                possibleUnderThreats.push()
            }
        }
    }

    /**
     * Gets all the possible moves that this Soldier can make
     * @returns {object} An array containing all the possible moves of this piece
     */
    getSoldierRelativeMoves() {
        let result = []
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
