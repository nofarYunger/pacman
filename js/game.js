'use strict'
const WALL = '➖'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = '🍔';
const CHERRY = '🍒'
var SIZE;

var gHighScore
var gIntervalCherry;
var gFoodCount = -1
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    gIntervalCherry = setInterval(renderCherry, 15000)
    printMat(gBoard, '.board-container')
    document.querySelector('h2 span').innerText = gGame.score
    gGame.isOn = true
}

function buildBoard() {
    SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else if (i === 1 && (j === 1 || j === 8)
                || i === 8 && (j === 1 || j === 8)) {

                board[i][j] = SUPER_FOOD;
            } else gFoodCount++
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    document.querySelector('.popUp').style.display = 'block'
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}

function winGame() {
    gGame.isOn = false;
    document.querySelector('.popUp').style.display = 'block'
    var elH3 = document.querySelector('.popUp h3')
    elH3.innerText = 'good job!'
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}

function playAgain() {
    gGhosts = []
    gFoodCount = -1
    I =1
    gGame.score = 0
    init()
    document.querySelector('.popUp').style.display = 'none'
}

function findEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                var emptyCell = { i, j }
                emptyCells.push(emptyCell)
            }
        }
    }
    return emptyCells;
}


function renderCherry() {
    var emptyCells = findEmptyCells()
    var randIdx = getRandomIntInclusive(0, emptyCells.length)
    var target = emptyCells[randIdx] //* we got en object
    console.log(target);
    //    update the model:
    console.log(emptyCells);
    console.log(gBoard[target.i][target.j]);
    gBoard[target.i][target.j] = CHERRY
    // update the DOM:
    renderCell(target, CHERRY)
}

