class Soldier extends Piece {
    constructor(row, col, color) {
        super(row, col, SOLDIER, color)
        this.lastRow = this.color === WHITE ? BOARD_SIZE - 1 : 0
    }

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
