function drawPieceInit(cell, type, cellColor) {
    const pieceImg = document.createElement("img")
    pieceImg.className += "piece " + type
    pieceImg.src = "styles/imgs/pieces/" + cellColor + "_" + type + ".png"
    cell.appendChild(pieceImg)
}

function drawPieceInCell(cell) {
    cell.appendChild(cellSelected.children[0])
}
