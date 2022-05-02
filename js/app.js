const BOARD_SIZE = 8
const ASCII_NUM_OF_A = 65

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
const NEW_QUEEN = "new queen"
const GAME_OVER = "game over"

let table
const board = [[], [], [], [], [], [], [], []]
const messageBox = document.querySelector(".message-box")
let cellSelected = undefined
let isMoveAllowed = false

let possibleMoves
let possibleCaptures = []

let currentPlayerTurn = WHITE_PLAYER
let opponentPlayer = BLACK_PLAYER

let WINNER

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
                    handleCellClick(td)
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
    if (WINNER === undefined) {
        const pieceClicked = getPieceFromCell(cell)

        // Click on a current players piece
        if (pieceClicked.color === currentPlayerTurn.color) {
            // Clear all previous possible moves
            removePossibleMoves()
            // Select new cell
            selectCellClick(cell)
            // Show possible moves of selected cell
            possibleMoves = pieceClicked.getPossibleMoves()
            showPossibleMoves(possibleMoves)

            // Click on a valid empty cell to move to
        } else if (isValidCellDestination(pieceClicked, cell)) {
            const selectedPiece = getPieceFromCell(cellSelected)
            isMoveAllowed = true
            let previousRow = selectedPiece.row
            let previousCol = selectedPiece.col
            movePiece(selectedPiece, pieceClicked.row, pieceClicked.col)
            let capturedPiece = getCapturedPieceBetween(
                board[previousRow][previousCol],
                selectedPiece
            )
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
            removePossibleMoves()
            removeSelectedCell()
            switchTurn()
            isMoveAllowed = false
            isGameOver()
        }
    } else {
        updateMessageBox(GAME_OVER)
    }
}

function isGameOver() {
    // End the game if The player has no more pieces on the board, or if his pieces are all unable to move.
    if (currentPlayerTurn.piecesLeft === 0 || getAllPossibleMovesOfPlayer(currentPlayerTurn) === "")
        WINNER = opponentPlayer
    if (WINNER != undefined) {
        updateMessageBox(GAME_OVER, undefined, undefined, currentPlayerTurn.color)
        return true
    }
    return false
}
