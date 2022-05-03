const BOARD_SIZE = 8

// Player colors
const WHITE = "white"
const BLACK = "black"

// Players data
const WHITE_PLAYER = new Player(WHITE)
const BLACK_PLAYER = new Player(BLACK)

// Piece types
const SOLDIER = "soldier"
const QUEEN = "queen"
const EMPTY = "e"
// All the white cells are illegal
const ILLEGAL = "il"

// Types of scenarios
const MOVE = "move"
const CAPTURE = "capture"
const THREATENEND = "threatened"
const NEW_QUEEN = "new queen"
const GAME_OVER = "game over"

let table
const board = [[], [], [], [], [], [], [], []]
let cellSelected = undefined

let possibleMoves = []
let possibleUnderThreats = []

let currentPlayerTurn = WHITE_PLAYER

let WINNER

window.addEventListener("load", () => {
    runMainGame()
})

function runMainGame() {
    createBoard()
    createPieces()
}

// This function creates and draws the chess board
function createBoard() {
    const body = document.querySelector("body")

    // Create a message box
    const messageBox = document.createElement("h2")
    messageBox.className = "message-box"
    messageBox.innerText = "Checkers Game"
    body.appendChild(messageBox)

    // Create and draw board-container table
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
                    handleCellClick(td)
                })
            }
            td.classList.add(cellBgColor)
            td.id = "td" + (j + i * BOARD_SIZE)
            tr.appendChild(td)
        }
    }
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
    if (isGameOver()) {
        updateMessageBox(GAME_OVER)
        return
    }
    const pieceClicked = getPieceFromCell(cell)

    // Click on a current players piece
    if (pieceClicked.color === currentPlayerTurn.color) {
        handleAllyPieceClick(cell, pieceClicked)

        // Click on a valid empty cell to move to
    } else if (isValidCellDestination(pieceClicked, cell)) {
        handleValidEmptyCellClick(pieceClicked)
    }
    isGameOver()
}

function handleAllyPieceClick(cell, pieceClicked) {
    // Clear all previous possible moves
    removePossibleMovesAndCaptures()
    // Select new cell
    selectCellClick(cell)
    // Show possible moves of selected cell
    possibleMoves = pieceClicked.getPossibleMoves()
    showPossibleMovesAndCaptures(possibleMoves)
}
function handleValidEmptyCellClick(pieceClicked) {
    const selectedPiece = getPieceFromCell(cellSelected)
    let previousRow = selectedPiece.row
    let previousCol = selectedPiece.col
    movePiece(selectedPiece, pieceClicked.row, pieceClicked.col)
    let capturedPiece = getCapturedPieceBetween(board[previousRow][previousCol], selectedPiece)
    if (capturedPiece.type === SOLDIER || capturedPiece.type === QUEEN) {
        removePieceFromBoardArray(capturedPiece)
        erasePieceFromCell(getCellFromPiece(capturedPiece))
        capturedPiece.color === WHITE
            ? WHITE_PLAYER.pieceCaptured(capturedPiece)
            : BLACK_PLAYER.pieceCaptured(capturedPiece)
        updateMessageBox(CAPTURE, selectedPiece, capturedPiece)
    } else {
        updateMessageBox(MOVE, selectedPiece)
    }
    // Turn the soldier to a queen if it reached its last row
    if (selectedPiece.type === SOLDIER && selectedPiece.row === selectedPiece.lastRow) {
        turnSoldierToQueen(selectedPiece)
        updateMessageBox(NEW_QUEEN, selectedPiece)
    }
    removePossibleMovesAndCaptures()
    removeSelectedCell()
    switchTurn(currentPlayerTurn)
}

function isGameOver() {
    // End the game if The player has no more pieces on the board, or if his pieces are all unable to move.
    if (
        currentPlayerTurn.piecesLeft === 0 ||
        getAllPossibleMovesOfPlayer(currentPlayerTurn).length === 0
    )
        WINNER = getOpponentPlayer(currentPlayerTurn)
    if (WINNER != undefined) {
        updateMessageBox(GAME_OVER, undefined, undefined, currentPlayerTurn.color)
        return true
    }
    return false
}
