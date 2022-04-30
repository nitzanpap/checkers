const BOARD_SIZE = 8
const ASCII_NUM_OF_A = 65

const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

const ILLEGAL = "illegal"
const SOLDIER = "soldier"
const KING = "king"
const EMPTY = "empty"

const messageBox = document.querySelector(".message-box")
let currentColorTurn = WHITE_PLAYER
const board = [[], [], [], [], [], [], [], []]
let tileSelected = undefined
let madeAMove = false
let table
let endGame = false

runMainGameLoop()

function runMainGameLoop() {
    createBoard()
    createPieces()
}

// This function creates and draws the chess board
function createBoard() {
    // Create and draw board-container table
    const body = document.querySelector("body")
    table = document.createElement("table")
    table.className = "board-container"
    body.appendChild(table)

    let cellBgColor

    // Create and draw table rows
    for (let i = BOARD_SIZE - 1; i >= 0; i--) {
        const tr = document.createElement("tr")
        tr.className = "tr"
        tr.id = "tr" + i + ""
        table.appendChild(tr)
        cellBgColor = cellBgColor === "black-cell" ? "white-cell" : "black-cell"
        // Create and draw table cells
        for (let j = 0; j <= BOARD_SIZE - 1; j++) {
            const td = document.createElement("td")
            td.classList = "tdRow" + i + " tdCol" + j
            cellBgColor = cellBgColor === "black-cell" ? "white-cell" : "black-cell"
            td.classList.add(cellBgColor)
            td.id = "td" + (j + i * BOARD_SIZE)
            tr.appendChild(td)
            // Add piece to board array
            addNewPieceToBoardArray(i, j, ILLEGAL, ILLEGAL)
            td.addEventListener("click", () => {
                if (!endGame) handleTileClick(td)
            })
        }
    }
    console.log(board)
}

function createPieces() {
    // Draw two special rows
    for (let i = 0; i <= 2; i++) {
        let tr = document.querySelector("#tr" + i)
        let tileColor = "white"
        let pieceType = SOLDIER
        // Runs twice - Once for the white pieces, and once for the black pieces
        for (let k = 1; k <= 2; k++) {
            // k alternates between creating the white and black pieces
            if (k === 2) {
                tileColor = "black"
                tr = document.querySelector("#tr" + (BOARD_SIZE - 1 - i))
            }
            for (let j = 0; j <= BOARD_SIZE - 1; j++) {
                const td = tr.querySelector(".tdCol" + j)
                if (td.classList.contains("black-cell")) {
                    // Add pieces to board array
                    if (k === 1) addNewPieceToBoardArray(i, j, pieceType, tileColor)
                    else addNewPieceToBoardArray(BOARD_SIZE - 1 - i, j, pieceType, tileColor)
                    // Draw pieces on the screen
                    drawPieceInit(td, pieceType, tileColor)
                }
            }
        }
    }
}

function addNewPieceToBoardArray(i, j, type, color) {
    if (type === ILLEGAL) {
        board[i][j] = new Piece(i, j, type, color)
    } else if (type === SOLDIER) {
        board[i][j] = new Piece(i, j, type, color)
    } else if (type === KING) {
        board[i][j] = new KingPiece(i, j, type, color)
    }
}

function drawPieceInit(tile, type, tileColor) {
    const piece = document.createElement("img")
    piece.className += "piece " + type
    piece.src = "styles/imgs/pieces/" + tileColor + "_" + type + ".png"
    tile.appendChild(piece)
}

function updateMessageBox(event, piece1, piece2 = undefined) {
    messageBox.innerText = ""
    messageBox.className = "message-box"
    if (event === "capture") {
        messageBox.innerText =
            piece1.color + " " + piece1.type + " Captured " + piece2.color + " " + piece2.type + "!"
        messageBox.classList.add("message-box-capture")
    } else if (event === "move") {
        messageBox.innerText =
            piece1.color +
            " " +
            piece1.type +
            " moved to " +
            coordinateToCheckersCoordinate(piece1.row, piece1.col)
    }
    if (event === "new king") {
        messageBox.innerText = piece1.color + " player aquired a king!"
        messageBox.classList.add("message-box-check")
    }
    if (event === "game-over") {
        messageBox.innerText = "Congratulations! " + piece1.color + " player Won!"
        messageBox.classList.add("message-box-checkmate")
    }
}
function coordinateToCheckersCoordinate(row, col) {
    return String.fromCharCode(ASCII_NUM_OF_A + row) + (col + 1)
}

function getPieceFromTile(tile) {
    return board[Math.floor(tile.id.slice(2) / 8)][tile.id.slice(2) % 8]
}

function getTileFromPiece(piece) {
    return document.querySelector("#td" + (piece.row * 8 + piece.col))
}

function getPieceFromTypeAndColor(type, color) {
    for (let row of board) {
        for (let piece of row) {
            if (piece.type === type && piece.color === color) return piece
        }
    }
}
