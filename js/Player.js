class Player {
    constructor(color) {
        this.color = color
        this.piecesLeft = 12
        this.opponentColor = color === WHITE ? BLACK : WHITE
    }
    pieceCaptured(piece) {
        this.piecesLeft--
    }
}
