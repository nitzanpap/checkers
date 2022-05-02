function isCoordinateInBounds(i, j) {
    return i >= 0 && i <= 7 && j >= 0 && j <= 7
}

function switchTurn() {
    currentPlayerTurn = currentPlayerTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
}

function getOpponentPlayer(currentPlayerTurn) {
    return currentPlayerTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
}
