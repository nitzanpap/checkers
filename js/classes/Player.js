/**
 * A class representing a player (i.e. White/Black player)
 */
class Player {
    /**
     * Creates a player
     * @param {*} color The color of the player
     */
    constructor(color) {
        this.color = color
        this.piecesLeft = 12
    }

    /**
     * Reduces the players amount of pieces left on the board by 1.
     * @param {Piece} piece a piece from the board array
     */
    pieceCaptured(piece) {
        this.piecesLeft--
    }
}
