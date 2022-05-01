const BOARD_SIZE = 8
const ASCII_NUM_OF_A = 65

const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"

const ILLEGAL = "il"
const SOLDIER = "soldier"
const KING = "king"
const EMPTY = "e"

let table
const board = [[], [], [], [], [], [], [], []]
let currentColorTurn = WHITE_PLAYER
const messageBox = document.querySelector(".message-box")
let cellSelected = undefined
let isMoveAllowed = false

let whitePlayerTotalPieces = 12
let blackPlayerTotalPieces = 12
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
            td.id = "td" + (j + i * BOARD_SIZE)
            if (cellBgColor === "black-cell") {
                cellBgColor = "white-cell"
                // Add piece to board array
                addNewPieceToBoardArray(i, j, ILLEGAL, ILLEGAL)
            } else {
                cellBgColor = "black-cell"
                // Add piece to board array
                addNewPieceToBoardArray(i, j, EMPTY, EMPTY)
                td.addEventListener("click", () => {
                    if (!endGame) handleCellClick(td)
                })
            }
            td.classList.add(cellBgColor)
            td.id = "td" + (j + i * BOARD_SIZE)
            tr.appendChild(td)
        }
    }
    console.log(board)
}

function createPieces() {
    // Draw two special rows
    for (let i = 0; i <= 2; i++) {
        let tr = document.querySelector("#tr" + i)
        let cellColor = "white"
        let pieceType = SOLDIER
        // Runs twice - Once for the white pieces, and once for the black pieces
        for (let k = 1; k <= 2; k++) {
            // k alternates between creating the white and black pieces
            if (k === 2) {
                cellColor = "black"
                tr = document.querySelector("#tr" + (BOARD_SIZE - 1 - i))
            }
            for (let j = 0; j <= BOARD_SIZE - 1; j++) {
                const td = tr.querySelector(".tdCol" + j)
                if (td.classList.contains("black-cell")) {
                    // Add pieces to board array
                    if (k === 1) addNewPieceToBoardArray(i, j, pieceType, cellColor)
                    else addNewPieceToBoardArray(BOARD_SIZE - 1 - i, j, pieceType, cellColor)
                    // Draw pieces on the screen
                    drawPieceInit(td, pieceType, cellColor)
                }
            }
        }
    }
}

function handleCellClick(cell) {
    const pieceClicked = getPieceFromCell(cell)

    // Click on a current player's piece
    if (pieceClicked.color === currentColorTurn) {
        // Clear all previous possible moves
        removePossibleMoves()
        // Select new cell
        selectCellClick(cell)
        // Show possible moves of selected cell
        let possibleMoves = pieceClicked.getPossibleMoves()
        showPossibleMoves(possibleMoves)

        // Click on a valid empty cell
    } else if (isValidCellDestination(pieceClicked, cell)) {
        const selectedPiece = getPieceFromCell(cellSelected)
        isMoveAllowed = true
        movePiece(selectedPiece, pieceClicked.row, pieceClicked.col)

        removePossibleMoves()
        removeSelectedCell()
        switchTurn()
        isMoveAllowed = false
    }
}
