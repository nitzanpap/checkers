class Player {
    constructor(color) {
        this.color = color
        this.piecesLeft = 12
    }
    pieceCaptured(piece) {
        this.piecesLeft--
    }
}
