class Player {
    constructor(color) {
        this.color = color
        this.piecesLeft = 12
        this.opponentColor = color === WHITE ? BLACK : WHITE
        // TODO: Refactor
        this.isItThisPlayerTurn = color === WHITE ? true : false
    }
    pieceCaptured(piece) {
        this.piecesLeft--
    }
}
