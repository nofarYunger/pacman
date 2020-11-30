'use strict'
const GHOST = '<img class="char"src="./imgs/ghost3.jpg" />';
const SUPER_GHOST = '<img class="char"src="./imgs/Vulnerable-ghost.jpg" />';
var I = 1;
var gGhosts = []
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        colorIdx:I++
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {

    createGhost(board)
    createGhost(board)
    createGhost(board)

    gIntervalGhosts = setInterval(moveGhosts, 650)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        // gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getRandGhost() {
    var randIdx = getRandomIntInclusive(1, 5)
    return `<img class="char"src="./imgs/ghost${randIdx}.jpg" />`
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span>${SUPER_GHOST}</span>`
    }
    return `<span><img class="char"src="./imgs/ghost${ghost.colorIdx}.jpg" /></span>`
}